import { ShoppingCart, Eye, Info, List } from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency } from '../lib/utils';
import { useCart } from '../services/cartStore';
import GothicFrame from './GothicFrame';
import { useNavigate } from 'react-router-dom';
import { Key } from 'react';

interface ProductCardProps {
  product: any;
  key?: Key;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const catImage = product.image || `https://api.dicebear.com/7.x/glass/svg?seed=${product.name}&backgroundColor=050505`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      {/* Premium Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blood/50 to-gold/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      
      <GothicFrame variant="gold" className="relative h-full overflow-hidden flex flex-col" contentClassName="p-0">
        <div className="relative aspect-square overflow-hidden bg-black/40">
           <img 
             src={catImage}
             alt={product.name} 
             className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105 filter brightness-90 group-hover:brightness-110"
           />
           
           {/* Overlay */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
           <div className="absolute inset-0 bg-blood/5 opacity-0 group-hover:opacity-100 transition-opacity" />

           {product.ageRequired && (
             <div className="absolute top-4 right-4 bg-blood text-white text-[10px] px-3 py-1 rounded-sm font-bold border border-gold shadow-[0_0_10px_rgba(179,0,0,0.5)] z-10">
               +18 AGE
             </div>
           )}
           
           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-[2px] z-20">
              <button 
                onClick={() => navigate(`/produto/${product.id}`)}
                className="w-40 py-3 bg-white text-black text-[10px] font-bold tracking-[0.2em] rounded-sm hover:bg-gold transition-colors flex items-center justify-center gap-2 uppercase"
              >
                <Eye size={14} /> DETALHES
              </button>
              <button 
                onClick={() => navigate(`/produtos?cat=${encodeURIComponent(product.category)}`)}
                className="w-40 py-3 bg-transparent border border-white text-white text-[10px] font-bold tracking-[0.2em] rounded-sm hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2 uppercase"
              >
                <List size={14} /> CATÁLOGO
              </button>
           </div>
        </div>

        <div className="p-5 flex-grow flex flex-col items-center text-center">
          <div className="mb-4">
            <span className="text-[10px] text-blood/80 uppercase tracking-[0.2em] font-bold block mb-1">
              {product.category}
            </span>
            <h3 className="font-cinzel text-base text-white group-hover:text-gold transition-colors tracking-wide h-12 flex items-center justify-center overflow-hidden leading-tight text-center">
              {product.name}
            </h3>
          </div>

          <div className="flex flex-col items-center gap-0.5 mb-4 mt-auto">
             <p className="text-[9px] text-gray-500 uppercase tracking-widest">Valor Unitário</p>
             <span className="text-xl font-bold font-sans text-gold drop-shadow-[0_0_5px_rgba(214,168,79,0.3)]">
               {formatCurrency(product.price)}
             </span>
          </div>
          
          <div className="w-full space-y-2">
            <button 
              onClick={() => addItem(product)}
              className="w-full py-3.5 bg-blood hover:bg-white hover:text-black text-white font-bold text-[10px] tracking-[0.2em] uppercase transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <ShoppingCart size={14} /> COMPRAR AGORA
            </button>
            <p className="text-[7px] text-gray-600 uppercase tracking-tighter">Entrega digital imediata após aprovação</p>
          </div>
        </div>
      </GothicFrame>
    </motion.div>
  );
}

