import React,{Component} from 'react';
import classes from './Layout.module.css';
import Points from '../../components/Points/Points';
import Input from '../../components/Input/Input';
import axios from 'axios';

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
                    date: rawData[key].date,
                    description: rawData[key].description,
                    amount: rawData[key].amount,
                    id: key
                });
            }
            this.setState({
                error: false,
                data: data,
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

    render() {
        
        return (
            <div className={classes.Layout}>
                <div className={classes.Heading}>
                    <h1>This is the heading of the saver vis</h1>
                    {/* <h2>{this.state.date}</h2> */}
                </div>
                <Input clear={this.state.clear} clicked={this.addButtonHandler}/>
                {this.state.error ? <p>Error loading data</p> : this.state.loading ? <p>Loading...</p>: <Points deletePoint={this.deletePointHandler} dataPoints={this.state.data}/>}
            </div>
        );
    }
}

export default Layout;