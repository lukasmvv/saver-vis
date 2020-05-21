import React from 'react';
import classes from './Charts.module.css';
import BarChart from './BarChart/BarChart';
import LineChart from './LineChart/LineChart';

const formatDate = (date) => {
    return String(date.getDate()).padStart(2, '0')+'/'+String(date.getMonth() + 1).padStart(2, '0')+'/'+date.getFullYear();
}

const Charts = (props) => {
    
    let barData = null;
    let lineData = null;
    let labels = null;
    let formattedLabels = null;

    if (props.data) {
        barData = props.data.map(p => p.amount);
        lineData = barData.map((p,i) => {
            return barData.slice(0,i+1).reduce((a, b) => a + b, 0);         
        });
        formattedLabels = props.data.map(p => formatDate(p.date));
        labels = props.data.map(p => p.date);
    }    
    
    return (
        <div className={classes.Charts}>
            <BarChart data={barData} labels={formattedLabels}></BarChart>
            <LineChart data={lineData} labels={labels}></LineChart>
        </div>
    );    
};

export default Charts;