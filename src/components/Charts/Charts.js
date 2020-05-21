import React from 'react';
import classes from './Charts.module.css';
import BarChart from './BarChart/BarChart';
import LineChart from './LineChart/LineChart';

const Charts = (props) => {
    
    let barData = null;
    let lineData = null;
    let labels = null;

    if (props.data) {
        barData = props.data.map(p => p.amount);
        lineData = barData.map((p,i) => {
            return barData.slice(0,i+1).reduce((a, b) => a + b, 0);         
        });
        labels = props.data.map(p => p.date);
    }    
    
    return (
        <div className={classes.Charts}>
            <BarChart data={barData} labels={labels}></BarChart>
            <LineChart data={lineData} labels={labels}></LineChart>
        </div>
    );    
};

export default Charts;