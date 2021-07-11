//  constants

let DATA_COUNT = [];
let labels = [];
let allDatapoints = [];
let datapoints = [];
let j = 0;

//  helper function
function _case(dataSets, dataSetsType, sliceAmount, indexIncreaser) {
  allDatapoints = [];
  datapoints = [];
  for (let i = 0; i < dataSets.length; i = i + indexIncreaser) {
    if (dataSetsType === "Sell") {
      allDatapoints.push(dataSets[i].sellId);
    } else {
      allDatapoints.push(dataSets[i].buyId);
    }
  }

  datapoints = allDatapoints.slice(-25).reverse();
  labels = DATA_COUNT;

  const data = (canvas) => {
    let gradientColor = canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 200);
    gradientColor.addColorStop(0.3, "#FF2270");
    gradientColor.addColorStop(1, "#9787FF");
    return {
      labels: labels,
      datasets: [
        {
          label: dataSets[0]
            ? `${dataSets[0].name} Price graph in (Toman)`
            : `Please select data set type first to show graph data`,
          data: datapoints,
          fill: true,
          backgroundColor: gradientColor,
          cubicInterpolationMode: "monotone",
          borderColor: "transparent",
          pointBackgroundColor: "transparent",
          pointBorderColor: "#FFFFFF",
          lineTension: 0.4,
        },
      ],
    };
  };
  return data;
}

export const graphConfig =
  (intialValue, evtValue, evtInput, dataSets) => (dispatch) => {
    if (evtInput === "period") {
      switch (evtValue) {
        case "24":
          j = 1;
          DATA_COUNT = [];
          for (let i = 0; i < 24; i++) {
            if (i === 0) {
              DATA_COUNT[0] = "now";
            }
            DATA_COUNT.push(`Past ${j}hr`);
            j++;
          }

          return dispatch({
            type: intialValue.dataSetType,
            payload: _case(dataSets, intialValue.dataSetType, 25, 1),
          });

        case "week":
          j = 1;
          DATA_COUNT = [];
          for (let i = 0; i < 7; i++) {
            if (i === 0) {
              DATA_COUNT[0] = "Today";
            }
            DATA_COUNT.push(`past ${j} days`);
            j++;
          }

          return dispatch({
            type: intialValue.dataSetType,
            payload: _case(dataSets, intialValue.dataSetType, 8, 24),
          });

        case "1_month":
          j = 1;
          DATA_COUNT = [];
          for (let i = 0; i < 30; i++) {
            if (i === 0) {
              DATA_COUNT[0] = "Today";
            }
            DATA_COUNT.push(`past ${j} days`);
            j++;
          }

          return dispatch({
            type: intialValue.dataSetType,
            payload: _case(dataSets, intialValue.dataSetType, 31, 24),
          });
        case "6_month":
          j = 1;
          DATA_COUNT = [];
          for (let i = 0; i < 180; i++) {
            if (i === 0) {
              DATA_COUNT[0] = "Today";
            }
            DATA_COUNT.push(`past ${j} days`);
            j++;
          }

          return dispatch({
            type: intialValue.dataSetType,
            payload: _case(dataSets, intialValue.dataSetType, 181, 24),
          });
        case "year":
          j = 1;
          DATA_COUNT = [];
          for (let i = 0; i < 360; i++) {
            if (i === 0) {
              DATA_COUNT[0] = "Today";
            }
            DATA_COUNT.push(`past ${j} days`);
            j++;
          }

          return dispatch({
            type: intialValue.dataSetType,
            payload: _case(dataSets, intialValue.dataSetType, 361, 24),
          });

        default:
          j = 1;
          DATA_COUNT = [];
          for (let i = 0; i < 24; i++) {
            if (i === 0) {
              DATA_COUNT[0] = "now";
            }
            DATA_COUNT.push(`Past ${j}hr`);
            j++;
          }

          return dispatch({
            type: intialValue.dataSetType,
            payload: _case(dataSets, intialValue.dataSetType, 25, 1),
          });
      }
    }

    switch (intialValue.period) {
      case "24":
        j = 1;
        DATA_COUNT = [];
        for (let i = 0; i < 24; i++) {
          if (i === 0) {
            DATA_COUNT[0] = "now";
          }
          DATA_COUNT.push(`Past ${j}hr`);
          j++;
        }

        return dispatch({
          type: intialValue.dataSetType,
          payload: _case(dataSets, evtValue, 25, 1),
        });

      case "week":
        j = 1;
        DATA_COUNT = [];
        for (let i = 0; i < 7; i++) {
          if (i === 0) {
            DATA_COUNT[0] = "Today";
          }
          DATA_COUNT.push(`past ${j} days`);
          j++;
        }

        return dispatch({
          type: intialValue.dataSetType,
          payload: _case(dataSets, evtValue, 8, 24),
        });

      case "1_month":
        j = 1;
        DATA_COUNT = [];
        for (let i = 0; i < 30; i++) {
          if (i === 0) {
            DATA_COUNT[0] = "Today";
          }
          DATA_COUNT.push(`past ${j} days`);
          j++;
        }

        return dispatch({
          type: intialValue.dataSetType,
          payload: _case(dataSets, evtValue, 31, 24),
        });
      case "6_month":
        j = 1;
        DATA_COUNT = [];
        for (let i = 0; i < 180; i++) {
          if (i === 0) {
            DATA_COUNT[0] = "Today";
          }
          DATA_COUNT.push(`past ${j} days`);
          j++;
        }

        return dispatch({
          type: intialValue.dataSetType,
          payload: _case(dataSets, evtValue, 181, 24),
        });
      case "year":
        j = 1;
        DATA_COUNT = [];
        for (let i = 0; i < 360; i++) {
          if (i === 0) {
            DATA_COUNT[0] = "Today";
          }
          DATA_COUNT.push(`past ${j} days`);
          j++;
        }

        return dispatch({
          type: intialValue.dataSetType,
          payload: _case(dataSets, evtValue, 361, 24),
        });

      default:
        j = 1;
        DATA_COUNT = [];
        for (let i = 0; i < 24; i++) {
          if (i === 0) {
            DATA_COUNT[0] = "now";
          }
          DATA_COUNT.push(`Past ${j}hr`);
          j++;
        }

        return dispatch({
          type: intialValue.dataSetType,
          payload: _case(dataSets, "Sell", 25, 1),
        });
    }
  };
