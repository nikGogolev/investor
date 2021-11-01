import { getAuth } from "@firebase/auth";
import { getDatabase } from "@firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAS0Sazo-Bbg-TouSxSrenj5hTYa5bnjN8",
  authDomain: "investor-8a0c2.firebaseapp.com",
  projectId: "investor-8a0c2",
  storageBucket: "investor-8a0c2.appspot.com",
  messagingSenderId: "949350207446",
  appId: "1:949350207446:web:c6cf85c9033c3ed2491e77"
};

export const firebaseInitialize = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase();