const audioCtx = new window.AudioContext();

const container = document.getElementById("container");
/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

/**
 * @type {MediaElementAudioSourceNode}
 */
let audioSource;
/**
 * @type {AnalyserNode}
 */
let analyser;

const button1 = document.getElementById("button1");

button1.addEventListener("click", () => {
  /**
   * @type {HTMLAudioElement}
   */
  const audio1 = document.getElementById("audio1");
  audio1.src = "song18.mp3";
  audio1.play();
  audioSource = audioCtx.createMediaElementSource(audio1);
  analyser = audioCtx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 64;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = canvas.width / bufferLength;
  /**
   * @type {number}
   */
  let barHeight;
  let x = 0;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 2;
      ctx.fillStyle = "white";
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }

    requestAnimationFrame(animate);
  }
  animate();
});

/**
 * @type {HTMLInputElement}
 */
const file = document.getElementById("fileupload");
file.addEventListener("change", () => {
  console.log(this.files);
});

// const button1 = document.getElementById("button1");
// button1.addEventListener("click", () => {
//   audio1.play();
//   audio1.addEventListener("playing", () => {
//     console.log("Audio 1 started playing");
//   });
//   audio1.addEventListener("ended", () => {
//     console.log("Audio 1 ended");
//   });
// });

// const button2 = document.getElementById("button2");
// button2.addEventListener("click", playSound);

// // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// const audioCtx = new window.AudioContext();

// function playSound() {
//   // Create an oscillator node
//   const osc = audioCtx.createOscillator();
//   osc.connect(audioCtx.destination);
//   osc.type = "sawtooth";
//   osc.start();
//   setTimeout(() => {
//     osc.stop();
//   }, 500);
// }
