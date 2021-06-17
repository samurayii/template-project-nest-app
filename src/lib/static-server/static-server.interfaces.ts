export interface IWebServerConfig {
    enable: boolean
    hostname: string
    port: number
    prefix: string
    static: {
        root_path: string
        exclude: string[]
        index_redirect: boolean
        index: string
    }
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