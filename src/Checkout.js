import PaypalButton from "./components/paypal_button";

// vor der Weiterleitung zum Checkout shoppingCart prüfen!!!

function Checkout({shoppingCart,shoppingCartFunctions}) {
    let array = [];
    shoppingCart.forEach((values, keys) => {array.push({id:keys,amount:values})});
    console.log(array);

  return (
    <>
    <PaypalButton shoppingCartArray = {array} shoppingCartFunctions = {shoppingCartFunctions}/>
    <button onClick={() => {console.log(shoppingCart)}}>look</button>
    </>
  );
}

export default Checkout;
