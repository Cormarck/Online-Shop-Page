import "dotenv/config";
import fetch from "node-fetch"; // or use axios to get/post?

export const CLIENT_ID = process.env.CLIENT_ID;
       const APP_SECRET = process.env.APP_SECRET;

export const SDK_URL = "https://www.paypal.com/sdk/js";
export const INTENT = "capture"; // autherize?

// change currency if needed!
export const CURRENCY = "EUR";

const BASE = "https://api-m.sandbox.paypal.com"; // will later be replaced with production API endpoint


// fetch the AccessToken from Paypal --------------------------------------------------
export async function generateAccessToken() {
        const response = await fetch(BASE + "/v1/oauth2/token",{ // you can make dynamic fetches with variables
        method: "post",
        body: "grant_type=client_credentials", // OAuth2.0 Authentications function-Type
        headers: {
            Authorization:
            "Basic " + Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64"),
        },
        });
            const data = await response.json();
            return data.access_token;
        }
// additional Fetches will return the same access_token (as long as valid?)
// ------------------------------------------------------------------------------------


// calling the Paypal Order API-----------------------------------------------------------

// creating an order----------------------------------------------------------------------
export async function createOrder(purchaseArray,intent) { // CC und value determined through frond-End inputs
    const accessToken = await generateAccessToken();
    const url = `${BASE}/v2/checkout/orders`;
    let order_data = {
            intent: intent.toUpperCase(), // intent wird von server aus bereitgestellt
            purchase_units: purchaseArray, // pruchase Array besteht aus allen Dingen die gekauft werden und wird im Server zusammen gestellt
        };
    const data = JSON.stringify (order_data);
    const response = await fetch(url,{
        method:"post",
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${accessToken}`,
        },
        body: data,
    });
    const order = await response.json();
    return order; // gibt ganze order aus; wird im Server auf ID reduziert
}
// creating an order works without futher inputs; just add an Array of purchase units at best
//------------------------------------------------------------------------------------
// capturing a payment -------------------------------------------------------------
export async function capturePayment(orderId,intent) {
    const accessToken = await generateAccessToken();
    const url = `${BASE}/v2/checkout/orders/${orderId}/${intent}`;
    const response = await fetch(url,{
        method:"post",
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return data;
}
// capture payment first needs to be approved
//--------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------

let PAYPAL = {
    CLIENT_ID,
    SDK_URL,
    CURRENCY,
    INTENT,
    generateAccessToken,
    capturePayment,
    createOrder,
};

export default PAYPAL;