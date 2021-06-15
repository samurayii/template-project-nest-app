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
}