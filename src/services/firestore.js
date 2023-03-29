import { initializeApp } from "firebase/app";
import {getFirestore,addDoc,doc,collection,writeBatch,} from "firebase/firestore";
import products from "../products/products";

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

export async function createOrder(orderData) {
  const collectionRef = collection(db, "orders");

  console.log(orderData);

  const response = await addDoc(collectionRef, orderData);
  console.log("Orden creada correctamente", response.id);

  return response.id;
}


export async function exportData() {
 
  const collectionRef = collection(db, "products");

  for (let item of products) {
    const { id } = await addDoc(collectionRef, item);
    console.log("Documento creado", id);
  }
}

export async function exportDataWithBatch() {
  const batch = writeBatch(db);
  const collectionRef = collection(db, "products");

  for (let item of products) {
    const newDoc = doc(collectionRef);
    batch.set(newDoc, item);
  }

  const resp = await batch.commit();
  console.log(resp);
}