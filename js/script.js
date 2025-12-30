const joinBtn = document.getElementById("joinBtn");
const previewBtn = document.getElementById("previewBtn");

const bottomArea = document.querySelector(".bottom-area");

const shopPopup = document.getElementById("popupShop");
const toShopee = document.getElementById("toShopee");
const toLazada = document.getElementById("toLazada");
const closeShopPopup = document.getElementById("closeShopPopup");

if (joinBtn) {
  joinBtn.addEventListener("click", () => {
    shopPopup.style.display = "flex";
  });
}

toShopee?.addEventListener("click", () => {
  window.open("https://shopee.co.id/USERNAME_TOKO_KAMU", "_blank");
});

toLazada?.addEventListener("click", () => {
  window.open("https://www.lazada.co.id/USERNAME_TOKO_KAMU", "_blank");
});

closeShopPopup?.addEventListener("click", () => {
  shopPopup.style.display = "none";
});

previewBtn?.addEventListener("click", () => {
  document.getElementById("pinSection")?.scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  hero.style.opacity = 0;
  setTimeout(() => (hero.style.opacity = 1), 150);
  
  // Show scroll hint at page load
  const scrollHint = document.getElementById("scrollHint");
  if (scrollHint) {
    scrollHint.classList.add('visible');
    scrollHint.classList.remove('hidden');
  }
});

// ===== SCROLL REVEAL (ONLY SAFE SECTIONS) =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(
      (e) => e.isIntersecting && e.target.classList.add("visible")
    );
  },
  { threshold: 0.2 }
);

const pinSection = document.getElementById("pinSection");
if (pinSection) observer.observe(pinSection);

// observe social/about so they reveal when scrolled into view
const socialSection = document.getElementById('socialSection');
const aboutSection = document.getElementById('aboutSection');
if (socialSection) observer.observe(socialSection);
if (aboutSection) observer.observe(aboutSection);

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

if (bottomArea) {
  const bottomObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bottomArea.classList.add("scrolled");
        }
      });
    },
    { threshold: 0.1 }
  );

  bottomObserver.observe(bottomArea);
}

// Klik → scroll ke section pin
if (scrollHint) {
  let lastScrollY = 0;
  
  scrollHint.addEventListener("click", () => {
    document.getElementById("pinSection")
      ?.scrollIntoView({ behavior: "smooth" });
    // hide hint after clicking
    scrollHint.classList.remove('visible');
    scrollHint.classList.add('hidden');
  });
  
  // Show/hide hint based on scroll position
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const pinVisible = document.getElementById('pinSection')?.classList.contains('visible');
    
    if (currentScrollY < 100 && !pinVisible) {
      // At top, show hint
      scrollHint.classList.add('visible');
      scrollHint.classList.remove('hidden');
    } else {
      // Scrolled down, hide hint
      scrollHint.classList.remove('visible');
      scrollHint.classList.add('hidden');
    }
    
    lastScrollY = currentScrollY;
  });
}

// Deep observer: when social/about are more prominently visible, add highlight
const deepSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
      entry.target.classList.add('visible');
      bottomArea?.classList.add('bottom-highlight');
    } else if (!entry.isIntersecting) {
      // remove highlight only if none of the sections remain visible
      setTimeout(() => {
        const anyVisible = [socialSection, aboutSection].some(el => el && el.classList.contains('visible'));
        if (!anyVisible) bottomArea?.classList.remove('bottom-highlight');
      }, 120);
    }
  });
}, { threshold: [0.35, 0.6] });

if (socialSection) deepSectionObserver.observe(socialSection);
if (aboutSection) deepSectionObserver.observe(aboutSection);

const characterPopup = document.getElementById("characterPopup");
const characterImage = document.getElementById("characterImage");
const characterName = document.getElementById("characterName");
const characterDesc = document.getElementById("characterDesc");
const closeCharacterPopup = document.getElementById("closeCharacterPopup");

// Data karakter
const characterData = {
  "Hira": {
    image: "picture/karakter 1.jpeg",
    desc: "Dia ngerasa lebih dulu sebelum mikir.\nNggak banyak suara, tapi paling ngerti."
  },
  "Raku": {
    image: "picture/karakter 2.jpeg",
    desc: "Jalan dulu, mikir belakangan.\nHidup nggak harus rapi buat jadi seru."
  },
  "Sela": {
    image: "picture/karakter 3.jpeg",
    desc: "Nggak semua hal perlu ditanggapi.\nKadang diam itu bentuk paling dewasa."
  },
  "Nala": {
    image: "picture/karakter 4.jpeg",
    desc: "Nggak semua yang rame itu bener.\nDia milih percaya setelah paham."
  },
  "Hara": {
    image: "picture/karakter 5.jpeg",
    desc: "Nggak banyak cerita, tapi jelas tujuannya.\nPelan, tapi konsisten."
  }
};

const pinItems = document.querySelectorAll(".pin-item");

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

    // Show character popup
    const label = item.querySelector(".pin-label").textContent;
    const data = characterData[label];
    if (data) {
      characterImage.src = data.image;
      characterName.textContent = label;
      characterDesc.textContent = data.desc;
      characterPopup.style.display = "flex";
    }

    setTimeout(() => {
      item.classList.remove("active");
    }, 300);
  });
});

// Close character popup
if (closeCharacterPopup && characterPopup) {
  closeCharacterPopup.addEventListener("click", () => {
    closeCharacterPopupFunc();
  });
}

// Close popup when clicking outside
characterPopup?.addEventListener("click", (e) => {
  if (e.target === characterPopup) {
    closeCharacterPopupFunc();
  }
});

function closeCharacterPopupFunc() {
  const popupContent = characterPopup.querySelector('.popup-content');
  popupContent.style.animation = 'popupFadeOut 0.3s ease forwards';
  setTimeout(() => {
    characterPopup.style.display = "none";
    popupContent.style.animation = 'popupFadeIn 0.3s ease';
  }, 300);
}
