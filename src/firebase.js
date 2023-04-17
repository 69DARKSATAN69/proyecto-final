import { initializeApp } from 'firebase/app'
import 'firebase/auth';
// import { getDatabase, dbRef } from 'firebase/database'
// ... other firebase imports

const firebaseConfig = {

    apiKey: "AIzaSyD9fbj0YepcSEm7ReuMjFhSX4woOfV9Qlk",
  
    authDomain: "irkala-b41eb.firebaseapp.com",
  
    databaseURL: "https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app",
  
    projectId: "irkala-b41eb",
  
    storageBucket: "irkala-b41eb.appspot.com",
  
    messagingSenderId: "1007090403530",
  
    appId: "1:1007090403530:web:ead1f75dbe9362cd240c33"
  
  };
  

export const firebaseApp = initializeApp(
  firebaseConfig
)

// // used for the databas refs
// const db = getDatabase(firebaseApp)

// // here we can export reusable database references
// export const todosRef = dbRef(db, 'todos')
