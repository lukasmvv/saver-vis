import React from 'react';
import classes from './Charts.module.css';
import BarChart from './BarChart/BarChart';
import BarChartMonth from './BarChartMonth/BarChartMonth';
import LineChart from './LineChart/LineChart';
import LineChartMonth from './LineChartMonth/LineChartMonth';

const formatDate = (date) => {
    return String(date.getDate()).padStart(2, '0')+'/'+String(date.getMonth() + 1).padStart(2, '0')+'/'+date.getFullYear();
}

const Charts = (props) => {
    
    let barData = null;
    let lineData = null;
    let monthData = [];
    let lineMonthData = [];
    let monthLabels = null
    let labels = null;
    let formattedLabels = null;

    if (props.data) {
        barData = props.data.map(p => p.amount);
        lineData = barData.map((p,i) => {
            return barData.slice(0,i+1).reduce((a, b) => a + b, 0);         
        });
        formattedLabels = props.data.map(p => formatDate(p.date));
        labels = props.data.map(p => p.date);

        const firstDate = labels[0];
        const lastDate = labels[labels.length-1];

        const newDates = [];

        // saving months in new array
        labels.forEach((l,i) => {
            newDates.push(l);
        });
        
        // removing local duplicates
        monthLabels = newDates.filter((item, pos, arr) => {
            if (pos===0) {
                return item;
            } else if (item.getMonth()!==arr[pos-1].getMonth()) {
                return item;
            }
        });

        // adding all month totals
        monthLabels.forEach(el => {
            let monthTotal = 0;
            labels.forEach((l,i) => {
                if (el.getMonth()===l.getMonth()) {
                    monthTotal += barData[i];
                }
            });
            monthData.push(monthTotal);
        });
        console.log(monthLabels);
        console.log(monthData);
        for (var i=0;i<monthData.length;i++) {
            lineMonthData.push(monthData.slice(0,i+1).reduce((a, b) => a + b, 0));
        }

        //const monthlyLabels = newArr.map(ar => new Date());
    }    
    
    return (
        <div className={classes.Charts}>
            <BarChart data={barData} labels={formattedLabels}></BarChart>
            <LineChart data={lineData} labels={labels}></LineChart>
            <BarChartMonth data={monthData} labels={monthLabels}></BarChartMonth>
            <LineChartMonth data={lineMonthData} labels={monthLabels}></LineChartMonth>
        </div>
    );    
};

export default Charts;