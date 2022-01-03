const getTodaysEggPrice = require("./eggprice");
const persistEggPriceOfDay = require("./db");

const date = new Date();
const timeZone = "Asia/Kolkata";
const dayOfMonth = Number(
  new Intl.DateTimeFormat("en", { day: "2-digit", timeZone }).format(date)
);
const monthOfYear = Number(
  new Intl.DateTimeFormat("en", { month: "2-digit", timeZone }).format(date)
);
const year = Number(
  new Intl.DateTimeFormat("en", { year: 'numeric' , timeZone }).format(date)
);

exports.handler = async (event) => {
  console.log(`received an event ${JSON.stringify(event)}`)
  let eggPrices;
  let date;
  if(event.source && event.source === 'daily.processor'){
    console.log("calling daily processor")
    eggPrices = await getTodaysEggPrice(event.day,event.month,event.year);
    date = `${event.month}/${event.day}/${event.year}`;
  }else{
    eggPrices = await getTodaysEggPrice(dayOfMonth,monthOfYear,year);
    date = `${monthOfYear}/${dayOfMonth}/${year}`
  }
  console.log(JSON.stringify(eggPrices));
  await persistEggPriceOfDay(date,eggPrices);
  return { statusCode: 200, statusText: "Success" };

};