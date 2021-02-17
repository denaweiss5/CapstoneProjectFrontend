import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const LineGraph = (props) => {
//   const [chartData, setChartData] = useState({});

//   let userW;
//   let userD;
//   const chart = () => {
//     userW = props.weightEntries.map((entry) => {
//       console.log(entry);
//       return parseInt(entry.weight);
//     });
//     userD = props.weightEntries.map((entry) => {
//       const year = entry.date.replace("-", "").replace("-", "").slice(0, 4);
//       const month = entry.date.replace("-", "").replace("-", "").slice(4, 6);
//       const day = entry.date.replace("-", "").replace("-", "").slice(6, 8);
//       return `${month}/${day}/${year}`;
//     });
//   };

//   useEffect(() => {
//     chart();

    const chartData = {
      labels: props.userD,
      datasets: [
        {
          label: "My Weight Journey",
          data: props.userW,
          fill: false,
          borderColor: "rgb(47, 47, 209)",
          borderCapStyle: "butt",
          borderJoinStyle: "miter",
          pointBorderColor: "black",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "purple",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 10,
          borderWidth: 4,
        },
      ],
    };

//   }, []);

  return (
    <div className="App">
      <div style={{ width: "100%", height: "100%", }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "My Weight Journey", display: false },
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Weight (lbs)",
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20,
                    beginAtZero: false,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default LineGraph;
