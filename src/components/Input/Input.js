import React, {Component} from 'react';
import classes from './Input.module.css';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

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
        console.log(e.target.value);
        let val = e.target.value;
        if (val.substring(0,1)==='0') {
            val = val.substring(1);
        }
        this.setState({
            amount: +val
        });
    }

    changeDateHandler = (e) => {
        this.setState({
            date: e.target.value
        });
    }

    getPDFHandler = async () => {
        //window.html2canvas = html2canvas;

        var doc = new jsPDF({orientation: 'landscape'});
        var width = doc.internal.pageSize.width;
        var height = doc.internal.pageSize.height;

        //doc.text('Hello world!', 10, 10);  
        let images = [];

        const chartWidths = [width/2, width, 100, 175, 175];
        const chartHeights = [height/2, height, 150, 75, 75];
        const chartStartX = [10, 10, 10, 10, 10];
        const chartStartY = [40, 40, 40, 40, 40];

        const charts = document.getElementById('mortageCharts');
        const depositBar = document.getElementById('depositsBar');
        const depositLine = document.getElementById('depositsLine');
        const monthlyBar = document.getElementById('monthlyBar');
        const monthlyLine = document.getElementById('monthlyLine');
        const predictions = document.getElementById('predictions');

        let chartsCanvas = await html2canvas(charts);
        let predictionsCanvas = await html2canvas(predictions);

        const chartsImages = chartsCanvas.toDataURL('image/png');
        const predictionImages = predictionsCanvas.toDataURL('image/png');
        
        images.push(predictionImages);
        images.push(chartsImages); 

        // generate Prosumer X report here
        images.forEach((i, index) => {
            //doc.addPage();
            // some stats on prosumer
            //console.log(this.state.communityGrid.prosumers[this.state.activeProsumer].getStats());
            //doc.text(''+this.state.communityGrid.prosumers[this.state.activeProsumer].getStats(), 10, 10);
            doc.addImage(i, 'PNG', 0, 0, chartWidths[index], chartHeights[index]);
            doc.addPage();
        });
        //doc.addImage(images[2],'PNG', 10, 40, 300, 100);
        doc.save('filename');
    }

    render() {
        return (
            <div className={classes.InputAndButton}>
                <div className={classes.Input}>
                    <div className={classes.Inputs}>
                        <input className={classes.SingleInput} type="date" name="date" value={this.state.date} onChange={this.changeDateHandler}></input>
                        <input className={classes.SingleInput} value={this.state.description} type='text' name='description' onChange={(e) => this.changeDesHandler(e)}></input>
                        <input className={classes.SingleInput} value={''+this.state.amount} type='number' name='amount' min='0' max='100000' step='500' onChange={(e) => this.changeAmountHandler(e)}></input>
                    </div>
                    <div className={classes.AddButton} onClick={() => this.props.clicked(this.state.description, this.state.amount, this.state.date)}>
                        <h1>+</h1>
                    </div>
                </div>
                <div className={classes.PDFButton}>
                    <button className={classes.Button} onClick={this.getPDFHandler}>Get PDF</button>
                </div>
            </div>
            // <div className={classes.TopRight}>
            //     test
            // </div>
        );
    }    
}

export default Input;