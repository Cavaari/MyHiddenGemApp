import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyBl34RaXwiQvTLtUxnVsjzS_C47_pi0aO0",
  authDomain: "myhiddengemapp.firebaseapp.com",
  databaseURL: "https://myhiddengemapp-default-rtdb.firebaseio.com",
  projectId: "myhiddengemapp",
  storageBucket: "myhiddengemapp.appspot.com",
  messagingSenderId: "880847539432",
  appId: "1:880847539432:web:5b886db45e7a6bad824d5d",
};

// Initialize Firebase app
const firebase = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(firebase);

// Initialize Firebase Auth with persistence using AsyncStorage
const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firebase Storage
const storage = getStorage(firebase);

export { firebase, firestore, auth, storage, collection, setDoc, getDocs, doc };
