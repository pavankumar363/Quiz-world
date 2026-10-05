const $ = (selector) => document.querySelector(selector);

const toast = (message) => {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
};

$("#menuToggle").addEventListener("click", () => {
  $("#mainNav").classList.toggle("open");
});

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => $("#mainNav").classList.remove("open"));
});

document.querySelectorAll(".options button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".options button").forEach((item) => item.classList.remove("correct"));
    button.classList.add("correct");
    toast(button.textContent.trim().startsWith("B.") ? "Correct answer! 🎉" : "Keep learning — try again!");
  });
});

document.querySelectorAll(".text-btn").forEach((button) => {
  button.addEventListener("click", () => toast("Quiz engine coming next. 🚀"));
});

$("#challengeBtn").addEventListener("click", () => {
  document.querySelector("#quizzes").scrollIntoView({ behavior: "smooth" });
  toast("Daily Challenge selected!");
});

$("#leaderboardBtn").addEventListener("click", () => toast("Leaderboard page will be connected next."));
$("#aiBtn").addEventListener("click", () => toast("AI Quiz Generator will be connected next."));
$("#loginBtn").addEventListener("click", () => toast("Login & Google sign-in will be connected next."));

document.querySelectorAll(".category-grid button").forEach((button) => {
  button.addEventListener("click", () => toast(button.querySelector("span").firstChild.textContent.trim() + " selected."));
});

/* Shared interactions */
function showToast(message){const e=document.getElementById("toast");if(!e)return;e.textContent=message;e.classList.add("show");clearTimeout(window.__qwToast);window.__qwToast=setTimeout(()=>e.classList.remove("show"),2600)}
const menu=document.getElementById("menuToggle");if(menu)menu.addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>{const n=document.getElementById("mainNav");if(n)n.classList.remove("open")}));
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");showToast(b.textContent+" selected")}));
