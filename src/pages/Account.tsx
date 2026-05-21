import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebase';
import { collection, query, where, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogOut, Package, Clock, MessageSquare, ShieldCheck, Star } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import GothicFrame from '../components/GothicFrame';

export default function Account() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for fake user first
    const fakeUserData = localStorage.getItem('shopp_zahrir_fake_user');
    if (fakeUserData) {
      const parsed = JSON.parse(fakeUserData);
      setUser(parsed);
      setLoading(false);
      // For orders in fake mode, we could mock them or just show empty
    }

    const unsubsAuth = auth.onAuthStateChanged(async (u) => {
      if (u) {
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        const adminEmails = ['ronisouza495@gmail.com', 'Guuhzahrir@gmail.com'];
        const isAdminUser = adminEmails.includes(u.email || '') || userDoc.data()?.role === 'admin';
        setUser({ ...u, ...userDoc.data(), isAdmin: isAdminUser });
        
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', u.uid),
          orderBy('createdAt', 'desc')
        );
        const unsubsOrders = onSnapshot(q, (snapshot) => {
          setOrders(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        });
        setLoading(false);
        return () => unsubsOrders();
      } else if (!fakeUserData) {
        navigate('/login');
      }
    });

    return () => unsubsAuth();
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem('shopp_zahrir_fake_user');
    navigate('/login');
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-cinzel text-gold text-2xl">CARREGANDO PERFIL...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-6">
           <div className="w-20 h-20 gold-border rounded-full p-1 bg-black">
              <img 
                src={user?.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}&backgroundColor=b30000`} 
                className="w-full h-full rounded-full object-cover" 
                alt="Avatar"
              />
           </div>
           <div>
              <h1 className="font-cinzel text-3xl text-white tracking-widest uppercase">OLÁ, {user?.displayName?.split(' ')[0] || 'MEMBRO'}</h1>
              <p className="text-xs text-gray-500 tracking-widest">{user?.email}</p>
              {user?.isAdmin && (
                <button 
                  onClick={() => navigate('/admin')}
                  className="mt-2 text-[10px] text-gold font-bold border border-gold px-2 py-0.5 uppercase flex items-center gap-1 hover:bg-gold hover:text-black transition-all"
                >
                  <ShieldCheck size={12} /> Painel Administrador
                </button>
              )}
           </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-blood hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
        >
          Sair <LogOut size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Orders */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-cinzel text-xl text-gold mb-6 border-b border-gold/20 pb-2">MEUS PEDIDOS</h2>
          
          {orders.length === 0 ? (
            <GothicFrame variant="simple" className="text-center py-20 text-gray-500 uppercase tracking-widest text-xs">
               Nenhum pedido realizado ainda.
            </GothicFrame>
          ) : (
            <div className="space-y-4">
               {orders.map(order => (
                 <motion.div key={order.id} whileHover={{ x: 5 }}>
                    <GothicFrame variant="simple" className="group">
                       <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                             <div className="p-3 bg-white/5 rounded gold-border">
                                <Package className="text-gold" size={24} />
                             </div>
                             <div>
                                <h4 className="text-xs font-mono text-gray-500">#{order.id}</h4>
                                <p className="text-sm text-white font-bold">{order.items.length} Itens • {formatCurrency(order.total)}</p>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                  order.status === 'aprovado' ? 'bg-green-500/20 text-green-500' :
                                  order.status === 'aguardando pagamento' ? 'bg-yellow-500/20 text-yellow-500' :
                                  order.status === 'cancelado' ? 'bg-red-500/20 text-red-500' : 'bg-gold/20 text-gold'
                                }`}>
                                   {order.status}
                                </span>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                             <Clock size={16} />
                             {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                       </div>
                    </GothicFrame>
                 </motion.div>
               ))}
            </div>
          )}
        </div>

        {/* Right Column: Profile & Info */}
        <aside className="space-y-8">
           <GothicFrame variant="gold">
              <h3 className="font-cinzel text-sm text-white mb-6 tracking-widest border-b border-gold/20 pb-2">INFORMAÇÕES DA CONTA</h3>
              <div className="space-y-4 text-xs text-gray-400">
                 <div className="flex justify-between">
                    <span>Membro desde:</span>
                    <span className="text-white">2024</span>
                 </div>
                 <div className="flex justify-between">
                    <span>Nível VIP:</span>
                    <span className="text-gold">Gothic Gold</span>
                 </div>
                 <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-500 uppercase">Ativo</span>
                 </div>
              </div>
           </GothicFrame>

           <div className="p-6 bg-blood/10 border border-blood/30 rounded">
              <div className="flex items-center gap-3 mb-4">
                 <MessageSquare className="text-blood" />
                 <h4 className="font-cinzel text-xs text-white">SUPORTE RÁPIDO</h4>
              </div>
              <p className="text-[10px] text-gray-400 mb-4 tracking-tighter leading-relaxed">Teve algum problema com seu pedido? Abra um ticket agora ou fale com o bot.</p>
              <button 
                onClick={() => document.querySelector('button.blood-glow')?.dispatchEvent(new MouseEvent('click', {bubbles: true}))}
                className="w-full py-2 bg-blood text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all"
              >
                ABRIR CHAT
              </button>
           </div>

           <div className="p-6 bg-gold/5 border border-gold/20 rounded">
              <div className="flex items-center gap-3 mb-4">
                 <Star className="text-gold" />
                 <h4 className="font-cinzel text-xs text-white uppercase tracking-widest">Sua Opinião</h4>
              </div>
              <p className="text-[10px] text-gray-400 mb-4 tracking-tighter leading-relaxed">Sua satisfação é nossa prioridade. Avalie nossa loja e ajude outros membros.</p>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-2 bg-black border border-gold text-gold font-bold uppercase tracking-widest text-[10px] hover:bg-gold hover:text-black transition-all"
              >
                AVALIAR AGORA
              </button>
           </div>
        </aside>
      </div>
    </div>
  );
}
