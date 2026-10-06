// JavaScript menyimpan keadaan permainan dan memperbarui elemen HTML.
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');
const bestElement = document.querySelector('#best');
const arena = document.querySelector('#arena');
const star = document.querySelector('#star');
const overlay = document.querySelector('#overlay');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const progress = document.querySelector('#progress');
const statusElement = document.querySelector('#status');
const duration = 30_000;
let score = 0;
let best = 0;
let playing = false;
let deadline = 0;
let timer;

// Penyimpanan boleh gagal, misalnya saat browser membatasi localStorage.
try { best = Math.max(0, Number(localStorage.getItem('tangkap-bintang-best')) || 0); } catch {}
bestElement.textContent = formatScore(best);

function formatScore(value) { return String(value).padStart(2, '0'); }

// Posisi dibatasi supaya bintang tetap berada di dalam arena pada layar apa pun.
function moveStar() {
  const padding = 12;
  const maxX = Math.max(0, arena.clientWidth - star.offsetWidth - padding * 2);
  const maxY = Math.max(0, arena.clientHeight - star.offsetHeight - padding * 2 - 30);
  star.style.left = `${padding + Math.random() * maxX}px`;
  star.style.top = `${padding + Math.random() * maxY}px`;
}

function startGame() {
  clearInterval(timer); // Cegah timer ganda saat memulai ulang.
  score = 0;
  playing = true;
  deadline = performance.now() + duration;
  scoreElement.textContent = '00';
  timeElement.textContent = '30';
  progress.style.width = '100%';
  overlay.hidden = true;
  star.hidden = false;
  resetButton.hidden = false;
  statusElement.textContent = 'Ayo, tangkap bintangnya!';
  moveStar();
  star.focus({ preventScroll: true });
  timer = setInterval(updateTime, 100);
}

function updateTime() {
  const remaining = Math.max(0, deadline - performance.now());
  timeElement.textContent = Math.ceil(remaining / 1000);
  progress.style.width = `${remaining / duration * 100}%`;
  if (remaining === 0) endGame();
}

function endGame() {
  clearInterval(timer);
  playing = false;
  star.hidden = true;
  resetButton.hidden = true;
  overlay.hidden = false;
  const newRecord = score > best;
  if (newRecord) {
    best = score;
    bestElement.textContent = formatScore(best);
    try { localStorage.setItem('tangkap-bintang-best', String(best)); } catch {}
  }
  document.querySelector('#message').textContent = newRecord ? 'Rekor baru. Hebat!' : 'Waktu habis!';
  document.querySelector('#summary').textContent = `Kamu menangkap ${score} bintang. Coba lagi untuk melampaui rekormu!`;
  startButton.textContent = 'Main lagi ↗';
  statusElement.textContent = `Selesai! Skor akhir: ${score} poin.`;
  startButton.focus({ preventScroll: true });
}

star.addEventListener('click', () => {
  if (!playing) return;
  // Periksa waktu juga di sini agar klik setelah batas waktu tidak dihitung.
  if (performance.now() >= deadline) { updateTime(); return; }
  score += 1;
  scoreElement.textContent = formatScore(score);
  moveStar();
});
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', startGame);
window.addEventListener('resize', () => { if (playing) moveStar(); });
document.addEventListener('visibilitychange', () => { if (playing) updateTime(); });
