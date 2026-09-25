import { useState, useEffect } from 'react';
import { X, AlertTriangle, Clock, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimDiscount: (customPrice: number, planName: string) => void;
}

export function ExitIntentModal({ isOpen, onClose, onClaimDiscount }: ExitIntentModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 min

  useEffect(() => {
    let timer: number;
    if (isOpen && secondsLeft > 0) {
      timer = window.setInterval(() => {
        setSecondsLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, secondsLeft]);

  if (!isOpen) return null;

  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-neutral-950 border-2 border-red-500 rounded-3xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header Warning */}
        <div className="bg-red-600/20 border-b border-red-500/40 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500 animate-bounce" />
            <span className="text-sm font-black text-red-400 uppercase tracking-wider">
              ESPERE! NÃO VÁ EMBORA COM O SOM VAZIO!
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 text-center">
          <p className="text-xs sm:text-sm text-slate-300 mb-4">
            Você foi selecionado para uma condição única que nunca mais aparecerá nesta página:
          </p>

          {/* Countdown timer */}
          <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-500/40 px-3.5 py-1.5 rounded-full text-xs text-red-300 font-mono-numbers mb-6">
            <Clock className="w-3.5 h-3.5 text-red-400" />
            <span>Esta oferta especial expira em: <strong>{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}</strong></span>
          </div>

          {/* Special Option 1: VIP by R$ 15,90 */}
          <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl p-4 mb-4 text-left hover:border-emerald-400 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase">
                OFERTA RELÂMPAGO VIP
              </span>
              <span className="text-xs text-slate-400 line-through">De R$ 24,90</span>
            </div>
            <div className="flex items-baseline justify-between mt-1 mb-2">
              <span className="text-sm font-bold text-white">Pacote VIP com Clipes & Bônus</span>
              <div className="text-right">
                <span className="text-xs text-slate-400">Por apenas </span>
                <span className="text-2xl font-black text-emerald-400 font-mono-numbers">R$ 15,90</span>
              </div>
            </div>
            <button
              onClick={() => onClaimDiscount(15.90, 'Pacote VIP (Desconto Especial de Saída)')}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-neutral-950 font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-neutral-950" />
              <span>QUERO O PACOTE VIP POR R$ 15,90</span>
            </button>
          </div>

          {/* Special Option 2: Basic by R$ 4,99 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left hover:border-slate-700 transition-colors mb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">
                OPÇÃO BÁSICA ULTRA ECONÔMICA
              </span>
              <span className="text-xs text-slate-500 line-through">De R$ 9,90</span>
            </div>
            <div className="flex items-baseline justify-between mt-1 mb-2">
              <span className="text-sm font-bold text-slate-200">150.000 Músicas Sem Vinheta</span>
              <div className="text-right">
                <span className="text-xs text-slate-400">Por apenas </span>
                <span className="text-2xl font-black text-white font-mono-numbers">R$ 4,99</span>
              </div>
            </div>
            <button
              onClick={() => onClaimDiscount(4.99, 'Pacote Básico (Desconto Especial de Saída)')}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Levar apenas as músicas por R$ 4,99</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-300 underline cursor-pointer"
          >
            Não obrigado, prefiro pagar o valor cheio depois
          </button>
        </div>
      </div>
    </div>
  );
}
