import axios from "axios";
import cheerio from "cheerio";
import { intialValueChart, intialValueTop } from "../intials";

export const fetchHero = (loaded, source) => async (dispatch) => {
  if (!loaded) {
    dispatch({ type: "LOADING" });
  }
  // online connecton
  // "https://powerful-earth-64232.herokuapp.com/api/v1"
  const fetchApi = await axios.get(
    "https://powerful-earth-64232.herokuapp.com/api/v1",
    { cancelToken: source.token }
  );
  const fetchCoins = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Ctether&order=market_cap_desc&per_page=3&page=1&sparkline=true",
    { cancelToken: source.token }
  );

  axios
    .all([fetchApi, fetchCoins])
    .then(
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
    )
    .catch((err) => {
      if (axios.isCancel(err)) {
      }
      dispatch({
        type: "ERROR",
        payload: err,
      });
    });
};
