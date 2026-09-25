import { useState, useEffect } from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, Copy, Check, ArrowRight, Zap, QrCode, CreditCard, Sparkles, ExternalLink, MessageCircle, AlertCircle } from 'lucide-react';
import { PRICING_PLANS, ORDER_BUMPS } from '../data/mockData';
import { LeadData } from '../types';

interface TransparentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId?: string;
}

export function TransparentCheckoutModal({ isOpen, onClose, initialPlanId = 'vip' }: TransparentCheckoutModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlanId);
  const [step, setStep] = useState<'lead' | 'payment' | 'success'>('lead');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [selectedBump, setSelectedBump] = useState<boolean>(false);
  const [pixCopied, setPixCopied] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [pixTimeRemaining, setPixTimeRemaining] = useState<number>(900); // 15 min

  // Lead fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [leadErrors, setLeadErrors] = useState<{ name?: string; email?: string; whatsapp?: string }>({});

  // Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState('1');

  useEffect(() => {
    if (initialPlanId) {
      setSelectedPlanId(initialPlanId);
    }
  }, [initialPlanId]);

  useEffect(() => {
    let timer: number;
    if (step === 'payment' && paymentMethod === 'pix' && pixTimeRemaining > 0) {
      timer = window.setInterval(() => {
        setPixTimeRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, paymentMethod, pixTimeRemaining]);

  if (!isOpen) return null;

  const currentPlan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1];
  const orderBump = ORDER_BUMPS[0];
  const totalAmount = currentPlan.currentPrice + (selectedBump ? orderBump.price : 0);

  // Format WhatsApp input (XX) 9XXXX-XXXX
  const handleWhatsappChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 11);
    let formatted = raw;
    if (raw.length > 2) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    }
    if (raw.length > 7) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    }
    setWhatsapp(formatted);
  };

  // Format Card Number
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const parts = raw.match(/[\s\S]{1,4}/g) || [];
    setCardNumber(parts.join(' '));
  };

  // Format Expiry MM/AA
  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length > 2) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  // Step 1 Validation & Autosave Lead
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; email?: string; whatsapp?: string } = {};

    if (!name.trim() || name.trim().split(' ').length < 2) {
      errors.name = 'Por favor, informe seu nome e sobrenome.';
    }
    if (!email.includes('@') || !email.includes('.')) {
      errors.email = 'Informe um e-mail válido para envio dos arquivos.';
    }
    const rawPhone = whatsapp.replace(/\D/g, '');
    if (rawPhone.length < 10) {
      errors.whatsapp = 'Informe um WhatsApp com DDD válido.';
    }

    if (Object.keys(errors).length > 0) {
      setLeadErrors(errors);
      return;
    }

    setLeadErrors({});

    // Save lead in localStorage for high-converting lead recovery
    const leadRecord: LeadData = { name, email, whatsapp };
    try {
      const existingLeads = JSON.parse(localStorage.getItem('beatpack_leads') || '[]');
      existingLeads.push({ ...leadRecord, timestamp: new Date().toISOString(), plan: currentPlan.name });
      localStorage.setItem('beatpack_leads', JSON.stringify(existingLeads));
    } catch {
      // ignore localstorage errors
    }

    setStep('payment');
  };

  // Pix string simulation
  const pixCopyString = `00020126580014br.gov.bcb.pix0136beatpack2026-pay@pagamentos.com.br520400005303986540${totalAmount.toFixed(2)}5802BR5925BEAT PACK BRASIL DIGITAL6009SAO PAULO62070503***6304E8A2`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCopyString);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
  };

  const handleSimulatePaymentApproval = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 1800);
  };

  const minutes = Math.floor(pixTimeRemaining / 60);
  const seconds = pixTimeRemaining % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-white tracking-wide">
              CHECKOUT 100% BLINDADO & CRIPTOGRAFADO
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {/* STEP 1: LEAD IDENTIFICATION */}
          {step === 'lead' && (
            <div>
              {/* Plan Switcher Pills */}
              <div className="mb-6">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Selecione seu pacote:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {PRICING_PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedPlanId === plan.id
                          ? 'bg-emerald-950/60 border-emerald-500 shadow-md shadow-emerald-500/10'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{plan.name}</span>
                        {plan.isFeatured && (
                          <span className="text-[10px] bg-emerald-500 text-neutral-950 font-black px-1.5 py-0.5 rounded">
                            VIP
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-baseline gap-1 font-mono-numbers">
                        <span className="text-xs text-slate-400">R$</span>
                        <span className="text-lg font-black text-white">{plan.currentPrice.toFixed(2).replace('.', ',')}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lead Form */}
              <form onSubmit={handleProceedToPayment}>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-1">
                    Passo 1: Onde você deseja receber o acesso imediato?
                  </h3>
                  <p className="text-xs text-slate-400">
                    O link do Google Drive será enviado para o seu e-mail e confirmado no seu WhatsApp.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Carlos Eduardo Silveira"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    {leadErrors.name && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {leadErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Seu Melhor E-mail (Para receber o link dos arquivos)
                    </label>
                    <input
                      type="email"
                      placeholder="seuemail@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    {leadErrors.email && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {leadErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      WhatsApp com DDD (Para suporte e backup do link)
                    </label>
                    <input
                      type="text"
                      placeholder="(11) 98765-4321"
                      value={whatsapp}
                      onChange={(e) => handleWhatsappChange(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    {leadErrors.whatsapp && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {leadErrors.whatsapp}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-7">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-neutral-950 font-black text-base rounded-xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-98"
                  >
                    <span>IR PARA O PAGAMENTO SEGURO</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Seus dados estão protegidos sob a LGPD e criptografia de 256 bits.
                  </p>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: PAYMENT & ORDER BUMP */}
          {step === 'payment' && (
            <div>
              {/* Back to details link */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800 text-xs">
                <span className="text-slate-400">
                  Comprador: <strong className="text-white">{name}</strong> ({whatsapp})
                </span>
                <button
                  type="button"
                  onClick={() => setStep('lead')}
                  className="text-emerald-400 hover:underline cursor-pointer"
                >
                  Alterar dados
                </button>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-bold text-sm transition-all cursor-pointer ${
                    paymentMethod === 'pix'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-emerald-400" />
                  <span>PIX (Acesso Instantâneo)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-bold text-sm transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <span>Cartão de Crédito</span>
                </button>
              </div>

              {/* 1-CLICK IRRESISTIBLE ORDER BUMP */}
              <div className="mb-6 bg-gradient-to-r from-emerald-950/40 to-slate-900 border-2 border-dashed border-emerald-500/60 rounded-2xl p-4 transition-all">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBump}
                    onChange={(e) => setSelectedBump(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-800 border-slate-600 accent-emerald-500 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] bg-amber-400 text-neutral-950 font-black px-1.5 py-0.5 rounded uppercase">
                        {orderBump.tag}
                      </span>
                      <strong className="text-xs sm:text-sm text-white font-bold">
                        {orderBump.title}
                      </strong>
                      <span className="text-xs text-emerald-400 font-extrabold font-mono-numbers">
                        + R$ {orderBump.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {orderBump.description}
                    </p>
                  </div>
                </label>
              </div>

              {/* PIX Flow */}
              {paymentMethod === 'pix' && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 text-center">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-2 border-b border-slate-800">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Liberação Automática em 5 Segundos
                    </span>
                    <span className="font-mono-numbers text-slate-300">
                      Válido por: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                  </div>

                  {/* QR Code Graphic Simulation */}
                  <div className="w-44 h-44 bg-white p-3 rounded-2xl mx-auto mb-4 shadow-xl flex flex-col items-center justify-center border-4 border-emerald-500/40">
                    {/* SVG Pix QR Pattern */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Corner marks */}
                      <rect x="5" y="5" width="25" height="25" fill="#000" />
                      <rect x="9" y="9" width="17" height="17" fill="#fff" />
                      <rect x="13" y="13" width="9" height="9" fill="#000" />

                      <rect x="70" y="5" width="25" height="25" fill="#000" />
                      <rect x="74" y="9" width="17" height="17" fill="#fff" />
                      <rect x="78" y="13" width="9" height="9" fill="#000" />

                      <rect x="5" y="70" width="25" height="25" fill="#000" />
                      <rect x="9" y="74" width="17" height="17" fill="#fff" />
                      <rect x="13" y="78" width="9" height="9" fill="#000" />

                      {/* Random data grid simulation */}
                      <rect x="35" y="10" width="6" height="6" fill="#000" />
                      <rect x="45" y="10" width="12" height="6" fill="#000" />
                      <rect x="35" y="22" width="25" height="5" fill="#000" />
                      <rect x="10" y="38" width="18" height="6" fill="#000" />
                      <rect x="35" y="36" width="10" height="10" fill="#10b981" />
                      <rect x="52" y="36" width="15" height="6" fill="#000" />
                      <rect x="72" y="38" width="20" height="6" fill="#000" />
                      <rect x="35" y="52" width="28" height="6" fill="#000" />
                      <rect x="68" y="52" width="10" height="12" fill="#000" />
                      <rect x="38" y="65" width="8" height="8" fill="#000" />
                      <rect x="52" y="65" width="14" height="6" fill="#000" />
                      <rect x="35" y="78" width="18" height="10" fill="#000" />
                      <rect x="60" y="78" width="25" height="8" fill="#000" />
                    </svg>
                  </div>

                  <p className="text-xs text-slate-300 font-semibold mb-2">
                    Escaneie com o app do seu banco ou copie a chave Pix abaixo:
                  </p>

                  {/* Copy Paste Code input */}
                  <div className="flex items-center gap-2 max-w-md mx-auto mb-4">
                    <input
                      type="text"
                      readOnly
                      value={pixCopyString}
                      className="w-full px-3 py-2.5 bg-black/60 border border-slate-700 rounded-xl text-xs text-slate-400 font-mono-numbers select-all focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                        pixCopied
                          ? 'bg-emerald-500 text-neutral-950'
                          : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                      }`}
                    >
                      {pixCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{pixCopied ? 'Copiado!' : 'Copiar Pix'}</span>
                    </button>
                  </div>

                  {/* Immediate confirmation button */}
                  <button
                    type="button"
                    onClick={handleSimulatePaymentApproval}
                    disabled={isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-neutral-950 font-black text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                        <span>Verificando pagamento no Banco Central...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-neutral-950" />
                        <span>JÁ FIZ O PIX · LIBERAR MEU ACESSO</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* CARD Flow */}
              {paymentMethod === 'card' && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Número do Cartão de Crédito
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          value={cardNumber}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          className="w-full px-4 py-2.5 bg-black/60 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 font-mono-numbers focus:outline-none focus:border-emerald-500"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                          <span>VISA</span>
                          <span>·</span>
                          <span>MASTER</span>
                          <span>·</span>
                          <span>ELO</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Nome Impresso no Cartão
                      </label>
                      <input
                        type="text"
                        placeholder="Nome exatamente como no cartão"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        className="w-full px-4 py-2.5 bg-black/60 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 uppercase"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Validade (MM/AA)
                        </label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={cardExpiry}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          className="w-full px-4 py-2.5 bg-black/60 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 font-mono-numbers focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Código CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          className="w-full px-4 py-2.5 bg-black/60 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 font-mono-numbers focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Número de Parcelas
                      </label>
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(e.target.value)}
                        className="w-full px-4 py-2.5 bg-black/60 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="1">1x de R$ {totalAmount.toFixed(2).replace('.', ',')} (Sem Juros)</option>
                        <option value="2">2x de R$ {(totalAmount / 2).toFixed(2).replace('.', ',')} (Sem Juros)</option>
                        <option value="3">3x de R$ {(totalAmount / 3).toFixed(2).replace('.', ',')} (Sem Juros)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulatePaymentApproval}
                    disabled={isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-neutral-950 font-black text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                        <span>Processando compra criptografada...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-neutral-950" />
                        <span>PAGAR R$ {totalAmount.toFixed(2).replace('.', ',')} COM SEGURANÇA</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Order Summary & Security Seal */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono-numbers">
                <span>Subtotal: R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> 7 Dias de Garantia Total
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS & IMMEDIATE DOWNLOAD */}
          {step === 'success' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Transação Aprovada com Sucesso!
              </span>
              <h3 className="text-2xl font-black text-white mt-1 mb-2">
                Parabéns, {name.split(' ')[0]}! O Beat Pack 2026 é Seu!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
                Enviamos os dados de acesso e a nota da compra para <strong className="text-white">{email}</strong> e para o WhatsApp <strong className="text-white">{whatsapp}</strong>.
              </p>

              {/* Access Button Google Drive */}
              <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-5 max-w-md mx-auto mb-6 text-left">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Seu Link Direto no Google Drive:
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                    VITALÍCIO
                  </span>
                </div>

                <a
                  href="https://drive.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 text-neutral-950 font-black text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer mb-3"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>ABRIR PASTA NO GOOGLE DRIVE AGORA</span>
                </a>

                <a
                  href={`https://wa.me/5516988158533?text=Ol%C3%A1%21%20Sou%20${encodeURIComponent(name)}%2C%20acabei%20de%20comprar%20o%20Beat%20Pack%202026%20e%20gostaria%20do%20suporte%20VIP.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Chamar Suporte VIP no WhatsApp</span>
                </a>
              </div>

              {/* Quick instructions */}
              <div className="text-left max-w-md mx-auto bg-black/40 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <p className="font-bold text-white">Instruções rápidas para começar:</p>
                <p>1. Clique no botão acima para abrir a pasta compartilhada no Google Drive.</p>
                <p>2. Você pode baixar as pastas inteiras em formato .ZIP ou ouvir faixas avulsas.</p>
                <p>3. Para pen drive, recomendamos formatar em FAT32 para tocar em qualquer som de carro.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
