import React, { useState } from "react";
import { createOrder } from "../../services/firestore";
import { useNavigate } from "react-router-dom";

function CheckoutCart({ cart, total }) {
  const [orderId, setOrderId] = useState(null);
  const navigateTo = useNavigate();

  async function handleCheckout() {
    
    const orderData = {
      buyer: { name: "", phone: "", email: "" },
      items: cart,
      total: total,
      timestamp: new Date(),
    };
   
     const id = await createOrder(orderData);   

   
    navigateTo(`/checkout/${id}`)   

    
  }

  return (
  <div>
    {/* Formulario */}
    <button onClick={handleCheckout}>Terminar Compra</button>
  </div>
  )
}

export default CheckoutCart;