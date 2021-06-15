import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import * as mime from "mime-types";
import { Request, Response, NextFunction } from "express";
import { ILoggerFLX } from "logger-flx";
import { IWebServerConfig } from "../../lib/static-server/static-server.module";
import { CONFIG_SERVICE_NAME } from "../../lib/config/config.module";
import { LOGGER_SERVICE_NAME } from "../../lib/logger/logger.module";
import * as wildcard from "wildcard";
import * as path from "path";
import * as fs from "fs";
import { ReadStream } from "fs";

@Injectable()
export class StaticMiddleware implements NestMiddleware {

    private readonly _full_root_path: string

    constructor (
        @Inject(LOGGER_SERVICE_NAME) private readonly _logger: ILoggerFLX,
        @Inject(CONFIG_SERVICE_NAME) private readonly _config: IWebServerConfig
    ) {

        this._full_root_path = path.resolve(process.cwd(), this._config.static.root_path);

        if (fs.existsSync(this._full_root_path) === false) {
            fs.mkdirSync(this._full_root_path, {
                recursive: true
            });
            this._logger.debug(`Folder ${this._full_root_path} created`);
        }

        this._logger.debug("StaticMiddleware mapped");
    }
    async use(req: Request, res: Response, next: NextFunction): Promise<void> {

        for (const wildcard_regexp of this._config.static.exclude) {
            if (wildcard(wildcard_regexp, req.path) !== false) {
                return next();
            }
        }

        let file_path: string; 
        let stream: ReadStream;
        let mime_type: string;
        
        if (req.path === "/" && this._config.static.index_redirect === true) {
            file_path = this._config.static.index;
        } else {
            file_path = req.path.replace(/^\//,"").replace(/\/$/,"");
        }

        if (/^[-a-zA-Z0-9_\/]{1,256}(\.[-a-zA-Z0-9_]{1,8}|)$/.test(file_path) === true) {
         
            const full_file_path = path.resolve(this._full_root_path, file_path);

            try {

                await fs.promises.access(full_file_path, fs.constants.R_OK);
                
                const stats = await fs.promises.stat(full_file_path);

                if (stats.isFile() === true) {
                    stream = fs.createReadStream(full_file_path);
                    mime_type = <string>mime.lookup(full_file_path);
                }

            } catch (error) {
                this._logger.error(error);
            }

        }

        if (stream === undefined) {

            res.status(404).json({
                statusCode: 404,
                message: `Cannot GET ${req.path}`,
                error: "Not Found"
            });

        } else {

            res.status(200);
            res.type(mime_type);

            stream.on("open", () => {
                stream.pipe(res);
            });

            stream.on("error", (error) => {
                next(error);
            });

        }       

    }

}