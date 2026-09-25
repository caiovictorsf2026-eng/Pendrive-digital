import { useState } from 'react';
import { X, Download, ShieldCheck, CheckCircle2, Sparkles, ArrowRight, Zap, Play } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeToVip: () => void;
}

export function LeadMagnetModal({ isOpen, onClose, onUpgradeToVip }: LeadMagnetModalProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  if (!isOpen) return null;

  const handleWhatsappChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 11);
    let formatted = raw;
    if (raw.length > 2) formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    if (raw.length > 7) formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    setWhatsapp(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp || !email) return;

    try {
      const existing = JSON.parse(localStorage.getItem('beatpack_leads') || '[]');
      existing.push({
        name,
        whatsapp,
        email,
        type: 'lead_magnet_degustacao',
        date: new Date().toISOString(),
      });
      localStorage.setItem('beatpack_leads', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  const handleTestAudio = () => {
    if (isPlayingDemo) {
      audioEngine.stop();
      setIsPlayingDemo(false);
    } else {
      audioEngine.playTrack('piseiro', 140);
      setIsPlayingDemo(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-neutral-950 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Degustação Gratuita · 100% Sem Custo
            </span>
          </div>
          <button
            onClick={() => {
              audioEngine.stop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-7">
          {!submitted ? (
            <div>
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Baixe 15 Músicas de Alta Fidelidade Grátis
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  Teste no som do seu carro ou na sua JBL antes de decidir. Arquivos MP3 originais em 320kbps e sem vinheta.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Seu Primeiro Nome
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp (Para envio do link direto)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="(11) 98765-4321"
                    value={whatsapp}
                    onChange={(e) => handleWhatsappChange(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>BAIXAR MEU MINI PACK GRÁTIS AGORA</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Zero spam. O link abre instantaneamente.
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Amostra Liberada, {name}!
              </h3>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                Você pode ouvir um teste agora ou baixar o arquivo .ZIP com as 15 faixas completas em 320kbps.
              </p>

              {/* Quick sample actions */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleTestAudio}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Play className={`w-4 h-4 ${isPlayingDemo ? 'animate-spin' : ''}`} />
                  <span>{isPlayingDemo ? 'Pausar Teste de Áudio' : 'Ouvir Prévia do Som Agora'}</span>
                </button>

                <a
                  href="https://drive.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Pasta com as 15 Faixas (Google Drive)</span>
                </a>
              </div>

              {/* Irresistible offer transition */}
              <div className="bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/50 p-4 rounded-2xl text-left">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" />
                  OPORTUNIDADE ÚNICA DEPOIS DA AMOSTRA:
                </div>
                <p className="text-xs text-slate-200 mb-3">
                  Gostou da qualidade? Leve o pack completo com as <strong className="text-white">150.000 músicas + clipes em vídeo</strong> por apenas <span className="text-emerald-400 font-bold">R$ 24,90</span> hoje!
                </p>
                <button
                  onClick={() => {
                    audioEngine.stop();
                    onClose();
                    onUpgradeToVip();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 text-neutral-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>QUERO O ACERVO COMPLETO POR R$ 24,90</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
