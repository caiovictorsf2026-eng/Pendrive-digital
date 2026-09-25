/**
 * High-performance Web Audio Synthesizer for Brazilian music previews.
 * Delivers real sound right in the browser with zero external dependencies.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: string | null = null;
  private timerId: number | null = null;
  private lowpassFilter: BiquadFilterNode | null = null;
  private masterGain: BiquadFilterNode | GainNode | null = null;
  private isHighDef: boolean = true; // 320kbps vs 128kbps
  private step: number = 0;
  private bpm: number = 135;
  private onVisualizerUpdate?: (data: number[]) => void;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setQualityMode(highDef: boolean) {
    this.isHighDef = highDef;
    if (this.lowpassFilter && this.ctx) {
      if (highDef) {
        // Full 320kbps studio clarity
        this.lowpassFilter.frequency.setTargetAtTime(20000, this.ctx.currentTime, 0.05);
      } else {
        // Simulating muffled 128kbps mp3 compression
        this.lowpassFilter.frequency.setTargetAtTime(7500, this.ctx.currentTime, 0.05);
      }
    }
  }

  public getQualityMode(): boolean {
    return this.isHighDef;
  }

  public setVisualizerCallback(cb: (data: number[]) => void) {
    this.onVisualizerUpdate = cb;
  }

  public playTrack(trackId: string, bpm: number = 135) {
    this.initContext();
    if (!this.ctx) return;

    if (this.isPlaying && this.currentTrackId === trackId) {
      this.stop();
      return;
    }

    this.stop();
    this.isPlaying = true;
    this.currentTrackId = trackId;
    this.bpm = bpm;
    this.step = 0;

    // Build audio chain
    const master = this.ctx.createGain();
    master.gain.setValueAtTime(0.4, this.ctx.currentTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(this.isHighDef ? 20000 : 7500, this.ctx.currentTime);

    master.connect(filter);
    filter.connect(this.ctx.destination);

    this.masterGain = master;
    this.lowpassFilter = filter;

    const intervalMs = (60 / (this.bpm * 4)) * 1000;
    this.timerId = window.setInterval(() => {
      this.playStep(trackId);
    }, intervalMs);
  }

  public stop() {
    this.isPlaying = false;
    this.currentTrackId = null;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.onVisualizerUpdate) {
      this.onVisualizerUpdate([0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }

  public getCurrentTrack(): string | null {
    return this.isPlaying ? this.currentTrackId : null;
  }

  private playStep(trackId: string) {
    if (!this.ctx || !this.isPlaying || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const currentStep = this.step % 16;
    this.step++;

    // Generate simulated visualizer heights
    if (this.onVisualizerUpdate) {
      const bars = Array.from({ length: 12 }, () => Math.min(100, Math.floor(Math.random() * 70 + (currentStep % 4 === 0 ? 30 : 10))));
      this.onVisualizerUpdate(bars);
    }

    if (trackId === 'piseiro') {
      // Piseiro / Forró de Paredão: syncopated kick, clap, heavy accordion chord stabs
      if (currentStep === 0 || currentStep === 6 || currentStep === 8 || currentStep === 12) {
        this.triggerKick(now, 55, 0.28);
      }
      if (currentStep === 4 || currentStep === 12) {
        this.triggerSnare(now, 260, 0.18);
      }
      if (currentStep % 2 === 0) {
        this.triggerHiHat(now, false);
      }
      if (currentStep % 4 === 2) {
        this.triggerSynthStab(now, [220, 277, 330]); // A major chord
      }
    } else if (trackId === 'megafunk') {
      // Mega Funk: Sub-bass 808 kick, rapid rolling claps, high brass lead
      if (currentStep === 0 || currentStep === 3 || currentStep === 8 || currentStep === 11) {
        this.triggerSub808(now, 45, 0.35);
      }
      if (currentStep === 4 || currentStep === 12 || currentStep === 14) {
        this.triggerSnare(now, 380, 0.12);
      }
      if (currentStep % 2 === 0) {
        this.triggerHiHat(now, currentStep === 2 || currentStep === 10);
      }
      if (currentStep === 0 || currentStep === 8) {
        this.triggerBassDrop(now, 110, 40);
      }
    } else if (trackId === 'pagode') {
      // Pagode & Samba: Surdo drum, tamborim swing, cavaco chords
      if (currentStep === 0 || currentStep === 8 || currentStep === 10) {
        this.triggerKick(now, 65, 0.22);
      }
      if (currentStep === 3 || currentStep === 6 || currentStep === 11 || currentStep === 14) {
        this.triggerWoodblock(now, 800);
      }
      if (currentStep % 4 === 1 || currentStep % 4 === 3) {
        this.triggerHiHat(now, false);
      }
      if (currentStep === 2 || currentStep === 6 || currentStep === 10 || currentStep === 14) {
        this.triggerAcousticChords(now, [261.6, 329.6, 392]); // C major cavaco
      }
    } else {
      // Default energetic club / electronic beat
      if (currentStep % 4 === 0) {
        this.triggerKick(now, 50, 0.3);
      }
      if (currentStep === 4 || currentStep === 12) {
        this.triggerSnare(now, 220, 0.2);
      }
      if (currentStep % 2 === 1) {
        this.triggerHiHat(now, true);
      }
    }
  }

  private triggerKick(time: number, freq: number, decay: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(freq * 2.5, time);
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.05);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + decay);

    gain.gain.setValueAtTime(1.0, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + decay);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + decay);
  }

  private triggerSub808(time: number, freq: number, decay: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';

    osc.frequency.setValueAtTime(freq * 1.5, time);
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.04);

    gain.gain.setValueAtTime(1.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + decay);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + decay);
  }

  private triggerBassDrop(time: number, startFreq: number, endFreq: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';

    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(endFreq, time + 0.25);

    gain.gain.setValueAtTime(0.25, time);
    gain.gain.linearRampToValueAtTime(0.001, time + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.25);
  }

  private triggerSnare(time: number, freq: number, decay: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(80, time + decay);

    gain.gain.setValueAtTime(0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + decay);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + decay);
  }

  private triggerHiHat(time: number, open: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const decay = open ? 0.12 : 0.04;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'highpass' as unknown as OscillatorType;
    osc.frequency.setValueAtTime(8500, time);

    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + decay);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + decay);
  }

  private triggerWoodblock(time: number, freq: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';

    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, time + 0.05);

    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.05);
  }

  private triggerSynthStab(time: number, freqs: number[]) {
    if (!this.ctx || !this.masterGain) return;
    freqs.forEach(freq => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.09, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(time);
      osc.stop(time + 0.18);
    });
  }

  private triggerAcousticChords(time: number, freqs: number[]) {
    if (!this.ctx || !this.masterGain) return;
    freqs.forEach(freq => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.12, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(time);
      osc.stop(time + 0.12);
    });
  }
}

export const audioEngine = new AudioEngine();
