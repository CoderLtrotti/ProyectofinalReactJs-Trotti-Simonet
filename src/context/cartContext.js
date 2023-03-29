import { createContext, useState } from "react";


const cartContext = createContext({ cart: [] });
const Provider = cartContext.Provider;


export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addItem(item, count) {
    const newCart = JSON.parse(JSON.stringify(cart));

    if (isInCart(item.id)) {
      
      let index = cart.findIndex((itemInCart) => itemInCart.id === item.id);
      newCart[index].count = newCart[index].count + count;
    } else {
      newCart.push({ ...item, count });
    }
    setCart(newCart);
  }



  function removeItemFromCart(id) {
    /* eliminar/filtrar items con id recibido */
    /* ESTO ESTÁ MALLL  */
    const newCart = JSON.parse(JSON.stringify(cart));
    newCart.pop();
    setCart(newCart);
  }

  function getCountInCart() {
    /* reduce */
    let total = 0;
    //for(let i = 0; i < cart.length; i++)
    cart.forEach((item) => total + item.count);
    return total;
 }

  function getPriceInItem(id) {
    let total = 0;
    cart.forEach((item) => {
        if(item.id == id){
            total = (item.count * item.price)
        }
        
    });
    return total;
  }


  function getPriceInCart() {
    let total = 0
    cart.forEach((item) => total += getPriceInItem(item.id));
    return total;
  }

  /*function getPriceInCart() {
    return 5600;
  }*/

  function isInCart(id) {
    return cart.some((item) => item.id === id);
  }

  return (
    <Provider
      value={{
        cart,
        addItem,
        test: "ok",
        isInCart,
        removeItemFromCart,
        getPriceInCart,
        getPriceInItem,
        
      }}
    >
      {children}
    </Provider>
  );
}

export default cartContext;