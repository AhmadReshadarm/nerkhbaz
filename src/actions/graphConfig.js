//  constants

let DATA_COUNT = [];
let labels = [];
let allDatapoints = [];
let datapoints = [];
let j = 0;

//  helper function
function _case(dataSets, dataSetsType, sliceAmount, indexIncreaser) {
  for (let i = 0; i < dataSets.length; i = i + indexIncreaser) {
    if (dataSetsType === "sell") {
      allDatapoints.push(dataSets[i].sellId);
    } else {
      allDatapoints.push(dataSets[i].buyId);
    }
  }
  console.log(dataSets[0]);

  datapoints = allDatapoints.slice(-sliceAmount);
  labels = DATA_COUNT;

  const data = (canvas) => {
    let gradientColor = canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 200);
    gradientColor.addColorStop(0.5, "#FF2270");
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
          j = 24;
          DATA_COUNT = [];
          for (let i = 0; i < 24; i++) {
            DATA_COUNT.push(`Past ${j}hr`);
            j--;
          }

          DATA_COUNT.push("Now");

          return dispatch({
            type: intialValue.dataSetType,
            payload: _case(dataSets, intialValue.dataSetType, 25, 1),
          });

        case "week":
          j = 7;
          DATA_COUNT = [];
          for (let i = 0; i < 7; i++) {
            DATA_COUNT.push(`past ${j} days`);
            j--;
          }
          DATA_COUNT.push("Today");

          return dispatch({
            type: intialValue.dataSetType,
            payload: _case(dataSets, intialValue.dataSetType, 8, 24),
          });

        case "1_month":
          j = 30;
          DATA_COUNT = [];
          for (let i = 0; i < 30; i++) {
            DATA_COUNT.push(`past ${j} days`);
            j--;
          }
          DATA_COUNT.push("Today");

          return dispatch({
            type: intialValue.dataSetType,
            payload: _case(dataSets, intialValue.dataSetType, 31, 24),
          });

        default:
          j = 24;
          DATA_COUNT = [];
          for (let i = 0; i < 24; i++) {
            DATA_COUNT.push(`Past ${j}hr`);
            j--;
          }

          DATA_COUNT.push("Now");

          return dispatch({
            type: intialValue.dataSetType,
            payload: _case(dataSets, intialValue.dataSetType, 25, 1),
          });
      }
    }

    switch (intialValue.period) {
      case "24":
        j = 24;
        DATA_COUNT = [];
        for (let i = 0; i < 24; i++) {
          DATA_COUNT.push(`Past ${j}hr`);
          j--;
        }

        DATA_COUNT.push("Now");

        return dispatch({
          type: intialValue.dataSetType,
          payload: _case(dataSets, evtValue, 25, 1),
        });

      case "week":
        j = 7;
        DATA_COUNT = [];
        for (let i = 0; i < 7; i++) {
          DATA_COUNT.push(`past ${j} days`);
          j--;
        }
        DATA_COUNT.push("Today");

        return dispatch({
          type: intialValue.dataSetType,
          payload: _case(dataSets, evtValue, 8, 24),
        });

      case "1_month":
        j = 30;
        DATA_COUNT = [];
        for (let i = 0; i < 30; i++) {
          DATA_COUNT.push(`past ${j} days`);
          j--;
        }
        DATA_COUNT.push("Today");

        return dispatch({
          type: intialValue.dataSetType,
          payload: _case(dataSets, evtValue, 31, 24),
        });

      default:
        j = 24;
        DATA_COUNT = [];
        for (let i = 0; i < 24; i++) {
          DATA_COUNT.push(`Past ${j}hr`);
          j--;
        }

        DATA_COUNT.push("Now");

        return dispatch({
          type: intialValue.dataSetType,
          payload: _case(dataSets, "sell", 25, 1),
        });
    }
  };
