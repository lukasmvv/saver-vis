import React, {Component} from 'react';
import classes from './LineChartPredictor.module.css';
import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// Chart.plugins.unregister(ChartDataLabels);

class LineChartPredictor extends Component {

    constructor(props) {
        super();
        this.chartRef = React.createRef();
    }    

    shouldComponentUpdate(nextProps, nextState) {
        
        if (JSON.stringify(nextProps.oData)!==JSON.stringify(this.props.oData) || JSON.stringify(nextProps.pData)!==JSON.stringify(this.props.pData)) {
            this.myChart.data = {
                labels: nextProps.labels,
                datasets: [{
                    data: nextProps.oData,
                    borderColor: '#3e95cd',
                    pointRadius: 2
                },
                {
                    data: nextProps.pData,
                    borderColor: '#3e95cd',
                    borderDash: [10,5],
                    pointRadius: 5
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
                data: this.props.oData                
            },
            {
                data: this.props.pData            
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
                    offset: true,
                    distribution: 'series',
                    type: 'time',
                    time: {
                        unit: 'month',
                        unitStepSize: 1,
                        displayFormats: {
                            'month': 'MMM YYYY'
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
            <div className={classes.LineChartMonth}>
                <canvas ref={this.chartRef} id={this.props.id}/>
            </div>
        );
    }    
};

export default LineChartPredictor;