const express = require("express");
const transactions = express.Router();
const { v4: uuidv4 } = require("uuid");

const transactionsArray = require("../models/transactions");

transactions.get("/", (req, res) => {
  res.json(transactionsArray);
});

transactions.get("/:index", (req, res) => {
  const { index } = req.params;
  if (transactionsArray[index]) {
    res.status(200).json(transactionsArray[index]);
  } else {
    res.status(404).json("Not Found");
  }
});

transactions.put("/:index", (req, res) => {
  const { index } = req.params;
  if (transactionsArray[index]) {
    transactionsArray[index] = req.body;
    res.status(200).json(transactionsArray[index]);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
});

transactions.post("/", (req, res) => {
  req.body.id = uuidv4();

  transactionsArray.push(req.body);
  res.json(transactionsArray.at(-1));
});

transactions.delete("/:index", (req, res) => {
  const deletedTransaction = transactionsArray.splice(req.params.index, 1);
  res.status(200).json(deletedTransaction);
});

module.exports = transactions;
