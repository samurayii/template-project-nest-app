import { Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { ConfigModule } from "../config/config.module";
import { Healthcheck } from "../../http/controllers/healthcheck";

export * from "./api-server.interfaces";

@Module({
    imports: [
        ConfigModule.register("api"), 
        LoggerModule.register("api-server")
    ],
    controllers: [Healthcheck]
})
export class ApiServerModule {}