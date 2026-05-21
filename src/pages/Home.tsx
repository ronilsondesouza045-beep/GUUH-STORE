import { motion } from 'motion/react';
import { ShoppingBag, Instagram, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GothicFrame from '../components/GothicFrame';
import Testimonials from '../components/Testimonials';
import { CATEGORIES } from '../data/products';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-20 pb-20 overflow-x-hidden">
      {/* Hero Banner */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-dark/40 bg-[url('https://images.unsplash.com/photo-1519781542704-957ef19f9a2b?auto=format&fit=crop&q=80')] bg-cover bg-center brightness-50 contrast-125" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/80" />
        
        <div className="relative z-10 text-center space-y-6 px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 rounded-full border-2 border-gold p-1">
               <img src="https://api.dicebear.com/7.x/initials/svg?seed=SZ&backgroundColor=b30000" alt="Logo" className="w-full h-full rounded-full" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-cinzel text-5xl md:text-8xl font-bold text-white tracking-[0.1em]"
          >
            SHOPP <span className="text-gold">ZAHRIR</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 font-light tracking-[0.3em] uppercase text-sm md:text-base max-w-2xl mx-auto"
          >
            Artigos de Luxo & Itens Exclusivos IMVU
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 pt-8"
          >
            <button 
              onClick={() => navigate('/produtos')}
              className="px-8 py-4 bg-blood hover:bg-white hover:text-black text-white font-bold rounded transition-all flex items-center gap-2 group tracking-widest uppercase text-xs"
            >
              VER PRODUTOS <ShoppingBag size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="https://www.instagram.com/shopp__zahrirofc?igsh=MTBxa2xhZTBuaTdtYg%3D%3D" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-black font-bold rounded transition-all flex items-center gap-2 tracking-widest uppercase text-xs"
            >
              INSTAGRAM <Instagram size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { icon: <ShieldCheck className="text-gold" />, title: "COMPRA SEGURA", desc: "Entrega garantida ou seu saldo de volta." },
           { icon: <Send className="text-blood" />, title: "ENVIO RÁPIDO", desc: "Processamento imediato após confirmação." },
           { icon: <Instagram className="text-gold" />, title: "SUPORTE VIP", desc: "Atendimento personalizado via Instagram." }
         ].map((badge, i) => (
           <GothicFrame key={i} variant={i % 2 === 0 ? 'gold' : 'blood'}>
             <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-full">{badge.icon}</div>
                <div>
                   <h3 className="font-cinzel text-sm text-white tracking-widest uppercase">{badge.title}</h3>
                   <p className="text-xs text-gray-400 font-light">{badge.desc}</p>
                </div>
             </div>
           </GothicFrame>
         ))}
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="font-cinzel text-3xl text-gold mb-12 tracking-widest text-center uppercase">Categorias <span className="text-white">Premium</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/produtos?cat=${encodeURIComponent(cat)}`)}
              className="cursor-pointer"
            >
              <GothicFrame variant="simple" className="h-full text-center py-8 group hover:border-gold/50 transition-colors">
                <div className="font-cinzel text-xs text-gold/70 group-hover:text-gold transition-colors tracking-widest h-12 flex items-center justify-center text-center px-4 uppercase">
                  {cat}
                </div>
              </GothicFrame>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4">
        <Testimonials />
      </section>

      {/* Featured Promo */}
      <section className="max-w-7xl mx-auto px-4">
         <GothicFrame variant="blood" className="p-0 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
               <div className="w-full md:w-1/2 h-64 md:h-96 relative">
                  <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80" alt="Promo" className="w-full h-full object-cover grayscale brightness-50" />
                  <div className="absolute inset-0 bg-blood/20 mix-blend-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="font-cinzel text-6xl text-white font-black opacity-20 rotate-12 uppercase">OFERTA</span>
                  </div>
               </div>
               <div className="w-full md:w-1/2 p-12 space-y-6">
                  <h3 className="font-cinzel text-4xl text-white uppercase">COMBO <span className="text-blood">SUPREMO</span></h3>
                  <p className="text-gray-400 font-light italic">A combinação perfeita para elevar seu perfil ao status VIP máximo.</p>
                  <div className="flex items-center gap-4">
                     <span className="text-3xl font-bold font-sans text-gold">R$ 75,00</span>
                     <span className="text-sm text-gray-600 line-through">R$ 80,00</span>
                  </div>
                  <button 
                    onClick={() => navigate('/produtos?cat=Promoções')}
                    className="w-full py-4 bg-blood hover:bg-white hover:text-black text-white font-bold transition-all tracking-[0.3em] uppercase text-xs"
                  >
                    APROVEITAR AGORA
                  </button>
               </div>
            </div>
         </GothicFrame>
      </section>
    </div>
  );
}

