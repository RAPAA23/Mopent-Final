// script.js

// daftar tunggu sederhana menggunakan localStorage
const joinBtn = document.getElementById('joinBtn');
const previewBtn = document.getElementById('previewBtn');

if(joinBtn){
  joinBtn.addEventListener('click', () => {
    const email = prompt('Masukkan email untuk daftar awal');
    if(!email) return;
    try{
      const list = JSON.parse(localStorage.getItem('mopent_waitlist') || '[]');
      if(!list.includes(email)){
        list.push(email);
        localStorage.setItem('mopent_waitlist', JSON.stringify(list));
        alert('Terima kasih. Email tersimpan untuk update prelaunch');
      } else {
        alert('Email sudah terdaftar');
      }
    } catch(e){
      console.error('Gagal menyimpan email', e);
      alert('Terjadi kesalahan. Coba lagi');
    }
  });
}

if(previewBtn){
  previewBtn.addEventListener('click', () => {
    const el = document.querySelector('.previews');
    if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// fungsi bantuan untuk pengujian dan kustomisasi cepat
window.mopent = {
  setTitle(text){
    const el = document.getElementById('mainTitle');
    if(el) el.textContent = text;
  },
  setDesc(text){
    const el = document.getElementById('mainDesc');
    if(el) el.textContent = text;
  },
  setBrand(name){
    const el = document.getElementById('brandName');
    if(el) el.textContent = name;
  },
  setHeroImage(src){
    const el = document.getElementById('heroImage');
    if(el) el.src = src;
  },
  getWaitlist(){
    return JSON.parse(localStorage.getItem('mopent_waitlist') || '[]');
  },
  clearWaitlist(){
    localStorage.removeItem('mopent_waitlist');
  }
};

// contoh otomatis ganti teks jika query param ada
(function applyQuery(){
  const params = new URLSearchParams(location.search);
  if(params.get('title')) window.mopent.setTitle(params.get('title'));
  if(params.get('desc')) window.mopent.setDesc(params.get('desc'));
  if(params.get('brand')) window.mopent.setBrand(params.get('brand'));
})();

// animasi fade-in untuk elemen hero
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".hero").style.opacity = 0;
  setTimeout(() => {
    document.querySelector(".hero").style.transition = "0.6s";
    document.querySelector(".hero").style.opacity = 1;
  }, 150);
});