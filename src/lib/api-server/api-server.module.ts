import { Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { HealthcheckController } from "../../http/controllers/healthcheck";
import { PingController } from "../../http/controllers/ping";

export * from "./api-server.interfaces";

@Module({
    imports: [
        LoggerModule.register("api-server")
    ],
    controllers: [HealthcheckController, PingController]
})
export class ApiServerModule {}