import * as helmet from "helmet";
import config from "../init";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { HealthcheckController } from "../../http/controllers/healthcheck";
import { PingController } from "../../http/controllers/ping";
import { LoggerMiddleware } from "../../http/middleware/logger.middleware";
import { ConfigModule } from "../config/config.module";

export * from "./api-server.interfaces";

@Module({
    imports: [
        ConfigModule.register("api"),
        LoggerModule.register("api-server")
    ],
    controllers: [HealthcheckController, PingController]
})
export class ApiServerModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {

        // eslint-disable-next-line @typescript-eslint/ban-types
        const apply_list: Function[] = [LoggerMiddleware];

        if (config.api.security.helmet.enable === true) {
            apply_list.unshift(helmet());
        }

        consumer.apply(...apply_list).forRoutes({ 
            path: "*", 
            method: RequestMethod.GET 
        });

    }
}