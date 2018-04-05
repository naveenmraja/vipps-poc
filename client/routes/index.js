import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers/index'

import Layout from '../containers/Layout'
import HomeView from '../containers/HomeView'
import CheckoutView from '../containers/CheckoutView'
import PaymentReceiptView from '../containers/PaymentReceiptView'

const store = createStore(
	rootReducer,
	applyMiddleware(thunk)
)

var routes = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={Layout}>
				<IndexRoute component={HomeView} />
				<Route path='/checkout' component={CheckoutView} />
				<Route path='/orders/:orderId/receipt' component={PaymentReceiptView} />
				<Route path='*' component={HomeView} />
			</Route>
		</Router>
	</Provider>
);

module.exports = routes;