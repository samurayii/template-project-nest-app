import * as chalk from "chalk";
import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ILoggerFLX } from "logger-flx";
import { LOGGER_SERVICE_NAME } from "../../lib/logger/logger.module";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor (
        @Inject(LOGGER_SERVICE_NAME) private readonly _logger: ILoggerFLX
    ) {
        this._logger.debug("LoggerMiddleware mapped");
    }
    use(req: Request, res: Response, next: NextFunction): void {
        this._logger.debug(`[Request] ${chalk.yellow(`${req.protocol.toLocaleUpperCase()} ${req.httpVersion} ${req.method}`)} ${req.hostname}${req.originalUrl} ${chalk.gray(`(${req.ip})`)}`);
        next();
    }
}