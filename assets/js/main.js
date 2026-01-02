const modal = document.getElementById('detailModal');
const closeBtn = document.querySelector('.modal-close');
const viewBtns = document.querySelectorAll('.view-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

// Mock product data (HU szövegek)
const productData = {
    'Fantasy Harcos': {
        size: '60mm',
        price: '4,500 Ft',
        description: 'Egy részletesen kifestett fantasy harcos figura. Vibráló szín, és finom részletmunkával ellátott. Tökéletes gyűjteménynek vagy ajándéknak. Az arca és az armor részletei külön festésűek, amely extra mélységet ad.'
    },
    'Sci-Fi Pilóta': {
        size: '55mm',
        price: '5,200 Ft',
        description: 'Futurisztikus pilóta figura metál effektekkel és technológiai részletmunkával. A szoknya és a felszerelés különösen részleteztek. Tökéletes a sci-fi rajongók számára.'
    },
    'Sárkány Kulcstartó': {
        size: '35mm',
        price: '2,800 Ft',
        description: 'Kompakt, csini sárkány kulcstartó. Kézzel festett, szilikon karabiner fogóval. Tökéletes kisebb ajándék vagy saját használatra.'
    },
    'Egyedi Megrendelés': {
        size: 'Egyedi',
        price: '6,000+ Ft',
        description: 'Saját ötleted szerinti figura készítése. Teljes körű szolgáltatás: 3D tervezés, nyomtatás, festés és szállítás. Egyezzünk meg az elképzeléseidről és az áról.'
    },
    'Elf Vadász': {
        size: '58mm',
        price: '4,800 Ft',
        description: 'Filigránul kifestett elf figura íjjal. Részletes arcrészletekkel és gyönyörű zöld árnyalatokkal. A kötöttségek és az íj különösen szépek.'
    },
    'Cuki Lény Kulcstartó': {
        size: '32mm',
        price: '2,500 Ft',
        description: 'Mini chibi stílus figura. Puha, vidám színek és vicces karakterek. Tökéletes gyerekeknek, vagy akár collectible ajándéknak. Biztosan mosolygás kerül a szemed.'
    }
};

// Open modal
viewBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const item = this.closest('.gallery-item');
        const title = item.querySelector('.gallery-item-title').textContent;
        const img = item.querySelector('.gallery-item-image img');
        const data = productData[title] || {};

        document.getElementById('modalItemTitle').textContent = title;
        document.getElementById('modalImage').src = img.src;
        document.getElementById('modalSize').textContent = data.size || 'N/A';
        document.getElementById('modalPrice').textContent = data.price || '0 Ft';
        document.getElementById('modalDescription').textContent = data.description || '';

        modal.style.display = 'block';
    });
});

// Close modal
if (closeBtn) {
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Keyboard shortcut to close modal
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        modal.style.display = 'none';
    }
});

// -------- Nyelvválasztó (HU / EN) --------

const translations = {
    hu: {
        "nav.gallery": "Galéria",
        "nav.about": "Rólunk",
        "nav.contact": "Kapcsolat",

        "hero.title": "Egyedi 3D Nyomtatott Figurák",
        "hero.subtitle":
            "Kézzel festett, professzionális minőségű miniaturák és kulcstartók. Minden darab egyedi, gondosan kidolgozott.",

        "filters.all": "Összes",
        "filters.fantasy": "Fantasy",
        "filters.scifi": "Sci-Fi",
        "filters.keys": "Kulcstartók",
        "filters.custom": "Egyedi"
    },
    en: {
        "nav.gallery": "Gallery",
        "nav.about": "About",
        "nav.contact": "Contact",

        "hero.title": "Custom 3D Printed Figures",
        "hero.subtitle":
            "Hand-painted, professional quality miniatures and keychains. Every piece is unique and carefully crafted.",

        "filters.all": "All",
        "filters.fantasy": "Fantasy",
        "filters.scifi": "Sci‑Fi",
        "filters.keys": "Keychains",
        "filters.custom": "Custom"
    }
};

const langSelect = document.querySelector(".lang-switcher");

