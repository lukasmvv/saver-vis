import React from 'react';
import classes from './Points.module.css';
import Point from './Point/Point';

const Points = (props) => {
    return (
        <div className={classes.Points}>
            {props.dataPoints.map((p,i) => <Point key={i} dataObject={p} deletePoint={props.deletePoint}></Point>)}
        </div>
    );
};

export default Points;