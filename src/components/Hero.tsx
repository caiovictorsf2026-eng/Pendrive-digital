import { CheckCircle2, Zap, Music } from 'lucide-react';
import packBoxCover from '../assets/images/book_box_pack_cover_1790350559118.jpg';
import neonLogo from '../assets/images/beatpack_logo_neon_1790350546507.jpg';

interface HeroProps {
  onOpenCheckout: (planId?: string) => void;
}

export function Hero({ onOpenCheckout }: HeroProps) {
  return (
    <section className="relative w-full pt-6 pb-14 bg-black text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <div className="md:col-span-7 flex flex-col items-start text-left">
            {/* Logo */}
            <div className="mb-6">
              <img
                src={neonLogo}
                alt="Beat Pack Brasil Logo"
                className="w-28 sm:w-32 h-auto object-contain drop-shadow-[0_0_15px_rgba(57,255,20,0.5)] rounded-full"
              />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] mb-5 text-white">
              O Maior Pack do Brasil: <br />
              <span className="text-[#00ff66]">Mais de 150 MIL</span> <br />
              <span className="text-[#00e5ff]">Músicas</span> Atualizadas 2026
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-7 max-w-lg font-normal">
              Transforme qualquer ambiente com o repertório definitivo. Sem vinhetas, áudio cristalino e organização impecável. Para Som Automotivo, Pen Drive, Celular e Caixa JBL.
            </p>

            {/* Primary CTA Button */}
            <button
              onClick={() => onOpenCheckout('vip')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#00e626] hover:bg-[#00c922] active:scale-95 text-black font-black text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-[0_0_25px_rgba(0,230,38,0.7)] transition-all cursor-pointer mb-5"
            >
              GARANTIR MEU PACK DE MÚSICAS AGORA
            </button>

            {/* Trust Badges in exact line */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs text-neutral-300 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff66]" /> Compra Segura
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#00ff66] fill-[#00ff66]" /> Envio Imediato
              </span>
              <span className="flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-[#00ff66]" /> 100% Sem Vinhetas
              </span>
            </div>
          </div>

          {/* Right Column: 3D Pack Box Mockup */}
          <div className="md:col-span-5 flex justify-center items-center mt-4 md:mt-0">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] group">
              <img
                src={packBoxCover}
                alt="Pack com +150 Mil Músicas 2026 Beat Pack"
                className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(0,255,102,0.35)] rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
