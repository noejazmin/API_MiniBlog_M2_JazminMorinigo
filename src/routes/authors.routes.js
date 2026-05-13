const express = require("express");

const {
    getAllAuthors,
    getAuthorById,
} = require("../services/authors.service");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
    const authors = await getAllAuthors();

    res.status(200).json(authors);
    } catch (error) {
    res.status(500).json({
        message: "Error al obtener authors",
        error: error.message,
    });
    }
});

router.get("/:id", async (req, res) => {
    try {
    const { id } = req.params;
    const author = await getAuthorById(id);

    if (!author) {
        return res.status(404).json({
        message: "Author no encontrado",
        });
    }

    res.status(200).json(author);
    } catch (error) {
    res.status(500).json({
        message: "Error al obtener author",
        error: error.message,
    });
    }
});

module.exports = router;