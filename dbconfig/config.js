require('dotenv').config({ path: './.env' }); // Load environment variables

const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DB_HOST ,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME 
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to database.");
    }
});

module.exports = connection;

