const modal = document.getElementById('detailModal');
const closeBtn = document.querySelector('.modal-close');
const viewBtns = document.querySelectorAll('.view-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');


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



function generatePositions(count) {
  const isMobile = window.innerWidth <= 768;
  const positions = [];
  const center = (count - 1) / 2;

  const maxRotate = isMobile ? 10 : 42;
  const maxZ = isMobile ? 40 : 160;
  const minHeight = isMobile ? 260 : 420;
  const maxHeight = isMobile ? 320 : 540;
  const maxY = isMobile ? 0 : -8;

  for (let i = 0; i < count; i++) {
    const offset = i - center;
    const normalized = center === 0 ? 0 : offset / center;
    const abs = Math.abs(normalized);
    const ease = Math.pow(abs, 1.4);

    positions.push({
      height: Math.round(maxHeight - ease * (maxHeight - minHeight)),
      z: Math.round(ease * maxZ),
      rotateY: Math.round(normalized * maxRotate),
      y: Math.round(ease * maxY),
      clip: isMobile
        ? "polygon(0 0,100% 0,100% 100%,0 100%)"
        : normalized < 0
          ? "polygon(0px 4%,100% 0px,100% 100%,0px 96%)"
          : "polygon(0px 0px,100% 4%,100% 96%,0px 100%)"
    });
  }

  return positions;
}


class CircularSlider {
  constructor() {
    this.container = document.getElementById("sliderContainer");
    this.track = document.getElementById("sliderTrack");
    this.cards = Array.from(document.querySelectorAll(".cat-card"));
    this.totalCards = this.cards.length;
    this.positions = []; // Helyek tárolása
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
  this.updatePositions();
  this.applyPositions();
  this.attachEvents();

  window.addEventListener("resize", () => {
    this.updatePositions();
    this.applyPositions();
  });
}

  updatePositions() {
    this.positions = generatePositions(this.cards.length);
  }

  applyPositions() {
    this.cards.forEach((card, index) => {
      const pos = this.positions[index];

      gsap.set(card, {
        height: pos.height,
        clipPath: pos.clip,
        transform: `
          translateZ(${pos.z}px)
          rotateY(${pos.rotateY}deg)
          translateY(${pos.y}px)
        `
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
    const overlay = clone.querySelector(".cat-hover-overlay");
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
    const pos = this.positions[index];

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

      const pos = this.positions[newIndex];

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
