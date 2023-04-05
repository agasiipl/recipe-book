import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCOZEVT72P0NaNKsw22piRPZ6fXjwyWYC0",
  authDomain: "recipe-book-app-57e56.firebaseapp.com",
  projectId: "recipe-book-app-57e56",
  databaseURL: "https://recipe-book-app-57e56.firebaseio.com",
  storageBucket: "recipe-book-app-57e56.appspot.com",
  messagingSenderId: "1031978955048",
  appId: "recipe-book-app-57e56",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//export default app;
