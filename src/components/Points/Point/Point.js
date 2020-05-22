import React from 'react';
import classes from './Point.module.css';

const formatDate = (date) => {
    return String(date.getDate()).padStart(2, '0')+'/'+String(date.getMonth() + 1).padStart(2, '0')+'/'+date.getFullYear();
}

const Point = (props) => {
    return (
        <div className={classes.Point}>
            <div className={classes.Text}>
                <p className={classes.Date}>{formatDate(props.dataObject.date)}</p>
                <p className={classes.Description}>{props.dataObject.description}</p>
                <p className={classes.Amount}>€{props.dataObject.amount}</p>
            </div>
            <div classes={classes.Button}>
                <p className={classes.Delete} onClick={() => props.deletePoint(props.dataObject.id)}>X</p>
            </div>
        </div>
    );
};

export default Point;