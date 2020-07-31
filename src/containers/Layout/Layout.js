import React,{Component} from 'react';
import classes from './Layout.module.css';
import Points from '../../components/Points/Points';
import Input from '../../components/Input/Input';
import Charts from '../../components/Charts/Charts';
import axios from 'axios';
import * as ids from '../../utils/ids';

// TO DO
// make everything look better
// add empty chart state

class Layout extends Component {
    
    constructor(props) {
        super();

        this.state = {
            data: null,
            error: false,
            loading: true,
            clear: false,
            averagePerDay: 0
        }
    }   

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(nextState)!==JSON.stringify(this.state)) {
            return true;
        }
        return false;    
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
    
    calculateAverage = () => {
        if (this.state.data!==null) {
            const startIndex = 7;

            const startD = new Date(this.state.data[startIndex].date);
            const endD = new Date(this.state.data[this.state.data.length-1].date);
            const duration = endD - startD;
            const durationDays = duration/(1000*60*60*24);

            const totalInPeriod = this.state.data.slice(startIndex).map(p=> p.amount).reduce((a, b) => a + b, 0);
            const averagePerDay = totalInPeriod/durationDays;
            this.setState({averagePerDay: averagePerDay});
            return averagePerDay;
        } else {
            return 0;
        }
    }

    predictAmount = (months) => {
        const average = this.calculateAverage();
        if (average!==null) {
            const toAdd = average*(30*months);
            return toAdd;
        } else {
            return 0;
        }
    }

    render() {       
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ];
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();

        let predictions = [];
        for (var i=0;i<6;i++) {
            predictions.push(<h2 key={i}>{`End of ${monthNames[month+i]}: €${(this.calculateTotal()+this.predictAmount(i)).toFixed(2)}`}</h2>);
        }

        return (
            <div className={classes.Layout}>
                <div className={classes.Top}>
                    <div className={classes.Heading} id={ids.PREDICTIONS}>
                        <h1>Mortage Saver Visualization</h1>
                        <h2>Saves to Firebase</h2>
                        <h2>Total Saved: €{this.calculateTotal()}</h2>
                        <h1>Predictions</h1>
                        {predictions}
                        {/* <h2>Predictied Total in 6 Months: €{(this.calculateTotal()+this.predictAmount(6)).toFixed(2)}</h2> */}
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
                        <Charts data={this.state.data} averagePerDay={this.state.averagePerDay}></Charts>
                    </div>
                </div>                              
            </div>
        );
    }
}

export default Layout;