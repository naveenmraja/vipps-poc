import { handleActions } from 'redux-actions'
import {
	UPDATE_ACTIVE_SCREEN,
	UPDATE_SELECTED_PAYMENT_METHOD,
	UPDATE_PAYMENT_METHOD,
	UPDATE_PAYMENT_METHOD_TYPE,
	UPDATE_CARD_NUMBER,
	UPDATE_NAME_ON_CARD,
	UPDATE_CARD_EXPIRY_MONTH,
	UPDATE_CARD_EXPIRY_YEAR,
	UPDATE_CARD_EXPIRY_DATE,
	UPDATE_CARD_SECURITY_CODE,
	UPDATE_CARD_VALIDATION,
	UPDATE_CUSTOMER_PHONE_VALIDATION,
	RESET_CHECKOUT_DETAILS_STATE
} from '../constants/ActionTypes'

const initialState = {
	activeScreen : 'customerInfo',
	selectedPaymentMethod : '',
	paymentMethod : '',
	paymentMethodType : '',
	cardNumber : '',
	nameOnCard : '',
	cardExpYear : '',
	cardExpMonth : '',
	cardExpDate : '',
	cardSecurityCode : '',
	cardValidation : {
		cardExpiryMonthEmpty : false,
		cardExpiryYearEmpty : false,
		cardSecurityCodeEmpty : false,
		cardNumberEmpty : false,
		cardExpiryMonthInvalid : false,
		cardExpiryYearInvalid : false,
		cardSecurityCodeInvalid : false,
		cardNumberInvalid : false
	},
	customerPhoneValidation : {
		customerPhoneEmpty : false,
		customerPhoneInvalid : false
	}
}

export default handleActions({
	[UPDATE_ACTIVE_SCREEN] : (state, {payload}) => {
		return Object.assign({}, state, {activeScreen : payload})
	},
	[UPDATE_SELECTED_PAYMENT_METHOD] : (state, {payload}) => {
		return Object.assign({}, state, {selectedPaymentMethod : payload})
	},
	[UPDATE_PAYMENT_METHOD] : (state, {payload}) => {
		return Object.assign({}, state, {paymentMethod : payload})
	},
	[UPDATE_PAYMENT_METHOD_TYPE] : (state, {payload}) => {
		return Object.assign({}, state, {paymentMethodType : payload})
	},
	[UPDATE_CARD_NUMBER] : (state, {payload}) => {
		return Object.assign({}, state, {cardNumber : payload})
	},
	[UPDATE_NAME_ON_CARD] : (state, {payload}) => {
		return Object.assign({}, state, {nameOnCard : payload})
	},
	[UPDATE_CARD_EXPIRY_MONTH] : (state, {payload}) => {
		return Object.assign({}, state, {cardExpMonth : payload})
	},
	[UPDATE_CARD_EXPIRY_YEAR] : (state, {payload}) => {
		return Object.assign({}, state, {cardExpYear : payload})
	},
	[UPDATE_CARD_EXPIRY_DATE] : (state, {payload}) => {
		return Object.assign({}, state, {cardExpDate : payload})
	},
	[UPDATE_CARD_SECURITY_CODE] : (state, {payload}) => {
		return Object.assign({}, state, {cardSecurityCode : payload})
	},
	[UPDATE_CARD_VALIDATION] : (state, {payload}) => {
		return Object.assign({}, state, {cardValidation : payload})
	},
	[UPDATE_CUSTOMER_PHONE_VALIDATION] : (state, {payload}) => {
		return Object.assign({}, state, {customerPhoneValidation : payload})
	},
	[RESET_CHECKOUT_DETAILS_STATE] : (state, {payload}) => {
		return Object.assign({}, state, initialState)
	}
}, initialState)