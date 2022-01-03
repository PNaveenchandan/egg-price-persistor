"use strict";
const knex = require("./data/db-connection");

const getCityIdByName = async (cityName) => {
  const transformedCityName = cityName.split(' ')[0];
  const response = await knex
    .select("id")
    .from("cities")
    .where("city_name", transformedCityName);
  if (response && response[0]) {
    return response[0].id;
  } else {
    return -1;
  }
};

const persistEggPriceOfDay = async (date, daysEggPrices) => {
  console.log("persisting for the date "+date)
  for (let daysEggPrice of daysEggPrices) {
    const cityId = await getCityIdByName(daysEggPrice.city);
    try {
      await knex("egg_price_daily")
        .insert({ date: date, price: daysEggPrice.price, city_id: cityId })
        .onConflict(['date','city_id'])
        .merge();
    } catch (err) {
      console.error(`failed to persist egg price for the date ${toDate}`);
      console.error(err);
    }
  }
};

module.exports = persistEggPriceOfDay;

// return knex().raw(
//     knex(tableName).insert(data).toQuery() + ' ON CONFLICT ("id") DO UPDATE SET ' +
//       Object.keys(firstData).map((field) => `${field}=EXCLUDED.${field}`).join(', ')
//   );

// persistEggPriceOfDay({'city':'Bangalore CC','price':450});
