import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider, route}  from "react-router-dom";
import Checkout from './Checkout';

//Shopping Cart--------------------------------------------------------------------------------
let shoppingCart;
if (localStorage.getItem("shoppingCart")){
    let data = JSON.parse(localStorage.getItem("shoppingCart"));
    let array = data.content;
    shoppingCart = new Map(array.map(element => [element.keys,element.values]));
} else { shoppingCart = new Map();}

let shoppingCartFunctions = {
      set: function(id,amount) {
        shoppingCart.set(id,amount); 
        console.log(shoppingCart);
        if(localStorage) {
          let array =[];
          shoppingCart.forEach((values, keys) => {array.push({keys,values})});
          console.log(array);
          localStorage.setItem("shoppingCart", JSON.stringify({content:array}))
        }
      },
      delete: function(id) {
        shoppingCart.delete(id);
        console.log(shoppingCart);
        if(localStorage) {
          let array =[];
          shoppingCart.forEach((values, keys) => {array.push({keys,values})});
          console.log(array);
          localStorage.setItem("shoppingCart", JSON.stringify({content:array}))
        }
      },
      clear: function() {
        shoppingCart.clear(); 
        console.log(shoppingCart);
        if(localStorage) {localStorage.removeItem("shoppingCart")}
      }
    }
// --------------------------------------------------------------------------------------------


const router = createBrowserRouter ([
  {
    path: "/",
    element: <App shoppingCart = {shoppingCart} shoppingCartFunctions = {shoppingCartFunctions}/>
  },
  {
    path: "/checkout",
    element: <Checkout shoppingCart = {shoppingCart} shoppingCartFunctions = {shoppingCartFunctions}/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
