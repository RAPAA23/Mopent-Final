import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getFirestore, collection, getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import {
  getAuth, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyASzQXAydTkgNjq8VdDKRDMNw4oYITAfnY",
  authDomain: "mopent2.firebaseapp.com",
  projectId: "mopent2",
  storageBucket: "mopent2.firebasestorage.app",
  messagingSenderId: "999229291692",
  appId: "1:999229291692:web:22536f59b581eafade3309"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = "login.html";
});

document.getElementById("logoutBtn").onclick = () => signOut(auth);

let dataList = [];
let curPage = 1;
const perPage = 10;

async function loadData() {
  const q = await getDocs(collection(db, "waitlist"));
  dataList = q.docs.map(d => ({
    email: d.data().email,
    createdAt: new Date(d.data().createdAt.seconds * 1000)
  }));
  render();
}

function render() {
  const start = (curPage - 1) * perPage;
  const rows = dataList.slice(start, start + perPage);

  document.getElementById("emailTable").innerHTML = rows.map(r =>
    `<tr>
      <td>${r.email}</td>
      <td>${r.createdAt.toLocaleString()}</td>
    </tr>`
  ).join("");

  document.getElementById("pageInfo").textContent = `Halaman ${curPage}`;
}

// Pagination
document.getElementById("prevPage").onclick = () => {
  if (curPage > 1) { curPage--; render(); }
};
document.getElementById("nextPage").onclick = () => {
  if (curPage * perPage < dataList.length) { curPage++; render(); }
};

// Search
document.getElementById("searchInput").oninput = (e) => {
  const t = e.target.value.toLowerCase();
  dataList = dataList.filter(x => x.email.toLowerCase().includes(t));
  curPage = 1;
  render();
};

// Export CSV
document.getElementById("exportCSV").onclick = () => {
  let csv = "email,createdAt\n";
  dataList.forEach(x => {
    csv += `${x.email},${x.createdAt.toISOString()}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "waitlist.csv";
  a.click();
};

loadData();