import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAQ3T5sOGvBUgcRmQi9tskdAjpldxja0aQ",
    authDomain: "e-challenge-55296.firebaseapp.com",
    projectId: "e-challenge-55296",
    storageBucket: "e-challenge-55296.appspot.com",
    messagingSenderId: "46222158226",
    appId: "1:46222158226:web:ec7939ee468e661fb7f94b",
    measurementId: "G-NFR64850J5"
  };


  const firebaseApp = initializeApp(firebaseConfig);

  const db = getDatabase(firebaseApp);

  const auth = getAuth(firebaseApp);


  export { db, auth };