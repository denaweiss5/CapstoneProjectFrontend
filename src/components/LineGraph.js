
import React, { useState, useEffect } from "react";
import {Line} from 'react-chartjs-2'
import { connect } from 'react-redux'
import weightEntries from "../reducers/weightEntries";

const LineGraph = (props) => {
  const [chartData, setChartData] = useState({});
  const chart = () => {


    let userW = props.weightEntries.map(entry => {
        return parseInt(entry.weight)
    })
    let userD = props.weightEntries.map(entry => {
        const year = entry.date.replace('-','').replace('-','').slice(0,4)
        const month = entry.date.replace('-','').replace('-','').slice(4,6)
        const day = entry.date.replace('-','').replace('-','').slice(6,8)
        return `${month}/${day}/${year}`
        
    })




        setChartData({
          labels: userD,
          datasets: [
            {
              label: "My Weight Journey",
              data: userW,
              fill: false,
              lineTension: 0.1,
              borderColor: 'rgb(47, 47, 209)',
              borderCapStyle: 'butt',
              borderJoinStyle: 'miter',
              pointBorderColor: 'black',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 3,
              pointHoverBackgroundColor: 'purple',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 6,
              pointHitRadius: 10,
              borderWidth: 4
            }
          ]
        });
      }
      

  useEffect(() => {
    chart();
  }, []);
  return (
      
    <div className="App">
      <div style={{width: '100%', height: '100%'}}>
        <Line
          data={chartData}
          options={{
              responsive: true,
              title: {text: 'My Weight Journey', display: false},
              scales: {
                  yAxes: [
                      {
                        scaleLabel: {
                            display: true,
                            labelString: 'Weight (lbs)'
                          },
                          ticks: {
                              autoSkip: true,
                              maxTicksLimit: 10,
                              beginAtZero: true
                          },
                          gridLines: {
                              display: false
                          }
                      }
                  ],
                  xAxes: [
                      {
                      
                          gridLines: {
                              display: false
                          }
                      }
                  ]
              }
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
    return{
    weightEntries: state.weightEntries
    }
}
export default connect(mapStateToProps)(LineGraph)
