const express = require("express");

const {
    getAllAuthors,
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

module.exports = router;