const request = require("supertest");
const app = require("../src/app");

const createTestAuthor = async () => {
    const uniqueEmail = `comment-author-${Date.now()}-${Math.random()}@example.com`;

    const response = await request(app)
        .post("/authors")
        .send({
            name: "Author Para Comments",
            email: uniqueEmail,
            bio: "Bio para comments",
        });

    return response.body;
};

const createTestPost = async (authorId) => {
    const response = await request(app)
        .post("/posts")
        .send({
            title: "Post Para Comments",
            content: "Contenido para comments",
            author_id: authorId,
            published: true,
        });

    return response.body;
};

describe("Comments endpoints", () => {
    test("GET /comments debe responder un array", async () => {
        const response = await request(app).get("/comments");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /comments debe crear un comment", async () => {
        const author = await createTestAuthor();
        const post = await createTestPost(author.id);

        const response = await request(app)
            .post("/comments")
            .send({
                content: "Comentario de prueba",
                post_id: post.id,
                author_id: author.id,
            });

        expect(response.status).toBe(201);
        expect(response.body.content).toBe("Comentario de prueba");
        expect(response.body.post_id).toBe(post.id);
        expect(response.body.author_id).toBe(author.id);
    });

    test("POST /comments sin content debe responder 400", async () => {
        const author = await createTestAuthor();
        const post = await createTestPost(author.id);

        const response = await request(app)
            .post("/comments")
            .send({
                post_id: post.id,
                author_id: author.id,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Content, post_id y author_id son obligatorios");
    });

    test("POST /comments con post inexistente debe responder 404", async () => {
        const author = await createTestAuthor();

        const response = await request(app)
            .post("/comments")
            .send({
                content: "Comentario con post inexistente",
                post_id: 999999,
                author_id: author.id,
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Post o author no encontrado");
    });

    test("GET /comments/post/:postId debe devolver comments del post", async () => {
        const author = await createTestAuthor();
        const post = await createTestPost(author.id);

        await request(app)
            .post("/comments")
            .send({
                content: "Comentario listado por post",
                post_id: post.id,
                author_id: author.id,
            });

        const response = await request(app).get(`/comments/post/${post.id}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].post_id).toBe(post.id);
    });

    test("GET /comments/post/abc debe responder 400", async () => {
        const response = await request(app).get("/comments/post/abc");

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("El postId debe ser un numero");
    });
});
