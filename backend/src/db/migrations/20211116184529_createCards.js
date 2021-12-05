
exports.up = function(knex) {
  return knex.schema.createTable("cards", (table) => {
    table.increments("card_id").primary();
    table.string("front");
    table.string("back");
    table.integer("deck_id").unsigned().notNullable();
    table
      .foreign("deck_id")
      .references("deck_id")
      .inTable("decks")
      .onDelete("cascade");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("cards");
};
