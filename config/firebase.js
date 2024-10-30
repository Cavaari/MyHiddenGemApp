// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/firestore';


// Your app's Firebase configuration
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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { firebase, firestore, auth };
