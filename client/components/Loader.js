import React, { Component } from 'react';
import '../styles/style.css'

export default class Loader extends Component {
	render() {
		return (
			<div className="loaderContainer">
				<div className="loader" />
				<p className="loaderText">{this.props.message}</p>
			</div>
		);
	}
}
