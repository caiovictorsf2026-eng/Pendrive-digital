import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface TrackItem {
  id: string;
  title: string;
  subtitle: string;
  bpm: number;
}

const TRACKS: TrackItem[] = [
  { id: 'piseiro', title: 'Piseiro 2026', subtitle: 'Pra Paredão', bpm: 140 },
  { id: 'megafunk', title: 'Mega Funk', subtitle: 'Grave Explodindo', bpm: 130 },
  { id: 'pagode', title: 'Pagode', subtitle: 'Batida Envolvente', bpm: 110 },
];

export function AudioPlayerDemo() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [visualizerHeights, setVisualizerHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generate simulated audio wave bars
    const bars = Array.from({ length: 48 }, () => Math.floor(Math.random() * 60) + 15);
    setVisualizerHeights(bars);

    audioEngine.setVisualizerCallback((barsData) => {
      // expand bars data to 48 bars
      setVisualizerHeights((prev) =>
        prev.map((h, i) => {
          const sample = barsData[i % barsData.length] || 20;
          return Math.max(12, Math.min(85, sample + Math.floor(Math.random() * 25)));
        })
      );
    });

    return () => {
      audioEngine.stop();
    };
  }, []);

  const toggleTrack = (track: TrackItem) => {
    if (playingId === track.id) {
      audioEngine.stop();
      setPlayingId(null);
    } else {
      audioEngine.playTrack(track.id, track.bpm);
      setPlayingId(track.id);
    }
  };

  return (
    <section className="py-14 bg-black text-white" id="demos">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-1">
          Sinta o <span className="text-[#00ff66]">POWER</span> do Pack
        </h2>
        {/* Accent bar */}
        <div className="w-12 h-1 bg-[#00ff66] mx-auto rounded-full mb-5"></div>

        <p className="text-xs sm:text-sm text-neutral-400 mb-8">
          Dê o play e confira a qualidade do áudio que você vai ter.
        </p>

        {/* Tracks List */}
        <div className="space-y-4 text-left">
          {TRACKS.map((track) => {
            const isPlaying = playingId === track.id;
            return (
              <div
                key={track.id}
                className="bg-[#121417] border border-[#23272e] rounded-xl px-4 py-3.5 flex items-center gap-4 hover:border-[#00ff66]/50 transition-colors"
              >
                {/* Neon Play / Pause Button */}
                <button
                  type="button"
                  onClick={() => toggleTrack(track)}
                  className="w-11 h-11 rounded-full bg-[#00e626] hover:bg-[#00c922] text-black flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,230,38,0.6)] cursor-pointer transition-transform active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-black text-black" />
                  ) : (
                    <Play className="w-5 h-5 fill-black text-black ml-0.5" />
                  )}
                </button>

                {/* Track Info */}
                <div className="min-w-[120px]">
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">{track.title}</h4>
                  <p className="text-[11px] text-neutral-400">{track.subtitle}</p>
                </div>

                {/* Digital Audio Timeline / Waveform Bars */}
                <div className="flex-1 flex items-center gap-[3px] h-8 overflow-hidden px-2">
                  {visualizerHeights.map((h, idx) => (
                    <div
                      key={idx}
                      className={`w-[4px] rounded-full transition-all duration-150 ${
                        isPlaying
                          ? 'bg-[#00ff66]'
                          : 'bg-[#2b303c]'
                      }`}
                      style={{
                        height: isPlaying ? `${Math.max(15, h)}%` : `${(idx % 5) * 6 + 12}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Small disclaimer */}
        <p className="text-[10px] sm:text-[11px] text-neutral-400 mt-6 max-w-xl mx-auto">
          * Faixas de demonstração (Qualidade reduzida para 128kbps para o site carregar rápido. No pack original é 320kbps).
        </p>
      </div>
    </section>
  );
}
