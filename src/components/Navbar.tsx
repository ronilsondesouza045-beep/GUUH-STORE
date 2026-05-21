import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Instagram } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../services/cartStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const navigate = useNavigate();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-gold/30">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="https://api.dicebear.com/7.x/initials/svg?seed=SZ&backgroundColor=b30000" alt="Logo" className="w-10 h-10 rounded-full gold-border" />
          <span className="font-cinzel text-2xl font-bold text-gold tracking-widest hidden sm:block">SHOPP ZAHRIR</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-cinzel text-sm tracking-widest">
          <Link to="/" className="hover:text-gold transition-colors">INÍCIO</Link>
          <Link to="/produtos" className="hover:text-gold transition-colors">PRODUTOS</Link>
          <Link to="/minha-conta" className="hover:text-gold transition-colors">MINHA CONTA</Link>
          <div className="h-4 w-px bg-gold/30 mx-2"></div>
          <a href="https://www.instagram.com/shopp__zahrirofc?igsh=MTBxa2xhZTBuaTdtYg%3D%3D" target="_blank" rel="noreferrer" className="text-gold hover:text-white transition-colors">
            <Instagram size={20} />
          </a>
          <button onClick={() => navigate('/carrinho')} className="relative p-2 text-gold hover:scale-110 transition-transform">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blood text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-gold font-sans font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => navigate('/carrinho')} className="relative p-2 text-gold">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blood text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-gold">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-gold">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-dark/95 border-b border-gold/30 md:hidden flex flex-col p-6 gap-6 font-cinzel text-center tracking-[0.2em]"
          >
            <Link to="/" onClick={() => setIsOpen(false)} className="py-2 border-b border-gold/10">INÍCIO</Link>
            <Link to="/produtos" onClick={() => setIsOpen(false)} className="py-2 border-b border-gold/10">PRODUTOS</Link>
            <Link to="/minha-conta" onClick={() => setIsOpen(false)} className="py-2 border-b border-gold/10">MINHA CONTA</Link>
            <div className="flex justify-center gap-6 mt-4">
               <a href="https://www.instagram.com/shopp__zahrirofc?igsh=MTBxa2xhZTBuaTdtYg%3D%3D" target="_blank" rel="noreferrer" className="text-gold">
                <Instagram size={24} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
