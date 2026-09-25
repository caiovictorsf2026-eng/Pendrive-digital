import { MessageCircle, BookOpen, ShieldCheck } from 'lucide-react';

interface SupportCardItem {
  icon: typeof MessageCircle;
  title: string;
  description: string;
}

const SUPPORT_ITEMS: SupportCardItem[] = [
  {
    icon: MessageCircle,
    title: 'Suporte Individual',
    description: 'Qualquer dúvida na instalação, te ajudamos no WhatsApp.',
  },
  {
    icon: BookOpen,
    title: 'Guia Rápido',
    description: 'Tutorial passo-a-passo para baixar e colocar no Pen Drive.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantia de 7 Dias',
    description: 'Se não gostar, devolvemos seu dinheiro sem perguntas.',
  },
];

export function SupportSection() {
  return (
    <section className="py-14 bg-black text-white" id="support">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
          Suporte e Orientação
        </h2>
        {/* Green bar */}
        <div className="w-12 h-1 bg-[#00ff66] mx-auto rounded-full mb-8"></div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SUPPORT_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#121417] border border-[#23272e] rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-[#00ff66]/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-[#00ff66]">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-[200px]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
