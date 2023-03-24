const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const preBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// music
const song = [
  {
    name: "AURORA - Runaway",
    displayName: "Runaway",
    artist: "AURORA",
    squareimg: "pic (1)",
  },

  {
    name: "Ed Sheeran - Perfect (Official Music Video)",
    displayName: "Perfect",
    artist: "Ed Sheeran ",
    squareimg: "pic (2)",
  },
  {
    name: "Elley Duhé - MIDDLE OF THE NIGHT (Official Video)",
    displayName: "MIDDLE OF THE NIGHT",
    artist: "Elley Duhé",
    squareimg: "pic (3)",
  },
  {
    name: "Here With Me",
    displayName: "Here With Me",
    artist: "Marshmello",
    squareimg: "pic (4)",
  },
  {
    name: "One Direction - Night Changes (Lyrics)",
    displayName: "Night Changes",
    artist: "One Direction",
    squareimg: "pic (5)",
  },
  {
    name: "PUBLIC - Make You Mine (Put Your Hand in Mine) [Official Video]",
    displayName: "Make You Mine",
    artist: "PUBLIC",
    squareimg: "pic (6)",
  },
  {
    name: "Ruth B. - Dandelions (Lyrics)",
    displayName: "Dandelions",
    artist: "Ruth B.",
    squareimg: "pic (7)",
  },
  {
    name: "Ruth B. - Dandelions (Official Lyric Video)",
    displayName: "Dandelions",
    artist: "Ruth B.",
    squareimg: "pic (8)",
  },

  {
    name: "SNAP",
    displayName: "Snap!",
    artist: "Eurodance group",
    squareimg: "pic (9)",
  },
  {
    name: "Stephen Sanchez with Em Beihold Until I Found You (2)",
    displayName: "Until I Found You",
    artist: "Stephen Sanchez with Em Beihold ",
    squareimg: "pic (10)",
  },
];

// check if playing
let isPlaying = false;

// play

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// play or pause event
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.squareimg}.jpg`;
}

// current song
let songIndex = 0;
// previous song
function preSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = song.length - 1;
  }

  loadSong(song[songIndex]);
  playSong();
}

// next song
function nextSong() {
  songIndex++;
  if (songIndex > song.length - 1) {
    songIndex = 0;
  }

  loadSong(song[songIndex]);
  playSong();
}

// on load

loadSong(song[songIndex]);

// update progress
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // update progress bar **************************
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    //   calculate display for duration *********************************
    const durationMinutes = Math.floor(duration / 60);

    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // delay switching duration elements  to avoid nan
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //   calculate display for current*********************************
    const currentMinutes = Math.floor(currentTime / 60);

    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// set progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// event listener
preBtn.addEventListener("click", preSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
