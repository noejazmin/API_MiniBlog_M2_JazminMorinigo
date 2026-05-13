const pool = require("../db/pool");

const getAllAuthors = async () => {
  const result = await pool.query("SELECT * FROM authors");

    return result.rows;
};

const getAuthorById = async (id) => {
    const result = await pool.query(
    "SELECT * FROM authors WHERE id = $1",
    [id]
    );

    return result.rows[0];
};

module.exports = {
    getAllAuthors,
    getAuthorById,
};

