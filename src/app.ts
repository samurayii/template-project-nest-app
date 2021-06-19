import config from "./lib/init";
import * as chalk from "chalk";
import { LoggerFLX } from "logger-flx";
import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ApiServerModule } from "./lib/api-server/api-server.module";
import { StaticServerModule } from "./lib/static-server/static-server.module";

const logger = new LoggerFLX(config.logger);

logger.debug(`\nCONFIG:\n${JSON.stringify(config, null, 4)}`);

const bootstrap = async () => {

    try {

        let api_server: INestApplication;
        let static_server: INestApplication;

        if (config.api.enable === true) {

            api_server = await NestFactory.create(ApiServerModule, {
                logger: logger.child("api-server")
            });

            api_server.setGlobalPrefix(config.api.prefix);

            if (config.api.security.cors.enable === true) {
                const cors_config = config.api.security.cors;
                api_server.enableCors({
                    origin: cors_config.origin,
                    methods: cors_config.methods,
                    allowedHeaders: cors_config.allowed_headers,
                    exposedHeaders: cors_config.exposed_headers,
                    credentials: cors_config.credentials,
                    maxAge: cors_config.max_age,
                    preflightContinue: cors_config.preflight_continue,
                    optionsSuccessStatus: cors_config.options_success_status
                });
            }
            
            await api_server.listen(config.api.port, config.api.hostname);

            logger.log(`listening on network interface ${chalk.gray(await api_server.getUrl())}${chalk.gray(`/${config.api.prefix}`)}`);
        }

        if (config.web.enable === true) {

            static_server = await NestFactory.create(StaticServerModule, {
                logger: logger.child("static-server")
            });

            static_server.setGlobalPrefix(config.web.prefix);

            if (config.web.security.cors.enable === true) {
                const cors_config = config.web.security.cors;
                static_server.enableCors({
                    origin: cors_config.origin,
                    methods: cors_config.methods,
                    allowedHeaders: cors_config.allowed_headers,
                    exposedHeaders: cors_config.exposed_headers,
                    credentials: cors_config.credentials,
                    maxAge: cors_config.max_age,
                    preflightContinue: cors_config.preflight_continue,
                    optionsSuccessStatus: cors_config.options_success_status
                });
            }
            
            await static_server.listen(config.web.port, config.web.hostname);

            logger.log(`listening on network interface ${chalk.gray(await static_server.getUrl())}${chalk.gray(`/${config.web.prefix}`)}`);
        }

        const stop_app = async () => {
            await api_server?.close();
            await static_server?.close();
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