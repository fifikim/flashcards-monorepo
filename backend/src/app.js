const express = require("express");
const app = express();
const cardsRouter = require("./cards/cards.router");
const decksRouter = require("./decks/decks.router");

app.use(express.json());

app.use("/cards", cardsRouter);
app.use("/decks", decksRouter);

// Not found handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
