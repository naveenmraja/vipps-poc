import React, { Component } from 'react';
import { connect } from 'react-redux'
import { actions as actions } from '../actions/MainActions'
import {
	CREATING,
	NEW
} from '../constants/Status'
import '../styles/style.css'
import CardValidator from '../utils/CardValidator'
import StepWizard from '../components/StepWizard'
import Loader from '../components/Loader'

const mapStateToProps = (state) => ({
	orderId : state.orderDetails.orderId,
	status : state.orderDetails.status,
	merchantId : state.orderDetails.merchantId,
	endpoint : state.orderDetails.endpoint,
	amount : state.orderDetails.amount,
	loader : state.orderDetails.loader,
	customerPhone : state.orderDetails.customerPhone,
	shippingEmail : state.orderDetails.shippingEmail,
	activeScreen : state.checkoutDetails.activeScreen,
	selectedPaymentMethod : state.checkoutDetails.selectedPaymentMethod,
	paymentMethod : state.checkoutDetails.paymentMethod,
	paymentMethodType : state.checkoutDetails.paymentMethodType,
	cardNumber : state.checkoutDetails.cardNumber,
	cardExpYear : state.checkoutDetails.cardExpYear,
	cardExpMonth : state.checkoutDetails.cardExpMonth,
	cardExpDate : state.checkoutDetails.cardExpDate,
	cardSecurityCode : state.checkoutDetails.cardSecurityCode,
	nameOnCard : state.checkoutDetails.nameOnCard,
	cardValidation : state.checkoutDetails.cardValidation,
	customerPhoneValidation : state.checkoutDetails.customerPhoneValidation
})

class PaymentView extends Component {

	constructor(props) {
		super(props)
	}

	resetState = () => {
		this.props.updateSelectedPaymentMethod('')
	}

	componentDidMount() {
		this.resetState()
	}

	handlPaymentSelection = (paymentMethod) => {
		this.props.updateSelectedPaymentMethod(paymentMethod)
		if(paymentMethod == "vippsNow") {
			this.props.updatePaymentMethod("VIPPS_NOW")
			this.props.updatePaymentMethodType("WALLET")
		} else if(paymentMethod == "vippsLater") {
			this.props.updatePaymentMethod("VIPPS_LATER")
			this.props.updatePaymentMethodType("CONSUMER_FINANCE")
		} else if(paymentMethod == "card") {
			this.props.updatePaymentMethod("")
			this.props.updatePaymentMethodType("CARD")
		}
	}

