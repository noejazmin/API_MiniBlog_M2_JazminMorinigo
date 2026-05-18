const express = require("express");

const {
    getAllComments,
    getCommentsByPostId,
    createComment,
} = require("../services/comments.service");

const router = express.Router();

const { validateCommentData } = require("../validators/comments.validator");
const { isInvalidId } = require("../validators/id.validator");


router.get("/", async (req, res) => {
    try {
        const comments = await getAllComments();

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener comments",
            error: error.message,
        });
    }
});

router.get("/post/:postId", async (req, res) => {
    try {
        const { postId } = req.params;

        if (isInvalidId(postId)) {
            return res.status(400).json({
                message: "El postId debe ser un numero",
            });
        }

        const comments = await getCommentsByPostId(postId);

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener comments del post",
            error: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { content, post_id, author_id } = req.body;

        const validationError = validateCommentData(req.body);

        if (validationError) {
            return res.status(400).json({
                message: validationError,
            });
        }

        const newComment = await createComment({
            content,
            post_id,
            author_id,
        });

        res.status(201).json(newComment);
    } catch (error) {
        if (error.code === "23503") {
            return res.status(404).json({
                message: "Post o author no encontrado",
            });
        }

        res.status(500).json({
            message: "Error al crear comment",
            error: error.message,
        });
    }
});

module.exports = router;
