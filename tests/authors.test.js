const request = require("supertest");
const app = require("../src/app");

describe("Authors endpoints", () => {
    test("GET /authors debe responder un array", async () => {
        const response = await request(app).get("/authors");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /authors debe crear un author", async () => {
        const uniqueEmail = `author-${Date.now()}@example.com`;

        const response = await request(app)
            .post("/authors")
            .send({
                name: "Author Test",
                email: uniqueEmail,
                bio: "Bio de prueba",
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Author Test");
        expect(response.body.email).toBe(uniqueEmail);
        expect(response.body.bio).toBe("Bio de prueba");
        expect(response.body.id).toBeDefined();
    });

    test("POST /authors sin name debe responder 400", async () => {
        const uniqueEmail = `author-no-name-${Date.now()}@example.com`;

        const response = await request(app)
            .post("/authors")
            .send({
                email: uniqueEmail,
                bio: "Bio incompleta",
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Name y email son obligatorios");
    });

    test("POST /authors con email duplicado debe responder 409", async () => {
        const uniqueEmail = `author-duplicado-${Date.now()}@example.com`;

        await request(app)
            .post("/authors")
            .send({
                name: "Author Original",
                email: uniqueEmail,
                bio: "Bio original",
            });

        const response = await request(app)
            .post("/authors")
            .send({
                name: "Author Duplicado",
                email: uniqueEmail,
                bio: "Bio duplicada",
            });

        expect(response.status).toBe(409);
        expect(response.body.message).toBe("El email ya existe");
    });

    test("GET /authors/:id debe devolver un author existente", async () => {
        const uniqueEmail = `author-get-${Date.now()}@example.com`;

        const created = await request(app)
            .post("/authors")
            .send({
                name: "Author Get",
                email: uniqueEmail,
                bio: "Bio get",
            });

        const response = await request(app).get(`/authors/${created.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(created.body.id);
        expect(response.body.email).toBe(uniqueEmail);
    });

    test("GET /authors/abc debe responder 400", async () => {
        const response = await request(app).get("/authors/abc");

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("El id debe ser un numero");
    });

    test("PUT /authors/:id debe actualizar un author", async () => {
        const uniqueEmail = `author-put-${Date.now()}@example.com`;

        const created = await request(app)
            .post("/authors")
            .send({
                name: "Author Put",
                email: uniqueEmail,
                bio: "Bio antes",
            });

        const updatedEmail = `author-put-updated-${Date.now()}@example.com`;

        const response = await request(app)
            .put(`/authors/${created.body.id}`)
            .send({
                name: "Author Put Updated",
                email: updatedEmail,
                bio: "Bio despues",
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Author Put Updated");
        expect(response.body.email).toBe(updatedEmail);
        expect(response.body.bio).toBe("Bio despues");
    });

    test("DELETE /authors/:id debe eliminar un author", async () => {
        const uniqueEmail = `author-delete-${Date.now()}@example.com`;

        const created = await request(app)
            .post("/authors")
            .send({
                name: "Author Delete",
                email: uniqueEmail,
                bio: "Bio delete",
            });

        const response = await request(app).delete(`/authors/${created.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Author eliminado correctamente");

        const getDeleted = await request(app).get(`/authors/${created.body.id}`);
        expect(getDeleted.status).toBe(404);
    });
});
