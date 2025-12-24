const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../db/pool");
const { secret } = require("../utils/config");

const router = express.Router();

// 🔐 Generate JWT (FIXED)
const generateToken = (user) =>
  jwt.sign(
    { email: user.email, role: user.role }, // ✅ email added
    secret,
    { expiresIn: "1d" }
  );

/* ================= REGISTER ================= */
router.post("/register", (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password)
    return res.status(400).send("Email and password are required");

  pool.query(
    "SELECT email FROM users WHERE email=?",
    [email],
    (err, result) => {
      if (err) return res.status(500).send("Database error");

      if (result.length > 0) {
        return res.status(409).json({
          message: "User already exists, please login"
        });
      }

      pool.query(
        "INSERT INTO users (email, password, role) VALUES (?,?,?)",
        [email, password, role || "student"],
        (err) => {
          if (err) return res.status(500).send("Database error");

          res.status(201).json({
            message: "User registered successfully"
          });
        }
      );
    }
  );
});

/* ================= LOGIN ================= */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  pool.query(
    "SELECT email, role FROM users WHERE email=? AND password=?",
    [email, password],
    (err, data) => {
      if (err) return res.status(500).send("Database error");
      if (data.length === 0)
        return res.status(401).send("Invalid email or password");

      const user = data[0];
      const token = generateToken(user);

      res.json({
        message: "Login successful",
        token,
        role: user.role
      });
    }
  );
});

module.exports = router;
