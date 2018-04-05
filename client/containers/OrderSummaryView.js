import React, { Component } from 'react';
import { connect } from 'react-redux'
import { actions as actions } from '../actions/MainActions'
import '../styles/style.css'

const mapStateToProps = (state) => ({
	orderId : state.orderDetails.orderId,
	amount : state.orderDetails.amount
})

class OrderSummaryView extends Component {

	constructor(props) {
		super(props)
	}

	handleVoucherClick = (e) => {
		e.preventDefault()
	}

	render() {
		return (
			<div className="col-4 rightCol">
				<div className="orderSummary">
					<h5><strong>Order Summary</strong></h5>
					<h6 className="small">Order ID: {this.props.orderId}</h6>
					<h6 className="small">{new Date().toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second : 'numeric', hour12 : true})}</h6>
				</div>
				<div className="orderAmount">
					<ul className="list-group mb-3">
						<li className="list-group-item d-flex justify-content-between lh-condensed">
						  	<div>
								<h6 className="my-0">Subtotal</h6>
						  	</div>
						  	<span className="text-muted">{this.props.amount} kr</span>
						</li>
						<li className="list-group-item d-flex justify-content-between lh-condensed">
						  	<div>
								<h6 className="my-0">Shipping</h6>
						  	</div>
						  	<span className="text-muted">Free</span>
						</li>
						<li className="list-group-item d-flex justify-content-between lh-condensed voucher">
						  	<div>
								<span className="d-inline-block m-0 align-top">
									<img src="/static/voucher_tag.png" width="23px" height="15px" />
								</span>
								<span className="p-1 my-0">Voucher</span>
						  	</div>
						  	<form className="p-0 col-6">
								<div className="input-group">
							  		<input className="form-control" placeholder="Type Code" type="text" />
							  		<div className="input-group-append">
										<button type="submit" className="btn btn-secondary" onClick={this.handleVoucherClick}>ADD</button>
							  		</div>
								</div>
      						</form>
						</li>
						<li className="list-group-item d-flex justify-content-between">
						  <span>Total</span>
						  <span>{this.props.amount} kr</span>
						</li>
					  </ul>
				</div>	
			</div>
		)
	}
}

export default connect(mapStateToProps, actions)(OrderSummaryView)