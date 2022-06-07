const eggPrice = require("./eggprice");
//import { getTodaysEggPrice, getTodaysEggPrice } from "./eggprice";
const db = require("./db");

const date = new Date();
const timeZone = "Asia/Kolkata";
const dayOfMonth = Number(
  new Intl.DateTimeFormat("en", { day: "2-digit", timeZone }).format(date)
);
const monthOfYear = Number(
  new Intl.DateTimeFormat("en", { month: "2-digit", timeZone }).format(date)
);
const year = Number(
  new Intl.DateTimeFormat("en", { year: "numeric", timeZone }).format(date)
);

exports.handler = async (event) => {
  console.log(`received an event ${JSON.stringify(event)}`);
  if (event.source && event.source === "daily.processor") {
    console.log("calling daily processor");
    const eggPrices = await eggPrice.getTodaysEggPrice(
      event.day,
      event.month,
      event.year
    );
    const date = `${event.month}/${event.day}/${event.year}`;
    await db.persistEggPriceOfDay(date, eggPrices);
  } else if (event.source && event.source === "entiremonth.processor") {
    console.log("calling monthly bulk processor");
    for (let day = event.day; day < 30; day++) {
      const eggPrices = await eggPrice.getTodaysEggPrice(
        day,
        event.month,
        event.year
      );
      const date = `${event.month}/${day}/${event.year}`;
      await db.persistEggPriceOfDay(date, eggPrices);
    }
  } else if (event.source && event.source === "monthly.processor") {
    console.log("calling average processor");
    const avgPrices = await eggPrice.getMonthlyAverage(event.month, event.year);
    const date = `${event.month}/1/${event.year}`;
    await db.persistEggPriceOfMonth(date, avgPrices);
  } else {
    console.log("by cloud watch");
    const eggPrices = await eggPrice.getTodaysEggPrice(
      dayOfMonth,
      monthOfYear,
      year
    );
    const date = `${monthOfYear}/${dayOfMonth}/${year}`;
    await db.persistEggPriceOfDay(date, eggPrices);
    const avgPrices = await eggPrice.getMonthlyAverage(monthOfYear,year);
    await db.persistEggPriceOfMonth(`${monthOfYear}/1/${year}`,avgPrices);
  }
  return { statusCode: 200, statusText: "Success" };
};
