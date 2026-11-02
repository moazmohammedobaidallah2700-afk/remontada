/**
 * Web Audio and Comms Synthesizer for ASTRA HEALTH
 * Includes Quindar tones, Emergency Siren, Comms Calling tones,
 * Natural ambient sound generator (river, ocean, forest, cosmic),
 * and Astronaut Comms Speech synthesis.
 */

class AudioCommsService {
  private ctx: AudioContext | null = null;
  private sirenOsc: OscillatorNode | null = null;
  private sirenGain: GainNode | null = null;
  private sirenInterval: number | null = null;
  private ambientNoiseNode: AudioNode | null = null;
  private ambientGain: GainNode | null = null;
  private callRingInterval: number | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Authentic Apollo Quindar Beeps
   * Intro tone: 2525 Hz for 250ms
   * Outro tone: 2475 Hz for 250ms
   */
  playQuindar(type: 'intro' | 'outro' = 'intro') {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(type === 'intro' ? 2525 : 2475, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + 0.22);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } catch {
      // AudioContext policy fallback
    }
  }

  /**
   * Space Comms Calling Sound (Chime / Ringtone when calling astronaut)
   */
  playCommsRing(onStop?: () => void): () => void {
    const ctx = this.getContext();
    let isPlaying = true;

    const playBeep = () => {
      if (!isPlaying) return;
      try {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(840, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(1050, ctx.currentTime + 0.15);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(1260, ctx.currentTime);

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.4);
        osc2.stop(ctx.currentTime + 0.4);
      } catch {
        // audio policy
      }
    };

    playBeep();
    this.callRingInterval = window.setInterval(playBeep, 1600);

    const stop = () => {
      isPlaying = false;
      if (this.callRingInterval) {
        clearInterval(this.callRingInterval);
        this.callRingInterval = null;
      }
      if (onStop) onStop();
    };

    return stop;
  }

  /**
   * Two-tone emergency medical siren (520Hz / 880Hz alternating)
   */
  startEmergencySiren() {
    this.stopEmergencySiren();
    try {
      const ctx = this.getContext();
      this.sirenOsc = ctx.createOscillator();
      this.sirenGain = ctx.createGain();

      this.sirenOsc.type = 'sawtooth';
      this.sirenGain.gain.setValueAtTime(0.06, ctx.currentTime);

      this.sirenOsc.connect(this.sirenGain);
      this.sirenGain.connect(ctx.destination);

      let high = false;
      this.sirenOsc.frequency.setValueAtTime(520, ctx.currentTime);

      this.sirenInterval = window.setInterval(() => {
        if (!this.sirenOsc || !this.ctx) return;
        high = !high;
        this.sirenOsc.frequency.setValueAtTime(high ? 880 : 520, this.ctx.currentTime);
      }, 450);

      this.sirenOsc.start();
    } catch {
      // Audio policy
    }
  }

  stopEmergencySiren() {
    if (this.sirenInterval) {
      clearInterval(this.sirenInterval);
      this.sirenInterval = null;
    }
    if (this.sirenOsc) {
      try {
        this.sirenOsc.stop();
        this.sirenOsc.disconnect();
      } catch {
        // ignore
      }
      this.sirenOsc = null;
    }
  }

  /**
   * Biophilic Nature Ambient Sound Generator
   * Generates procedural water/ocean waves, river murmur, forest breeze, and deep space resonance
   */
  startNatureAmbience(type: 'river' | 'ocean' | 'beach' | 'forest' | 'wildlife' | 'cosmic') {
    this.stopNatureAmbience();
    try {
      const ctx = this.getContext();
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink / Brownian noise baseline
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      this.ambientGain = ctx.createGain();

      if (type === 'river') {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(650, ctx.currentTime);
        filter.Q.setValueAtTime(1.8, ctx.currentTime);
        this.ambientGain.gain.setValueAtTime(0.04, ctx.currentTime);
      } else if (type === 'ocean' || type === 'beach') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(380, ctx.currentTime);
        this.ambientGain.gain.setValueAtTime(0.05, ctx.currentTime);

        // Slow ocean wave modulation
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 sec wave swell
        lfoGain.gain.setValueAtTime(200, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
      } else if (type === 'forest' || type === 'wildlife') {
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(900, ctx.currentTime);
        this.ambientGain.gain.setValueAtTime(0.025, ctx.currentTime);
      } else {
        // Cosmic 432 Hz resonant hum
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250, ctx.currentTime);
        this.ambientGain.gain.setValueAtTime(0.03, ctx.currentTime);

        const sine = ctx.createOscillator();
        sine.type = 'sine';
        sine.frequency.setValueAtTime(108, ctx.currentTime); // harmonic of 432
        const sineGain = ctx.createGain();
        sineGain.gain.setValueAtTime(0.04, ctx.currentTime);
        sine.connect(sineGain);
        sineGain.connect(this.ambientGain);
        sine.start();
      }

      noise.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(ctx.destination);

      noise.start();
      this.ambientNoiseNode = noise;
    } catch {
      // Audio policy
    }
  }

  stopNatureAmbience() {
    if (this.ambientNoiseNode) {
      try {
        (this.ambientNoiseNode as AudioBufferSourceNode).stop();
        this.ambientNoiseNode.disconnect();
      } catch {
        // ignore
      }
      this.ambientNoiseNode = null;
    }
    if (this.ambientGain) {
      try {
        this.ambientGain.disconnect();
      } catch {
        // ignore
      }
      this.ambientGain = null;
    }
  }

  /**
   * Call the Astronaut with AI Speech (Web Speech Synthesis API)
   * Dr. ASTRA voice guidance in EN or AR.
   */
  speakToAstronaut(text: string, lang: 'en' | 'ar', onEnd?: () => void) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
      utterance.rate = 0.95; // Clear space comms delivery
      utterance.pitch = lang === 'ar' ? 1.05 : 1.15;

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferredVoice = voices.find(v => 
          lang === 'ar' ? v.lang.startsWith('ar') : (v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Female')))
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      utterance.onend = () => {
        this.playQuindar('outro');
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      // Play intro Quindar tone before voice transmission
      this.playQuindar('intro');
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 300);
    } catch {
      if (onEnd) onEnd();
    }
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const audioComms = new AudioCommsService();
