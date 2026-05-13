const pool = require("../db/pool");

const getAllAuthors = async () => {
  const result = await pool.query("SELECT * FROM authors");

  return result.rows;
};

module.exports = {
  getAllAuthors,
};