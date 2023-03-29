import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartContextProvider } from "./context/cartContext";
import CartContainer from "./components/CartContainer";
import { exportData, exportDataWithBatch } from "./services/firestore";



function App() {
  return (
  
    <CartContextProvider>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={<ItemListContainer greeting={"Bienvenidos"} />}
          />
          {/* URL segments */}
          <Route path="/detalle/:idUser" element={<ItemDetailContainer />} />
          <Route
            path="/category/:idCategory"
            element={<ItemListContainer greeting={"Bienvenidos"} />}  />
          <Route path="/cart" element={ <CartContainer/> }/>
          <Route path="/checkout/:id" element={<h3>Gracias por tu compra</h3>} />




        </Routes>
      </BrowserRouter>
    </CartContextProvider>
  );
}



export default App;
