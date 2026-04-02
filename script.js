const slidesEl = document.getElementById("slides");
const dotsEl = document.getElementById("dots");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const blessingBtn = document.getElementById("blessingBtn");
const blessingText = document.getElementById("blessingText");
const blessingCountEl = document.getElementById("blessingCount");
const quoteBtn = document.getElementById("quoteBtn");
const quoteText = document.getElementById("quoteText");
const yearEl = document.getElementById("year");
const revealEls = document.querySelectorAll(".reveal");
const chatToggle = document.getElementById("chatToggle");
const chatPanel = document.getElementById("chatPanel");
const chatMessage = document.getElementById("chatMessage");
const chatOptions = document.querySelectorAll(".chat-option");

const totalSlides = slidesEl.children.length;
let currentIndex = 0;
let autoSlideTimer;

function renderDots() {
  dotsEl.innerHTML = "";
  for (let i = 0; i < totalSlides; i += 1) {
    const dot = document.createElement("button");
    dot.className = `dot${i === currentIndex ? " active" : ""}`;
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    dotsEl.appendChild(dot);
  }
}

function goToSlide(index) {
  currentIndex = (index + totalSlides) % totalSlides;
  slidesEl.style.transform = `translateX(-${currentIndex * 100}%)`;
  [...dotsEl.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function startAutoSlide() {
  autoSlideTimer = setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 3200);
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

prevBtn.addEventListener("click", () => {
  goToSlide(currentIndex - 1);
  resetAutoSlide();
});

nextBtn.addEventListener("click", () => {
  goToSlide(currentIndex + 1);
  resetAutoSlide();
});

slidesEl.addEventListener("mouseenter", () => clearInterval(autoSlideTimer));
slidesEl.addEventListener("mouseleave", startAutoSlide);

const blessings = [
  "May Lord Ram guide your path with wisdom.",
  "May your heart stay brave and kind.",
  "May dharma and peace shine in your life.",
  "May every challenge turn into strength."
];

const reflections = [
  "Dharma protects those who protect dharma.",
  "Humility gives true strength its direction.",
  "A calm mind sees the right path clearly.",
  "Character is built by choices made in silence."
];

let blessingCount = Number(localStorage.getItem("blessingCount") || 0);
blessingCountEl.textContent = String(blessingCount);

blessingBtn.addEventListener("click", () => {
  const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
  blessingText.textContent = randomBlessing;
  blessingCount += 1;
  blessingCountEl.textContent = String(blessingCount);
  localStorage.setItem("blessingCount", String(blessingCount));
});

quoteBtn.addEventListener("click", () => {
  const randomReflection = reflections[Math.floor(Math.random() * reflections.length)];
  quoteText.textContent = randomReflection;
});

yearEl.textContent = new Date().getFullYear();

chatToggle.addEventListener("click", () => {
  const isExpanded = chatToggle.getAttribute("aria-expanded") === "true";
  chatToggle.setAttribute("aria-expanded", String(!isExpanded));
  chatPanel.hidden = isExpanded;
});

chatOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const targetId = option.dataset.target;
    const responses = {
      about: "Lord Ram stands for courage, compassion, and dharma. His story encourages steady action guided by principle.",
      values: "The core values here are compassion, integrity, and courage. They shape every section of the page.",
      gallery: "The gallery is below. You can use the arrows or let the cards auto-slide.",
      teachings: "The reflection section collects short lines inspired by dharma and calm leadership."
    };

    chatMessage.textContent = responses[targetId] || "Choose another topic from the options below.";

    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));

renderDots();
goToSlide(0);
startAutoSlide();
