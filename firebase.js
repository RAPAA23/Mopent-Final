// Firebase v9 CDN-style initialization
const firebaseConfig = {
  apiKey: "AIzaSyDJJg7DHTXlSsccQRoed10JeUB6NPt_TOE",
  authDomain: "mopent-prelaunch.firebaseapp.com",
  projectId: "mopent-prelaunch",
  storageBucket: "mopent-prelaunch.firebasestorage.app",
  messagingSenderId: "206844467580",
  appId: "1:206844467580:web:0a619446d38ec13f61ecf9"
};

// Initialize Firebase App
const app = firebase.initializeApp(firebaseConfig);

// Init Firestore Database
const db = firebase.firestore();