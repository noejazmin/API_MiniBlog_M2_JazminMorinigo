const request = require("supertest");
const app = require("../src/app");

const createTestAuthor = async () => {
    const uniqueEmail = `post-author-${Date.now()}-${Math.random()}@example.com`;

    const response = await request(app)
        .post("/authors")
        .send({
            name: "Author Para Posts",
            email: uniqueEmail,
            bio: "Bio para crear posts",
        });

    return response.body;
};

describe("Posts endpoints", () => {
    test("GET /posts debe responder un array", async () => {
        const response = await request(app).get("/posts");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /posts debe crear un post", async () => {
        const author = await createTestAuthor();

        const response = await request(app)
            .post("/posts")
            .send({
                title: "Post Test",
                content: "Contenido del post test",
                author_id: author.id,
                published: true,
            });

        expect(response.status).toBe(201);
        expect(response.body.title).toBe("Post Test");
        expect(response.body.content).toBe("Contenido del post test");
        expect(response.body.author_id).toBe(author.id);
        expect(response.body.published).toBe(true);
    });

    test("POST /posts sin title debe responder 400", async () => {
        const author = await createTestAuthor();

        const response = await request(app)
            .post("/posts")
            .send({
                content: "Contenido sin title",
                author_id: author.id,
                published: false,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Title, content y author_id son obligatorios");
    });

    test("POST /posts con author inexistente debe responder 404", async () => {
        const response = await request(app)
            .post("/posts")
            .send({
                title: "Post sin author",
                content: "Contenido",
                author_id: 999999,
                published: false,
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Author no encontrado");
    });

    test("GET /posts/:id debe devolver un post existente", async () => {
        const author = await createTestAuthor();

        const created = await request(app)
            .post("/posts")
            .send({
                title: "Post Get",
                content: "Contenido get",
                author_id: author.id,
                published: true,
            });

        const response = await request(app).get(`/posts/${created.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(created.body.id);
        expect(response.body.title).toBe("Post Get");
    });

    test("GET /posts/abc debe responder 400", async () => {
        const response = await request(app).get("/posts/abc");

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("El id debe ser un numero");
    });

    test("GET /posts/author/:authorId debe devolver posts del author", async () => {
        const author = await createTestAuthor();

        await request(app)
            .post("/posts")
            .send({
                title: "Post Por Author",
                content: "Contenido por author",
                author_id: author.id,
                published: true,
            });

        const response = await request(app).get(`/posts/author/${author.id}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].author_id).toBe(author.id);
    });

    test("PUT /posts/:id debe actualizar un post", async () => {
        const author = await createTestAuthor();

        const created = await request(app)
            .post("/posts")
            .send({
                title: "Post Put",
                content: "Contenido antes",
                author_id: author.id,
                published: false,
            });

        const response = await request(app)
            .put(`/posts/${created.body.id}`)
            .send({
                title: "Post Put Updated",
                content: "Contenido despues",
                author_id: author.id,
                published: true,
            });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Post Put Updated");
        expect(response.body.content).toBe("Contenido despues");
        expect(response.body.published).toBe(true);
    });

    test("DELETE /posts/:id debe eliminar un post", async () => {
        const author = await createTestAuthor();

        const created = await request(app)
            .post("/posts")
            .send({
                title: "Post Delete",
                content: "Contenido delete",
                author_id: author.id,
                published: false,
            });

        const response = await request(app).delete(`/posts/${created.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Post eliminado correctamente");

        const getDeleted = await request(app).get(`/posts/${created.body.id}`);
        expect(getDeleted.status).toBe(404);
    });
});
