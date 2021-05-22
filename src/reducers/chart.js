const intialState = {
  heroData: [],
  chartData: [],
  isLoaded: false,
  error: null,
};

const chartDataReducer = (state = intialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoaded: false };
    case "LOADED":
      return {
        ...state,
        heroData: action.payloadHero,
        chartData: action.payloadChart,
        isLoaded: true,
        error: action.err,
      };
    default:
      return { ...state };
  }
};

export default chartDataReducer;
