// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnzTPAkdxcrMz-OOwt5enbNh8xC9L8f-0",
  authDomain: "react-recipe-app-dec05.firebaseapp.com",
  projectId: "react-recipe-app-dec05",
  storageBucket: "react-recipe-app-dec05.appspot.com",
  messagingSenderId: "322458838072",
  appId: "1:322458838072:web:b93bf4480f6183fe5772cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }