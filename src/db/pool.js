require("dotenv").config();
const { loadEnvFile } = require('node:process');

<<<<<<< HEAD
const fs = require('node:fs');
=======
>>>>>>> 312ba2a74ef56a7db3d0813755f70a6d076b0da9
    if (fs.existsSync('.env')) {
        loadEnvFile('.env');
        }

const { Pool } = require("pg");

const pool = process.env.DATABASE_URL
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


module.exports = pool;