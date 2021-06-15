//import config from "../init";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import * as helmet from "helmet";
import { StaticMiddleware } from "../../http/middleware/static.middleware";
import { PingController } from "../../http/controllers/ping";
import { LoggerModule } from "../logger/logger.module";
import { ConfigModule } from "../config/config.module";
import { LoggerMiddleware } from "../../http/middleware/logger.middleware";

export * from "./static-server.interfaces";

@Module({
    imports: [
        ConfigModule.register("web"),
        LoggerModule.register("static-server")
    ],
    controllers: [PingController]
})
export class StaticServerModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
        .apply(helmet(), LoggerMiddleware, StaticMiddleware)
        .forRoutes({ 
            path: "*", 
            method: RequestMethod.GET 
        });
    }
}