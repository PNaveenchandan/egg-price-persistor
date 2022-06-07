const cheerio = require("cheerio")
const rp = require("request-promise")

const getParams = (month, year) => {
  return {
  'method': 'POST',
  'url': 'https://www.e2necc.com/home/eggprice',
  'headers': {
  },
  'formData': {
    'ddlMonth': month,
    'ddlYear':  year,
    'rblReportType': 'DailyReport',
    'btnReport': 'Get+Sheet'
  }
}
};

const getParams2 = (month, year, reportType) => {
  return {
  'method': 'POST',
  'url': 'https://www.e2necc.com/home/eggprice',
  'headers': {
  },
  'formData': {
    'ddlMonth': month,
    'ddlYear':  year,
    'rblReportType': reportType,
    'btnReport': 'Get+Sheet'
  }
}
};
const getMonthlyAverage = async (month, year) => {
  let avgEggPrice = [];
  //#pan2 > table > tbody > tr:nth-child(3) > td:nth-child(30)
  const response = await rp(getParams2(month,year,"MonthlyReport"));

  const loadedhtml = cheerio.load(response);
  loadedhtml("#pan2 > table > tbody > tr").each((i, element) => {
    const loadedElement = cheerio.load(element);
    const cityName = loadedElement("td:nth-child(1)").text() || "";
    const price =
      loadedElement("td:nth-child(" + (month + 1) + ")").text() | "";
    avgEggPrice.push({ city: cityName, price: price });
  });
  console.log(JSON.stringify(avgEggPrice));
  return avgEggPrice.filter(
    (eggPriceObj) =>
      isNonZeroNumber(eggPriceObj.price) && eggPriceObj.city !== ""
  );
};

const getTodaysEggPrice = async (day,month,year) => {
  let todaysEggPrice = [];
  const response = await rp(getParams(month,year));

  const loadedhtml = cheerio.load(response);
  loadedhtml("#pan2 > table > tbody > tr").each((i, element) => {
    const loadedElement = cheerio.load(element);
    const cityName = loadedElement("td:nth-child(1)").text() || "";
    const price =
      loadedElement("td:nth-child(" + (day + 1) + ")").text() | "";
    todaysEggPrice.push({ city: cityName, price: price });
  });
  console.log(JSON.stringify(todaysEggPrice));
  return todaysEggPrice.filter(
    (eggPriceObj) =>
      isNonZeroNumber(eggPriceObj.price) && eggPriceObj.city !== ""
  );
};

const isNonZeroNumber = (number) => number !== 0 && !isNaN(number);

module.exports = {getMonthlyAverage, getTodaysEggPrice};