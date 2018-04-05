import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {
	CREATING,
	NEW
} from '../constants/Status'
import { 
	actions as actions 
} from '../actions/MainActions'
import '../styles/style.css'

const mapStateToProps = (state) => ({
	amount : state.orderDetails.amount,
	status : state.orderDetails.status,
	loader : state.orderDetails.loader
})

class HomeView extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.updateAmount("300")
		this.props.hideLoader()
	}

	handleClick = (e) => {
		this.props.resetState()
		browserHistory.push('/checkout')
	}

	render() {
		return (
			<div className="homeContainer">
				<div className="row">
					<div className="col-md-4">
						<div className="card mainPic">
							<img src='/static/tee-front.jpg' style={{width: '100%', height: '100%'}} />
						</div>
					</div>
					<div className="col-md-6">
						<div className="teeTitle">
							<h1>Adidas T-shirt</h1>
						</div>
						<div className="starGroup">
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
						</div>
						<div className="teeAmount">
							<h3>300 kr</h3>
						</div>
						<div className="teeDesc">
							<p>Vipps provides an end-to-end online payments solution. We accept and validate Internet payments via Vipps Now, Vipps Later and Credit Card.</p>
						</div>
						<div>
							<button className="btn btn-default" type="button" onClick={this.handleClick}>Buy Now</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, actions)(HomeView)
