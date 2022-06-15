import { Sample } from "../audio/Sample";
import drawSoundWave from "../utils/drawSoundWave";

class Waveforms {
  waveforms: Record<string, string> = {};

  drawWaveform(
    sample: Sample,
    canvas: HTMLCanvasElement,
    width: number = canvas.width
  ) {
    let waveform = this.waveforms[sample.name];

    if (!waveform) {
      drawSoundWave(sample.player.buffer, canvas);
      this.waveforms[sample.name] = canvas.toDataURL("png", 1);
    }

    waveform = this.waveforms[sample.name];

    const image = new Image();
    image.src = waveform;

    image.onload = () => {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Need this because sometimes canvas.width doesn't match the real size on screen
        canvas.width = width;
        ctx.clearRect(0, 0, width, canvas.height);
        ctx.drawImage(
          image,
          (sample.offset / sample.fullLength) * image.width,
          0,
          (sample.length / sample.fullLength) * image.width,
          canvas.height,
          0,
          0,
          width,
          canvas.height
        );
      }
    };
  }

  deleteWaveform(sample: Sample) {
    this.waveforms[sample.id] = "";
  }
}

const waveforms = new Waveforms();

export default waveforms;
