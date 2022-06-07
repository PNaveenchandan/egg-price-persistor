exports.up = knex =>
  knex.schema.createTable('knowledge_base', table => {
    table.increments('id').primary()
    table.text('intent').notNullable()
    table.text('entity').notNullable()
    table.text('answer').notNullable()
    table.unique(['intent','entity'],{indexName:'intent_entity_composite_index'})
  });

exports.down = knex => knex.schema.dropTableIfExists('knowledge_base');
