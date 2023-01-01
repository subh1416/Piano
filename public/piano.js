const WHITE_KEYS = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"];
const BLACK_KEYS = ["w", "e", "t", "y", "u", "o", "p"];

const keys = document.querySelectorAll(".key");
const whiteKeys = document.querySelectorAll(".key.white");
const blackKeys = document.querySelectorAll(".key.black");
const keyCheckbox = document.querySelector(".keys-checkbox input");
const pianoKeys = document.querySelectorAll(".piano-keys .key");
const recordButton = document.querySelector(".icons");
const playButton = document.querySelector(".icons3");
const saveButton = document.querySelector(".icons2");
const x = document.querySelector(".container");
const y = document.querySelector(".container4");
const recordsongs = document.querySelector(".icons4");

const keyMap = [...keys].reduce((map, key) => {
  map[key.dataset.note] = key;
  return map;
}, {});

let recordingStartTime;
let songNotes = currentSong && currentSong.notes
// let songNotes 

console.log(currentSong)

keys.forEach((key) => {
  key.addEventListener("click", () => playNote(key));
});

if(recordButton){
  recordButton.addEventListener("click", toggleRecording);

}

if(saveButton){
  saveButton.addEventListener("click", saveSong);

}
playButton.addEventListener("click", playSong);



document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);
});

function toggleRecording() {
  recordButton.classList.toggle("active");
  if (isRecording()) {
    startRecording();
  } else {
    stopRecording();
  }
}

function isRecording() {
  return recordButton != null && recordButton.classList.contains("active");
}

function startRecording() {
  recordingStartTime = Date.now();
  songNotes = [];
  playButton.classList.remove("show");
  saveButton.classList.remove("show");
  recordsongs.classList.remove("show");

  x.style.marginRight = "-33em";
  // y.style.marginRight = "3em";
}

function stopRecording() {
  playSong();
  x.style.paddingRight = "2em";
  x.style.marginRight = "3em";
  playButton.classList.add("show");
  saveButton.classList.add("show");
}

function playSong() {
  if (songNotes.length === 0) return;
  songNotes.forEach((note) => {
    setTimeout(() => {
      playNote(keyMap[note.key]);
    }, note.startTime);
  });
}

function recordNote(note) {
  songNotes.push({
    key: note,
    startTime: Date.now() - recordingStartTime,
  });
}

function playNote(key) {
  if (isRecording()) recordNote(key.dataset.note);
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add("active");

  noteAudio.addEventListener("ended", () => {
    key.classList.remove("active");
  });
}

const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

function saveSong() {
  axios.post("/songs", { songNotes: songNotes }).then((res) => {
    recordsongs.classList.add("show")
    console.log(res.data)
    y.href = `/songs/${res.data._id}`
  });
}

keyCheckbox.addEventListener("click", showHideKeys);
