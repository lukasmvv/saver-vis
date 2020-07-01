import React, {Component} from 'react';
import classes from './BarChartMonth.module.css';
import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// Chart.plugins.unregister(ChartDataLabels);

class BarChartMonth extends Component {

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
                    // barThickness: 20,
                    // maxBarThickness: 8,
                    // minBarLength: 2,
                    data: nextProps.data,
                    backgroundColor: '#3e95cd'
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
          type: 'bar',          
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
                  text: 'Individual Deposits Over Time',
                  fontSize: 20
              },
              scales: {
                  yAxes: [{                    
                      display: true,
                      ticks: {
                            min: 0,
                            fontSize: 15
                      },
                      scaleLabel: {
                            display: false,
                            labelString: 'Deposit Amount (€)',
                            fontSize: 20
                      }
                  }],
                  xAxes: [{
                    offset: true,
                    distribution: 'series',
                    display: true,
                    type: 'time',
                    time: {
                        unit: 'month',
                        unitStepSize: 1,
                        displayFormats: {
                            'month': 'MMM YYYY'
                        }
                      },
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
            <div className={classes.BarChartMonth}>
                <canvas ref={this.chartRef}/>
            </div>
        );
    }    
};

export default BarChartMonth;