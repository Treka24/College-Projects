const alarmContainer = document.getElementById("alarm-buttons");
const musicContainer = document.getElementById("music-buttons");
const musicPlayer = document.getElementById("music-player");


const alarmNames = {
  "alarm1.mp3": "Great work",
  "alarm2.mp3": "Wake Up",
  "alarm3.mp3": "Katkoot",
  "alarm4.mp3": "bad Time",
  "alarm5.mp3": "Deadline",
  "alarm6.mp3": "Annoy",
  "alarm7.mp3": "bad",
  "alarm8.mp3": "End of Session"
};


const musicNames = {
  "song1.mp3": "Wild Flower",
  "song2.mp3": "7elwa ya balady",
  "song3.mp3": "Tabib gara7 ",
  "song4.mp3": "Dkn Dkn",
  "song5.mp3": "Bella Caio"
};


for (let i = 1; i <= 8; i++) {
  const fileName = `alarm${i}.mp3`;
  const btn = document.createElement("button");
  btn.textContent = alarmNames[fileName] || `Alarm ${i}`;
  btn.onclick = () => {
    localStorage.setItem("selectedAlarm", `alarms/${fileName}`);

    
    document.querySelectorAll("#alarm-buttons button").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  };
  alarmContainer.appendChild(btn);
}


for (let i = 1; i <= 5; i++) {
  const fileName = `song${i}.mp3`;
  const btn = document.createElement("button");
  btn.textContent = musicNames[fileName] || `Song ${i}`;
  btn.onclick = () => {
    musicPlayer.src = `music/${fileName}`;
    musicPlayer.play();
  };
  musicContainer.appendChild(btn);
}
