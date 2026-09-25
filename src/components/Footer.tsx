import { useState } from 'react';
import { ShieldCheck, Lock, Disc3, X } from 'lucide-react';

export function Footer() {
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  return (
    <footer className="bg-black text-slate-400 text-xs py-12 border-t border-slate-900 pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 text-center md:text-left">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Disc3 className="w-4 h-4" />
            </div>
            <span className="text-white font-extrabold text-base tracking-tight">
              BEAT PACK <span className="text-emerald-400">BRASIL</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Termos de Uso
            </button>
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
            <a
              href="https://wa.me/5516988158533?text=Ol%C3%A1%21%20Preciso%20de%20contato%20sobre%20o%20Beat%20Pack."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Suporte & Contato
            </a>
          </div>

          {/* Security seals */}
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-500" /> SSL 256-Bit
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Compra Blindada
            </span>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-slate-900 text-center text-slate-400 space-y-2">
          <p>© 2026 Beat Pack Brasil. Todos os direitos reservados.</p>
          <p className="text-[11px] max-w-3xl mx-auto leading-relaxed">
            Este site não é afiliado ao Facebook, Google, Meta ou YouTube. Todo o conteúdo musical é destinado para uso recreativo e reprodução privada em aparelhos automotivos e caixas de som residenciais.
          </p>
        </div>
      </div>

      {/* Terms / Privacy Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-neutral-950 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-left relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">
              {modalType === 'terms' ? 'Termos de Uso do Serviço' : 'Política de Privacidade e LGPD'}
            </h3>

            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              {modalType === 'terms' ? (
                <>
                  <p>1. <strong>Acesso e Licença:</strong> Ao adquirir o Beat Pack Brasil, o usuário obtém uma licença pessoal de acesso aos arquivos de áudio e vídeo hospedados nos servidores do Google Drive.</p>
                  <p>2. <strong>Garantia de 7 Dias:</strong> O comprador dispõe do prazo incondicional de 7 (sete) dias corridos após a confirmação da compra para solicitar o cancelamento e reembolso integral caso não fique satisfeito com a qualidade dos arquivos.</p>
                  <p>3. <strong>Disponibilidade:</strong> Os links de download são disponibilizados de forma vitalícia para consulta e armazenamento pessoal.</p>
                </>
              ) : (
                <>
                  <p>1. <strong>Proteção de Dados:</strong> Cumprimos integralmente a Lei Geral de Proteção de Dados (LGPD). Os dados cadastrais (nome, e-mail e telefone) são utilizados única e exclusivamente para a entrega do acesso aos arquivos e suporte via WhatsApp.</p>
                  <p>2. <strong>Segurança nas Transações:</strong> Não armazenamos dados de cartão de crédito; todo o processamento de pagamento ocorre sob camadas criptografadas de segurança bancária SSL 256 bits.</p>
                  <p>3. <strong>Cancelamento e Exclusão:</strong> O usuário pode solicitar a exclusão de seus dados de nossa base de contatos a qualquer momento via WhatsApp de suporte.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
