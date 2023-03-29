
import { useState, useEffect } from "react";
import ItemList from "../ItemList";
import products from "../../products/products";
import { useParams } from "react-router-dom";
import Loader from "../Loader";



//confif firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
console.log ("Firebase ->",app)
const db = getFirestore(app);


async function getItemsFromDatabase() {
  const productsColectionRef = collection(db, "products");
  let snapshotProducts = await getDocs(productsColectionRef);
  const documents = snapshotProducts.docs;

  const dataProducts = documents.map((doc) => ({ ...doc.data(), id: doc.id }));
  return dataProducts;
}

async function getItemsByCategoryFromDatabase(categoryURL) {
  const productsColectionRef = collection(db, "products");

  const q = query(productsColectionRef, where("category", "==", categoryURL));

  let snapshotProducts = await getDocs(q);
  const documents = snapshotProducts.docs;
  const dataProducts = documents.map((doc) => ({ ...doc.data(), id: doc.id }));
  return dataProducts;
}



//hasta aca 




/*
function getItemsFromDatabase () {
  return new Promise((resolve, reject) => {
  setTimeout (() => {
    resolve(products);
  } , 1000 );
});


}
*/
/*
function getItemsByCategoryFromDatabase (categoryURL) {
  return new Promise((resolve, reject) => {
  setTimeout (() => {
    let productsFiltered = products.filter( item => item.category === categoryURL)
    resolve(productsFiltered);
  } , 1000 );
});

}
*/

function ItemListContainer({ greeting }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 const params = useParams();
 const idCategory = params.idCategory

 async function leerDatos(){
  if(idCategory === undefined){
    let respuesta = await getItemsFromDatabase();
    setUsers(respuesta);
    setIsLoading(false);
  }
  else{
    let respuesta = await getItemsByCategoryFromDatabase(idCategory)
    setUsers(respuesta);
    setIsLoading(false);
   }

  }
 

 useEffect(() => {
  leerDatos();

 },[idCategory]);

  return (
    <>
      <h2>{greeting}</h2>
      {
        isLoading? <Loader/>: <ItemList users={users} />
    }
    </>
  );
}

export default ItemListContainer;
