import { Controller, Get } from "@nestjs/common";

@Controller()
export class HealthcheckController {

    @Get("/healthcheck")
    healthcheck(): string {
        return "Healthy";
    }
}
