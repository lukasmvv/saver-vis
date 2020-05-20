import React, {Component} from 'react';
import classes from './BarChart.module.css';
import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// Chart.plugins.unregister(ChartDataLabels);

class BarChart extends Component {

    constructor(props) {
        super();
        
        this.chartRef = React.createRef();

        this.state = {
            data: null,
            labels: null,
            options: null
        }
    }    

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data!==prevState.data) {
            return {
                data: nextProps.data,
                labels: nextProps.labels,
                options: null
            }
        }
        return prevState;
    }

    // updating chart
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps);
        this.myChart.data = {
            labels: nextProps.labels,
            datasets: [{
                // barPercentage: 0.5,
                // barThickness: 6,
                // maxBarThickness: 8,
                // minBarLength: 2,
                data: nextProps.data
            }]
        };
        this.myChart.update();
        //console.log(this.myChart);
        return true;
    }

    // creating chart after component mounts
    componentDidMount() {            
        this.myChart = new Chart(this.chartRef.current, {
        //   plugins: [ChartDataLabels],
          type: 'bar',          
          data: {
            labels: this.state.labels,
            datasets: [{
                // barPercentage: 0.5,
                // barThickness: 6,
                // maxBarThickness: 8,
                // minBarLength: 2,
                data: this.state.data
            }]
        },
          options: this.state.options
        });
    }

    render() {   
        return (
            <div className={classes.BarChart}>
                <canvas ref={this.chartRef}/>
            </div>
        );
    }    
};

export default BarChart;