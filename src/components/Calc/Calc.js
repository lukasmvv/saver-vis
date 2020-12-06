import React, {useState, useEffect} from 'react';
import classes from './Calc.module.css';

const Calc = (props) => {
	const [years, setYears] = useState(20);
	const [interestRate, setInterestRate] = useState(3.15);
	const [monthlyInterestRate, setMonthlyInterestRate] = useState(3.15/12);
	const [houseCost, setHouseCost] = useState(0);
	const [stampDuty, setStampDuty] = useState(0);
	const [legalFees, setLegalFees] = useState(2500);
	const [surveyorFees, setSurveyorFees] = useState(300);
	const [valuationFees, setValuationFees] = useState(200);
	const [depositPercentage, setDepositPercentage] = useState(10);


	useEffect(() => {
		
	},[]);

	const calculateMortgage = (p,r,n) => {
		// mortage formula
		//var monthlyRepayments = p*((r*((1+r)^n))/(((1+r)^n)-1));
		return (p * ((r*Math.pow(1+r,n)) / ((Math.pow(1+r,n))-1))).toFixed(2);
	}

	const formatNumber = (x) => {

	}

	const changeYears = (e) => {
		e.preventDefault();
		setYears(e.target.value);
		calculateMortgage();
	}
	const changeInterestRate = (e) => {
		e.preventDefault();
		setInterestRate(e.target.value.replace(' %',''));
		setMonthlyInterestRate(e.target.value/12);
		calculateMortgage();
	}
	const changeHouseCost = (e) => {
		e.preventDefault();
		const hc = e.target.value.replace('€ ','');
		setHouseCost(hc);
		let sd = 0.01*hc;
		if (hc>1000000){
			sd=0.02*hc;
		}
		setStampDuty(sd);
		calculateMortgage();
	}
	const changeLegalFees = (e) => {
		e.preventDefault();
		setLegalFees(e.target.value.replace('€ ',''));
		calculateMortgage();
	}
	const changeSurveyorFees = (e) => {
		e.preventDefault();
		setSurveyorFees(e.target.value.replace('€ ',''));
		calculateMortgage();
	}
	const changeValuationFees = (e) => {
		e.preventDefault();
		setValuationFees(e.target.value.replace('€ ',''));
		calculateMortgage();
	}
	const changeDeposit = (e) => {
		e.preventDefault();
		setDepositPercentage(e.target.value.replace(' %',''));
		calculateMortgage();
	}

	return (
		<div className={classes.Calc}>
			<div className={classes.Left}>
				<div className={classes.YearStyle}>
					<p className={classes.YearsText}>Years</p>
					<input className={classes.YearsSlider} id="yearsSlider" type="range" min="5" max="35" step="5" value={years} list="steplist" onChange={changeYears}/>
					<datalist className={classes.StepList}>
						<p>5</p>
						<p>10</p>
						<p>15</p>
						<p>20</p>
						<p>25</p>
						<p>30</p>
						<p>35</p>
					</datalist>
					<p id="numMonthlyRepayment" className={classes.numMonthlyRepayment}>{years*12} Repayments</p>
				</div>
				<div className={classes.interestRateStyle}>
					<div className={classes.interestRateBlock}>
						<p className={classes.interestRateText} id="interestRateText">Interest Rate </p>
						<input className={classes.interestRateNum} id="interestRateNum" type="text" value={`${interestRate} %`} onChange={changeInterestRate}/>
					</div>
					<p className={classes.monthlyInterestRateText} id="monthlyInterestRateText">Monthly Interest Rate: {monthlyInterestRate}</p>							
				</div>
				<div className={classes.costs}>
					<div className={classes.c1}>
						<p className={classes.houseCostText}>House Cost:</p>
						<input className={classes.houseCost} type="text" id="houseCost" value={`€ ${houseCost}`} onChange={changeHouseCost}/>
					</div>
					<div className={classes.c2}>
						<p className={classes.stampDutyText}>Stamp Duty:</p>
						<input className={classes.stampDuty} type="text" id="stampDuty" value={`€ ${stampDuty}`}/>
					</div>
					<div className={classes.c3}>
						<p className={classes.legalFeesText}>Legal Fees:</p>
						<input className={classes.legalFee} type="text" id="legalFee" value={`€ ${legalFees}`} onChange={changeLegalFees}/>
					</div>
					<div className={classes.c4}>
						<p className={classes.surveyorFeesText}>Surveyor Fees:</p>
						<input className={classes.surveyorFee} type="text" id="surveyorFee" value={`€ ${surveyorFees}`} onChange={changeSurveyorFees}/>
					</div>
					<div className={classes.c5}>
						<p className={classes.valuationFeesText}>Valuation Fees:</p>
						<input className={classes.valuationFee} type="text" id="valuationFee" value={`€ ${valuationFees}`} onChange={changeValuationFees}/>
					</div>
				</div>

				<div className={classes.deposit}>
					<div claclassNamess={classes.depositOne}>
						<p className={classes.depositText} >Deposit Percentage: </p>
						<input className={classes.depositPercentage} id="depositPercentage" type="text" value={`${depositPercentage} %`} onChange={changeDeposit}/>
					</div>            
					<div className={classes.depositAmount} id="depositAmount">
						<p>Deposit Amount: € {(houseCost*depositPercentage/100).toFixed(2)}</p>
					</div>
				</div>

			</div>
			<div className={classes.Right}>
				<div className={classes.calculation}>
					<div id={classes.loanAmount}>
						<p>Loan Amount: € {(houseCost-(houseCost*depositPercentage/100)).toFixed(2)}</p>
					</div>

					<div id={classes.totalNeeded}>
						<p>Needed for Mortage: € {((houseCost*depositPercentage/100)+stampDuty+legalFees+surveyorFees+valuationFees).toFixed(2)}</p>
					</div>

					<div id={classes.totalNeeded}>
						<p>Amount short: € {(((houseCost*depositPercentage/100)+stampDuty+legalFees+surveyorFees+valuationFees)-props.total).toFixed(2)}</p>
					</div>

					<div id={classes.monthlyRepayments}>
						<p>Repayments: € {calculateMortgage((houseCost-(houseCost*depositPercentage/100)), (interestRate/100)/12, years*12)}</p>
					</div>

					<div id={classes.totalPaid}>
						<p>Total Paid: € {(calculateMortgage((houseCost-(houseCost*depositPercentage/100)), (interestRate/100)/12, years*12)*years*12).toFixed(2)}</p>
					</div>

					<div id={classes.interestPaid}>
						<p>Interest Paid: € {((calculateMortgage((houseCost-(houseCost*depositPercentage/100)), (interestRate/100)/12, years*12)*years*12) - (houseCost-(houseCost*depositPercentage/100))).toFixed(2)}</p>
					</div>
				</div>
			</div>	
		</div>
	);
};

export default Calc;