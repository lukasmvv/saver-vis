import React from 'react';
import classes from './Charts.module.css';
import BarChart from './BarChart/BarChart';

const Charts = (props) => {
    
    let barData = null;
    let labels = null;

    if (props.data) {
        barData = props.data.map(p => p.amount);
        labels = props.data.map(p => p.date);
    }    
    
    return (
        <div className={classes.Charts}>
            <BarChart data={barData} labels={labels}></BarChart>
        </div>
    );    
};

export default Charts;