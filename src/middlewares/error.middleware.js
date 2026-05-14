const errorMiddleware = (error, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
        error: error.message,
    });
};

module.exports = errorMiddleware;
