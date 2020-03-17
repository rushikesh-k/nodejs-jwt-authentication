require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());
const userdetails = [
  {
    username: "rushi",
    password: "test123"
  },
  { username: "korgaonkar", password: "test908" }
];

app.get("/users", (req, res) => {
  res.json(userdetails);
});

app.get("/posts", authenticateToken, (req, res) => {
  res.json(userdetails.filter(user => user.username === req.user.name));
});

app.post("/login", (req, res) => {
  //1.Authenticate user
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000);
