const pool = require("./pool");

const testConnection = async () => {
    const result = await pool.query("SELECT NOW()");

    return result.rows[0].now;
};

module.exports = {
    testConnection,
};
