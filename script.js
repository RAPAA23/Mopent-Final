const joinBtn = document.getElementById('joinBtn');
const previewBtn = document.getElementById('previewBtn');

// Popup Elements
const popup = document.getElementById("popupJoin");
const closePopup = document.getElementById("closePopup");
const submitEmailBtn = document.getElementById("submitEmail");
const emailField = document.getElementById("waitlistEmail");

/* OPEN POPUP */
if (joinBtn) {
  joinBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });
}

/* CLOSE POPUP */
if (closePopup) {
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });
}

/* SUBMIT EMAIL TO FIRESTORE */
if (submitEmailBtn) {
  submitEmailBtn.addEventListener("click", async () => {
    const email = emailField.value.trim();

    if (!email || !email.includes("@")) {
      alert("Masukkan email yang valid.");
      return;
    }

    try {
      await window.saveEmail(email); // Firebase modular function
      alert("Email berhasil disimpan!");
      popup.style.display = "none";
      emailField.value = "";
    } catch (err) {
      console.error("Error saving email:", err);
      alert("Terjadi kesalahan, coba lagi.");
    }
  });
}

/* PREVIEW BUTTON */
if (previewBtn) {
  previewBtn.addEventListener("click", () => {
    document.getElementById("pinSection").scrollIntoView({
      behavior: "smooth"
    });
  });
}

/* ANIMATION + OBSERVER */
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.opacity = 0;
    setTimeout(() => {
      hero.style.opacity = 1;
    }, 150);
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

const pinSection = document.getElementById("pinSection");
if (pinSection) observer.observe(pinSection);

const socialSection = document.getElementById("socialSection");
const aboutSection = document.getElementById("aboutSection");

if (socialSection) observer.observe(socialSection);
if (aboutSection) observer.observe(aboutSection);

const bottomArea = document.querySelector(".bottom-area");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    bottomArea.classList.add("scrolled");
  } else {
    bottomArea.classList.remove("scrolled");
  }
});

const appleTargets = document.querySelectorAll(".apple-animate");
appleTargets.forEach((el) => observer.observe(el));