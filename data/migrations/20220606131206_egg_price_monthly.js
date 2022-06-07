exports.up = knex =>
  knex.schema.createTable('egg_price_monthly', table => {
    table.increments('id').primary();
    table.date('date')
    table.decimal('price').notNullable()
    table.integer('city_id').notNullable()
    table.foreign('city_id').references('id').inTable('cities')
    table.unique(['date','city_id'],{indexName:'date_city_id_composite_index2'})
  });

exports.down = knex => knex.schema.dropTableIfExists('egg_price_monthly');