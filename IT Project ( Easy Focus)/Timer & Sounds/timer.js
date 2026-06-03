
let timer;
let timeLeft = 0;
let selectedAlarm = "alarms/alarm1.mp3";
let audio = new Audio();

function updateDisplay() {
  let hrs = Math.floor(timeLeft / 3600);
  let mins = Math.floor((timeLeft % 3600) / 60);
  let secs = timeLeft % 60;
  document.getElementById("timer-display").textContent =
    String(hrs).padStart(2, '0') + ":" +
    String(mins).padStart(2, '0') + ":" +
    String(secs).padStart(2, '0');
}

function startTimer() {
  let hours = parseInt(document.getElementById("hours").value) || 0;
  let minutes = parseInt(document.getElementById("minutes").value) || 0;
  let seconds = parseInt(document.getElementById("seconds").value) || 0;
  timeLeft = hours * 3600 + minutes * 60 + seconds;
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      playAlarm();
    } else {
      timeLeft--;
      updateDisplay();
    }
  }, 1000);
  updateDisplay();
}

function startBreak(minutes) {
  timeLeft = minutes * 60;
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      playAlarm();
    } else {
      timeLeft--;
      updateDisplay();
    }
  }, 1000);
  updateDisplay();
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 0;
  updateDisplay();

  
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
}

function toggleFullscreen() {
  const display = document.getElementById("timer-display");
  if (!document.fullscreenElement) {
    display.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function playAlarm() {
  const selected = localStorage.getItem("selectedAlarm") || "alarms/alarm1.mp3";
  const alarmSound = new Audio(selected);
  alarmSound.play();
}

function toggleFullscreen() {
  const elem = document.documentElement; 
  if (!document.fullscreenElement) {
    elem.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}



updateDisplay();

