// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

//Initialize Authentication Login
const auth = getAuth();

//Local Testing
//connectAuthEmulator(auth, "http://localhost:9099");

const loginEmailPasword = async () => {
  const loginAcountEmail = loginEmail.value;
  const loginAccountPassword = loginPassword.value;

  try{
    const userCredentials = await signInWithEmailAndPassword(auth, loginAcountEmail, loginAccountPassword);
    console.log(userCredentials.user);
    console.log("LOGIN SUCESSFUL");
    window.location.replace('/feed');
  }
  catch(error){
    console.log(error);
    alert("INVALID USERNAME OR PASSWORD");
  }

};

if(window.location.pathname == "/login"){
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
    window.location.replace('/feed');
  }
  catch(error){
    console.log(error);
    alert("INVALID USERNAME OR PASSWORD");
  }
}

if(window.location.pathname == "/login"){
  btnSignup.addEventListener("click", createAccount);
}


const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if(user) {
      console.log(user);
      if(window.location.pathname != '/login'){
        document.getElementById('loginNav').innerHTML = `<a style="padding-right:1.2rem"class="nav-link" href="" id="loginNav">Logout </a>`;
        document.getElementById('loginNav').addEventListener('click', logout);
      }
    }
    else{
      console.log("Not signed in");
      if(window.location.pathname == "/feed" || window.location.pathname == "/create"){
        window.location.replace('/login');
      }
    }
  });
}
monitorAuthState();

//Initialize Authentication Sign Out
const logout = async () => {
  await signOut(auth);
  window.location.replace('/login');
}
if(window.location.pathname == "/create" || window.location.pathname == "/feed"){
  btnSignout.addEventListener("click", logout);
}
