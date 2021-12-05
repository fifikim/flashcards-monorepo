const router = require("express").Router({ mergeParams: true });
const controller = require("./decks.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:deckId([0-9]+)")
  .get(controller.read)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;
