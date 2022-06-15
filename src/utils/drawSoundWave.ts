import { ToneAudioBuffer } from "tone";

const chunkSize = 200;
const margin = 0;

const drawSoundWave = async (
  audioBuffer: ToneAudioBuffer,
  canvas: HTMLCanvasElement
) => {
  const { width, height } = canvas;
  const centerHeight = Math.ceil(height / 2);
  const scaleFactor = (height - margin * 2) / 2;

  const float32Array = audioBuffer.getChannelData(0);
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  const array = [];

  let i = 0;
  const length = float32Array.length;
  while (i < length) {
    array.push(
      float32Array.slice(i, (i += chunkSize)).reduce(function (total, value) {
        return Math.max(total, Math.abs(value));
      })
    );
  }

  canvas.width = Math.ceil(float32Array.length / chunkSize + margin * 2);

  for (let index in array) {
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(
      margin + Number(index),
      centerHeight - array[index] * scaleFactor
    );
    ctx.lineTo(
      margin + Number(index),
      centerHeight + array[index] * scaleFactor
    );
    ctx.stroke();
  }
};

export default drawSoundWave;
