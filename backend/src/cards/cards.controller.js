const cardsService = require("./cards.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// middleware
async function cardExists(req, res, next) {
  const card = await cardService.read(req.params.cardId);
  if (card) {
    res.locals.card = card;
    return next();
  }
  next({ status: 404, message: `Card cannot be found.` });
}

function read(req, res, next) {
  const { card: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  const data = cardsService.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(cardExists), read],
};
