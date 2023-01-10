const express = require("express");
const app = express();
const morgan = require("morgan")
const cors = require("cors");


const transactionsController = require("./controllers/transactionsController");

app.use(express.json())
app.use(cors());
app.use(morgan("tiny"))


app.get("/", (req, res) => {
  res.send("Welcome to the Budget App");
});

app.use("/transactions", transactionsController);

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found"})
})

module.exports = app;
