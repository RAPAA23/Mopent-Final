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
alert('Email tersimpan untuk update prelaunch');
} else {
alert('Email sudah terdaftar');
}
} catch(e){
alert('Terjadi kesalahan');
}
});
}

if(previewBtn){
previewBtn.addEventListener('click', () => {
const el = document.querySelector('.previews');
if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
}

document.addEventListener("DOMContentLoaded", () => {
const hero = document.querySelector(".hero");
if(hero){
hero.style.opacity = 0;
setTimeout(() => {
hero.style.opacity = 1;
}, 150);
}
});

const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('visible');
}
});
}, observerOptions);

const socialSection = document.getElementById("socialSection")

const socialObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.classList.add("visible")
}
})
},{
threshold: 0.2
})

if(socialSection) socialObserver.observe(socialSection)

const aboutSection = document.getElementById("aboutSection")
if (aboutSection) socialObserver.observe(aboutSection)

const bottomArea = document.querySelector(".bottom-area")

window.addEventListener("scroll", () => {
  if(window.scrollY > 200){
    bottomArea.classList.add("scrolled")
  } else {
    bottomArea.classList.remove("scrolled")
  }
})