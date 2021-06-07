import config from "./lib/init";
import * as chalk from "chalk";
import { LoggerFLX } from "logger-flx";
import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ApiServerModule } from "./lib/api-server/api-server.module";

const logger = new LoggerFLX(config.logger);

logger.debug(`\nCONFIG:\n${JSON.stringify(config, null, 4)}`);

const bootstrap = async () => {

    try {

        let api_server: INestApplication;


        if (config.api.enable === true) {

            api_server = await NestFactory.create(ApiServerModule, {
                logger: logger.child("api-server")
            });

            api_server.setGlobalPrefix(config.api.prefix);
            
            await api_server.listen(config.api.port, config.api.hostname);

            logger.log(`listening on network interface ${chalk.gray(await api_server.getUrl())}${chalk.gray(config.api.prefix)}`);
        }

        const stop_app = async () => {
            api_server?.close();
            process.exit();
        };

        process.on("SIGTERM", async () => {
            logger.log(`Signal ${chalk.cyan("SIGTERM")} received`);
            await stop_app();
        });

        process.on("SIGINT", async () => {
            logger.log(`Signal ${chalk.cyan("SIGINT")} received`);
            await stop_app();
        });

    } catch (error) {
        logger.critical(`Error application start.\n${error.stack}`);
        process.exit(1);
    }

};

bootstrap();