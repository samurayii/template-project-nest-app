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
        cors: {
            enable: boolean
            origin: string
            methods: string[]
            allowed_headers: string[]
            exposed_headers: string[]
            credentials:boolean
            preflight_continue: boolean
            options_success_status: number
            max_age: number
        }
    }  
}