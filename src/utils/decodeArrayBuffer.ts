import { ToneAudioBuffer } from "tone";

const decodeArrayBuffer = async (buffer: ArrayBuffer) => {
  const audioCtx = new AudioContext();

  const audio = await audioCtx.decodeAudioData(buffer);

  return new ToneAudioBuffer(audio);
};

export default decodeArrayBuffer;
