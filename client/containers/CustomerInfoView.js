import React, { Component } from 'react';
import { connect } from 'react-redux'
import { actions as actions } from '../actions/MainActions'
import { browserHistory } from 'react-router'
import '../styles/style.css'
import StepWizard from '../components/StepWizard'

const mapStateToProps = (state) => ({
	orderId : state.orderDetails.orderId,
	merchantId : state.orderDetails.merchantId,
	endpoint : state.orderDetails.endpoint,
	amount : state.orderDetails.amount,
	customerFirstName : state.orderDetails.customerFirstName,
	customerLastName : state.orderDetails.customerLastName,
	customerAddress : state.orderDetails.customerAddress,
	customerPostalAddress : state.orderDetails.customerPostalAddress,
	shippingAddress : state.orderDetails.shippingAddress,
	shippingPostalAddress : state.orderDetails.shippingPostalAddress,
	activeScreen : state.checkoutDetails.activeScreen
})

class CustomerInfoView extends Component {

	constructor(props) {
		super(props)
	}

	handleClick = (e) => {
		e.preventDefault()
		this.props.updateActiveScreen("shippingInfo")
	}

	goBack = (e) => {
		e.preventDefault()
		browserHistory.push('/')
	}

	handleCustomerFirstNameChange = (e) => {
		e.preventDefault()
		this.props.updateCustomerFirstName(e.target.value)
	}

	handleCustomerLastNameChange = (e) => {
		e.preventDefault()
		this.props.updateCustomerLastName(e.target.value)
	}

	handleCustomerAddressChange = (e) => {
		e.preventDefault()
		this.props.updateCustomerAddress(e.target.value)
		this.props.updateShippingAddress(e.target.value)
	}

	handleCustomerPostalAddressChange = (e) => {
		e.preventDefault()
		this.props.updateCustomerPostalAddress(e.target.value)
		this.props.updateShippingPostalAddress(e.target.value)
	}

	render() {
		if(this.props.activeScreen == "customerInfo") {
			return (
				<div className="col-8 leftCol padB60">
					<StepWizard customerClass="btn-primary" customerInfoDisabled={true} customerInfoText="" customerTextClass="" 
						shippingClass="btn-secondary" shippingInfoDisabled={true} shippingInfoText="" shippingTextClass="fade" 
						paymentClass="btn-secondary" paymentDisabled={true} paymentText="" paymentTextClass="fade" />
					<div className="customerOptions">
						<div className="form-check active">
							<h5><strong>Customer Information</strong></h5>
							<div className="col-12" id="customerInput">
								<div className="input-group mb-3">
									<div className="col-md-6 mb-3">
										<label for="first-name">FIRST NAME</label>
										<input className="form-control" id="first-name" type="text" placeholder="First Name" 
											value={this.props.customerFirstName} onChange={this.handleCustomerFirstNameChange} />
										<div className="invalid-feedback">
											First Name is required
										</div>
									</div>
								  	<div className="col-md-6 mb-3">
										<label for="last-name">LAST NAME</label>
										<input className="form-control" id="last-name" placeholder="Last Name" required="" type="text"  
											value={this.props.customerLastName} onChange={this.handleCustomerLastNameChange}/>
										<div className="invalid-feedback">
									  		Last Name is required
										</div>
								  	</div>
								  	<div className="col-md-6 mb-6">
										<label for="address">ADDRESS</label>
										<input className="form-control" id="address" placeholder="Address" required="" type="text" 
											value={this.props.customerAddress} onChange={this.handleCustomerAddressChange}/>
										<div className="invalid-feedback">
									  		Address required
										</div>
								  	</div>
								  	<div className="col-md-6 mb-6">
										<label for="postal-address">POSTAL ADDRESS</label>
										<input className="form-control" id="postal-address" placeholder="Postal Address" required="" type="text" 
											value={this.props.customerPostalAddress} onChange={this.handleCustomerPostalAddressChange}/>
										<div className="invalid-feedback">
									  		Postal Address required
										</div>
								  	</div>
								</div>
							</div>
						</div>
					</div>
					<div className="submit">
						<button className="btn btn-primary" type="submit" onClick={this.handleClick}>Continue</button>
						<button type="button" className="btn btn-link" onClick={this.goBack}>Go Back</button>
					</div>
				</div>
			)
		} else {
			return (
				<div />
			)
		}
	}
}

export default connect(mapStateToProps, actions)(CustomerInfoView)