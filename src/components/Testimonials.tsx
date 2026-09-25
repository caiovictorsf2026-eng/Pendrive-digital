interface TestimonialCard {
  name: string;
  quote: string;
  avatarBg: string;
}

const TESTIMONIALS: TestimonialCard[] = [
  {
    name: 'Amanda Pereira',
    quote: '"Entrega super rápida e tudo organizado."',
    avatarBg: 'bg-emerald-700',
  },
  {
    name: 'Carlos Eduardo',
    quote: '"Recomendo demais, suporte nota 10."',
    avatarBg: 'bg-teal-700',
  },
  {
    name: 'Ricardo Mendes',
    quote: '"Valeu cada centavo, a qualidade do áudio é impressionante."',
    avatarBg: 'bg-blue-700',
  },
  {
    name: 'José Silva',
    quote: '"Agora sim meu som tá completo, só música top!"',
    avatarBg: 'bg-indigo-700',
  },
];

export function Testimonials() {
  return (
    <section className="py-14 bg-black text-white" id="testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
          O que diz quem já comprou
        </h2>
        {/* Green bar */}
        <div className="w-12 h-1 bg-[#00ff66] mx-auto rounded-full mb-8"></div>

        {/* Carousel / Cards Track */}
        <div className="overflow-x-auto pb-4 no-scrollbar flex items-center justify-start sm:justify-center gap-4 px-2">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="w-[240px] sm:w-[260px] h-[180px] rounded-2xl bg-[#121417] border border-[#23272e] p-5 flex flex-col justify-between text-left shrink-0 hover:border-[#00ff66]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${item.avatarBg} border-2 border-[#00ff66] flex items-center justify-center text-white font-bold text-xs shrink-0 overflow-hidden`}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#00ff66] block">{item.name}</span>
                  <span className="text-[10px] text-neutral-400">Comprador Verificado</span>
                </div>
              </div>

              <p className="text-xs text-neutral-300 italic leading-relaxed">
                {item.quote}
              </p>

              <div className="flex text-amber-400 text-xs">
                ★★★★★
              </div>
            </div>
          ))}
        </div>

        {/* Indicator dot */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
        </div>
      </div>
    </section>
  );
}
