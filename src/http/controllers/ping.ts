import { Controller, Get } from "@nestjs/common";

@Controller()
export class PingController {

    @Get("/_ping")
    ping(): string {
        return "pong 🎾";
    }

}
