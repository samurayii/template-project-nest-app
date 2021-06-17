import config from "../init";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import * as helmet from "helmet";
import { StaticMiddleware } from "../../http/middleware/static.middleware";
import { PingController } from "../../http/controllers/ping";
import { LoggerModule } from "../logger/logger.module";
import { ConfigModule } from "../config/config.module";
import { LoggerMiddleware } from "../../http/middleware/logger.middleware";
import { ThrottlerGuard, ThrottlerModule, ThrottlerModuleOptions } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";

export * from "./static-server.interfaces";

const imports_list = [
    ConfigModule.register("web"),
    LoggerModule.register("static-server")
];
const providers_list = [];

if (config.web.security.rate.enable === true) {

    const rate_options: ThrottlerModuleOptions = {
        ttl: config.web.security.rate.ttl,
        limit: config.web.security.rate.limit,
        ignoreUserAgents: []
    };

    for (const regexp_str of config.web.security.rate.ignore_agents) {
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
    controllers: [PingController]
})
export class StaticServerModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {

        // eslint-disable-next-line @typescript-eslint/ban-types
        const apply_list: Function[] = [LoggerMiddleware, StaticMiddleware];

        if (config.web.security.helmet.enable === true) {
            apply_list.unshift(helmet());
        }

        consumer.apply(...apply_list).forRoutes({ 
            path: "*", 
            method: RequestMethod.GET 
        });
    }
}