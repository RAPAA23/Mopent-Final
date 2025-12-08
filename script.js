// BUTTONS
const joinBtn = document.getElementById("joinBtn");
const previewBtn = document.getElementById("previewBtn");

// POPUP ELEMENTS
const popup = document.getElementById("popupJoin");
const closePopup = document.getElementById("closePopup");
const submitEmailBtn = document.getElementById("submitEmail");
const emailField = document.getElementById("waitlistEmail");
const emailError = document.getElementById("emailError");

/* ================================================
   OPEN POPUP
================================================ */
if (joinBtn) {
  joinBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });
}

/* ================================================
   CLOSE POPUP
================================================ */
if (closePopup) {
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });
}

/* ================================================
   EMAIL SUBMISSION
================================================ */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (submitEmailBtn) {
  submitEmailBtn.addEventListener("click", async () => {
    const email = emailField.value.trim();

    // VALIDASI EMAIL
    if (!emailRegex.test(email)) {
      emailError.textContent = "Format email tidak valid.";
      emailError.classList.add("visible");
      emailField.classList.add("input-error");

      setTimeout(() => {
        emailField.classList.remove("input-error");
      }, 300);

      return;
    }

    // Clear error jika valid
    emailError.textContent = "";
    emailError.classList.remove("visible");

    // KIRIM KE FIRESTORE
    try {
      await window.saveEmail(email);

      window.location.href = "ty.html";
    } catch (err) {
      console.error("Error saving email:", err);
      alert("Terjadi kesalahan, coba lagi.");
    }
  });
}

/* ================================================
   PREVIEW BUTTON
================================================ */
if (previewBtn) {
  previewBtn.addEventListener("click", () => {
    document.getElementById("pinSection").scrollIntoView({
      behavior: "smooth",
    });
  });
}

/* ================================================
   ANIMATION + OBSERVER
================================================ */
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

["pinSection", "socialSection", "aboutSection"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

window.addEventListener("scroll", () => {
  const bottomArea = document.querySelector(".bottom-area");
  if (window.scrollY > 100) bottomArea.classList.add("scrolled");
  else bottomArea.classList.remove("scrolled");
});