const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const authorsRouter = require("./routes/authors.routes");
const postsRouter = require("./routes/posts.routes");
const commentsRouter = require("./routes/comments.routes");
const swaggerDocument = YAML.load("./docs/openapi.yaml");
const { testConnection } = require("./db/test-connection");
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/authors", authorsRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Servidor funcionando",
  });
});

app.get("/db-test", async (req, res) => {
  try {
    const databaseTime = await testConnection();

    res.status(200).json({
      status: "ok",
      message: "Conexión a PostgreSQL funcionando",
      databaseTime,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al conectar con PostgreSQL",
      error: error.message,
    });
  }
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;