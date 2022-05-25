# to create migration or DDL scripts

knex migrate:make <egg_price_monthly>

# to create seeding or DML scripts

knex seed:make <states>

# to migrate / Run DDL

knex migrate:latest

# to migrate / Run DML

knex seed:run


# to execute test cases

npm run test


# Some sql joining

select cd.date,bc.city_name, cd.price 
from egg_price_daily cd, cities bc
where cd.city_id = bc.id
and date = '2022-01-03'
and bc.city_name = 'Bengaluru'; 


# to package

zip -FSrq egg-price-persistor-lambda.zip index.js db.js eggprice.js knexfile.js .env data/db-connection.js  node_modules

# trigger for cloud watch event bridge
30 1 * * ? *

# input to trigger lambda for specific date
{ "source": "daily.processor", "day": 24, "month": 12, "year": 2021  }