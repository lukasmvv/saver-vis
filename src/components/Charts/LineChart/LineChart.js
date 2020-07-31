import React, {Component} from 'react';
import classes from './LineChart.module.css';
import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// Chart.plugins.unregister(ChartDataLabels);

class LineChart extends Component {

    constructor(props) {
        super();
        this.chartRef = React.createRef();
    }    

    shouldComponentUpdate(nextProps, nextState) {
        
        if (JSON.stringify(nextProps.data)!==JSON.stringify(this.props.data)) {
            this.myChart.data = {
                labels: nextProps.labels,
                datasets: [{
                    // barPercentage: 0.5,
                    // barThickness: 6,
                    // maxBarThickness: 8,
                    // minBarLength: 2,
                    data: nextProps.data,
                    borderColor: '#3e95cd'
                }]
            };
            this.myChart.update();
            return true;
        }
        return false;
    }

    // creating chart after component mounts
    componentDidMount() {            
        this.myChart = new Chart(this.chartRef.current, {
        //   plugins: [ChartDataLabels],
          type: 'line',          
          data: {
            labels: this.props.labels,
            datasets: [{
                data: this.props.data                
            }]
        },
          options: {
              legend: {
                  display: false
              },
              title: {
                  display: false,
                  text: 'Total Savings Over Time',
                  fontSize: 20
              },
              scales: {
                  yAxes: [{
                      display: true,
                      ticks: {
                            min: 0,
                            fontSize: 15,
                            callback: function(value, index, values) {
                                return `€${value}`
                            }
                      },
                      scaleLabel: {
                            display: false,
                            labelString: 'Deposit Amount (€)',
                            fontSize: 20
                      }
                  }],
                  xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day',
                        unitStepSize: 1,
                        displayFormats: {
                            'month': 'DD MMM'
                        }
                      },
                      display: true,
                      ticks : {
                            fontSize: 15
                      },
                      scaleLabel: {
                            display: false,
                            labelString: 'Deposit Date',
                            fontSize: 20
                      }
                  }]
              }
          }
        });
    }

    render() {   
        return (
            <div className={classes.LineChart}>
                <canvas ref={this.chartRef} id={this.props.id}/>
            </div>
        );
    }    
};

export default LineChart;