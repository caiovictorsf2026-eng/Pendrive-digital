import { useState } from 'react';

interface GenreItem {
  id: string;
  name: string;
  neonColor: string;
  glowClass: string;
  iconSvg: string;
}

const GENRES: GenreItem[] = [
  {
    id: 'sertanejo',
    name: 'SERTANEJO',
    neonColor: '#00e5ff',
    glowClass: 'border-[#00e5ff]/40 shadow-[0_0_20px_rgba(0,229,255,0.2)]',
    iconSvg: 'guitar',
  },
  {
    id: 'funk',
    name: 'FUNK',
    neonColor: '#ff00bb',
    glowClass: 'border-[#ff00bb]/40 shadow-[0_0_20px_rgba(255,0,187,0.2)]',
    iconSvg: 'speaker',
  },
  {
    id: 'eletronica',
    name: 'ELETRÔNICA',
    neonColor: '#00ffcc',
    glowClass: 'border-[#00ffcc]/40 shadow-[0_0_20px_rgba(0,255,204,0.2)]',
    iconSvg: 'synth',
  },
  {
    id: 'pagode',
    name: 'PAGODE',
    neonColor: '#ffaa00',
    glowClass: 'border-[#ffaa00]/40 shadow-[0_0_20px_rgba(255,170,0,0.2)]',
    iconSvg: 'cavaquinho',
  },
  {
    id: 'rap',
    name: 'RAP',
    neonColor: '#ff3333',
    glowClass: 'border-[#ff3333]/40 shadow-[0_0_20px_rgba(255,51,51,0.2)]',
    iconSvg: 'mic',
  },
  {
    id: 'flashback',
    name: 'FLASHBACK',
    neonColor: '#b366ff',
    glowClass: 'border-[#b366ff]/40 shadow-[0_0_20px_rgba(179,102,255,0.2)]',
    iconSvg: 'cassette',
  },
  {
    id: 'tiktok',
    name: 'TIKTOK HITS',
    neonColor: '#00ffff',
    glowClass: 'border-[#00ffff]/40 shadow-[0_0_20px_rgba(0,255,255,0.2)]',
    iconSvg: 'trend',
  },
];

export function GenreExplorer() {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section className="py-14 bg-black text-white" id="genres">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-1">
          Uma seleção <span className="text-[#00ff66]">GIGANTE</span> de músicas
        </h2>
        {/* Green accent underline */}
        <div className="w-12 h-1 bg-[#00ff66] mx-auto rounded-full mb-8"></div>

        {/* Carousel / Cards Track */}
        <div className="overflow-x-auto pb-4 no-scrollbar flex items-center justify-start sm:justify-center gap-4 px-2">
          {GENRES.slice(0, 5).map((genre) => (
            <div
              key={genre.id}
              className={`w-[170px] sm:w-[190px] h-[190px] sm:h-[210px] rounded-2xl bg-[#0e1014] border ${genre.glowClass} flex flex-col items-center justify-between p-4 shrink-0 hover:scale-105 transition-all duration-200 cursor-pointer relative overflow-hidden group`}
            >
              {/* Background neon ambient */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none blur-xl group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: genre.neonColor }}
              />

              {/* Icon Visual */}
              <div className="flex-1 flex items-center justify-center w-full">
                {genre.id === 'sertanejo' && (
                  <svg className="w-16 h-16 drop-shadow-[0_0_12px_#00e5ff]" viewBox="0 0 64 64" fill="none" stroke="#00e5ff" strokeWidth="2.5">
                    <path d="M42 8l14 14-8 8-14-14L42 8z" />
                    <circle cx="24" cy="40" r="16" />
                    <circle cx="24" cy="40" r="5" fill="#00e5ff" />
                    <line x1="38" y1="26" x2="26" y2="38" />
                  </svg>
                )}
                {genre.id === 'funk' && (
                  <svg className="w-16 h-16 drop-shadow-[0_0_12px_#ff00bb]" viewBox="0 0 64 64" fill="none" stroke="#ff00bb" strokeWidth="2.5">
                    <rect x="14" y="6" width="36" height="52" rx="6" />
                    <circle cx="32" cy="20" r="6" />
                    <circle cx="32" cy="42" r="11" />
                    <circle cx="32" cy="42" r="3" fill="#ff00bb" />
                  </svg>
                )}
                {genre.id === 'eletronica' && (
                  <svg className="w-16 h-16 drop-shadow-[0_0_12px_#00ffcc]" viewBox="0 0 64 64" fill="none" stroke="#00ffcc" strokeWidth="2.5">
                    <rect x="8" y="16" width="48" height="32" rx="4" />
                    <line x1="16" y1="24" x2="16" y2="40" />
                    <line x1="24" y1="24" x2="24" y2="40" />
                    <line x1="32" y1="24" x2="32" y2="40" />
                    <line x1="40" y1="24" x2="40" y2="40" />
                    <line x1="48" y1="24" x2="48" y2="40" />
                  </svg>
                )}
                {genre.id === 'pagode' && (
                  <svg className="w-16 h-16 drop-shadow-[0_0_12px_#ffaa00]" viewBox="0 0 64 64" fill="none" stroke="#ffaa00" strokeWidth="2.5">
                    <circle cx="30" cy="34" r="18" />
                    <circle cx="16" cy="34" r="2" fill="#ffaa00" />
                    <circle cx="44" cy="34" r="2" fill="#ffaa00" />
                    <circle cx="30" cy="18" r="2" fill="#ffaa00" />
                    <circle cx="30" cy="50" r="2" fill="#ffaa00" />
                    <path d="M42 22l14-14" />
                  </svg>
                )}
                {genre.id === 'rap' && (
                  <svg className="w-16 h-16 drop-shadow-[0_0_12px_#ff3333]" viewBox="0 0 64 64" fill="none" stroke="#ff3333" strokeWidth="2.5">
                    <rect x="24" y="8" width="16" height="26" rx="8" />
                    <path d="M16 26a16 16 0 0032 0" />
                    <line x1="32" y1="42" x2="32" y2="56" />
                    <line x1="22" y1="56" x2="42" y2="56" />
                  </svg>
                )}
              </div>

              {/* Title */}
              <div className="w-full text-center">
                <span
                  className="font-extrabold text-sm tracking-wider uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                  style={{ color: '#ffffff' }}
                >
                  {genre.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicator dot */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
        </div>
      </div>
    </section>
  );
}
