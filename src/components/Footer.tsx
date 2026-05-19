import { Instagram, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gold/20 bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <h3 className="font-cinzel text-xl text-gold mb-4 tracking-widest">SHOPP ZAHRIR</h3>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            Sua boutique premium de itens IMVU. Qualidade, exclusividade e segurança em cada transação. Estilo luxo gótico para os avatares mais exigentes.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-cinzel text-lg text-white mb-4 tracking-widest">RECOHECIMENTO</h3>
          <div className="flex gap-4">
             <div className="flex flex-col items-center gap-1 group cursor-help">
               <ShieldCheck className="text-blood group-hover:scale-110 transition-transform" size={32} />
               <span className="text-[10px] uppercase tracking-tighter opacity-70">100% SEGURO</span>
             </div>
             <div className="flex flex-col items-center gap-1 group cursor-help">
               <Instagram className="text-gold group-hover:scale-110 transition-transform" size={32} />
               <span className="text-[10px] uppercase tracking-tighter opacity-70">INSTAGRAM</span>
             </div>
          </div>
        </div>

        <div className="md:text-right">
          <h3 className="font-cinzel text-lg text-white mb-4 tracking-widest">SUPORTE</h3>
          <p className="text-sm text-gray-400">Atendimento 24h via bot e humano em horário comercial.</p>
          <p className="text-sm text-gold mt-2">vendas@zahrir.com</p>
          <div className="mt-6 flex justify-center md:justify-end gap-4">
             <img src="https://api.dicebear.com/7.x/initials/svg?seed=PIX&backgroundColor=d6a84f" alt="Pix" className="h-6 grayscale opacity-50" />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-[10px] text-gray-600 tracking-[0.3em] uppercase">
        © 2024 Shopp Zahrir - All rights reserved
      </div>
    </footer>
  );
}
