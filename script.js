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

const popup = document.getElementById("popupJoin");
const closePopup = document.getElementById("closePopup");
const submitEmailBtn = document.getElementById("submitEmail");
const emailField = document.getElementById("waitlistEmail");

joinBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

submitEmailBtn.addEventListener("click", async () => {
  const email = emailField.value.trim();

  if (!email || !email.includes("@")) {
    alert("Masukkan email yang valid.");
    return;
  }

  try {
    await db.collection("waitlist").add({
      email: email,
      createdAt: new Date()
    });

    alert("Terima kasih! Email kamu sudah masuk daftar awal.");
    popup.style.display = "none";
    emailField.value = "";

  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan saat menyimpan. Coba lagi.");
  }
});

if (previewBtn) {
  previewBtn.addEventListener("click", () => {
    document.getElementById("pinSection").scrollIntoView({
      behavior: "smooth"
    });
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

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('visible');
}
});
}, { threshold: 0.2 });

const pinSection = document.getElementById("pinSection");
if (pinSection) observer.observe(pinSection);

const socialSection = document.getElementById("socialSection");
const aboutSection = document.getElementById("aboutSection");

if(socialSection) observer.observe(socialSection);
if(aboutSection) observer.observe(aboutSection);

const bottomArea = document.querySelector(".bottom-area");

window.addEventListener("scroll", () => {
  if(window.scrollY > 100){
    bottomArea.classList.add("scrolled");
  } else {
    bottomArea.classList.remove("scrolled");
  }
});

const appleTargets = document.querySelectorAll(".apple-animate");

appleTargets.forEach(el => observer.observe(el));