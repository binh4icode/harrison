const regularCookies = ['images/cookie1.png','images/cookie2.png'];
const goldenCookieImg = 'images/golden_cookie.png';

const bgMusic =new Audio("background.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.3;
const container = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score')
const timeerDisplay = document.getElementById('timer')
const startBtn = document.getElementById('start-btn')

let score = 0;
let timeleft = 30;
let gameActive = false;

startBtn.addEventListener("click", startGame)
function startGame() {
score = 0; 
timeleft =  30;
gameActive = true;
startBtn.disabled = true;
container.innerHTML = '';

bgMusic.currentTime = 0;
bgMusic.play();
const countdown = setInterval(() => {
timeleft--;
timeerDisplay.innerText = timeleft;
if (timeleft <= 0) {
    clearInterval(countdown);
gameActive = false;
startBtn.disbaled = false;
bgMusic.pause();
alert("Game Over! Score " + score);
}

}, 1000);
setInterval(createCookie, 800);
console.log("hi")
}

function createCookie () {
    if (!gameActive) return;

    const cookie= document.createElement('img');
    cookie.classList.add('cookie')
 
    // 10% chance for golden
if (Math.random() < 0.1) {
  cookie.src = goldenCookieImg;
  cookie.dataset.points = 100000;
  cookie.classList.add('golden');
} else {
const rand = Math.floor(Math.random() * regularCookies.length);
cookie.src = regularCookies[rand];
cookie.dataset.points = 1;
}

// Random Position
cookie.style.left = Math.random() * 520 + 'px';
cookie.style.top = Math.random() * 320 + 'px';

container.appendChild(cookie);
// (Add this inside the createCookie  funcition at the bottom)
cookie.addEventListener('mousedown' , function() {
score+= parseInt(this.dataset.points);
scoreDisplay.innerText = score; 
this.remove();

 });

//Remove after 1.2 seconds if not clicked
setTimeout(() => {
    if (cookie.parentElement) cookie.remove();
}, 1200);

}