	handlePayment = (e) => {
		e.preventDefault()
		if(this.props.paymentMethodType) {
			var result = this.isValid(this.props.paymentMethodType)
			if(result) {
				if(!this.props.amount || isNaN(this.props.amount)) {
					alert('invalid amount')
					// this.props.updateInvalidAmount()
				} else {
					this.props.showLoader()
					var params = {
						'amount' : this.props.amount,
						'customer_email' : this.props.shippingEmail,
						'customer_phone' : this.props.customerPhone
					}
					this.props.createOrder(params)
				}
			}
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		if(prevProps.status == CREATING && this.props.status == NEW) {
			this.props.showLoader()
			if(this.props.paymentMethodType == "WALLET" || this.props.paymentMethodType == "CONSUMER_FINANCE") {
				document.getElementById('juspay-payment-form').submit()
			} else if(this.props.paymentMethodType == "CARD") {
				document.getElementById('juspay-card-number').value = this.props.cardNumber
				document.getElementById('juspay-card-exp-year').value = this.props.cardExpYear
				document.getElementById('juspay-card-exp-month').value = this.props.cardExpMonth
				document.getElementById('juspay-card-security-code').value = this.props.cardSecurityCode
				document.getElementById('juspay-name-on-card').value = this.props.nameOnCard
				document.getElementById('juspay-card-payment-form').submit()
			} else {
				this.props.hideLoader()
			}
		}
	}

	goBack = (e) => {
		e.preventDefault()
		this.props.updateActiveScreen("shippingInfo")
	}

	setCardState = (key, value) => {
		switch(key) {
			case 'cardNumber' : 
				this.props.updateCardNumber(value);
				break;
			case 'cardSecurityCode' : 
				this.props.updateCardSecurityCode(value);
				break;
			case 'cardExpiryDate' :
				this.props.updateExpiryDate(value);
				break;
			case 'cardValidation' : 
				this.props.updateCardValidation(value);
				break;
			case 'nameOnCard' : 
				this.props.updateNameOnCard(value);
				break;
			default :
				return;
		}
	}

	isValid = (paymentMethodType) => {
		var result = true;
		if(paymentMethodType == "CARD") {
		    var validation = {};
		    var re = /^[0-3][0-9]\/[0-9]{2}$/;
		    validation.cardNumberEmpty = false;
		    validation.cardExpMonthEmpty = false;
		    validation.cardExpYearEmpty = false;
		    validation.cardSecurityCodeEmpty = false;
		    validation.cardNumberInvalid = false;
		    validation.cardExpMonthInvalid = false;
		    validation.cardExpYearInvalid = false;
		    validation.cardSecurityCodeInvalid = false;

		    var date = new Date()
		    var currentMonth = date.getMonth() + 1
		    var currentYear = date.getFullYear()
		    if(!this.props.cardNumber) {
		    	validation.cardNumberEmpty = true;
		    	result = false;
		    }
		    if(this.props.cardNumber && !CardValidator(this.props.cardNumber).valid) {
		    	validation.cardNumberInvalid  = true;
		    	result = false;
		    }
		    if(!this.props.cardExpMonth) {
		    	validation.cardExpMonthEmpty = true;
		    	result = false;
		    }
		    if(this.props.cardExpMonth && isNaN(this.props.cardExpMonth)) {
		    	validation.cardExpMonthInvalid = true;
		    	result = false;
		    }
		    if(!this.props.cardExpYear) {
		    	validation.cardExpYearEmpty = true;
		    	result = false;
		    }
		    if(this.props.cardExpYear && (isNaN(this.props.cardExpYear) || (Number.parseInt(this.props.cardExpYear) + 2000) < currentYear)) {
		    	validation.cardExpYearInvalid  = true;
		    	result = false;
		    }
		    if(this.props.cardExpYear && this.props.cardExpMonth && ((Number.parseInt(this.props.cardExpYear) + 2000) == currentYear
		      && Number.parseInt(this.props.cardExpMonth) < currentMonth )) {
		    	validation.cardExpMonthInvalid  = true;
		    	result = false;
		    }
		    var cardClass = CardValidator(this.props.cardNumber)
		    if(cardClass && cardClass.card_type && cardClass.card_type.name == 'maestro') {
		    	if(this.props.cardSecurityCode && this.invalidCvv('maestro', this.props.cardSecurityCode)) {
		      		validation.cardSecurityCodeInvalid = true;
		        	result = false;
		      	}
		    } else {
		    	if(!this.props.cardSecurityCode) {
		        	validation.cardSecurityCodeEmpty = true;
		        	result = false;
		      	}
		    	if(this.props.cardSecurityCode && this.invalidCvv(cardClass && cardClass.card_type &&
		          cardClass.card_type.name || null, this.props.cardSecurityCode)) {
		      		validation.cardSecurityCodeInvalid = true;
		       		result = false;
		      	}
		    }
		    this.setCardState('cardValidation', validation)
		} else if(paymentMethodType == "CONSUMER_FINANCE") {
			var validation = {}
			validation.customerPhoneEmpty = false
			validation.customerPhoneInvalid = false
			if(!this.props.customerPhone) {
				result = false
				validation.customerPhoneEmpty = true
			}
			if(this.props.customerPhone && (isNaN(this.props.customerPhone) || this.props.customerPhone.length < 8 || this.props.customerPhone.length > 12)) {
				result =false
				validation.customerPhoneInvalid = true
			}
			this.props.updateCustomerPhoneValidation(validation)
		}
	    return result
	}

	getCvvLength = (brand) => {
		if(!brand)
			return [3]
		if(brand.indexOf('maestro')) {
			return [0,3]
		} else if(brand.indexOf('amex')) {
			return [4]
		} else {
			return [3]
		}
	}

	invalidCvv = (brand, cvv) => {
	    if(!cvv)
	    	return false
	    return (this.getCvvLength(brand).indexOf(cvv.length) < 0 || isNaN(cvv))
	}

	handleCustomerPhoneChange = (e) => {
		e.preventDefault()
		this.props.updateCustomerPhone(e.target.value)
	}

	render() {
		if(this.props.activeScreen == "payment" && !this.props.loader) {
	        var cardNumberMessage = []
	        var cardExpiryMessage = []
	        var cardSecurityCodeMessage = []
	        var customerPhoneMessage = []
	        if(this.props.cardValidation) {
	        	if(this.props.cardValidation.cardNumberEmpty) {
	        		cardNumberMessage.push(
	        			<p className='param-rule'><b>* Required</b></p>
	        		)
	        	} else if(this.props.cardValidation.cardNumberInvalid) {
	        		cardNumberMessage.push(
	        			<p className='param-rule'><b>* Invalid card number</b></p>
	        		)
	        	}
	        	if(this.props.cardValidation.cardExpMonthEmpty || this.props.cardValidation.cardExpYearEmpty) {
	        		cardExpiryMessage.push(
	        			<p className='param-rule'><b>* Required</b></p>
	        		)
	        	} else if(this.props.cardValidation.cardExpMonthInvalid || this.props.cardValidation.cardExpYearInvalid) {
	        		cardExpiryMessage.push(
	        			<p className='param-rule'><b>* Invalid expiry date</b></p>
	        		)
	        	}
	        	if(this.props.cardValidation.cardSecurityCodeEmpty) {
	        		cardSecurityCodeMessage.push(
	        			<p className='param-rule'><b>* Required</b></p>
	        		)
	        	} else if(this.props.cardValidation.cardSecurityCodeInvalid) {
	        		cardSecurityCodeMessage.push(
	        			<p className='param-rule'><b>* Invalid CVV</b></p>
	        		)
	        	}
	        }
	        if(this.props.customerPhoneValidation) {
	        	if(this.props.customerPhoneValidation.customerPhoneEmpty) {
	        		customerPhoneMessage.push(
	        			<p className='param-rule'><b>* Required</b></p>
	        		)
	        	} else if(this.props.customerPhoneValidation.customerPhoneInvalid) {
	        		customerPhoneMessage.push(
	        			<p className='param-rule'><b>* Invalid Phone Number</b></p>
	        		)
	        	}
	        }
			return (
				<div className="col-8 leftCol padB60">
					<StepWizard customerClass="btn-primary fade" customerInfoDisabled={false} customerInfoText="&#10003;" customerTextClass="fade"
						shippingClass="btn-primary fade" shippingInfoDisabled={false} shippingInfoText="&#10003;"  shippingTextClass="fade"
						paymentClass="btn-primary" paymentDisabled={true} paymentText="" paymentTextClass=""/>
					<div className="payOptions">
						<h5><strong>Payment Options</strong></h5>
						<div className={this.props.selectedPaymentMethod == "vippsNow" ? "form-check active" : "form-check"} id="vippsNowContainer" onClick={()=>{ this.handlPaymentSelection("vippsNow") }}>
							<input className="form-check-input" type="radio" name="Vipps Payment Options" id="vippsNow" value="option1" checked={this.props.selectedPaymentMethod == "vippsNow"} />
							<label className="form-check-label" for="vippsNow">
								<span><img src="/static/vipps-logo.svg" height="20" width="85px" className="d-inline-block" alt="Vipps Now" /></span>
								<span className="logoText">nå</span>
								<h6>Enkelt, raskt og billig. Over 2,8 millioner nordmenn har nå lastet ned Vipps-appen.</h6>
							</label>
						</div>
						<div className={this.props.selectedPaymentMethod == "vippsLater" ? "form-check active" : "form-check"} onClick={()=>{ this.handlPaymentSelection("vippsLater") }}>
							<input className="form-check-input" type="radio" name="Vipps Payment Options" id="vippsLater" value="option2" checked={this.props.selectedPaymentMethod == "vippsLater"} />
							<label className="form-check-label" for="vippsLater">
								<span><img src="/static/vipps-logo.svg" height="20" width="85px" className="d-inline-block" alt="Vipps Now" /></span>
								<span className="logoText">senere</span>
								<h6>Enkelt, raskt og billig. Over 2,8 millioner nordmenn har nå lastet ned Vipps-appen.</h6>
							</label>
							<div className="col-10 mobileInput" id="mobileInput" style={{display: this.props.selectedPaymentMethod == "vippsLater" ? 'block' : 'none' }}>
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon3">Mobilen nummer</span>
								  	</div>
								  	<input name="mobilenNummer" type="text" className="form-control" id="" placeholder="12345678" 
								  		value={this.props.customerPhone} onChange={this.handleCustomerPhoneChange}/>	
								  	{customerPhoneMessage}								
								</div>
							</div>
						</div>
						<div className={this.props.selectedPaymentMethod == "card" ? "form-check active" : "form-check"} onClick={()=>{ this.handlPaymentSelection("card") }}>
							<input className="form-check-input" type="radio" name="Vipps Payment Options" id="vippsCards" value="option3" checked={this.props.selectedPaymentMethod == "card"} />
							<label className="form-check-label" for="vippsCards">
								<span className="logoText">Kreditt Kort</span>
								<span className="float-md-right"><img src="/static/cards.png" height="24" width="176px" className="d-inline-block" alt="Cards supported on Vipps" /></span>
								<h6>Safe money transfer using your bank account. VISA, Maestro, Discover, American Express</h6>
							</label>
							<div className="col-10 mobileInput" id="cardInput" style={{display: this.props.selectedPaymentMethod == "card" ? 'block' : 'none' }}>
								<div className="input-group mb-3">
									<div className="row">
										<div className="col-md-6 mb-3">
											<label for="cc-number">Credit card number</label>
											<input 
												className="form-control" 
												id="cc-number" 
												type="text"
												placeholder="1234 5678 9012 3456" 
												value={this.props.cardNumber} 
												onChange={(e) => {
					                    			e.preventDefault()
					                    			var cardNumber = e.target.value.replace(/ /g, '');
													if (cardNumber.length > 0){
														cardNumber = cardNumber.match(new RegExp('.{1,4}', 'g')).join(' ');
													}
					                    			this.setCardState('cardNumber', cardNumber)
					                    		}}  />
											{cardNumberMessage}
										</div>
									  	<div className="col-md-6 mb-3">
											<label for="cc-name">Name on the card</label>
											<input className="form-control" id="cc-name" placeholder="First name Last name" required="" type="text" value={this.props.nameOnCard} 
												onChange={(e) => {
													e.preventDefault()
						                			this.setCardState('nameOnCard', e.target.value)
						                		}} />
											<small className="text-muted">Full name as displayed on card</small>
									  	</div>
									</div>
									<div className="row">
									  	<div className="col-md-6 mb-6">
											<label for="cc-expiration">Expiry Date <small>(VALID THRU)</small></label>
											<input className="form-control" id="cc-expiration" placeholder="MM/YY" required="" type="text" value={this.props.cardExpDate} 
												onChange={(e)=>{
						                    		this.setCardState('cardExpiryDate', e.target.value)
						                    	}} />
											{cardExpiryMessage}
									  	</div>
									  	<div className="col-md-3 mb-3">
											<label for="cc-expiration">CVV</label>
											<input className="form-control" id="cc-cvv" placeholder="***" required="" type="password" value={this.props.cardSecurityCode} 
												onChange={(e)=>{
						                    		this.setCardState('cardSecurityCode', e.target.value)
						                    	}} />
											{cardSecurityCodeMessage}
									  	</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="submit">
						<button className="btn btn-primary" type="submit" onClick={this.handlePayment}>Continue to checkout</button>
						<button type="button" className="btn btn-link" onClick={this.goBack}>Go Back</button>
					</div>
					<form id='juspay-payment-form' action={this.props.endpoint + '/txns'} method='post'>
						<input type='hidden' name='order_id' value={this.props.orderId} />
						<input type='hidden' name='merchant_id' value={this.props.merchantId} />
						<input type='hidden' id='juspay-payment-method-type' name='payment_method_type' value={this.props.paymentMethodType} />
						<input type='hidden' id='juspay-payment-method' name='payment_method' value={this.props.paymentMethod} />
						<input type='hidden' name='redirect_after_payment' value='true' />
					</form>
					<form id='juspay-card-payment-form' action={this.props.endpoint + '/txns'} method='post'>
						<input type='hidden' name='order_id' value={this.props.orderId} />
						<input type='hidden' name='merchant_id' value={this.props.merchantId} />
						<input type='hidden' name='payment_method_type' value='CARD' />
						<input type='hidden' id='juspay-card-number' name='card_number' value='' />
						<input type='hidden' id='juspay-name-on-card' name='name_on_card' value='' />
						<input type='hidden' id='juspay-card-exp-year' name='card_exp_year' value='' />
						<input type='hidden' id='juspay-card-exp-month' name='card_exp_month' value='' />
						<input type='hidden' id='juspay-card-security-code' name='card_security_code' value='' />
						<input type='hidden' name='redirect_after_payment' value='true' />
					</form>
				</div>
			);
		} else if(this.props.loader) {
			return (
				<div className="col-8 leftCol padB60">
					<StepWizard customerClass="btn-primary fade" customerInfoDisabled={false} customerInfoText="&#10003;" customerTextClass="fade"
						shippingClass="btn-primary fade" shippingInfoDisabled={false} shippingInfoText="&#10003;"  shippingTextClass="fade"
						paymentClass="btn-primary" paymentDisabled={true} paymentText="" paymentTextClass=""/>
					<div className="payOptions">
						<Loader message="Please wait while we redirect you to payment page..."/>
					</div>
					<form id='juspay-payment-form' action={this.props.endpoint + '/txns'} method='post'>
						<input type='hidden' name='order_id' value={this.props.orderId} />
						<input type='hidden' name='merchant_id' value={this.props.merchantId} />
						<input type='hidden' id='juspay-payment-method-type' name='payment_method_type' value={this.props.paymentMethodType} />
						<input type='hidden' id='juspay-payment-method' name='payment_method' value={this.props.paymentMethod} />
						<input type='hidden' name='redirect_after_payment' value='true' />
					</form>
					<form id='juspay-card-payment-form' action={this.props.endpoint + '/txns'} method='post'>
						<input type='hidden' name='order_id' value={this.props.orderId} />
						<input type='hidden' name='merchant_id' value={this.props.merchantId} />
						<input type='hidden' name='payment_method_type' value='CARD' />
						<input type='hidden' id='juspay-card-number' name='card_number' value='' />
						<input type='hidden' id='juspay-name-on-card' name='name_on_card' value='' />
						<input type='hidden' id='juspay-card-exp-year' name='card_exp_year' value='' />
						<input type='hidden' id='juspay-card-exp-month' name='card_exp_month' value='' />
						<input type='hidden' id='juspay-card-security-code' name='card_security_code' value='' />
						<input type='hidden' name='redirect_after_payment' value='true' />
					</form>
				</div>
			)
		} else {
			return (
				<div />
			)
		}
	}
}

export default connect(mapStateToProps, actions)(PaymentView)