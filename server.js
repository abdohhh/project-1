const express = require("express");
const sqlite = require("sqlite3").verbose();
const path = require("path");

const app = express();

app.use(express.static('./public'));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const db = new sqlite.Database('users.db', (err) => {
    if (err) {
        console.error("Error opening database: " + err.message);
    } else {
        console.log("Connected to the users database.");
    }
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    password TEXT
)`, (err) => {
    if (err) {
        console.error("Error creating table: " + err.message);
    } else {
        console.log("users table is ready.");
    }
});


app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

app.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/form-validation.html'));
});


app.post("/form", (req, res) => {
    const { name, email, phone,password } = req.body;
    console.log("Form Data Received:", req.body);

    db.run(
        'INSERT INTO users (name, email, phone , password) VALUES (?, ?, ?, ?)',
        [name, email, phone ,password],
        function (err) {
            if (err) {
                console.error("Error inserting user: " + err.message);
                res.status(500).send("Error inserting user");
            } else {
                console.log("✅ User inserted successfully.");
                res.redirect("/view");
            }
        }
    );
});

app.get("/view", (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            console.error("Error fetching users: " + err.message);
            res.status(500).send("Internal Server Error");
        } else {
            res.render("view", { users: rows });
        }
    });
});

app.listen(3000, () => {
    console.log("✅ Server is running at http://localhost:3000");
}); 
