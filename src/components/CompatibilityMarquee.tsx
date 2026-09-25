const BRANDS = [
  'ALPINE',
  'JBL',
  'JVC',
  'LG',
  'AMVOX',
  'MONDIAL',
  'PHILIPS',
  'PIONEER',
  'SONY',
  'POSITRON',
  'MULTILASER',
  'BRAVOX',
];

export function CompatibilityMarquee() {
  return (
    <section className="py-10 bg-black text-white border-t border-b border-[#181a20] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center mb-6">
        <h4 className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-neutral-400">
          COMPATÍVEL COM TODAS AS MARCAS
        </h4>
      </div>

      {/* Marquee row */}
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap text-neutral-400 font-black text-sm tracking-widest">
          {[...BRANDS, ...BRANDS].map((brand, idx) => (
            <span
              key={idx}
              className="hover:text-white transition-colors duration-200 uppercase tracking-widest text-xs sm:text-sm"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
