import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { actions as actions } from '../actions/MainActions'
import Loader from '../components/Loader'
import '../styles/style.css'

const mapStateToProps = (state) => ({
	orderId : state.orderDetails.orderId,
	amount : state.orderDetails.amount,
	status : state.orderDetails.status,
	merchantId : state.orderDetails.merchantId,
	merchantName : state.orderDetails.merchantName,
	emailId : state.orderDetails.shippingEmail,
	loader : state.orderDetails.loader
})

class PaymentReceiptView extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount = () => {
		this.props.showLoader()
		this.props.syncOrderDetails(this.props.routeParams.orderId)
	}

	goBack = (e) => {
		e.preventDefault()
		browserHistory.push('/')
	}

	retryPayment = (e) => {
		e.preventDefault()
		browserHistory.push('/checkout')
	}

	render() {
		if(this.props.loader) {
			return (
				<div>
					<Loader message="Checking Order status. Please wait..."/>
				</div>
			)
		} else {
			var status = (['SUCCESS', 'CHARGED'].indexOf(this.props.status) > -1) ? 'success' : 'failure'
			if(status == 'success') {
				return(
					<div className="receiptContainer">
						<h3 className="paymentStatus" style={{color: '#28a745'}}>Payment Successful</h3>
						<div>
							<p>Hallo Gjest! Your payment of <strong>{this.props.amount} kr</strong> towards <strong>{this.props.merchantName}</strong> is successful.</p>
							<p>Your OrderId : <strong>{this.props.orderId}</strong></p>
							<p>Order details has been sent to your email Id <strong>{this.props.emailId}</strong></p> 
							<div className="submit">
								<button className="btn btn-default" type="submit" onClick={this.goBack}>Continue Purchasing</button>
							</div>
						</div>
					</div>
				)
			} else {
				return(
					<div className="receiptContainer">
						<h3 className="paymentStatus" style={{color: '#dc3545'}}>Payment Failed</h3>
						<div>
							<p>Hallo Gjest! Your payment of <strong>{this.props.amount} kr</strong> towards <strong>{this.props.merchantName}</strong> has failed.</p>
							<p>Your OrderId : <strong>{this.props.orderId}</strong></p>
							<p>Please click below to retry payment.</p>
							<div className="submit">
								<button className="btn btn-default" type="submit" onClick={this.retryPayment}>Retry Payment</button>
								<button type="button" className="btn btn-link" onClick={this.goBack}>Go Back</button>
							</div>
						</div>
					</div>
				)
			}
		}
	}

}

export default connect(mapStateToProps, actions)(PaymentReceiptView)