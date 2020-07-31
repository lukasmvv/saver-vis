import React from 'react';
import classes from './Charts.module.css';
import BarChart from './BarChart/BarChart';
import BarChartMonth from './BarChartMonth/BarChartMonth';
import LineChart from './LineChart/LineChart';
import LineChartMonth from './LineChartMonth/LineChartMonth';
import LineChartPredictor from './LineChartPredictor/LineChartPredictor';
import * as ids from '../../utils/ids';

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
    let predictorData = null;
    let predictorLabels = null;

    if (props.data) {
        barData = props.data.map(p => p.amount);
        lineData = barData.map((p,i) => {
            return barData.slice(0,i+1).reduce((a, b) => a + b, 0);         
        });
        formattedLabels = props.data.map(p => formatDate(p.date));
        labels = props.data.map(p => p.date);

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
            } else {
                return false;
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

        for (var i=0;i<monthData.length;i++) {
            lineMonthData.push(monthData.slice(0,i+1).reduce((a, b) => a + b, 0));
        }


        // adding predictions
        predictorLabels = [...monthLabels];
        predictorData = lineMonthData.map(l => null);
        predictorData.pop();
        predictorData.push(lineMonthData[lineMonthData.length-1]);
        for (var y=0;y<6;y++) {
            const currentDate = new Date(predictorLabels[predictorLabels.length-1]);
            const newDate = new Date(currentDate.setMonth(currentDate.getMonth()+1));
            predictorLabels.push(newDate);
            
            const newVal = predictorData[predictorData.length - 1];
            predictorData.push(newVal + props.averagePerDay*30);
        }
    }    
    
    return (
        <div className={classes.Charts} id={ids.MORTAGE_CHARTS}>
            <h1>Individual Contributions</h1>
            <div className={classes.Chart}>
                <BarChart data={barData} labels={formattedLabels} id={ids.DEPOSITS_BAR}></BarChart>
            </div>
            <div className={classes.Chart}>
                <LineChart data={lineData} labels={labels} id={ids.DEPOSITS_LINE}></LineChart>
            </div>
            <h1>Monthly Contributions</h1>
            <div className={classes.Chart}>
                <BarChartMonth data={monthData} labels={monthLabels} id={ids.MONTHLY_BAR}></BarChartMonth>
            </div>
            <div className={classes.Chart}>
                <LineChartMonth data={lineMonthData} labels={monthLabels} id={ids.MONTHLY_LINE}></LineChartMonth>
            </div>
            <h1>Savings Forecast</h1>
            <div className={classes.Chart}>
                <LineChartPredictor oData={lineMonthData} pData={predictorData} labels={predictorLabels} id={ids.MONTHLY_PREDICT}></LineChartPredictor>
            </div>
        </div>
    );    
};

export default Charts;