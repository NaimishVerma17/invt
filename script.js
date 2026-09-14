const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const main = document.getElementById("main");
const music = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");

document.body.classList.add("locked");

enterBtn.addEventListener("click", async () => {
  intro.classList.add("hidden");
  main.classList.add("visible");
  document.body.classList.remove("locked");

  try {
    await music.play();
    musicBtn.textContent = "❚❚";
  } catch (e) {
    musicBtn.textContent = "♫";
  }
});

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.textContent = "❚❚";
    } catch (e) {}
  } else {
    music.pause();
    musicBtn.textContent = "♫";
  }
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Countdown
const weddingDate = new Date("2026-12-12T19:00:00+05:30");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const petalColors = ["#f07ba0", "#f4a0bc", "#e8638f", "#f9bcd1"];
const petalSizes  = [[12, 18], [14, 22], [10, 16], [16, 25]];

function makePetal(container, delayRange) {
  const petal = document.createElement("span");
  petal.className = "petal";
  const [w, h] = petalSizes[Math.floor(Math.random() * petalSizes.length)];
  petal.style.left             = Math.random() * 100 + "%";
  petal.style.width            = w + "px";
  petal.style.height           = h + "px";
  petal.style.background       = petalColors[Math.floor(Math.random() * petalColors.length)];
  petal.style.animationName    = Math.random() > .5 ? "fall" : "fall-left";
  petal.style.animationDuration = (6 + Math.random() * 8) + "s";
  petal.style.animationDelay   = (-Math.random() * delayRange) + "s";
  petal.style.opacity          = (.5 + Math.random() * .35).toFixed(2);
  petal.style.transform        = `rotate(${Math.random() * 360}deg)`;
  container.appendChild(petal);
}

const petals     = document.getElementById("petals");
const petalsMain = document.getElementById("petals-main");

for (let i = 0; i < 20; i++) makePetal(petals, 12);
for (let i = 0; i < 30; i++) makePetal(petalsMain, 16);
