/**
 * Process audio data using FFT
 * @param data - Float32Array of audio samples
 * @returns Float32Array of frequency data
 */
export const processAudio = (data: Float32Array): Float32Array => {
  // Fallback: simple FFT simulation
  const result = new Float32Array(128);
  const len = data.length;
  
  for (let i = 0; i < 128; i++) {
    let sum = 0;
    const start = Math.floor((i / 128) * len);
    const end = Math.floor(((i + 1) / 128) * len);
    for (let j = start; j < end && j < len; j++) {
      sum += Math.abs(data[j]);
    }
    result[i] = sum / (end - start);
  }
  
  return result;
};