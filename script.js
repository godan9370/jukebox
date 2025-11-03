const vinyl = document.getElementById('vinyl');
const audio = document.getElementById('audio');
const trackSelect = document.getElementById('trackSelect');
const winnieGif = document.getElementById('winnieGif');

let angle = 0;
let speed = 0; // rotation speed in degrees per frame
let targetSpeed = 0;
let isPlaying = false;

// Click vinyl to toggle play/pause
vinyl.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  
});

// When audio plays
audio.addEventListener('play', () => {
  isPlaying = true;
  targetSpeed = 2;
  winnieGif.classList.add('visible');   // fade in GIF
});

audio.addEventListener('pause', () => {
  isPlaying = false;
  targetSpeed = 0;
  winnieGif.classList.remove('visible'); // fade out GIF
});

// When changing track
trackSelect.addEventListener('change', () => {
  const selectedTrack = trackSelect.value;
  audio.src = selectedTrack;
  audio.play();
});

function animate() {
  speed += (targetSpeed - speed) * 0.2; // ← faster ramp
  angle += speed;
  vinyl.style.transform = `rotate(${angle}deg)`;
  requestAnimationFrame(animate);
}

animate(); // Start animation loop

// Stop/resume listener for Readymag
window.addEventListener("message", (event) => {
  if (event.data === "stopMusic") {
    console.log("Stop message received");
    audio.pause();
    audio.currentTime = 0;
    targetSpeed = 0;
    winnieGif.classList.remove('visible');
  }

  if (event.data === "resumeMusic") {
    console.log("Resume message received");
    audio.play();
  }
});





