import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { UrgencyHeader } from './components/UrgencyHeader';
import { Hero } from './components/Hero';
import { AudioPlayerDemo } from './components/AudioPlayerDemo';
import { GenreExplorer } from './components/GenreExplorer';
import { FeaturesBento } from './components/FeaturesBento';
import { SupportSection } from './components/SupportSection';
import { Testimonials } from './components/Testimonials';
import { CompatibilityMarquee } from './components/CompatibilityMarquee';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { TransparentCheckoutModal } from './components/TransparentCheckoutModal';
import { LeadMagnetModal } from './components/LeadMagnetModal';
import { ExitIntentModal } from './components/ExitIntentModal';
import { SalesToast } from './components/SalesToast';
import { StickyBottomBar } from './components/StickyBottomBar';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutPlanId, setCheckoutPlanId] = useState<string>('vip');
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [hasTriggeredExitIntent, setHasTriggeredExitIntent] = useState(false);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 12 && !hasTriggeredExitIntent && !isCheckoutOpen && !isLeadMagnetOpen) {
        setIsExitModalOpen(true);
        setHasTriggeredExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggeredExitIntent, isCheckoutOpen, isLeadMagnetOpen]);

  const handleOpenCheckout = (planId: string = 'vip') => {
    setCheckoutPlanId(planId);
    setIsCheckoutOpen(true);
  };

  const handleClaimExitDiscount = (customPrice: number, planName: string) => {
    setIsExitModalOpen(false);
    if (customPrice < 10) {
      setCheckoutPlanId('basic');
    } else {
      setCheckoutPlanId('vip');
    }
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#00ff66] selection:text-black">
      {/* 1. Urgency Bar - Exact Red Top Bar */}
      <UrgencyHeader />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onOpenCheckout={handleOpenCheckout} />

        {/* 3. Audio Samples - Sinta o POWER do Pack */}
        <AudioPlayerDemo />

        {/* 4. Genres - Uma seleção GIGANTE de músicas */}
        <GenreExplorer />

        {/* 5. Features - O que você vai levar? */}
        <FeaturesBento />

        {/* 6. Support - Suporte e Orientação */}
        <SupportSection />

        {/* 7. Testimonials - O que diz quem já comprou */}
        <Testimonials />

        {/* 8. Compatibility Marquee - Compatível com todas as marcas */}
        <CompatibilityMarquee />

        {/* 9. Pricing - Comprando HOJE você Leva: R$ 9,90 e R$ 19,90 */}
        <PricingSection onOpenCheckout={handleOpenCheckout} />

        {/* 10. FAQ - Dúvidas Frequentes */}
        <FaqSection />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Conversion Modals & Helpers */}
      <TransparentCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        initialPlanId={checkoutPlanId}
      />

      <LeadMagnetModal
        isOpen={isLeadMagnetOpen}
        onClose={() => setIsLeadMagnetOpen(false)}
        onUpgradeToVip={() => handleOpenCheckout('vip')}
      />

      <ExitIntentModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onClaimDiscount={handleClaimExitDiscount}
      />

      {/* Real-time Sales Toast */}
      <SalesToast />

      {/* Mobile & Desktop Sticky Conversion Bar */}
      <StickyBottomBar onOpenCheckout={handleOpenCheckout} />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/5516988158533?text=Ol%C3%A1%21%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20Beat%20Pack%202026."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 sm:bottom-6 right-4 z-40 w-12 h-12 rounded-full bg-[#00e626] hover:bg-[#00c922] text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,230,38,0.5)] transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Atendimento no WhatsApp"
        title="Tirar dúvidas no WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-black text-black" />
      </a>
    </div>
  );
}
