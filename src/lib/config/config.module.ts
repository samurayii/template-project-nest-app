import * as clone from "clone";
import config from "../init";
import { DynamicModule, Module } from "@nestjs/common";

export * from "./config.interfaces";
export const CONFIG_SERVICE_NAME = "CONFIG";

@Module({})
export class ConfigModule {
    static register(key_name: string): DynamicModule {
        return {
            module: ConfigModule,
            providers: [{
                provide: CONFIG_SERVICE_NAME,
                useValue: clone(config[key_name])
            }],
            exports: [CONFIG_SERVICE_NAME]
        };
    }
}