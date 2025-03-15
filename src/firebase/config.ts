import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  measurementId: "G-LD4G0KS2DZ",
  projectId: "ecommerce-cms-b2fd1",
  messagingSenderId: "1063276636155",
  storageBucket: "ecommerce-cms-b2fd1.appspot.com",
  apiKey: "AIzaSyDepswhmkVGRCxvQQNqjWCcJv2Tcmf6g3c",
  authDomain: "ecommerce-cms-b2fd1.firebaseapp.com",
  appId: "1:1063276636155:web:b2a792d6af22a503478d5e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;
