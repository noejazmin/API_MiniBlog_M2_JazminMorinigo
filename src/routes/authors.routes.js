const express = require("express");

const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
} = require("../services/authors.service");

const router = express.Router();

const isInvalidId = (id) => {
    return isNaN(Number(id));
};

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

        if (isInvalidId(id)) {
            return res.status(400).json({
                message: "El id debe ser un numero",
            });
        }

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

router.post("/", async (req, res) => {
    try {
        const { name, email, bio } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name y email son obligatorios",
            });
        }

        const newAuthor = await createAuthor({ name, email, bio });

        res.status(201).json(newAuthor);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "El email ya existe",
            });
        }

        res.status(500).json({
            message: "Error al crear author",
            error: error.message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, bio } = req.body;

        if (isInvalidId(id)) {
            return res.status(400).json({
                message: "El id debe ser un numero",
            });
        }

        if (!name || !email) {
            return res.status(400).json({
                message: "Name y email son obligatorios",
            });
        }

        const updatedAuthor = await updateAuthor(id, { name, email, bio });

        if (!updatedAuthor) {
            return res.status(404).json({
                message: "Author no encontrado",
            });
        }

        res.status(200).json(updatedAuthor);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "El email ya existe",
            });
        }

        res.status(500).json({
            message: "Error al actualizar author",
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

        const deletedAuthor = await deleteAuthor(id);

        if (!deletedAuthor) {
            return res.status(404).json({
                message: "Author no encontrado",
            });
        }

        res.status(200).json({
            message: "Author eliminado correctamente",
            author: deletedAuthor,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar author",
            error: error.message,
        });
    }
});

module.exports = router;
