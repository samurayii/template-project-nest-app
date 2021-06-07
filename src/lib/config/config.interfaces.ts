import { ILoggerFLXConfig } from "logger-flx";
import { IApiServerConfig } from "../api-server/api-server.module";

export interface IApiAppConfig {
    [key: string]: unknown
    logger: ILoggerFLXConfig
    api: IApiServerConfig
}