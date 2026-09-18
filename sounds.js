(function () {
  let audio = null;
  function getAudio() {
    if (!audio) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audio = new AudioCtx();
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }

  function tone(context, start, duration, from, to, type, level) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(from, start);
    oscillator.frequency.exponentialRampToValueAtTime(to, start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(level, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.01);
  }

  window.SOUNDS = {
    flap: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        tone(context, start, 0.12, 980, 180, 'square', 0.12);
      } catch (error) {}
    },

    score: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        tone(context, start, 0.28, 150, 920, 'sine', 0.14);
        tone(context, start + 0.03, 0.22, 280, 1320, 'triangle', 0.1);
      } catch (error) {}
    },

    crash: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        tone(context, start, 0.34, 180, 48, 'sawtooth', 0.18);

        const buffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.24), context.sampleRate);
        const data = buffer.getChannelData(0);
        for (let index = 0; index < data.length; index += 1) {
          data[index] = (Math.random() * 2 - 1) * (1 - index / data.length);
        }
        const noise = context.createBufferSource();
        const gain = context.createGain();
        noise.buffer = buffer;
        gain.gain.setValueAtTime(0.16, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.24);
        noise.connect(gain);
        gain.connect(context.destination);
        noise.start(start);
        noise.stop(start + 0.24);
      } catch (error) {}
    }
  };
})();
