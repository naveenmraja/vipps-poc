import request from 'superagent'
import { createAction } from 'redux-actions'
import {
	UPDATE_ORDER_ID,
	UPDATE_AMOUNT,
	CREATE_ORDER,
	ORDER_CREATE_SUCCESSFUL,
	ORDER_CREATE_FAILED,
	SYNC_ORDER_DETAILS,
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
	UPDATE_CUSTOMER_PHONE_VALIDATION,
	RESET_CHECKOUT_DETAILS_STATE,
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
	GLOBAL_TIME_OUT,
	ORDER_CREATE_URL,
	ORDER_STATUS_URL
} from '../constants/config'

// TODO : Replace all the update actions with a generic action to avoid redundancy

const onUpdateOrderId = createAction(UPDATE_ORDER_ID, data => data)
const onUpdateAmount = createAction(UPDATE_AMOUNT, data => data)
const onCreateOrder = createAction(CREATE_ORDER)
const onOrderCreateSuccessful = createAction(ORDER_CREATE_SUCCESSFUL, data => data)
const onOrderCreateFailed = createAction(ORDER_CREATE_FAILED)
const onSyncOrderDetails = createAction(SYNC_ORDER_DETAILS, data => data)
const onUpdateActiveScreen = createAction(UPDATE_ACTIVE_SCREEN, data => data)
const onupdateSelectedPaymentMethod = createAction(UPDATE_SELECTED_PAYMENT_METHOD, data => data)
const onUpdatePaymentMethod = createAction(UPDATE_PAYMENT_METHOD, data => data)
const onUpdatePaymentMethodType = createAction(UPDATE_PAYMENT_METHOD_TYPE, data => data)
const onUpdateCardNumber = createAction(UPDATE_CARD_NUMBER, data => data)
const onUpdateNameOnCard = createAction(UPDATE_NAME_ON_CARD, data => data)
const onUpdateCardExpiryMonth = createAction(UPDATE_CARD_EXPIRY_MONTH, data => data)
const onUpdateCardExpiryYear = createAction(UPDATE_CARD_EXPIRY_YEAR, data => data)
const onUpdateCardExpiryDate = createAction(UPDATE_CARD_EXPIRY_DATE, data => data)
const onUpdateCardSecurityCode = createAction(UPDATE_CARD_SECURITY_CODE, data => data)
const onUpdateCardValidation = createAction(UPDATE_CARD_VALIDATION, data => data)
const onShowLoader = createAction(SHOW_LOADER)
const onHideLoader = createAction(HIDE_LOADER)
const onUpdateCustomerFirstName = createAction(UPDATE_CUSTOMER_FIRST_NAME, data => data)
const onUpdateCustomerLastName = createAction(UPDATE_CUSTOMER_LAST_NAME, data => data)
const onUpdateCustomerAddress = createAction(UPDATE_CUSTOMER_ADDRESS, data => data)
const onUpdateCustomerPostalAddress = createAction(UPDATE_CUSTOMER_POSTAL_ADDRESS, data => data)
const onUpdateCustomerPhone = createAction(UPDATE_CUSTOMER_PHONE, data => data)
const onUpdateShippingAddress = createAction(UPDATE_SHIPPING_ADDRESS, data => data)
const onUpdateShippingCountry = createAction(UPDATE_SHIPPING_COUNTRY, data => data)
const onUpdateShippingCity = createAction(UPDATE_SHIPPING_CITY, data => data)
const onUpdateShippingPostalAddress = createAction(UPDATE_SHIPPING_POSTAL_ADDRESS, data => data)
const onUpdateShippingEmail = createAction(UPDATE_SHIPPING_EMAIL, data => data)
const onupdateCustomerPhoneValidation = createAction(UPDATE_CUSTOMER_PHONE_VALIDATION, data => data)
const onResetCheckoutDetails = createAction(RESET_CHECKOUT_DETAILS_STATE)
const onResetOrderDetails = createAction(RESET_ORDER_DETAILS_STATE)

const updateAmount = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateAmount(data))
	}
}

