const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const PORT = 4000

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "awsdb",
  password: "postgre",
  port: 5432,
});

app.post("/user", async (req, res) => {
  const { firstName, lastName, address, phone, email } = req.body;
  try {
    await pool.query(
      "INSERT INTO myuserdata(first_name, last_name, address, phone, email) VALUES ($1, $2, $3, $4, $5)",
      [firstName, lastName, address, phone, email]
    );
    res.status(201).send("User added successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM user");
    res.status(200).json({
        mesg:"iiii"
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => console.log("Server running on port ",PORT));
