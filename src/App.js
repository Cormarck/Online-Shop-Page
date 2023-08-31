


function App({shoppingCart,shoppingCartFunctions}) {
  return (
    <>
      <button onClick={() => {shoppingCartFunctions.set(1,5)}}>add</button>
      <button onClick={() => {shoppingCartFunctions.set(1,2)}}>add2</button>
      <button onClick={() => {shoppingCartFunctions.set(3,1)}}>add3</button>
      <button onClick={() => {shoppingCartFunctions.delete(1)}}>delete</button>
    </>
  );
}

export default App;
