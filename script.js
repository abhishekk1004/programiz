const slidesEl = document.getElementById("slides");
const dotsEl = document.getElementById("dots");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const blessingBtn = document.getElementById("blessingBtn");
const blessingText = document.getElementById("blessingText");

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

blessingBtn.addEventListener("click", () => {
  const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
  blessingText.textContent = randomBlessing;
});

renderDots();
goToSlide(0);
startAutoSlide();
