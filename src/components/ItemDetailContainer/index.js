
import { useState, useEffect } from "react";
import products from "../../products/products";
import { useParams } from "react-router-dom";
import { Card,} from 'react-bootstrap';
import Button from "react-bootstrap";
import ItemCount from "../ItemCount";
import { useContext } from "react";
import cartContext from "../../context/cartContext";
import Loader from "../Loader";


//firebase config 

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKQfeeuPSV5lnYATKtxO8l_3Y6URUdWwI",
  authDomain: "reactproyecto-39575.firebaseapp.com",
  projectId: "reactproyecto-39575",
  storageBucket: "reactproyecto-39575.appspot.com",
  messagingSenderId: "763696675547",
  appId: "1:763696675547:web:ea4229aaa6ed77fa732afe"
};




// Initialize Firebase


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getSingleItemFromDatabase(idItem) {
 
  const productsColectionRef = collection(db, "products");
  const docRef = doc(productsColectionRef, idItem);


  const docSnapshot = await getDoc(docRef);

  
  if (docSnapshot.exists() === false) 
    throw new Error("No existe el documento") 

  return { ...docSnapshot.data(), id: docSnapshot.id };
}

//opcional


/*const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getSingleItemFromDatabase(idItem) {
  // referencia de la colección y del documento
  const productsColectionRef = collection(db, "products");
  const docRef = doc(db, "products", idItem);

  // getDoc -> datos
  const docSnapshot = await getDoc(docRef);

  // extra
  if (docSnapshot.exists() === false) 
    throw new Error("No existe el documento") 

  return { ...docSnapshot.data(), id: docSnapshot.id };
}*/



/*function getSingleItemFromDatabase (idItem) {
  return new Promise((resolve, reject) => {
  setTimeout (() => {
    let encontrado = products.find((item) => item.id === Number(idItem));
    
    resolve(encontrado);
  } , 1000 );
});


}
*/

function ItemDetailContainer({}) {
  const [user, setUser] = useState({});


  getSingleItemFromDatabase ()
  const params = useParams();
  const idUser = params.idUser;


  useEffect(() => {
   getSingleItemFromDatabase(idUser).then(respuesta => {setUser(respuesta)})
  }, []);

  const { addItem } = useContext(cartContext);

  function onAddToCart(count) {
    alert(`Agregaste ${count} items al carrito`);
    addItem(user, count);
  }


  if (user.first_name===undefined)
  return <Loader/>






  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={user.avatar} />
        <Card.Body>
          <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
          <Card.Text>
          <small>{user.price}</small>
          
          
          
          <ItemCount onAddToCart={onAddToCart} initial={1} stock={user.stock} />
      
          </Card.Text> 
        </Card.Body>
      </Card>
    </>
  );
}

export default ItemDetailContainer;