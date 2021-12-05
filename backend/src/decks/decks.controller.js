const decksService = require("./decks.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// middleware
async function deckExists(req, res, next) {
  const deck = await decksService.read(req.params.deckId);
  if (deck) {
    res.locals.deck = deck;
    return next();
  }
  next({ status: 404, message: `Deck cannot be found.` });
}

function read(req, res, next) {
  const { deck: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  const data = await decksService.list();
  res.json({ data });
}

// async function listOutOfStockCount(req, res) {
//   res.json({ data: await productsService.listOutOfStockCount() });
// }

// async function listPriceSummary(req, res) {
//   res.json({ data: await productsService.listPriceSummary() });
// }

// async function listTotalWeightByProduct(req, res) {
//   res.json({ data: await productsService.listTotalWeightByProduct() });
// }

module.exports = {
  read: [asyncErrorBoundary(deckExists), read],
  list: asyncErrorBoundary(list),
  // listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  // listPriceSummary: asyncErrorBoundary(listPriceSummary),
  // listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),
};
