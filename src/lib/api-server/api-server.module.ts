import * as helmet from "helmet";
import config from "../init";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { HealthcheckController } from "../../http/controllers/healthcheck";
import { PingController } from "../../http/controllers/ping";
import { LoggerMiddleware } from "../../http/middleware/logger.middleware";
import { ConfigModule } from "../config/config.module";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule, ThrottlerModuleOptions } from "@nestjs/throttler";

export * from "./api-server.interfaces";

const imports_list = [
    ConfigModule.register("api"),
    LoggerModule.register("api-server")
];
const providers_list = [];

if (config.api.security.rate.enable === true) {

    const rate_options: ThrottlerModuleOptions = {
        ttl: config.api.security.rate.ttl,
        limit: config.api.security.rate.limit,
        ignoreUserAgents: []
    };

    for (const regexp_str of config.api.security.rate.ignore_agents) {
        rate_options.ignoreUserAgents.push(new RegExp(regexp_str));
    }

    imports_list.push(ThrottlerModule.forRoot(rate_options));

    providers_list.push({
        provide: APP_GUARD,
        useClass: ThrottlerGuard,
    });
}

@Module({
    imports: [...imports_list],
    providers: [...providers_list],
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