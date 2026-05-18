const express = require("express");

const {
    getAllPosts,
    getPostById,
    getPostsByAuthorId,
    createPost,
    updatePost,
    deletePost,
} = require("../services/posts.service");

const router = express.Router();

const { validatePostData } = require("../validators/posts.validator");
const { isInvalidId } = require("../validators/id.validator");


router.get("/", async (req, res) => {
    try {
        const posts = await getAllPosts();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener posts",
            error: error.message,
        });
    }
});

router.get("/author/:authorId", async (req, res) => {
    try {
        const { authorId } = req.params;

        if (isInvalidId(authorId)) {
            return res.status(400).json({
                message: "El authorId debe ser un numero",
            });
        }

        const posts = await getPostsByAuthorId(authorId);

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener posts del author",
            error: error.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (isInvalidId(id)) {
            return res.status(400).json({
                message: "El id debe ser un numero",
            });
        }

        const post = await getPostById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post no encontrado",
            });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener post",
            error: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, content, author_id, published } = req.body;

        const validationError = validatePostData(req.body);

        if (validationError) {
            return res.status(400).json({
                message: validationError,
            });
        }


        const newPost = await createPost({
            title,
            content,
            author_id,
            published: published ?? false,
        });

        res.status(201).json(newPost);
    } catch (error) {
        if (error.code === "23503") {
            return res.status(404).json({
                message: "Author no encontrado",
            });
        }

        res.status(500).json({
            message: "Error al crear post",
            error: error.message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author_id, published } = req.body;

        if (isInvalidId(id)) {
            return res.status(400).json({
                message: "El id debe ser un numero",
            });
        }

        const validationError = validatePostData(req.body);

        if (validationError) {
            return res.status(400).json({
                message: validationError,
            });
        }


        const updatedPost = await updatePost(id, {
            title,
            content,
            author_id,
            published: published ?? false,
        });

        if (!updatedPost) {
            return res.status(404).json({
                message: "Post no encontrado",
            });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        if (error.code === "23503") {
            return res.status(404).json({
                message: "Author no encontrado",
            });
        }

        res.status(500).json({
            message: "Error al actualizar post",
            error: error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (isInvalidId(id)) {
            return res.status(400).json({
                message: "El id debe ser un numero",
            });
        }

        const deletedPost = await deletePost(id);

        if (!deletedPost) {
            return res.status(404).json({
                message: "Post no encontrado",
            });
        }

        res.status(200).json({
            message: "Post eliminado correctamente",
            post: deletedPost,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar post",
            error: error.message,
        });
    }
});

module.exports = router;
