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

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const flakes = [];

for (let i = 0; i < 120; i++) {
flakes.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
r: Math.random() * 3 + 1,
d: Math.random() + 0.5
});
}

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
ctx.beginPath();
flakes.forEach(f => {
ctx.moveTo(f.x, f.y);
ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
});
ctx.fill();
update();
}

function update() {
flakes.forEach(f => {
f.y += f.d;
if (f.y > canvas.height) {
f.y = 0;
f.x = Math.random() * canvas.width;
}
});
}

setInterval(draw, 33);

window.addEventListener("resize", () => {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});