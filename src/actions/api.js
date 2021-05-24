import axios from "axios";
import cheerio from "cheerio";

export const fetchHero = () => async (dispatch) => {
  const intialValueTop = [
    { id: "#ounce_top", name: "Gold", sub: "Ounce", unit: "$" },
    { id: "#gol18_top", name: "Gold", sub: "Gram", unit: "Toman" },
    { id: "#mithqal_top", name: "Gold", sub: "Mithqal", unit: "Toman" },
    { id: "#emami1_top", name: "Coin", sub: "Emami", unit: "Toman" },
    { id: "#eur1_top", name: "Euro", sub: "/IRR", unit: "Toman" },
    { id: "#usd1_top", name: "US Dollar", sub: "/IRR", unit: "Toman" },
  ];

  const intialValueChart = [
    {
      code: "USD",
      name: "US Dollar",
      flagUrl: "usa.png",
      sellId: "usd2",
      buyId: "usd1",
    },
    {
      code: "EUR",
      name: "Euro",
      flagUrl: "euro.png",
      sellId: "eur2",
      buyId: "eur1",
    },
    {
      code: "GBP",
      name: "British Pound",
      flagUrl: "uk.png",
      sellId: "gbp2",
      buyId: "gbp1",
    },
    {
      code: "RUB",
      name: "Russian Ruble",
      flagUrl: "russia.png",
      sellId: "rub2",
      buyId: "rub1",
    },
    {
      code: "TRY",
      name: "Turkish Lira",
      flagUrl: "turkey.png",
      sellId: "try2",
      buyId: "try1",
    },
    {
      code: "CNY",
      name: "Chinese Yuan",
      flagUrl: "china.png",
      sellId: "cny2",
      buyId: "cny1",
    },
    {
      code: "AED",
      name: "UAE Dirham",
      flagUrl: "uae.png",
      sellId: "aed1",
      buyId: "aed2",
    },
    {
      code: "CHF",
      name: "Swiss Franc",
      flagUrl: "swiss.png",
      sellId: "chf2",
      buyId: "chf1",
    },
    {
      code: "CAD",
      name: "Canadian Dollar",
      flagUrl: "canada.png",
      sellId: "cad2",
      buyId: "cad1",
    },
    {
      code: "AUD",
      name: "Australian Dollar",
      flagUrl: "australia.png",
      sellId: "aud2",
      buyId: "aud1",
    },
    {
      code: "SEK",
      name: "Swedish Krona",
      flagUrl: "korona.png",
      sellId: "sek2",
      buyId: "sek1",
    },
    {
      code: "NOK",
      name: "Norwegian Krone",
      flagUrl: "norway.png",
      sellId: "nok2",
      buyId: "nok1",
    },

    {
      code: "THB",
      name: "Thai Baht",
      flagUrl: "thai.jpg",
      sellId: "thb2",
      buyId: "thb1",
    },
    {
      code: "SGD",
      name: "Singapor Dollar",
      flagUrl: "singapore.png",
      sellId: "sgd2",
      buyId: "sgd1",
    },
    {
      code: "HKD",
      name: "Hong Kong Dollar",
      flagUrl: "hong-kong.png",
      sellId: "hkd2",
      buyId: "hkd1",
    },
    {
      code: "AZN",
      name: "Azerbaijani Manat",
      flagUrl: "azerbaijan.png",
      sellId: "azn2",
      buyId: "azn1",
    },
    {
      code: "AMD",
      name: "Armenian Dram",
      flagUrl: "armenia.png",
      sellId: "amd2",
      buyId: "amd1",
    },
    {
      code: "AFG",
      name: "Afghanistan Afghani",
      flagUrl: "afghanistan.png",
      sellId: "afn2",
      buyId: "afn1",
    },
    {
      code: "DKK",
      name: "Danish Krone",
      flagUrl: "denmark.png",
      sellId: "dkk2",
      buyId: "dkk1",
    },
    {
      code: "JPY",
      name: "Japanese Yen",
      flagUrl: "japan.png",
      sellId: "jpy2",
      buyId: "jpy1",
    },
    {
      code: "SAR",
      name: "KSA Riyal",
      flagUrl: "saudi.png",
      sellId: "sar2",
      buyId: "sar1",
    },
    {
      code: "INR",
      name: "Indian Rupee",
      flagUrl: "india.png",
      sellId: "inr2",
      buyId: "inr1",
    },
    {
      code: "MYR",
      name: "Ringgit",
      flagUrl: "malasya.png",
      sellId: "myr2",
      buyId: "myr1",
    },
    {
      code: "KWD",
      name: "Kuwaiti Dinar",
      flagUrl: "kuwait.png",
      sellId: "kwd2",
      buyId: "kwd1",
    },
    {
      code: "IQD",
      name: "Iraqi Dinar",
      flagUrl: "iraq.png",
      sellId: "iqd2",
      buyId: "iqd1",
    },
    {
      code: "BHD",
      name: "Bahraini Dinar",
      flagUrl: "bahrain.png",
      sellId: "bhd2",
      buyId: "bhd1",
    },
    {
      code: "OMR",
      name: "Omani Rial",
      flagUrl: "oman.png",
      sellId: "omr2",
      buyId: "omr1",
    },
    {
      code: "QAR",
      name: "Qatari Riyal",
      flagUrl: "qatar.png",
      sellId: "qar2",
      buyId: "qar1",
    },
  ];

  dispatch({ type: "LOADING" });
  const fetchHtml = await axios.get(
    "https://powerful-earth-64232.herokuapp.com/api/v1"
  );
  const fetchCoins = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Ctether&order=market_cap_desc&per_page=3&page=1&sparkline=true"
  );

  axios.all([fetchHtml, fetchCoins]).then(
    axios.spread((...responses) => {
      let $ = cheerio.load(responses[0].data);

      const allHeroData = [];
      const chartData = [];
      intialValueTop.forEach((item) => {
        allHeroData.push({
          value: $(item.id).text(),
          name: item.name,
          sub: item.sub,
          unit: item.unit,
        });
      });

      intialValueChart.forEach((item) => {
        chartData.push({
          code: item.code,
          name: item.name,
          flagUrl: item.flagUrl,
          sellId: $("#" + item.sellId).text(),
          buyId: $("#" + item.buyId).text(),
        });
      });

      return dispatch({
        type: "LOADED",
        payloadHero: allHeroData,
        payloadChart: chartData,
        payloadCoins: responses[1].data,
      });
    })
  );

  //   await axios
  //     .get("http://localhost:3000/api/v1")
  //     .then((response) => {
  //       let $ = cheerio.load(response.data);
  //       const allHeroData = [];
  //       const chartData = [];
  //       intialValueTop.forEach((item) => {
  //         allHeroData.push({
  //           value: $(item.id).text(),
  //           name: item.name,
  //           sub: item.sub,
  //           unit: item.unit,
  //         });
  //       });

  //       intialValueChart.forEach((item) => {
  //         chartData.push({
  //           code: item.code,
  //           name: item.name,
  //           flagUrl: item.flagUrl,
  //           sellId: $("#" + item.sellId).text(),
  //           buyId: $("#" + item.buyId).text(),
  //         });
  //       });

  //       return dispatch({
  //         type: "LOADED",
  //         payloadHero: allHeroData,
  //         payloadChart: chartData,
  //       });
  //     })
  //     .catch((err) => dispatch({ err: err }));
};
