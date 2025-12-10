// BUTTONS
const joinBtn = document.getElementById("joinBtn");
const previewBtn = document.getElementById("previewBtn");

// POPUP ELEMENTS
const popup = document.getElementById("popupJoin");
const closePopup = document.getElementById("closePopup");
const submitEmailBtn = document.getElementById("submitEmail");
const emailField = document.getElementById("waitlistEmail");
const emailError = document.getElementById("emailError");

/* OPEN POPUP */
joinBtn?.addEventListener("click", () => {
  popup.style.display = "flex";
});

/* CLOSE POPUP */
closePopup?.addEventListener("click", () => {
  popup.style.display = "none";
});

/* EMAIL SUBMISSION */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

submitEmailBtn?.addEventListener("click", async () => {
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

  emailError.textContent = "";
  emailError.classList.remove("visible");

  try {
    await window.saveEmail(email);
    window.location.href = "ty.html";
  } catch (err) {
    console.error("Error saving email:", err);
    alert("Terjadi kesalahan, coba lagi.");
  }
});

/* PREVIEW BUTTON */
previewBtn?.addEventListener("click", () => {
  document.getElementById("pinSection").scrollIntoView({ behavior: "smooth" });
});

/* GOOGLE LOGIN */
const googleBtn = document.getElementById("googleLogin");

googleBtn?.addEventListener("click", async () => {
  try {
    const user = await window.loginGoogle();
    await window.saveEmail(user.email);
    window.location.href = "ty.html";
  } catch (err) {
    console.error(err);
    alert("Login Google gagal.");
  }
});

/* ANIMATION */
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
      if (entry.isIntersecting) entry.target.classList.add("visible");
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