function applyLanguage(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        const text = translations[lang] && translations[lang][key];
        if (text) el.textContent = text;
    });

    localStorage.setItem("site-lang", lang);
}

if (langSelect) {
    const saved = localStorage.getItem("site-lang") || "hu";
    langSelect.value = saved;
    applyLanguage(saved);

    langSelect.addEventListener("change", () => {
        applyLanguage(langSelect.value);
    });
}



const positions = [
  {
    height: 620,
    z: 220,
    rotateY: 48,
    y: 0,
    clip: "polygon(0px 0px, 100% 10%, 100% 90%, 0px 100%)"
  },
  {
    height: 580,
    z: 165,
    rotateY: 35,
    y: 0,
    clip: "polygon(0px 0px, 100% 8%, 100% 92%, 0px 100%)"
  },
  {
    height: 495,
    z: 110,
    rotateY: 15,
    y: 0,
    clip: "polygon(0px 0px, 100% 7%, 100% 93%, 0px 100%)"
  },
  {
    height: 420,
    z: 66,
    rotateY: 15,
    y: 0,
    clip: "polygon(0px 0px, 100% 7%, 100% 93%, 0px 100%)"
  },
  {
    height: 353,
    z: 46,
    rotateY: 6,
    y: 0,
    clip: "polygon(0px 0px, 100% 7%, 100% 93%, 0px 100%)"
  },
  {
    height: 310,
    z: 0,
    rotateY: 0,
    y: 0,
    clip: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
  },
  {
    height: 353,
    z: 54,
    rotateY: 348,
    y: 0,
    clip: "polygon(0px 7%, 100% 0px, 100% 100%, 0px 93%)"
  },
  {
    height: 420,
    z: 89,
    rotateY: -15,
    y: 0,
    clip: "polygon(0px 7%, 100% 0px, 100% 100%, 0px 93%)"
  },
  {
    height: 495,
    z: 135,
    rotateY: -15,
    y: 1,
    clip: "polygon(0px 7%, 100% 0px, 100% 100%, 0px 93%)"
  },
  {
    height: 580,
    z: 195,
    rotateY: 325,
    y: 0,
    clip: "polygon(0px 8%, 100% 0px, 100% 100%, 0px 92%)"
  },
  {
    height: 620,
    z: 240,
    rotateY: 312,
    y: 0,
    clip: "polygon(0px 10%, 100% 0px, 100% 100%, 0px 90%)"
  }
];

class CircularSlider {
  constructor() {
    this.container = document.getElementById("sliderContainer");
    this.track = document.getElementById("sliderTrack");
    this.cards = Array.from(document.querySelectorAll(".card"));
    this.totalCards = this.cards.length;
    this.isDragging = false;
    this.startX = 0;
    this.dragDistance = 0;
    this.threshold = 60;
    this.processedSteps = 0;
    this.expandedCard = null;
    this.cardInfo = document.getElementById("cardInfo");
    this.cardTitle = document.getElementById("cardTitle");
    this.cardDesc = document.getElementById("cardDesc");
    this.closeBtn = document.getElementById("closeBtn");

    this.init();
  }

  init() {
    this.applyPositions();
    this.attachEvents();
  }

  applyPositions() {
    this.cards.forEach((card, index) => {
      const pos = positions[index];
      gsap.set(card, {
        height: pos.height,
        clipPath: pos.clip,
        transform: `translateZ(${pos.z}px) rotateY(${pos.rotateY}deg) translateY(${pos.y}px)`
      });
    });
  }

