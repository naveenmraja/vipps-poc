import React, { Component } from 'react';
import { connect } from 'react-redux'
import { actions as actions } from '../actions/MainActions'
import '../styles/style.css'
import StepWizard from '../components/StepWizard'

const mapStateToProps = (state) => ({
	orderId : state.orderDetails.orderId,
	merchantId : state.orderDetails.merchantId,
	endpoint : state.orderDetails.endpoint,
	amount : state.orderDetails.amount,
	activeScreen : state.checkoutDetails.activeScreen,
	shippingAddress : state.orderDetails.shippingAddress,
	shippingPostalAddress : state.orderDetails.shippingPostalAddress,
	shippingCity : state.orderDetails.shippingCity,
	shippingCountry : state.orderDetails.shippingCountry,
	shippingEmail : state.orderDetails.shippingEmail
})

class ShippingInfoView extends Component {

	constructor(props) {
		super(props)
	}

	goBack = (e) => {
		e.preventDefault()
		this.props.updateActiveScreen("customerInfo")
	}

	handleClick = (e) => {
		e.preventDefault()
		this.props.updateActiveScreen("payment")
	}

	handleShippingAddressChange = (e) => {
		e.preventDefault()
		this.props.updateShippingAddress(e.target.value)
	}

	handleShippingCityChange = (e) => {
		e.preventDefault()
		this.props.updateShippingCity(e.target.value)
	}

	handleShippingPostalAddressChange = (e) => {
		e.preventDefault()
		this.props.updateShippingPostalAddress(e.target.value)
	}

	handleShippingCountryChange = (e) => {
		e.preventDefault()
		this.props.updateShippingCountry(e.target.value)
	}

	handleShippingEmailChange = (e) => {
		e.preventDefault()
		this.props.updateShippingEmail(e.target.value)
	}

	render() {
		if(this.props.activeScreen == "shippingInfo") {
			return (
				<div className="col-8 leftCol padB60">
					<StepWizard customerClass="btn-primary fade" customerInfoDisabled={false} customerInfoText="&#10003;" customerTextClass="fade"
						shippingClass="btn-primary" shippingInfoDisabled={true} shippingInfoText="" shippingTextClass=""
						paymentClass="btn-secondary" paymentDisabled={true} paymentText="" paymentTextClass="fade"/>
					<div className="customerOptions">
						<div className="form-check active">
							<h5><strong>Shipping Information</strong></h5>
							<div className="col-12" id="customerInput">
								<div className="input-group mb-3">
									<div className="col-md-6 mb-3">
										<label for="address">ADDRESS</label>
										<input className="form-control" id="address" type="text" placeholder="Address" 
											value={this.props.shippingAddress} onChange={this.handleShippingAddressChange} />
										<div className="invalid-feedback">
											Address is required
										</div>
									</div>
								  	<div className="col-md-6 mb-3">
										<label for="city">CITY</label>
										<input className="form-control" id="city" placeholder="City" required="" type="text" 
											value={this.props.shippingCity} onChange={this.handleShippingCityChange} />
										<div className="invalid-feedback">
									  		City is required
										</div>
								  	</div>
								  	<div className="col-md-6 mb-3">
										<label for="postal-address">POSTAL ADDRESS</label>
										<input className="form-control" id="postal-address" placeholder="Postal Address" required="" type="text" 
											value={this.props.shippingPostalAddress} onChange={this.handleShippingPostalAddressChange}/>
										<div className="invalid-feedback">
									  		Address is required
										</div>
								  	</div>
								  	<div className="col-md-6 mb-3">
										<label for="country">COUNTRY</label>
										<input className="form-control" id="country" placeholder="Country" required="" type="text" 
											value={this.props.shippingCountry} onChange={this.handleShippingCountryChange} />
										<div className="invalid-feedback">
									  		Country is required
										</div>
								  	</div>
								  	<div className="col-md-6 mb-6">
										<label for="email">EMAIL</label>
										<input className="form-control" id="email" placeholder="Email" required="" type="text" 
											value={this.props.shippingEmail} onChange={this.handleShippingEmailChange}/>
										<div className="invalid-feedback">
									  		Email is required
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

export default connect(mapStateToProps, actions)(ShippingInfoView)