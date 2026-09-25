import { Check, X } from 'lucide-react';
import guaranteeSealImg from '../assets/images/selo_garantia_7dias_1790350582958.jpg';

interface PricingSectionProps {
  onOpenCheckout: (planId: string) => void;
}

export function PricingSection({ onOpenCheckout }: PricingSectionProps) {
  return (
    <section className="py-14 bg-black text-white" id="pricing">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-1">
          Comprando <span className="text-[#00ff66]">HOJE</span> você Leva:
        </h2>
        {/* Green bar */}
        <div className="w-12 h-1 bg-[#00ff66] mx-auto rounded-full mb-10"></div>

        {/* 2 Plan Cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-3xl mx-auto">
          {/* Card 1: Pacote Básico */}
          <div className="bg-[#121417] border border-[#23272e] rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-center relative">
            <div>
              <h3 className="text-base font-bold text-white mb-0.5">Pacote Básico</h3>
              <p className="text-[11px] text-neutral-400 mb-4">Acesso imediato</p>

              {/* Strikethrough price */}
              <p className="text-xs text-red-500 line-through font-semibold mb-1">De R$ 39,90</p>

              {/* Current Price */}
              <div className="flex items-baseline justify-center gap-0.5 font-bold mb-1">
                <span className="text-sm text-[#00ff66]">R$</span>
                <span className="text-4xl font-black text-white">7</span>
                <span className="text-sm text-neutral-300">,99</span>
              </div>
              <p className="text-[10px] text-neutral-400 mb-4">pagamento único</p>

              {/* Economy green pill */}
              <div className="bg-[#00e626] text-black text-[11px] font-bold py-1 px-3 rounded-full mb-6 inline-flex items-center gap-1">
                <span>Economize R$ 31,91</span>
              </div>

              {/* Features list */}
              <ul className="space-y-3 text-left text-xs mb-8">
                <li className="flex items-center gap-2 text-neutral-200">
                  <Check className="w-4 h-4 text-[#00ff66] shrink-0" />
                  <span>+150 Mil Músicas MP3</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-200">
                  <Check className="w-4 h-4 text-[#00ff66] shrink-0" />
                  <span>Acesso Vitalício</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-500">
                  <X className="w-4 h-4 text-red-500/80 shrink-0" />
                  <span className="line-through">Suporte VIP</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-500">
                  <X className="w-4 h-4 text-red-500/80 shrink-0" />
                  <span className="line-through">+3.000 Clipes Musicais</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-500">
                  <X className="w-4 h-4 text-red-500/80 shrink-0" />
                  <span className="line-through">Atualização Mensal</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-500">
                  <X className="w-4 h-4 text-red-500/80 shrink-0" />
                  <span className="line-through">[Extra] Flashback + Sertanejo Universitário</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-500">
                  <X className="w-4 h-4 text-red-500/80 shrink-0" />
                  <span className="line-through">Pack de Desenhos Na Multimídia (Para as Crianças)</span>
                </li>
              </ul>
            </div>

            {/* Plan Button */}
            <button
              onClick={() => onOpenCheckout('basic')}
              className="w-full py-3 bg-[#0a0c0e] hover:bg-[#15191f] border border-[#00ff66] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              QUERO ESTE
            </button>
          </div>

          {/* Card 2: Pacote VIP (Border Green Glow & Tag Mais Vendido) */}
          <div className="bg-[#121417] border-2 border-[#00ff66] rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-center relative shadow-[0_0_25px_rgba(0,255,102,0.25)]">
            {/* Top Tag */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00e626] text-black text-[10px] font-black tracking-wider uppercase py-1 px-4 rounded-full shadow-md">
              ★ MAIS VENDIDO
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-0.5 mt-1">Pacote VIP</h3>
              <p className="text-[11px] text-neutral-400 mb-4">O mais completo da internet</p>

              {/* Strikethrough price */}
              <p className="text-xs text-red-500 line-through font-semibold mb-1">De R$ 89,90</p>

              {/* Current Price */}
              <div className="flex items-baseline justify-center gap-0.5 font-bold mb-1">
                <span className="text-sm text-[#00ff66]">R$</span>
                <span className="text-4xl font-black text-white">19</span>
                <span className="text-sm text-neutral-300">,90</span>
              </div>
              <p className="text-[10px] text-neutral-400 mb-4">pagamento único</p>

              {/* Economy green pill */}
              <div className="bg-[#00e626] text-black text-[11px] font-bold py-1 px-3 rounded-full mb-6 inline-flex items-center gap-1">
                <span>Economize R$ 70,00</span>
              </div>

              {/* Features list */}
              <ul className="space-y-3 text-left text-xs mb-8">
                <li className="flex items-center gap-2 text-neutral-200">
                  <Check className="w-4 h-4 text-[#00ff66] shrink-0" />
                  <span>+150 Mil Músicas MP3</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-200">
                  <Check className="w-4 h-4 text-[#00ff66] shrink-0" />
                  <span>Acesso Vitalício</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-200">
                  <Check className="w-4 h-4 text-[#00ff66] shrink-0" />
                  <span className="font-semibold text-white">Suporte VIP</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-200">
                  <Check className="w-4 h-4 text-[#00ff66] shrink-0" />
                  <span className="font-semibold text-white">+3.000 Clipes Musicais</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-200">
                  <Check className="w-4 h-4 text-[#00ff66] shrink-0" />
                  <span className="font-semibold text-white">Atualização Mensal</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-200">
                  <Check className="w-4 h-4 text-[#00ff66] shrink-0" />
                  <span className="font-semibold text-white">[Extra] Flashback + Sertanejo Universitário</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-200">
                  <Check className="w-4 h-4 text-[#00ff66] shrink-0" />
                  <span className="font-semibold text-white">Pack de Desenhos Na Multimídia (Para as Crianças)</span>
                </li>
              </ul>
            </div>

            {/* Button */}
            <button
              onClick={() => onOpenCheckout('vip')}
              className="w-full py-3.5 bg-[#00e626] hover:bg-[#00c922] text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(0,230,38,0.5)] active:scale-95"
            >
              QUERO TUDO ISSO
            </button>
          </div>
        </div>

        {/* 7 Days Guarantee Badge Area */}
        <div className="mt-14 max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-4">
            <img
              src={guaranteeSealImg}
              alt="Garantia Incondicional de 7 Dias"
              className="w-full h-full object-contain rounded-full shadow-[0_0_20px_rgba(234,179,8,0.3)]"
            />
          </div>
          <h4 className="text-sm sm:text-base font-bold text-white mb-1">
            RISCO ZERO: Satisfação Garantida ou seu Dinheiro de Volta
          </h4>
          <p className="text-xs text-neutral-400">
            Você tem 7 dias para testar o pack. Se não curtir, devolvemos 100% do valor.
          </p>
        </div>
      </div>
    </section>
  );
}
