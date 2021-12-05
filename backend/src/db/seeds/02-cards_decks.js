const cardsDecks = require("../fixtures/cardsDecks");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE cards_decks RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("cards_decks").insert(cardsDecks);
    });
};
