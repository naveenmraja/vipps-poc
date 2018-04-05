import { combineReducers } from 'redux';
import orderDetails from './OrderDetails'
import checkoutDetails from './CheckoutDetails'

const rootReducer = combineReducers({
	orderDetails,
	checkoutDetails
});

export default rootReducer;