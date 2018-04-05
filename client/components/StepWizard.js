import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions as actions } from '../actions/MainActions'
import '../styles/style.css'

const mapStateToProps = (state) => ({
	activeScreen : state.checkoutDetails.activeScreen
})

class StepWizard extends Component {
	constructor(props) {
		super(props)
	}

	handleSelection = (selectedScreen) => {
		this.props.updateActiveScreen(selectedScreen)
	}

	render() {
		return (
			<div className="stepwizard col-md-offset-3">
				<div className="stepwizard-row setup-panel">
			    	<div className="stepwizard-step">
				        <a className={"btn btn-circle step-btn " + this.props.customerClass} 
				        	disabled={this.props.customerInfoDisabled} 
				        	onClick={() => { this.handleSelection("customerInfo") }}>{this.props.customerInfoText}</a>
				        <p className={"step-text " + this.props.customerTextClass}>CUSTOMER INFO</p>
			    	</div>
			    	<div className="stepwizard-step">
				        <a className={"btn btn-circle step-btn " + this.props.shippingClass} 
				        	disabled={this.props.shippingInfoDisabled} 
				        	onClick={() => { this.handleSelection("shippingInfo") }}>{this.props.shippingInfoText}</a>
				        <p className={"step-text " + this.props.shippingTextClass}>SHIPPING INFO</p>
			    	</div>
			    	<div className="stepwizard-step">
				        <a className={"btn btn-circle step-btn " + this.props.paymentClass} 
				        	disabled={this.props.paymentDisabled} 
				        	onClick={() => { this.handleSelection("payment") }}>{this.props.paymentText}</a>
				        <p className={"step-text " + this.props.paymentTextClass}>PAYMENT</p>
			    	</div>
			    </div>
			</div>
		);
	}
}

export default connect(mapStateToProps, actions)(StepWizard)
