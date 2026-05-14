const request = require("supertest");
const app = require("../src/app");

describe("Health endpoint", () => {
    test("GET /health debe responder 200 y status ok", async () => {
        const response = await request(app).get("/health");

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("ok");
        expect(response.body.message).toBe("Servidor funcionando");
    });
});
