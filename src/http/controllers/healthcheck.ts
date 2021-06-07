import { Controller, Get } from "@nestjs/common";

@Controller("/")
export class Healthcheck {

    @Get("/healthcheck")
    healthcheck(): string {
        return "Healthy";
    }

    @Get("/_ping")
    ping(): string {
        return "pong 🎾";
    }

}
