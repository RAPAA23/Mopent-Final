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

const pinItems = document.querySelectorAll(".pin-item");
const characterPopup = document.getElementById("characterPopup");
const closeCharacterPopup = document.getElementById("closeCharacterPopup");
const characterImage = document.getElementById("characterImage");
const characterName = document.getElementById("characterName");
const characterDesc = document.getElementById("characterDesc");

// Character descriptions
const characterDescriptions = {
  "Karakter 1": "Karakter pertama dengan desain unik dan penuh ekspresi. Cocok untuk pecinta seni yang berani.",
  "Karakter 2": "Karakter kedua yang menampilkan keanggunan dan misteri. Ideal untuk kolektor yang suka hal-hal klasik.",
  "Karakter 3": "Karakter ketiga dengan vibe energik dan ceria. Sempurna untuk mereka yang ingin menambah keceriaan.",
  "Karakter 4": "Karakter keempat yang penuh dengan detail menarik. Cocok untuk penggemar desain rumit.",
  "Karakter 5": "Karakter kelima yang simpel namun powerful. Mewakili kesederhanaan yang elegan."
};

pinItems.forEach(item => {
  item.addEventListener("mouseenter", () => {
    pinItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove("active");
  });

  item.addEventListener("click", () => {
    pinItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    // Show popup on desktop
    if (window.innerWidth > 768) {
      const imgSrc = item.querySelector("img").src;
      const name = item.querySelector(".pin-label").textContent;
      const desc = characterDescriptions[name] || "Deskripsi karakter tidak tersedia.";

      characterImage.src = imgSrc;
      characterName.textContent = name;
      characterDesc.textContent = desc;
      characterPopup.style.display = "flex";
      setTimeout(() => characterPopup.classList.add("show"), 10);
    }

    setTimeout(() => {
      item.classList.remove("active");
    }, 300);
  });
});

// Close character popup
if (closeCharacterPopup && characterPopup) {
  closeCharacterPopup.addEventListener("click", () => {
    characterPopup.classList.remove("show");
    setTimeout(() => characterPopup.style.display = "none", 300);
  });

  // Close on click outside
  characterPopup.addEventListener("click", (e) => {
    if (e.target === characterPopup) {
      characterPopup.classList.remove("show");
      setTimeout(() => characterPopup.style.display = "none", 300);
    }
  });
}
