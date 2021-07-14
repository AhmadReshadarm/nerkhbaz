// setup

export const DATA_COUNT = [
  "Today",
  "2 Days ago",
  "3 Days ago",
  "4 Days ago",
  "5 Days ago",
  "6 Days ago",
  "7 Days ago",
];

const labels = [];

for (let i = DATA_COUNT.length - 1; i >= 0; i--) {
  labels.push(DATA_COUNT[i]);
}

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
        label: "Price in (Toman)",
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

// config
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "All prices are in Iranian (Toman)",
    },
    scaleShowGridLines: false,
  },
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Price",
      },
    },
  },
};
