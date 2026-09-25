import { useState } from 'react';
import { ChevronDown, FolderOpen, Volume2, Download, Smartphone, Music, Lock, Gift } from 'lucide-react';

interface FeatureItem {
  icon: typeof FolderOpen;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: FolderOpen,
    title: 'Organização por Pastas',
    description: 'Tudo separado por gênero e artista para você não perder tempo procurando.',
  },
  {
    icon: Volume2,
    title: 'Qualidade de Áudio Premium',
    description: 'Áudios remasterizados com qualidade 320kbps (Alta Definição) para seu som.',
  },
  {
    icon: Download,
    title: 'Download Simplificado',
    description: 'Link direto via Google Drive, sem propagandas ou encurtadores chatos.',
  },
  {
    icon: Smartphone,
    title: 'Compatível com Celular',
    description: 'Baixe e ouça também no seu smartphone ou tablet.',
  },
  {
    icon: Music,
    title: 'Áudio Remasterizado',
    description: 'Graves e agudos equalizados para a melhor experiência sonora.',
  },
  {
    icon: Lock,
    title: 'Acesso Vitalício',
    description: 'Pague uma vez e tenha acesso para sempre aos arquivos.',
  },
  {
    icon: Gift,
    title: 'Bônus Exclusivos',
    description: 'Receba pacotes extras de brindes ao confirmar sua compra.',
  },
];

export function FeaturesBento() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-14 bg-black text-white" id="features">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
          O que você vai levar?
        </h2>
        {/* Accent Bar */}
        <div className="w-12 h-1 bg-[#00ff66] mx-auto rounded-full mb-8"></div>

        {/* Accordion list */}
        <div className="space-y-3 text-left">
          {FEATURES.map((item, idx) => {
            const isOpen = openIndex === idx;
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#121417] border border-[#23272e] rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#181b20] transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className="w-4 h-4 text-[#00ff66] shrink-0" />
                    <span className="font-bold text-xs sm:text-sm text-white tracking-wide">
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#00ff66]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-neutral-300 border-t border-[#1e2229] bg-[#0c0e11] leading-relaxed">
                    {item.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
