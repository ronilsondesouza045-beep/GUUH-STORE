import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, ShieldCheck, HelpCircle, Instagram, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS, Product } from '../data/products';
import { formatCurrency } from '../lib/utils';
import { useCart } from '../services/cartStore';
import GothicFrame from '../components/GothicFrame';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const product = PRODUCTS.find(p => p.id === id) as Product | undefined;

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6 px-4">
        <AlertTriangle size={60} className="text-gold" />
        <h1 className="font-cinzel text-2xl text-gold text-center uppercase tracking-widest">Produto não encontrado</h1>
        <button onClick={() => navigate('/produtos')} className="text-white border-b border-gold uppercase tracking-widest text-xs py-2">Voltar para o catálogo</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors mb-8 uppercase tracking-widest text-xs font-bold"
      >
        <ArrowLeft size={16} /> Voltar para o Acervo
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image Section */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <GothicFrame variant="gold">
            <img 
              src={product.image || `https://api.dicebear.com/7.x/glass/svg?seed=${product.name}&backgroundColor=050505`} 
              alt={product.name} 
              className="w-full aspect-square object-cover rounded opacity-80"
            />
          </GothicFrame>
        </motion.div>

        {/* Product Info Section */}
        <div className="space-y-10">
          <div>
            <span className="text-blood font-bold tracking-[0.4em] uppercase text-[10px]">{product.category}</span>
            <h1 className="font-cinzel text-4xl md:text-5xl text-white mt-4 tracking-widest uppercase leading-tight">{product.name}</h1>
            <div className="mt-6 flex items-baseline gap-4">
               <span className="text-4xl text-gold font-bold font-sans">{formatCurrency(product.price)}</span>
               {product.note && <span className="text-gray-500 font-light italic text-xs uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-sm">{product.note}</span>}
            </div>
          </div>

          {product.ageRequired && (
            <div className="bg-blood/10 border border-blood/20 p-5 rounded-sm flex items-start gap-4">
               <AlertTriangle className="text-blood shrink-0" size={24} />
               <p className="text-[10px] text-blood font-bold uppercase tracking-widest leading-relaxed">
                 Aviso: Venda restrita para membros com verificação AGE/AP ativa.
               </p>
            </div>
          )}

          <div className="space-y-6">
             <h3 className="font-cinzel text-xs text-gold uppercase tracking-widest font-black border-b border-gold/20 pb-2">Resumo do Item</h3>
             <p className="text-sm text-gray-400 font-light leading-relaxed">
               {product.description || "Este item digital de luxo é entregue diretamente em sua conta IMVU como presente ou via sistema direto após a validação do pagamento."}
             </p>
             <div className="grid grid-cols-2 gap-4">
                {[
                  "Entrega Rápida",
                  "Garantia Zahrir",
                  "Procedência IMVU",
                  "Suporte 24/7"
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                     <CheckCircle2 size={12} className="text-gold" />
                     {b}
                  </div>
                ))}
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <button 
               onClick={() => {
                 addItem(product);
                 navigate('/carrinho');
               }}
               className="flex-1 py-5 bg-blood hover:bg-gold hover:text-black text-white font-black transition-all flex items-center justify-center gap-3 tracking-[0.3em] uppercase text-xs rounded-sm shadow-xl"
             >
               COMPRAR AGORA <ShoppingCart size={18} />
             </button>
             <button 
               onClick={() => addItem(product)}
               className="flex-1 py-5 border-2 border-gold/40 text-gold hover:bg-gold/10 font-black transition-all tracking-[0.3em] uppercase text-xs rounded-sm"
             >
               ADD AO CARRINHO
             </button>
          </div>

          {/* Social Proof & Security */}
          <div className="flex items-center justify-around pt-10 border-t border-white/5">
             <div className="flex flex-col items-center gap-2">
                <HelpCircle size={24} className="text-gold/40" />
                <span className="text-[8px] text-gray-600 uppercase tracking-widest">Suporte</span>
             </div>
             <a href="https://www.instagram.com/shopp__zahrirofc?igsh=MTBxa2xhZTBuaTdtYg%3D%3D" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
                <Instagram size={24} className="text-gold group-hover:scale-110 transition-transform" />
                <span className="text-[8px] text-gold uppercase tracking-widest">Instagram</span>
             </a>
             <div className="flex flex-col items-center gap-2">
                <ShieldCheck size={24} className="text-gold/40" />
                <span className="text-[8px] text-gray-600 uppercase tracking-widest">Seguro</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
