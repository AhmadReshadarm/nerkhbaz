const intialState = {
  heroData: [],
  chartData: [],
  coinsData: [],
  isLoaded: false,
  error: null,
};

const heroDataReducer = (state = intialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoaded: false };
    case "LOADED":
      return {
        ...state,
        heroData: action.payloadHero,
        chartData: action.payloadChart,
        coinsData: action.payloadCoins,
        isLoaded: true,
        error: action.err,
      };
    default:
      return { ...state };
  }
};

export default heroDataReducer;
