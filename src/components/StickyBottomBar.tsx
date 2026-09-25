import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface StickyBottomBarProps {
  onOpenCheckout: (planId?: string) => void;
}

export function StickyBottomBar({ onOpenCheckout }: StickyBottomBarProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 border-t border-[#00ff66]/40 backdrop-blur-md px-4 py-2.5 shadow-2xl transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Value & Price */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] text-[#00ff66] font-bold uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3 fill-[#00ff66]" /> Oferta Especial
            </span>
            <span className="text-xs text-neutral-300">Pack Completo VIP</span>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-red-500 line-through font-semibold hidden xs:inline">R$ 89,90</span>
            <span className="text-lg sm:text-xl font-black text-white">R$ 19,90</span>
            <span className="text-[11px] text-neutral-400">pagamento único</span>
          </div>
        </div>

        {/* Right: Fast conversion button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenCheckout('vip')}
            className="px-5 py-2.5 bg-[#00e626] hover:bg-[#00c922] text-black font-black text-xs sm:text-sm rounded-full shadow-[0_0_20px_rgba(0,230,38,0.5)] flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all transform active:scale-95 uppercase tracking-wider"
          >
            <span>GARANTIR MEU PACK</span>
          </button>
        </div>
      </div>
    </div>
  );
}
