import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyASzQXAydTkgNjq8VdDKRDMNw4oYITAfnY",
  authDomain: "mopent2.firebaseapp.com",
  projectId: "mopent2",
  storageBucket: "mopent2.firebasestorage.app",
  messagingSenderId: "999229291692",
  appId: "1:999229291692:web:22536f59b581eafade3309",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("adminEmail").value;
  const pass = document.getElementById("adminPass").value;
  const errorBox = document.getElementById("loginError");

  try {
    await signInWithEmailAndPassword(auth, email, pass);
    window.location.href = "admin.html";
  } catch (err) {
    errorBox.textContent = "Email atau password salah";
  }
});