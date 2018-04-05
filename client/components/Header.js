import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import '../styles/style.css'

export default class Header extends Component {
	constructor(props) {
		super(props)
	}

	goHome = (e) => {
		e.preventDefault()
		browserHistory.push('/')
	}

	render() {
		return (
			<div className="container-fluid topNav">
				<div className="container">
					<div className="row">
						<nav className="navbar navbar-light bg-light w-100 align-center">
							<a className="navbar-brand" onClick={this.goHome}>
								<img src={this.props.logo} width="100px" height="30" className="d-inline-block" alt="Vipps Checkout" />
								<span className="logoText">{this.props.logoText}</span>
							</a>
							<h5 className="text-right">Need Help - Call <strong>1-800-1800</strong></h5>
						</nav>
					</div>
				</div>
			</div>
		);
	}
}
