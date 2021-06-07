import config from "../init";
import * as clone from "clone";
import { DynamicModule, Module } from "@nestjs/common";
import { ILoggerFLXConfig, LoggerFLX } from "logger-flx";

export const LOGGER_SERVICE_NAME = "LOGGER";

@Module({})
export class LoggerModule {
    static register(logger_name: string): DynamicModule {

        const logger_config: ILoggerFLXConfig = clone(config.logger);

        logger_config.name = logger_name;

        const logger = new LoggerFLX(logger_config);

        return {
            module: LoggerModule,
            providers: [{
                provide: LOGGER_SERVICE_NAME,
                useValue: logger
            }],
            exports: [LOGGER_SERVICE_NAME]
        };
    }
}