import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Preciso de internet no carro?',
    answer: 'Não! Uma vez baixado e colocado no Pen Drive, roda tudo offline.',
  },
  {
    question: 'Funciona em qualquer aparelho?',
    answer: 'Sim, os arquivos são em formato universal (MP3) compatível com Som Automotivo, Pendrive, Celular e Caixa JBL.',
  },
  {
    question: 'Como recebo o acesso?',
    answer: 'Imediatamente após o pagamento, você recebe um email e WhatsApp com o link de acesso aos arquivos.',
  },
  {
    question: 'Posso pedir reembolso?',
    answer: 'Sim! Você tem 7 dias de garantia incondicional.',
  },
  {
    question: 'O pagamento é seguro?',
    answer: 'Sim, processamos com criptografia bancária e segurança de dados.',
  },
  {
    question: 'As músicas têm anúncios?',
    answer: 'Não, todos os arquivos são limpos, sem marcas d\'água, vinhetas ou propagandas.',
  },
  {
    question: 'Quais os gêneros inclusos?',
    answer: 'Sertanejo, Funk, Pagode, Eletrônica, Rap, e muito mais.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-14 bg-black text-white" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
          Dúvidas Frequentes
        </h2>
        {/* Green bar */}
        <div className="w-12 h-1 bg-[#00ff66] mx-auto rounded-full mb-8"></div>

        {/* Accordions */}
        <div className="space-y-3 text-left mb-10">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
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
                  <span className="font-bold text-xs sm:text-sm text-white tracking-wide">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#00ff66]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-neutral-300 border-t border-[#1e2229] bg-[#0c0e11] leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Callout */}
        <div className="text-center pt-2">
          <p className="text-xs text-neutral-400 mb-3">Ainda com dúvidas?</p>
          <a
            href="https://wa.me/5516988158533?text=Ol%C3%A1%21%20Vi%20o%20Pack%20de%20M%C3%BAsicas%2C%20e%20quero%20mais%20informa%C3%A7%C3%B5es."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00e626] hover:bg-[#00c922] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,230,38,0.4)]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Concluir pelo WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
