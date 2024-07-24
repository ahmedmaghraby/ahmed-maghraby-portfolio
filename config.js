import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx_fPoI2_u-icnznag661hXuXZrjn6-Rs",
  authDomain: "ahmedmagraby-app.firebaseapp.com",
  projectId: "ahmedmagraby-app",
  storageBucket: "ahmedmagraby-app.appspot.com",
  messagingSenderId: "850285491086",
  appId: "1:850285491086:web:9f4f69a25783ed0318aadf",
  measurementId: "G-KPK9NRMHEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

// export const analytics = getAnalytics(app);// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
