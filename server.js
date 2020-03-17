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

app.post("/login", (req, res) => {
  //1.Authenticate user

  //2.Token
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

app.listen(3000);
