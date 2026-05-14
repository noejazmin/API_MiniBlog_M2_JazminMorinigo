const express = require("express");
const pool = require("./db/pool");
const authorsRouter = require("./routes/authors.routes");
const postsRouter = require("./routes/posts.routes");


const app = express();

app.use(express.json());
app.use("/authors", authorsRouter);
app.use("/posts", postsRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Servidor funcionando",
  });
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.status(200).json({
      status: "ok",
      message: "Conexión a PostgreSQL funcionando",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al conectar con PostgreSQL",
      error: error.message,
    });
  }
});

module.exports = app;