import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import useFetch from 'react-fetch-hook';
import { useState } from "react";
//--------------------------------------------------------------------------------------------



let PaypalButton = function ({shoppingCartArray,shoppingCartFunctions}) {

let [buttonsNeeded, setButtonsNeeded] = useState(true);

let finishUp = function () {
    shoppingCartFunctions.clear();
    setButtonsNeeded(false);
}
// paypal button functions -------------------------------------
    let createOrder = async function() {
        let res = await fetch("/create_order", {
            method: "post", 
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({shoppingCartArray})
        });
        // just id needed
        let order = await res.json(); // returns order
        return order.id; // returns the ID of the Order
    }

    let onApprove = async function(data,actions) {
        let approveFunction = async function () {
        let orderID = data.orderID; // Antwort kommt vom Paypal Server zurück; muss so aussehen
        let res = await fetch("/complete_order", {
            method: "post", 
            headers: { "Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({orderID})
        });
        let order_details = await res.json();
        console.log(order_details); //https://developer.paypal.com/docs/api/orders/v2/#orders_capture!c=201&path=create_time&t=response
        //let intent_object = intent === "authorize" ? "authorizations" : "capture"; // nicht verwendet?
        //Custom Successful Message
        let alerts = document.querySelector("#paypal_alerts");
        alerts.innerHTML = `<p>Thank You!</p>`;
        // Close out the PayPal Buttons that were rendered
        finishUp();
        // shoppingCart = [] ; leeren
        }
        approveFunction()
        .catch((error) => {
            console.log(error);
            let alerts = document.querySelector("#paypal_alerts");
            alerts.innerHTML = `<p>An Error Ocurred!</p>`;
        });

    }

    let onCancel = function () { // wenn das Fenster geschlossen wird
        let alerts = document.querySelector("#paypal_alerts");
        alerts.innerHTML = `<p>Order cancelled</p>`;
    }

    let onError = function(err) { // wenn es einen Fehler mit dem Genster gibt?
        console.log(err);
    }

const {isLoading,data} = useFetch ("/getPaypalOptions"); // have to be named isLoading and data

    return isLoading ? (<div>Loading...</div>) : 
    (
        <div>
            <div style= {{display : buttonsNeeded ? 'block' : 'none' }}>
            <PayPalScriptProvider options={data}>
                <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onCancel={onCancel}
                    onError={onError}

                />
            </PayPalScriptProvider>
            </div>
        <div id="paypal_alerts"></div>
        </div>
    );
}

export default PaypalButton;