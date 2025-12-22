const joinBtn = document.getElementById("joinBtn");
const previewBtn = document.getElementById("previewBtn");
const googleBtn = document.getElementById("googleLogin");
const scrollToPins = document.getElementById("scrollToPins");

const popup = document.getElementById("popupJoin");
const closePopup = document.getElementById("closePopup");
const submitEmailBtn = document.getElementById("submitEmail");

const emailField = document.getElementById("waitlistEmail");
const emailError = document.getElementById("emailError");

const welcomeSection = document.getElementById("welcomeSection");
const welcomeAvatar = document.getElementById("welcomeAvatar");
const welcomeTitle = document.getElementById("welcomeTitle");

const brandCards = document.getElementById("brandCards");
const bottomArea = document.querySelector(".bottom-area");

if (joinBtn && popup) {
  joinBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });
}

if (closePopup && popup) {
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (submitEmailBtn) {
  submitEmailBtn.addEventListener("click", async () => {
    const email = emailField?.value.trim();

    if (!email || !emailRegex.test(email)) {
      emailError.textContent = "Format email tidak valid.";
      emailError.classList.add("visible");
      emailField.classList.add("input-error");

      setTimeout(() => {
        emailField.classList.remove("input-error");
      }, 300);
      return;
    }

    emailError.classList.remove("visible");

    try {
      await window.saveEmail(email);
      popup.style.display = "none";
      showAfterLogin({ email });
    } catch (err) {
      alert("Terjadi kesalahan.");
    }
  });
}

if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    try {
      const user = await window.loginGoogle();
      await window.saveEmail(user.email);
      popup.style.display = "none";
      showAfterLogin(user);
    } catch {
      alert("Login Google gagal.");
    }
  });
}

function showAfterLogin(user) {
  welcomeSection.classList.remove("hidden");
  brandCards?.classList.remove("hidden");

  welcomeAvatar.src = user.photoURL || "https://placehold.co/100x100?text=M";
  welcomeTitle.textContent = user.displayName
    ? `Welcome, ${user.displayName}!`
    : "Welcome!";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

previewBtn?.addEventListener("click", () => {
  document.getElementById("pinSection")?.scrollIntoView({ behavior: "smooth" });
});

scrollToPins?.addEventListener("click", () => {
  document.getElementById("pinSection")?.scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  hero.style.opacity = 0;
  setTimeout(() => (hero.style.opacity = 1), 150);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible"));
  },
  { threshold: 0.2 }
);

["pinSection", "socialSection", "aboutSection"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

// Paksa tampil saat load
window.addEventListener("load", () => {
  scrollIndicator?.classList.remove("scrolled");
});

// Bottom area tetap pakai scrollY
window.addEventListener("scroll", () => {
  if (!bottomArea) return;

  if (window.scrollY > 100) {
    bottomArea.classList.add("scrolled");
  } else {
    bottomArea.classList.remove("scrolled");
  }
});

const scrollHint = document.getElementById("scrollHint");

if (scrollHint) {
  // Muncul setelah 2 detik
  window.addEventListener("load", () => {
    setTimeout(() => {
      scrollHint.classList.add("visible");
    }, 2000);
  });

  // Hilang saat user scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      scrollHint.classList.remove("visible");
      scrollHint.classList.add("hidden");
    } else {
      scrollHint.classList.remove("hidden");
      scrollHint.classList.add("visible");
    }
  });

  // Klik → scroll ke section pin
  scrollHint.addEventListener("click", () => {
    document.getElementById("pinSection")
      ?.scrollIntoView({ behavior: "smooth" });
  });
}