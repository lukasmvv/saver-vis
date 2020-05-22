import React,{Component} from 'react';
import classes from './Layout.module.css';
import Points from '../../components/Points/Points';
import Input from '../../components/Input/Input';
import Charts from '../../components/Charts/Charts';
import axios from 'axios';

// TO DO
// make everything look better
// add empty chart state

class Layout extends Component {
    
    constructor(props) {
        super();

        const today = new Date();
        const todayFormatted = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();

        this.state = {
            data: null,
            error: false,
            loading: true,
            // date: todayFormatted,
            clear: false
        }
    }   

    componentWillMount() {
        this.loadPoints();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.clear!==this.state.clear) {
            this.setState({clear: false});
        }
    }

    loadPoints = () => {
        axios.get('https://saver-vis.firebaseio.com/data.json')
        .then(res => {
            //console.log(res);
            const rawData = res.data;
            const data = [];
            const keys = Object.keys(rawData);
            for (const key of keys) {
                data.push({
                    date: new Date(rawData[key].date),
                    description: rawData[key].description,
                    amount: rawData[key].amount,
                    id: key
                });
            }
            const sortedData = data.sort((a,b) => a.date - b.date);
            this.setState({
                error: false,
                data: sortedData,
                loading: false
            });
        })
        .catch(err => {
            this.setState({error: true, loading: false, clear: false});
        });
    }


    addButtonHandler = (description, amount, date) => {
        axios.post('https://saver-vis.firebaseio.com/data/.json', {
            date: date,
            description: description,
            amount: amount
        })
        .then(res => {
            this.loadPoints();
            this.setState({clear: true});
        })
        .catch(err => {
            console.log(err);
        });
    }

    deletePointHandler = (id) => {
        axios.delete(`https://saver-vis.firebaseio.com/data/${id}/.json`)
        .then(res => {
            this.loadPoints();
        })
        .catch(err => {
            console.log(err);
        });
    }

    calculateTotal = () => {
        if (this.state.data) {
            return this.state.data.map(p=> p.amount).reduce((a, b) => a + b, 0);
        } else {
            return 0;
        }        
    }

    render() {
        
        return (
            <div className={classes.Layout}>
                <div className={classes.Top}>
                    <div className={classes.Heading}>
                        <h1>Mortage Saver Visualization</h1>
                        <h2>Saves to Firebase</h2>
                        <h2>Total Saved: €{this.calculateTotal()}</h2>
                    </div>
                    <div className={classes.Inputs}>
                        <Input clear={this.state.clear} clicked={this.addButtonHandler}/>
                    </div>
                </div>

                <div className={classes.Bottom}>
                    <div className={classes.Points}>
                        {this.state.error ? <p>Error loading data</p> : this.state.loading ? <p>Loading...</p>: <Points deletePoint={this.deletePointHandler} dataPoints={this.state.data}/>}
                    </div>
                    <div className={classes.Charts}>
                        <Charts data={this.state.data}></Charts>
                    </div>
                </div>                              
            </div>
        );
    }
}

export default Layout;