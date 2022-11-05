import { getFirestore, collection, getDoc } from 'firebase/firestore'

//Initialize Firestore
const firestore = getFirestore();
const colRef = collection(firestore, "test-collection");
const testCollection = doc(firestore, 'test-collection/test-names');

//Get Collection Data
getDoc(colRef)
  .then((snapshot) => {
    console.log(snapshot.docs);
  })

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

//6 min into video
//writeNames();
