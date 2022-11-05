// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
//import 'bootstrap/dist/css/bootstrap.css';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ5qRQ_Wj6uidTds4zrAySVhSSZlAPrGk",
  authDomain: "final-project-9b3c9.firebaseapp.com",
  projectId: "final-project-9b3c9",
  storageBucket: "final-project-9b3c9.appspot.com",
  messagingSenderId: "301025290077",
  appId: "1:301025290077:web:088624a5e6aeb37ba2eab4",
  measurementId: "G-P9V184X1V5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initialize Firestore
const db = getFirestore();
const colRef = collection(db, "test-collection");
//const testCollection = doc(db, 'test-collection/test-names');

//Get Collection Data
getDocs(colRef)
  .then((snapshot) => {
    let names = [];
    snapshot.docs.forEach((doc) => {
      names.push({...doc.data(), id: doc.id })
    })
    console.log(names)
  })
  .catch(err => {
    console.log(err.message)
  });

//Writing to Firestore test-collection doc
 function writeNames(){
  const docData = {
    firstName: "John",
    lastName: "Smith" 
  }
  setDoc(testCollection, docData, {merge: true})
    .then(() => {
      console.log("The value has been written to the database");
    })
    .catch((error) => {
      console.log(`Error adding data: ${error}`);
    });
   } 

//writeNames();