const createOrder = (data) => {
	return function(dispatch, getState) {
		dispatch(onShowLoader())
		dispatch(onCreateOrder())
		request.post(ORDER_CREATE_URL)
				.timeout(GLOBAL_TIME_OUT)
				.send(data)
				.end((err, res) => {
					if(err || res.status >= 400) {
						dispatch(onOrderCreateFailed())
						dispatch(onHideLoader())
					} else {
						var response = res.body
						if(response && response.status != 'SUCCESS') {
							dispatch(onOrderCreateSuccessful(response))
						} else {
							dispatch(onOrderCreateFailed())
							dispatch(onHideLoader())
						}
					}
				})
	}
}

const syncOrderDetails = (orderId) => {
	return function(dispatch, getState) {
		dispatch(onShowLoader())
		dispatch(onUpdateOrderId(orderId))
		request.get(ORDER_STATUS_URL.replace(':orderId', orderId))
				.timeout(GLOBAL_TIME_OUT)
				.end((err, res) => {
					if(err || res.status >= 400) {
						dispatch(onHideLoader())
					} else {
						var response = res.body
						dispatch(onSyncOrderDetails(response))
						dispatch(onHideLoader())
					}
				})
	}
}

const showLoader = () => {
	return function(dispatch, getState) {
		dispatch(onShowLoader())
	}
}

const hideLoader = () => {
	return function(dispatch, getState) {
		dispatch(onHideLoader())
	}
}

const updateActiveScreen = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateActiveScreen(data))
	}
}

const updateSelectedPaymentMethod = (data) => {
	return function(dispatch, getState) {
		dispatch(onupdateSelectedPaymentMethod(data))
	}
}

const updatePaymentMethod = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdatePaymentMethod(data))
	}
}

const updatePaymentMethodType = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdatePaymentMethodType(data))
	}
}

const updateCardNumber = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCardNumber(data))
	}
}

const updateNameOnCard = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateNameOnCard(data))
	}
}

const updateExpiryDate = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCardExpiryDate(data))
		var expiry = data.split("/")
		if(expiry.length == 2) {
			dispatch(onUpdateCardExpiryMonth(expiry[0]))
			dispatch(onUpdateCardExpiryYear(expiry[1]))
		}
	}
}

const updateCardSecurityCode = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCardSecurityCode(data))
	}
}

const updateCustomerFirstName = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCustomerFirstName(data))
	}
}

const updateCustomerLastName = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCustomerLastName(data))
	}
}

const updateCustomerAddress = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCustomerAddress(data))
	}
}

const updateCustomerPostalAddress = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCustomerPostalAddress(data))
	}
}

const updateCustomerPhone = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCustomerPhone(data))
	}
}

const updateShippingEmail = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateShippingEmail(data))
	}
}

const updateShippingCity = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateShippingCity(data))
	}
}

const updateShippingCountry = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateShippingCountry(data))
	}
}

const updateShippingAddress = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateShippingAddress(data))
	}
}

const updateShippingPostalAddress = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateShippingPostalAddress(data))
	}
}

const updateCardValidation = (data) => {
	return function(dispatch, getState) {
		dispatch(onUpdateCardValidation(data))
	}
}

const updateCustomerPhoneValidation = (data) => {
	return function(dispatch, getState) {
		dispatch(onupdateCustomerPhoneValidation(data))
	}
}

const resetState = () => {
	return function(dispatch, getState) {
		dispatch(onResetCheckoutDetails())
		dispatch(onResetOrderDetails())
	}
}

export const actions = {
	updateAmount,
	createOrder,
	syncOrderDetails,
	showLoader,
	hideLoader,
	updateActiveScreen,
	updateSelectedPaymentMethod,
	updatePaymentMethod,
	updatePaymentMethodType,
	updateCardNumber,
	updateNameOnCard,
	updateExpiryDate,
	updateCardValidation,
	updateCardSecurityCode,
	updateCustomerFirstName,
	updateCustomerLastName,
	updateCustomerPostalAddress,
	updateCustomerAddress,
	updateCustomerPhone,
	updateShippingAddress,
	updateShippingCountry,
	updateShippingCity,
	updateShippingEmail,
	updateShippingPostalAddress,
	updateCustomerPhoneValidation,
	resetState,
}