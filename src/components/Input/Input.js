import React, {Component} from 'react';
import classes from './Input.module.css';

class Input extends Component {
    constructor(props) {
        super();
        
        const today = new Date();
        const todayFormatted = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
        
        this.state = {
            description: 'Description',
            amount: 0,
            date: todayFormatted
        }
    }
    

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.clear) {
            const today = new Date();
            const todayFormatted = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
            return {
                description: 'Description',
                amount: 0,
                date: todayFormatted
            }
        }
        return prevState;
    }

    changeDesHandler = (e) => {
        this.setState({
            description: e.target.value
        });
    }

    changeAmountHandler = (e) => {
        this.setState({
            amount: +e.target.value
        });
    }

    changeDateHandler = (e) => {
        this.setState({
            date: e.target.value
        });
    }

    render() {
        return (
            <div className={classes.Input}>
                <div className={classes.Inputs}>
                    <input className={classes.SingleInput} type="date" name="date" value={this.state.date} onChange={this.changeDateHandler}></input>
                    <input className={classes.SingleInput} value={this.state.description} type='text' name='description' onChange={(e) => this.changeDesHandler(e)}></input>
                    <input className={classes.SingleInput} value={this.state.amount} type='number' name='amount' min='0' max='100000' step='500' onChange={(e) => this.changeAmountHandler(e)}></input>
                </div>
                <div className={classes.AddButton} onClick={() => this.props.clicked(this.state.description, this.state.amount, this.state.date)}>
                    <h1>+</h1>
                </div>
            </div>
        );
    }    
}

export default Input;