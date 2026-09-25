import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

export function UrgencyHeader() {
  const [formattedDate, setFormattedDate] = useState('25/09/2026');

  useEffect(() => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    setFormattedDate(`${day}/${month}/${year}`);
  }, []);

  return (
    <div className="w-full bg-[#ff0033] text-white py-1.5 px-4 text-center font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-1.5 sticky top-0 z-50">
      <Flame className="w-4 h-4 fill-white text-white shrink-0" />
      <span>DESCONTO SÓ HOJE NESSA PÁGINA - {formattedDate}</span>
    </div>
  );
}
