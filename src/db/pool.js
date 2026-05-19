const { loadEnvFile } = require('node:process');
const { Pool } = require("pg");


const fs = require('node:fs');

    if (fs.existsSync('.env')) {
        loadEnvFile('.env');
        }

const poolConfig = process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL
    }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    };

const pool = new Pool(poolConfig);

module.exports = pool;