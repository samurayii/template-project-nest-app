import * as helmet from "helmet";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { HealthcheckController } from "../../http/controllers/healthcheck";
import { PingController } from "../../http/controllers/ping";
import { LoggerMiddleware } from "../../http/middleware/logger.middleware";

export * from "./api-server.interfaces";

@Module({
    imports: [
        LoggerModule.register("api-server")
    ],
    controllers: [HealthcheckController, PingController]
})
export class ApiServerModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
        .apply(helmet(), LoggerMiddleware)
        .forRoutes({ 
            path: "*", 
            method: RequestMethod.GET 
        });
    }
}