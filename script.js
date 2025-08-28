const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const stopButton = document.getElementById('stop-btn');

let isRunning = true;
let clockInterval;

function initClock() {
  updateClock();
  clockInterval = setInterval(updateClock, 1000);
  
  stopButton.addEventListener('click', toggleClock);

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      toggleClock();
    }
  });
}

function updateClock() {
  const now = new Date();
  
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  const timeString = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  timeElement.textContent = timeString;
  
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  dateElement.textContent = now.toLocaleDateString('en-US', options);
}

function formatTime(num) {
  return num < 10 ? `0${num}` : num;
}

function toggleClock() {
  if (isRunning) {
    clearInterval(clockInterval);
    stopButton.innerHTML = '<i class="fas fa-play"></i>';
    stopButton.classList.add('paused');
  } else {
    clockInterval = setInterval(updateClock, 1000);
    stopButton.innerHTML = '<i class="fas fa-pause"></i>';
    stopButton.classList.remove('paused');
    updateClock();
  }
  isRunning = !isRunning;
}

document.addEventListener('DOMContentLoaded', initClock);