// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";

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

//Initialize Authentication Login
const auth = getAuth();

//Local Testing

//connectAuthEmulator(auth, "http://localhost:9099");

const loginEmailPasword = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;

  try{
    const userCredentials = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredentials.user);
    console.log("LOGIN SUCESSFUL");
    window.location.replace('/test-database.html');
  }
  catch(error){
    console.log(error);
    alert("INVALID USERNAME OR PASSWORD");
  }

};

if(window.location.pathname == "/login.html"){
  btnLogin.addEventListener("click", loginEmailPasword);
}
//Initialize Authentication Sign Up
const createAccount = async () => {
  const accountEmail = signupEmail.value;
  const accountPassword = signupPassword.value;
  try{
    const userCredentials = await createUserWithEmailAndPassword(auth, accountEmail, accountPassword);
    console.log(userCredentials.user);
    console.log("ACCOUNT CREATED");
    window.location.replace('/test-database.html');
  }
  catch(error){
    console.log(error);
    alert("INVALID USERNAME OR PASSWORD");
  }
}

if(window.location.pathname == "/login.html"){
  btnSignup.addEventListener("click", createAccount);
}


const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if(user) {
      console.log(user);
    }
    else{
      console.log("Not signed in");
      if(window.location.pathname == "/test-database.html"){
        window.location.replace('/login.html');
      }
    }
  });
}
monitorAuthState();

//Initialize Authentication Sign Out
const logout = async () => {
  await signOut(auth);
  window.location.replace('/login.html');
}
if(window.location.pathname == "/test-database.html"){
  btnSignout.addEventListener("click", logout);
}

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