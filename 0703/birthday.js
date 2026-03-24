const CONFIG = {
  nascimento: {
    ano: 2010,
    mes: 3,
    dia: 7,
  },

  nome: "Gabriela",
};

(function initParticles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let W,
    H,
    stars = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createStars(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        speed: Math.random() * 0.008 + 0.002,
        drift: (Math.random() - 0.5) * 0.15,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach((s) => {
      s.a += s.speed;
      s.x += s.drift;
      if (s.x > W) s.x = 0;
      if (s.x < 0) s.x = W;
      const alpha = (Math.sin(s.a) * 0.5 + 0.5) * 0.6;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(122,174,255,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  createStars(120);
  draw();
  window.addEventListener("resize", () => {
    resize();
    createStars(120);
  });
})();

const meses = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

function pad(n) {
  return String(n).padStart(2, "0");
}

function update() {
  const { ano, mes, dia } = CONFIG.nascimento;

  if (!ano || !mes || !dia) return;

  const now = new Date();
  const birthDate = new Date(ano, mes - 1, dia);

  let age = now.getFullYear() - birthDate.getFullYear();
  const hadBirthday =
    now.getMonth() > birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() &&
      now.getDate() >= birthDate.getDate());
  if (!hadBirthday) age--;

  document.getElementById("age").textContent = pad(age);
  document.getElementById("birth-display").textContent =
    `nascida em ${dia} de ${meses[mes - 1]} de ${ano}`;

  let nextBirthday = new Date(now.getFullYear(), mes - 1, dia);
  if (nextBirthday <= now) {
    nextBirthday = new Date(now.getFullYear() + 1, mes - 1, dia);
  }

  const isToday =
    now.getDate() === birthDate.getDate() &&
    now.getMonth() === birthDate.getMonth();

  const noteEl = document.getElementById("is-today-msg");

  if (isToday) {
    document.getElementById("cd-months").textContent = "00";
    document.getElementById("cd-days").textContent = "00";
    document.getElementById("cd-hours").textContent = "00";
    document.getElementById("cd-minutes").textContent = "00";
    noteEl.textContent = `✦ hoje é o grande dia ✦`;
  } else {
    const diff = nextBirthday - now;
    const totalMin = Math.floor(diff / 60000);
    const totalHr = Math.floor(totalMin / 60);
    const totalDays = Math.floor(totalHr / 24);

    const cdMonths = Math.floor(totalDays / 30.44);
    const cdDays = totalDays - Math.floor(cdMonths * 30.44);
    const cdHours = totalHr % 24;
    const cdMinutes = totalMin % 60;

    document.getElementById("cd-months").textContent = pad(cdMonths);
    document.getElementById("cd-days").textContent = pad(cdDays);
    document.getElementById("cd-hours").textContent = pad(cdHours);
    document.getElementById("cd-minutes").textContent = pad(cdMinutes);
    noteEl.textContent = "";
  }
}

update();
setInterval(update, 30000);

const listObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.2 },
);

document.querySelectorAll(".wish-list li").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  listObserver.observe(el);
});