  expandCard(card) {
    if (this.expandedCard) return;

    this.expandedCard = card;
    const title = card.dataset.title;
    const desc = card.dataset.desc;

    this.cardTitle.textContent = title;
    this.cardDesc.textContent = desc;

    const rect = card.getBoundingClientRect();
    const clone = card.cloneNode(true);
    const overlay = clone.querySelector(".hover-overlay");
    if (overlay) overlay.remove();

    clone.style.position = "fixed";
    clone.style.left = rect.left + "px";
    clone.style.top = rect.top + "px";
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";
    clone.style.margin = "0";
    clone.style.zIndex = "1000";
    clone.classList.add("clone");

    document.body.appendChild(clone);
    this.cardClone = clone;

    gsap.set(card, { opacity: 0 });
    this.track.classList.add("blurred");

    const maxHeight = window.innerHeight * 0.8;
    const finalWidth = 500;
    const finalHeight = Math.min(650, maxHeight);
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    gsap.to(clone, {
      width: finalWidth,
      height: finalHeight,
      left: centerX - finalWidth / 2,
      top: centerY - finalHeight / 2,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transform: "translateZ(0) rotateY(0deg)",
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        this.cardInfo.classList.add("visible");
        this.closeBtn.classList.add("visible");
      }
    });
  }

  closeCard() {
    if (!this.expandedCard) return;

    this.cardInfo.classList.remove("visible");
    this.closeBtn.classList.remove("visible");

    const card = this.expandedCard;
    const clone = this.cardClone;
    const rect = card.getBoundingClientRect();
    const index = this.cards.indexOf(card);
    const pos = positions[index];

    gsap.to(clone, {
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
      clipPath: pos.clip,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        clone.remove();
        gsap.set(card, { opacity: 1 });
        this.track.classList.remove("blurred");
        this.expandedCard = null;
        this.cardClone = null;
      }
    });
  }

  rotate(direction) {
    if (this.expandedCard) return;

    this.cards.forEach((card, index) => {
      let newIndex;
      if (direction === "next") {
        newIndex = (index - 1 + this.totalCards) % this.totalCards;
      } else {
        newIndex = (index + 1) % this.totalCards;
      }

      const pos = positions[newIndex];

      gsap.set(card, { clipPath: pos.clip });

      gsap.to(card, {
        height: pos.height,
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(card, {
        transform: `translateZ(${pos.z}px) rotateY(${pos.rotateY}deg) translateY(${pos.y}px)`,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    if (direction === "next") {
      const firstCard = this.cards.shift();
      this.cards.push(firstCard);
      this.track.appendChild(firstCard);
    } else {
      const lastCard = this.cards.pop();
      this.cards.unshift(lastCard);
      this.track.prepend(lastCard);
    }
  }

  attachEvents() {
    this.cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        if (!this.isDragging && !this.expandedCard) {
          this.expandCard(card);
        }
      });
    });

    this.closeBtn.addEventListener("click", () => this.closeCard());

    this.container.addEventListener("mousedown", (e) =>
      this.handleDragStart(e)
    );
    this.container.addEventListener(
      "touchstart",
      (e) => this.handleDragStart(e),
      { passive: false }
    );

    document.addEventListener("mousemove", (e) => this.handleDragMove(e));
    document.addEventListener("touchmove", (e) => this.handleDragMove(e), {
      passive: false
    });

    document.addEventListener("mouseup", () => this.handleDragEnd());
    document.addEventListener("touchend", () => this.handleDragEnd());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.expandedCard) {
        this.closeCard();
      } else if (e.key === "ArrowLeft" && !this.expandedCard) {
        this.rotate("prev");
      } else if (e.key === "ArrowRight" && !this.expandedCard) {
        this.rotate("next");
      }
    });
  }

  handleDragStart(e) {
    if (this.expandedCard) return;

    this.isDragging = true;
    this.container.classList.add("dragging");
    this.startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    this.dragDistance = 0;
    this.processedSteps = 0;
  }

  handleDragMove(e) {
    if (!this.isDragging) return;

    e.preventDefault();
    const currentX = e.type.includes("mouse")
      ? e.clientX
      : e.touches[0].clientX;
    this.dragDistance = currentX - this.startX;

    const steps = Math.floor(Math.abs(this.dragDistance) / this.threshold);

    if (steps > this.processedSteps) {
      const direction = this.dragDistance > 0 ? "prev" : "next";
      this.rotate(direction);
      this.processedSteps = steps;
    }
  }

  handleDragEnd() {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.container.classList.remove("dragging");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CircularSlider();
});
