import { handleActions } from 'redux-actions'
import {
	UPDATE_ORDER_ID,
	UPDATE_AMOUNT,
	CREATE_ORDER,
	ORDER_CREATE_SUCCESSFUL,
	ORDER_CREATE_FAILED,
	SYNC_ORDER_DETAILS,
	SHOW_LOADER,
	HIDE_LOADER,
	UPDATE_CUSTOMER_FIRST_NAME,
	UPDATE_CUSTOMER_LAST_NAME,
	UPDATE_CUSTOMER_ADDRESS,
	UPDATE_CUSTOMER_POSTAL_ADDRESS,
	UPDATE_CUSTOMER_PHONE,
	UPDATE_SHIPPING_ADDRESS,
	UPDATE_SHIPPING_COUNTRY,
	UPDATE_SHIPPING_CITY,
	UPDATE_SHIPPING_POSTAL_ADDRESS,
	UPDATE_SHIPPING_EMAIL,
	RESET_ORDER_DETAILS_STATE
} from '../constants/ActionTypes'
import {
	SUCCESS,
	PENDING,
	FAILED,
	NEW,
	CREATING,
	INVALID
} from '../constants/Status'
import {
	MERCHANT_NAME,
	MERCHANT_ID,
	ENDPOINT
} from '../constants/config'

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initialState = {
	orderId : 'VIPPSPOC' + getRandomInt(10000,1000000000),
	merchantId : MERCHANT_ID,
	endpoint : ENDPOINT,
	merchantName : MERCHANT_NAME,
	amount : '300',
	status : INVALID,
	loader : false,
	customerFirstName : '',
	customerLastName : '',
	customerAddress : '',
	customerPostalAddress : '',
	customerPhone : '',
	shippingAddress : '',
	shippingCountry : '',
	shippingCity : '',
	shippingPostalAddress : '',
	shippingEmail : ''
}

export default handleActions({
	[UPDATE_ORDER_ID] : (state, {payload}) => {
		return Object.assign({}, state, {orderId : payload})
	},
	[UPDATE_AMOUNT] : (state, {payload}) => {
		return Object.assign({}, state, {amount : payload})
	},
	[CREATE_ORDER] : (state) => {
		return Object.assign({}, state, {status : CREATING, invalidAmount : false})
	},
	[ORDER_CREATE_SUCCESSFUL] : (state, {payload}) => {
		return Object.assign({}, state, {
			status : NEW, 
			orderId : payload.order_id
		})
	},
	[ORDER_CREATE_FAILED] : (state) => {
		return Object.assign({}, state, {status : INVALID})
	},
	[SYNC_ORDER_DETAILS] : (state, {payload}) => {
		return Object.assign({}, state, {
			status : payload.status,
			orderId : payload.order_id,
			amount : payload.amount,
			shippingEmail : payload.customer_email
		})
	},
	[SHOW_LOADER] : (state) => {
		return Object.assign({}, state, {loader : true})
	},
	[HIDE_LOADER] : (state) => {
		return Object.assign({}, state, {loader : false})
	},
	[UPDATE_CUSTOMER_FIRST_NAME] : (state, {payload}) => {
		return Object.assign({}, state, {customerFirstName : payload})
	},
	[UPDATE_CUSTOMER_LAST_NAME] : (state, {payload}) => {
		return Object.assign({}, state, {customerLastName : payload})
	},
	[UPDATE_CUSTOMER_ADDRESS] : (state, {payload}) => {
		return Object.assign({}, state, {customerAddress : payload})
	},
	[UPDATE_CUSTOMER_POSTAL_ADDRESS] : (state, {payload}) => {
		return Object.assign({}, state, {customerPostalAddress : payload})
	},
	[UPDATE_CUSTOMER_PHONE] : (state, {payload}) => {
		return Object.assign({}, state, {customerPhone : payload})
	},
	[UPDATE_SHIPPING_ADDRESS] : (state, {payload}) => {
		return Object.assign({}, state, {shippingAddress : payload})
	},
	[UPDATE_SHIPPING_COUNTRY] : (state, {payload}) => {
		return Object.assign({}, state, {shippingCountry : payload})
	},
	[UPDATE_SHIPPING_CITY] : (state, {payload}) => {
		return Object.assign({}, state, {shippingCity : payload})
	},
	[UPDATE_SHIPPING_POSTAL_ADDRESS] : (state, {payload}) => {
		return Object.assign({}, state, {shippingPostalAddress : payload})
	},
	[UPDATE_SHIPPING_EMAIL] : (state, {payload}) => {
		return Object.assign({}, state, {shippingEmail : payload})
	},
	[RESET_ORDER_DETAILS_STATE] : (state, {payload}) => {
		return Object.assign({}, state, initialState)
	}
}, initialState)