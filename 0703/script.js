const listObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.love-list li').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
  listObserver.observe(el);
});
const petalsEl = document.getElementById("petals");
const symbols = ["✿", "❀", "✾", "❁", "⚘"];

for (let i = 0; i < 18; i++) {
  const p = document.createElement("div");
  p.className = "petal";
  p.textContent = symbols[i % symbols.length];
  p.style.left = Math.random() * 100 + "vw";
  p.style.fontSize = 0.8 + Math.random() * 5 + "rem";
  p.style.animationDuration = 8 + Math.random() * 5 + "s";
  p.style.animationDelay = Math.random() * 6 + "s";
  p.style.color = `hsl(${340 + Math.random() * 30}, 60%, ${65 + Math.random() * 15}%)`;
  petalsEl.appendChild(p);
}

const startDate = new Date(2026, 0, 1, 0, 0);

document.getElementById("since-text").textContent =
  "desde " +
  startDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;

  if (isNaN(diff) || diff < 0) return;

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  if (now.getDate() < startDate.getDate()) months--;
  if (months < 0) {
    years--;
    months += 12;
  }

  const temp = new Date(startDate);
  temp.setFullYear(temp.getFullYear() + years);
  temp.setMonth(temp.getMonth() + months);
  const remainDays = Math.floor((now - temp) / 86400000);
  const remainHours =
    now.getHours() - startDate.getHours() < 0
      ? 24 + now.getHours() - startDate.getHours()
      : now.getHours() - startDate.getHours();

  document.getElementById("years").textContent = String(years).padStart(2, "0");
  document.getElementById("months").textContent = String(months).padStart(
    2,
    "0",
  );
  document.getElementById("days").textContent = String(remainDays).padStart(
    2,
    "0",
  );
  document.getElementById("hours").textContent = String(remainHours).padStart(
    2,
    "0",
  );
}

updateCounter();
setInterval(updateCounter, 1000 * 60);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".memory-card").forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = `opacity 0.7s ${i * 0.12}s ease, transform 0.7s ${i * 0.12}s cubic-bezier(0.22,1,0.36,1)`;
  observer.observe(el);
});
