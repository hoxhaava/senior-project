const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

dotenv.config({ path: './.env' })

const app = express();

app.use(express.json());

// database properties
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

// connect
db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MySQL Connected....")
    }
});

app.get('/categories', (req, res) => {
    db.query('SELECT * FROM categories', (error, rows, fields) => {
        if(error) {
            console.log("Error in the query");
        } else {
            res.json(rows);
        }
    })
})

// set up listening port
app.listen(5000, () => {
    console.log("Server started on port 5000");
});