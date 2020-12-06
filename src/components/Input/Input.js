import React, {Component} from 'react';
import classes from './Input.module.css';
// import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import * as ids from '../../utils/ids';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image} from '@react-pdf/renderer'; //Canvas
// import ReactPDF from '@react-pdf/renderer';

class Input extends Component {
    constructor(props) {
        super();
        
        const today = new Date();
        const todayFormatted = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
        
        this.state = {
            description: 'Description',
            amount: 0,
            date: todayFormatted,
            images: [],
            pdfDoc: (<Document>
                <Page size="A4">
                    <View>
                        <Text>Section #1</Text>
                    </View>
                </Page>
                </Document>)
        }

        this.pdfDoc = (
            <Document>
            <Page size="A4">
                <View>
                    <Text>Section #1</Text>
                </View>
            </Page>
            </Document>
        );
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

    async generatePDF() {
        this.styles = StyleSheet.create({
            page: {
              flexDirection: 'row',
              backgroundColor: '#E4E4E4'
            },
            section: {
              margin: 10,
              padding: 10,
              flexGrow: 1
            },
            image: {
                objectFit: 'cover',
                width: 100,
                height: 200
            }
            
          });
    
          const predictions = document.getElementById(ids.PREDICTIONS);
    
            //let chartsCanvas = await html2canvas(allCharts);
            let predictionsCanvas = await html2canvas(predictions);
    
            //const chartsImages = chartsCanvas.toDataURL('image/png');
            const predictionImages = await predictionsCanvas.toDataURL('image/png');
    
            const pdfDoc = (
                <Document>
                    <Page size="A4" style={this.styles.page}>
                        <Text>Mortage Saver Visualization</Text>
                        <Text>Lukas & Leana van Vuuren</Text>
                    </Page>
                    <Page size="A4" style={this.styles.page}>
                        {/* <View style={this.styles.section}> */}
                        {/* <Text>Section #3</Text> */}
                        <Image src={predictionImages} style={this.styles.image}></Image>
                        {/* </View> */}
                        <View style={this.styles.section}>
                            <Text>Section #2</Text>
                        </View>
                    </Page>
                </Document>
            );
            this.setState({pdfDoc: pdfDoc});
    }

    componentDidMount() {
        this.generatePDF();
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
                    <div className={classes.AddButton}>
                        <button className={classes.PlusButton} onClick={() => this.props.clicked(this.state.description, this.state.amount, this.state.date)}>
                            +
                        </button>
                    </div>
                </div>
                <div className={classes.PDFButton}>
                    <PDFDownloadLink document={this.state.pdfDoc} fileName="somename.pdf" style={{color: 'rgba(241, 242, 238)'}}>
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                    </PDFDownloadLink>
                </div>
            </div>
        );
    }    
}

export default Input;