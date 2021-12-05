const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
  return knex("decks").select("*");
}

// const addCategory = mapProperties({
//   category_id: "category.category_id",
//   category_name: "category.category_name",
//   category_description: "category.category_description",
// });

function read(deck_id) {
  return knex("decks as d")
    .join("cards_decks as cd", "d.deck_id", "cd.deck_id")
    .join("cards as c", "c.card_id", "cd.card_id")
    .select("d.*", "c.*")
    .where({ "d.deck_id": deck_id });
    // .first();
    // .then(addCategory);
}

// function listOutOfStockCount() {
//   return knex("products")
//     .select("product_quantity_in_stock as out_of_stock")
//     .count("product_id")
//     .where({ product_quantity_in_stock: 0 })
//     .groupBy("out_of_stock");
// }

// function listPriceSummary() {
//   return knex("products")
//     .select("supplier_id")
//     .min("product_price")
//     .max("product_price")
//     .avg("product_price")
//     .groupBy("supplier_id");
// }

// function listTotalWeightByProduct() {
//   return knex("products")
//     .select(
//       "product_sku",
//       "product_title",
//       knex.raw(
//         "sum(product_weight_in_lbs * product_quantity_in_stock) as total_weight_in_lbs"
//       )
//     )
//     .groupBy("product_title", "product_sku");
// }

module.exports = {
  list,
  read,
}