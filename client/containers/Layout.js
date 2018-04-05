import React, { Component } from 'react'
import Header from '../components/Header'

export default class Layout extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		var path = this.props.location.pathname
		var logo = "/static/amazon-logo.png"
		var logoText = ""
		if(path.includes("checkout")) {
			logo = "/static/vipps-logo.svg"
			logoText="Checkout"
		}
		return (
			<div className="layout">
				<Header logo={logo} logoText={logoText}/>
				{this.props.children}
			</div>
		);
	}
}