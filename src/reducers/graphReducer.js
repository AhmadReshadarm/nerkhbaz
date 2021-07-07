const graphReducer = (state = [], action) => {
  return { data: action.payload };
};

export default graphReducer;
