const knex = require("../db/connection");

function list() {
  return knex("cards").select("*");
}

function read(card_id) {
  return knex("decks as d")
    .join("cards_decks as cd", "d.deck_id", "cd.deck_id")
    .join("cards as c", "c.card_id", "cd.card_id")
    .select("d.*", "c.*")
    .where({ "c.card_id": card_id });
    // .first();
    // .then(addCategory);
}

module.exports = {
  list,
  read,
};