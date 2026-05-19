import React, { useState } from 'react';
import { useCart } from '../services/cartStore';
import { Trash2, Plus, Minus, CreditCard, Copy, ShoppingBag, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import GothicFrame from '../components/GothicFrame';
import { motion } from 'motion/react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../services/firebase';

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    instagram: '',
    nickIMVU: '',
    obs: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const pixKey = "b1316a56-c319-4d82-8114-6000dcb714b0";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    alert("Chave Pix copiada!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        userId: auth.currentUser?.uid || 'guest',
        items,
        total: total(),
        status: 'aguardando pagamento',
        userData: formData,
        createdAt: new Date().toISOString()
      };
      
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      setOrderId(docRef.id);
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Erro ao criar pedido.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <GothicFrame variant="gold">
           <div className="py-12 space-y-8 px-6">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-green-500 text-green-500">
                 <CheckCircle2 size={40} />
              </div>
              <div className="space-y-2">
                <h2 className="font-cinzel text-3xl text-white uppercase tracking-widest">Pedido Gerado!</h2>
                <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">Protocolo: <span className="text-gold font-mono">#{orderId}</span></p>
              </div>
              
              <div className="p-8 bg-black/50 border border-gold/20 rounded space-y-6">
                 <p className="text-[10px] text-white uppercase tracking-[0.3em] font-black border-b border-white/5 pb-4">Aguardando Pagamento Pix</p>
                 <div className="p-4 bg-black border border-white/5 font-mono text-gold text-[10px] break-all leading-relaxed">
                    {pixKey}
                 </div>
                 <button 
                   onClick={handleCopyPix}
                   className="w-full py-4 bg-gold text-black text-xs font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl"
                 >
                   COPIAR CHAVE PIX <Copy size={16} />
                 </button>
              </div>
              
              <div className="bg-blood/10 p-4 border border-blood/20 rounded space-y-2">
                 <p className="text-[9px] text-blood font-black uppercase tracking-widest">Atenção Próximo Passo:</p>
                 <p className="text-[9px] text-gray-400 uppercase tracking-tighter">Envie o comprovante no atendimento Instagram (@guuh_zahirofc) para validação e envio imediato.</p>
              </div>
              
              <button 
                onClick={() => navigate('/minha-conta')}
                className="w-full py-4 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all"
              >
                VISUALIZAR MEUS PEDIDOS
              </button>
           </div>
        </GothicFrame>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 px-4">
        <ShoppingBag size={100} className="text-gold/10" />
        <div className="text-center space-y-2">
          <h1 className="font-cinzel text-3xl text-gold tracking-widest uppercase">Seu Carrinho está Vazio</h1>
          <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold">Nenhum item selecionado em sua coleção.</p>
        </div>
        <button 
          onClick={() => navigate('/produtos')}
          className="px-12 py-5 bg-blood text-white font-black tracking-[0.4em] uppercase text-[10px] hover:bg-white hover:text-black transition-all shadow-xl"
        >
          Explorar Loja
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-32">
      <div className="mb-12">
        <h1 className="font-cinzel text-5xl text-white tracking-widest uppercase">Meu <span className="text-gold">Carrinho</span></h1>
        <p className="text-gray-500 text-xs uppercase tracking-[0.5em] mt-4 font-bold">Conferência de itens para aquisição</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <motion.div layout key={item.id}>
               <GothicFrame variant="simple" className="relative group p-4 bg-white/2 border border-white/5 hover:bg-white/5 transition-colors">
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                     <div className="w-24 h-24 bg-black border border-white/10 p-1 flex-shrink-0">
                       <img 
                         src={item.image || `https://api.dicebear.com/7.x/glass/svg?seed=${item.name}&backgroundColor=050505`} 
                         alt={item.name} 
                         className="w-full h-full object-cover rounded opacity-80"
                       />
                     </div>
                     <div className="flex-grow text-center sm:text-left space-y-1">
                        <span className="text-[9px] text-blood font-black uppercase tracking-[0.3em]">{item.category}</span>
                        <h3 className="font-cinzel text-white text-xl tracking-widest uppercase">{item.name}</h3>
                        <p className="text-gold font-bold text-lg">{formatCurrency(item.price)}</p>
                     </div>
                     
                     <div className="flex items-center gap-3 bg-black border border-white/10 p-2 rounded-full">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-gray-500 hover:text-white transition-colors"><Minus size={14} /></button>
                        <span className="font-mono text-white text-xs w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-gray-500 hover:text-white transition-colors"><Plus size={14} /></button>
                     </div>
                     
                     <button 
                       onClick={() => removeItem(item.id)}
                       className="p-4 text-red-900/40 hover:text-blood hover:bg-blood/10 rounded-full transition-all"
                     >
                        <Trash2 size={20} />
                     </button>
                  </div>
               </GothicFrame>
            </motion.div>
          ))}
          
          <button 
            onClick={() => navigate('/produtos')}
            className="flex items-center gap-3 text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black hover:text-gold transition-all"
          >
            <ArrowLeft size={16} /> Continuar no Acervo
          </button>
        </div>

        {/* Summary & Form Sidebar */}
        <div className="space-y-8">
          <GothicFrame variant="gold" className="bg-black/60 backdrop-blur-md p-8">
             <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-1">
                   <h3 className="font-cinzel text-2xl text-white uppercase tracking-tighter font-bold">Check-out</h3>
                   <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Dados do Destinatário</p>
                </div>
                
                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-[9px] text-gold uppercase tracking-[0.3em] font-black">Nomenclatura Completa</label>
                      <input 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-gold transition-all text-white"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[9px] text-gold uppercase tracking-[0.3em] font-black">Correio Eletrônico</label>
                      <input 
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-gold transition-all text-white"
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[9px] text-gold uppercase tracking-[0.3em] font-black">Instagram</label>
                         <input 
                           required
                           value={formData.instagram}
                           onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-gold transition-all text-white"
                           placeholder="@USER"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[9px] text-gold uppercase tracking-[0.3em] font-black">Nick IMVU</label>
                         <input 
                           required
                           value={formData.nickIMVU}
                           onChange={(e) => setFormData({...formData, nickIMVU: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-gold transition-all text-white"
                         />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[9px] text-gold uppercase tracking-[0.3em] font-black">Observações</label>
                      <textarea 
                        value={formData.obs}
                        onChange={(e) => setFormData({...formData, obs: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-gold transition-all text-white h-20 resize-none"
                      />
                   </div>
                </div>

                <div className="pt-8 border-t border-white/10 space-y-4">
                   <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
                      <span>Soma de Itens</span>
                      <span className="text-gray-300 font-bold">{formatCurrency(total())}</span>
                   </div>
                   <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-[9px] text-gold uppercase tracking-widest font-black">Total Acumulado</span>
                        <h4 className="font-cinzel text-3xl text-white uppercase tracking-widest">Total</h4>
                      </div>
                      <span className="text-4xl font-black font-sans text-gold drop-shadow-xl">{formatCurrency(total())}</span>
                   </div>
                </div>

                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full py-5 bg-blood hover:bg-white hover:text-black text-white font-black transition-all tracking-[0.4em] uppercase text-xs rounded-sm disabled:opacity-50 disabled:cursor-wait shadow-xl"
                >
                  {loading ? 'Validando...' : 'Finalizar e Pagar'}
                </button>
             </form>
          </GothicFrame>
          
          <div className="p-6 bg-white/2 border border-white/5 rounded-sm space-y-4">
             <div className="flex justify-center items-center gap-6 text-gray-700">
                <CreditCard size={20} />
                <div className="w-12 h-6 border border-current rounded flex items-center justify-center font-black text-[9px] tracking-tight uppercase">Pix</div>
                <div className="w-12 h-6 border border-current rounded flex items-center justify-center font-black text-[9px] tracking-tight uppercase">BRL</div>
             </div>
             <p className="text-[8px] text-gray-600 text-center uppercase tracking-widest leading-relaxed">Transação monitorada por protocolo de segurança Zahrir.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

