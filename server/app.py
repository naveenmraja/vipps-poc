from flask import Flask, render_template, request, redirect, Response
import os
import json
import juspay as juspay
import JuspayConfig
import random
import time
import urllib
import hmac
import hashlib
import base64

app = Flask(__name__)
app.config['DEBUG'] = True

juspay.environment = JuspayConfig.environment
juspay.api_key = JuspayConfig.api_key

merchant_id = JuspayConfig.merchant_id
return_url = JuspayConfig.return_url

# TODO : Implement a logger

def generateRandomReferenceId(prefix) :
	return prefix + str(random.randint(1000000,9999999))

@app.route("/",defaults={'path': ''})
@app.route('/<path:path>')
def home(path) :
	return render_template('index.html')

def isAvailable(param) :
	if param and param is not None :
		return True
	else :
		return False

@app.route("/orders/create", methods = ["POST"])
def create_order() :
	amount = request.json.get('amount')
	customer_email = ''
	customer_phone = ''
	if isAvailable(request.json.get('customer_email')) :
		customer_email = request.json.get('customer_email')
	if isAvailable(request.json.get('customer_phone')) :
		customer_phone = request.json.get('customer_phone')
	order_id = generateRandomReferenceId('VIPPSPOC')
	try :
		params = {
		'order_id' : order_id,
		'amount' : float(amount),
		'customer_email' : customer_email,
		'customer_phone' : customer_phone,
		'return_url' : return_url.replace(':orderId', order_id)
		}
		order = juspay.Orders.create(**params)
		resp = {
		'order_id' : order.order_id,
		'status' : order.status,
		'payment_links' : vars(order.payment_links)
		}
		return Response(json.dumps(resp), mimetype='application/json')
	except Exception as e :
		return Response(json.dumps({'error' : 'Error while creating order'}), mimetype='application/json')


@app.route("/orders/<order_id>", methods = ["GET"])
def get_order_status(order_id) :
	try : 
		order = juspay.Orders.status(order_id = order_id)
		resp = {
		'order_id' : order.order_id,
		'status' : order.status,
		'amount' : order.amount,
		'customer_email' : order.customer_email
		}
		return Response(json.dumps(resp), mimetype='application/json')
	except Exception as e :
		return Response(json.dumps({'error' : 'Error while getting order'}), mimetype='application/json')

port = int(os.environ.get('PORT', 5000))
if __name__ == "__main__" :
    app.run(port=port)