exports.up = knex =>
  knex.schema.createTable("cities", table => {
    table.increments().primary();
    table.text("city_name", 128).notNullable().unique();
  });

exports.down = knex => knex.schema.dropTableIfExists("cities");
