// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";

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
    const userCredentials = await createUserWithEmailAndPassword(auth, accountEmail, accountPassword)
    .then(async (result) => {
      return await updateProfile(result.user, { 
        displayName: signupEmail.value.split("@")[0] 
      })
    }).catch((err) => {
      console.log(err);
    });
    console.log(userCredentials.user);
    console.log("ACCOUNT CREATED");
    window.location.replace('/feed');
  }
  catch(error){
    console.log(error);
    alert("ACCOUNT CREATION FAILED");
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

// Restrict the /create page to a logged in user only
// TODO: Use Firebase to authenticate server-side because it's much
//       easier to work with imo
//    ref: https://fireship.io/snippets/express-middleware-auth-token-firebase/
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

if(window.location.pathname == "/create"){
  if (await getCurrentUser()) {
    // pass
  } else {
    alert("Please sign-in at /login to create posts!");
    window.location.replace('/login');
  }
};