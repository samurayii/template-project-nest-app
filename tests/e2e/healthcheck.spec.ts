import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { ApiServerModule } from "../../src/lib/api-server/api-server.module";
import { INestApplication } from "@nestjs/common";

describe("Healthcheck", () => {

    let app: INestApplication;

    beforeAll(async () => {

        const moduleRef = await Test.createTestingModule({
            imports: [ApiServerModule],
        }).compile();

        app = moduleRef.createNestApplication();

        await app.init();

    });

    it("GET /", () => {

        request(app.getHttpServer())
        .get("/")
        .expect(200);

    });

    it("GET /_ping", () => {

        request(app.getHttpServer())
        .get("/_ping")
        .expect(200);

    });

    it("GET /healthcheck", () => {

        request(app.getHttpServer())
        .get("/healthcheck")
        .expect(200);

    });

    afterAll(async () => {
        await app.close();
    });

});