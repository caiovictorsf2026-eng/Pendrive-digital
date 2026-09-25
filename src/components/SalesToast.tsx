import { useState, useEffect } from 'react';
import { CheckCircle, X, ShieldCheck } from 'lucide-react';
import { SALES_TOAST_POOL } from '../data/mockData';

export function SalesToast() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show after 4 seconds initial dwell
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 4000);

    // Rotate every 12 seconds
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % SALES_TOAST_POOL.length);
        setVisible(true);
      }, 1500);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const sale = SALES_TOAST_POOL[currentIdx];

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 z-40 max-w-xs sm:max-w-sm bg-slate-900/95 border border-emerald-500/40 rounded-2xl p-3 shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
          <CheckCircle className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-white flex items-center gap-1">
            <span>{sale.name}</span>
            <span className="text-[10px] text-slate-400 font-normal">({sale.city}/{sale.state})</span>
          </p>
          <p className="text-[11px] text-slate-300">
            acabou de garantir o <strong className="text-emerald-400 font-bold">{sale.plan}</strong>
          </p>
          <span className="text-[10px] text-slate-400 font-mono-numbers">há 2 minutos · Compra aprovada</span>
        </div>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="w-5 h-5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center shrink-0 cursor-pointer"
        aria-label="Fechar notificação"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
