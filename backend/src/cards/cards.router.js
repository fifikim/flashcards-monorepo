const router = require("express").Router({ mergeParams: true });
const controller = require("./cards.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:cardId")
  .get(controller.read)
  .all(methodNotAllowed);

router.route("/")
  .all(methodNotAllowed);

module.exports = router;
