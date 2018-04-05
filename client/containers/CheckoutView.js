import React, { Component } from 'react';
import { connect } from 'react-redux'
import { actions as actions } from '../actions/MainActions'
import '../styles/style.css'

import PaymentView from './PaymentView'
import CustomerInfoView from './CustomerInfoView'
import ShippingInfoView from './ShippingInfoView'
import OrderSummaryView from './OrderSummaryView'

const mapStateToProps = (state) => ({
	orderId : state.orderDetails.orderId,
	amount : state.orderDetails.amount
})

class CheckoutView extends Component {
	componentDidMount() {
		this.props.hideLoader()
	}

	render() {
		return(
			<div className="container fullHeight">
				<div className="row fullHeight">
					<PaymentView />
					<CustomerInfoView />
					<ShippingInfoView />
					<OrderSummaryView />
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, actions)(CheckoutView)