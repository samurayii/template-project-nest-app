export interface IApiServerConfig {
    enable: boolean
    hostname: string
    port: number
    prefix: string
    security: {
        helmet: {
            enable: boolean
        }
        rate: {
            enable: boolean
            ttl: number
            limit: number
            ignore_agents: string[]
        }
    }
}            