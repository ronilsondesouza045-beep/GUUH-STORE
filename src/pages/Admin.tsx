import { useEffect, useState } from 'react';
import { auth, db, handleFirestoreError, OperationType } from '../services/firebase';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  ChevronRight,
  TrendingUp,
  DollarSign,
  Package,
  User
} from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import GothicFrame from '../components/GothicFrame';

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubs = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const adminEmails = ['ronisouza495@gmail.com'];
        if (adminEmails.includes(user.email || '')) {
          setIsAdmin(true);
        } else {
          navigate('/minha-conta');
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    });
    return () => unsubs();
  }, [navigate]);

  if (loading) return <div className="h-screen flex items-center justify-center font-cinzel text-gold text-2xl">VERIFICANDO PERMISSÕES...</div>;
  if (!isAdmin) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto px-4 py-8 pb-32">
      {/* Admin Sidebar - Now a more compact nav on mobile */}
      <aside className="w-full lg:w-64 space-y-4">
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 items-start sm:items-center lg:items-start">
          <h2 className="font-cinzel text-gold text-lg tracking-[0.3em] uppercase px-4 border-l-4 border-blood whitespace-nowrap">Admin Panel</h2>
          
          <div className="flex-grow w-full lg:w-auto px-4 py-3 bg-white/5 border border-white/10 rounded flex flex-col gap-1">
             <p className="text-[8px] text-gray-500 uppercase tracking-widest">Admin logado</p>
             <div className="flex justify-between items-center gap-2">
                <p className="text-[10px] text-gold font-bold truncate max-w-[120px]">{auth.currentUser?.email}</p>
                <button 
                  onClick={() => { auth.signOut(); navigate('/login'); }}
                  className="px-2 py-1 border border-blood/50 text-blood text-[8px] font-bold uppercase tracking-tighter hover:bg-blood hover:text-white transition-colors rounded"
                >
                  Sair
                </button>
             </div>
          </div>
        </div>

        <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
          <AdminNavButton icon={<BarChart3 size={16} />} label="RESUMO" to="/admin" active={location.pathname === '/admin'} />
          <AdminNavButton icon={<ShoppingBag size={16} />} label="PEDIDOS" to="/admin/pedidos" active={location.pathname === '/admin/pedidos'} />
          <AdminNavButton icon={<Users size={16} />} label="USUÁRIOS" to="/admin/usuarios" active={location.pathname === '/admin/usuarios'} />
          <AdminNavButton icon={<MessageSquare size={16} />} label="CHATS" to="/admin/chats" active={location.pathname === '/admin/chats'} />
          <AdminNavButton icon={<Plus size={16} />} label="PRODUTOS" to="/admin/produtos" active={location.pathname === '/admin/produtos'} />
        </nav>
      </aside>

      {/* Admin Content */}
      <main className="flex-grow">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="pedidos" element={<AdminOrders />} />
          <Route path="usuarios" element={<AdminUsers />} />
          <Route path="chats" element={<AdminChats />} />
          <Route path="produtos" element={<AdminProducts />} />
        </Routes>
      </main>
    </div>
  );
}

function AdminNavButton({ icon, label, to, active }: { icon: any, label: string, to: string, active: boolean }) {
  return (
    <Link to={to} className={`flex items-center gap-3 px-3 py-3 rounded text-[9px] tracking-widest font-bold uppercase transition-all border ${
      active 
        ? 'bg-gold text-black border-gold shadow-[0_0_10px_rgba(214,168,79,0.3)]' 
        : 'text-gray-400 border-white/5 hover:bg-gold/10 hover:border-gold/30 hover:text-gold'
    }`}>
      {icon} <span className="truncate">{label}</span>
    </Link>
  );
}

// Sub-pages
function AdminDashboard() {
  const [stats, setStats] = useState({ totalSales: 0, totalOrders: 0, usersCount: 0 });

  useEffect(() => {
    const unsubsOrders = onSnapshot(collection(db, 'orders'), (snap) => {
      const orders = snap.docs.map(d => d.data());
      const total = orders.filter(o => o.status === 'aprovado' || o.status === 'enviado').reduce((acc, o) => acc + (o.total || 0), 0);
      setStats(prev => ({ ...prev, totalOrders: snap.size, totalSales: total }));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'orders');
    });
    const unsubsUsers = onSnapshot(collection(db, 'users'), (snap) => {
      setStats(prev => ({ ...prev, usersCount: snap.size }));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'users');
    });
    return () => { unsubsOrders(); unsubsUsers(); };
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<DollarSign className="text-green-500" />} label="Total Vendido" value={formatCurrency(stats.totalSales)} />
          <StatCard icon={<Package className="text-gold" />} label="Total Pedidos" value={stats.totalOrders.toString()} />
          <StatCard icon={<Users className="text-blue-500" />} label="Usuários" value={stats.usersCount.toString()} />
       </div>

       <GothicFrame variant="gold">
          <h3 className="font-cinzel text-white mb-6 tracking-widest">PEDIDOS RECENTES</h3>
          <div className="text-center py-12 text-gray-500 text-xs tracking-widest">
             Módulo de estatísticas detalhadas em desenvolvimento.
          </div>
       </GothicFrame>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <GothicFrame variant="simple">
       <div className="flex items-center gap-4">
          <div className="p-4 bg-white/5 rounded gold-border">{icon}</div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">{label}</p>
            <p className="text-xl font-bold text-white font-sans">{value}</p>
          </div>
       </div>
    </GothicFrame>
  );
}

function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'orders (admin orders page)');
    });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setProcessingId(id);
    try {
      console.log(`Atualizando status do pedido ${id} para: ${status}`);
      const orderRef = doc(db, 'orders', id);
      await updateDoc(orderRef, { status });
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      handleFirestoreError(error, OperationType.UPDATE, `orders/${id}`);
      alert("Erro ao atualizar status: " + (error instanceof Error ? error.message : "Erro desconhecido"));
    } finally {
      setProcessingId(null);
    }
  };

  const deleteOrder = async (id: string) => {
    setProcessingId(id);
    setConfirmDeleteId(null);
    try {
      console.log("🔥 [ADMIN] Deletando pedido:", id);
      const orderRef = doc(db, 'orders', id);
      await deleteDoc(orderRef);
      console.log("✅ [ADMIN] Pedido removido.");
    } catch (error: any) {
      console.error("🚨 [ADMIN] ERRO AO DELETAR PEDIDO:", error);
      handleFirestoreError(error, OperationType.DELETE, `orders/${id}`);
      const msg = error.code === 'permission-denied' ? "Permissão negada no banco." : (error.message || "Falha.");
      alert("ERRO AO APAGAR: " + msg);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gold/20 pb-4">
          <h2 className="font-cinzel text-xl text-gold uppercase tracking-widest">Gerenciar Pedidos</h2>
          <div className="text-[9px] text-gray-500 font-bold bg-white/5 px-3 py-1 rounded-full border border-white/10 uppercase tracking-tighter">
             {orders.length} pedidos encontrados
          </div>
       </div>

       {/* Mobile/Card View */}
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {orders.map(order => (
            <GothicFrame key={order.id} variant="simple" className="relative group overflow-hidden">
               {/* Status Badge floating */}
               <div className={cn(
                 "absolute top-2 right-2 text-[7px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter z-10",
                 order.status === 'aprovado' ? "bg-green-500 text-black" :
                 order.status === 'cancelado' ? "bg-red-500 text-white" :
                 "bg-gold text-black"
               )}>
                 {order.status}
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-start pt-1">
                     <div className="space-y-0.5">
                        <p className="text-[10px] text-white font-bold uppercase tracking-tight">{order.userData?.name || 'Sem Nome'}</p>
                        <p className="text-[11px] text-blood font-black leading-none">{order.userData?.nickIMVU}</p>
                        <p className="text-[8px] text-gray-500 font-mono">#{order.id.slice(0, 12).toUpperCase()}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[8px] text-gray-600 mb-1">{new Date(order.createdAt).toLocaleString()}</p>
                        <p className="text-lg font-sans font-bold text-gold">{formatCurrency(order.total)}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-4">
                     <div className="flex flex-col gap-1">
                        <span className="text-[8px] text-gray-500 uppercase font-bold">Mudar Status</span>
                        <select 
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="w-full bg-black/40 border border-gold/20 rounded p-2 text-[10px] text-white focus:border-gold outline-none"
                        >
                           {['aguardando pagamento', 'em análise', 'aprovado', 'enviado', 'cancelado'].map(s => (
                             <option key={s} value={s}>{s.toUpperCase()}</option>
                           ))}
                        </select>
                     </div>
                     <div className="flex items-end gap-1">
                        {order.status !== 'aprovado' && order.status !== 'enviado' && (
                          <button 
                            onClick={() => updateStatus(order.id, 'aprovado')}
                            className="flex-grow flex items-center justify-center h-10 bg-green-500/10 border border-green-500/30 text-green-500 rounded hover:bg-green-500 hover:text-black transition-all"
                            title="Aprovar Pedido"
                          >
                            <Check size={18} />
                          </button>
                        )}
                        
                        {confirmDeleteId === order.id ? (
                          <div className="flex flex-col gap-1 w-full scale-in-center">
                            <button onClick={() => deleteOrder(order.id)} className="h-6 bg-red-600 text-white text-[8px] font-bold rounded animate-pulse shadow-lg shadow-red-600/20">APAGAR!</button>
                            <button onClick={() => setConfirmDeleteId(null)} className="h-4 text-[7px] text-gray-500 uppercase font-bold hover:text-white transition-colors">Voltar</button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setConfirmDeleteId(order.id)} 
                            disabled={processingId === order.id}
                            className={cn(
                              "w-10 h-10 flex items-center justify-center rounded transition-all bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white",
                              processingId === order.id && "opacity-50"
                            )}
                          >
                            <Trash2 size={18} className={processingId === order.id ? 'animate-spin' : ''} />
                          </button>
                        )}
                     </div>
                  </div>
               </div>
            </GothicFrame>
          ))}
       </div>

       {orders.length === 0 && (
         <div className="text-center py-20 bg-white/5 rounded border border-white/5 border-dashed">
            <ShoppingBag size={48} className="mx-auto text-gray-800 mb-4 opacity-50" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">Nenhum pedido realizado ainda.</p>
         </div>
       )}
    </div>
  );
}

function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    return onSnapshot(collection(db, 'users'), (snap) => {
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'users (admin users page)');
    });
  }, []);

  return (
    <div className="space-y-6">
       <h2 className="font-cinzel text-xl text-gold mb-6 border-b border-gold/20 pb-2 uppercase tracking-widest">Usuários Cadastrados</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map(user => (
            <GothicFrame key={user.id} variant="simple" className="hover:border-gold/40 transition-colors">
               <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} className="w-12 h-12 rounded-full border border-gold/20 shadow-lg" alt="Avatar" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-dark border border-gold/30 rounded-full flex items-center justify-center">
                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-white font-bold truncate uppercase tracking-tighter">{user.displayName || 'Sem Nome'}</p>
                    <p className="text-[9px] text-gray-500 truncate lowercase">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="text-[7px] bg-gold/10 text-gold px-1.5 py-0.5 rounded font-black uppercase tracking-widest border border-gold/20">
                          {user.role || 'CLIENTE'}
                       </span>
                    </div>
                  </div>
               </div>
            </GothicFrame>
          ))}
       </div>
    </div>
  );
}

function AdminChats() {
  const [chats, setChats] = useState<any[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [replies, setReplies] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const q = query(collection(db, 'support_chats'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      setChats(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'support_chats');
    });
  }, []);

  const sendReply = async (chat: any) => {
    const text = replies[chat.id];
    if (!text?.trim()) return;

    setProcessingId(chat.id);
    try {
      const newMessage = {
        sender: 'attendant',
        text: text.trim(),
        time: new Date().toISOString()
      };
      
      const updatedMessages = [...(chat.messages || []), newMessage];
      await updateDoc(doc(db, 'support_chats', chat.id), {
        messages: updatedMessages,
        lastReplyBy: 'attendant',
        needsAttendant: false, 
        updatedAt: new Date().toISOString()
      });
      
      setReplies(prev => ({ ...prev, [chat.id]: '' }));
      console.log("✅ [ADMIN] Resposta enviada.");
    } catch (error: any) {
      console.error("❌ [ADMIN] Erro ao responder:", error);
      alert("ERRO AO RESPONDER: " + (error.message || "FALHA."));
    } finally {
      setProcessingId(null);
    }
  };

  const deleteChat = async (id: string) => {
     setProcessingId(id);
     setConfirmDeleteId(null);
     try {
       await deleteDoc(doc(db, 'support_chats', id));
     } catch (error: any) {
       console.error("❌ [ADMIN] Erro ao deletar chat:", error);
       handleFirestoreError(error, OperationType.DELETE, `support_chats/${id}`);
       alert("ERRO AO APAGAR: " + (error.code === 'permission-denied' ? "Permissão negada." : "Falha."));
     } finally {
       setProcessingId(null);
     }
  };

  const deleteAllChats = async () => {
    if(!confirm("LIMPAR TODAS AS CONVERSAS?")) return;
    try {
      const snap = await getDocs(collection(db, 'support_chats'));
      const deletions = snap.docs.map(d => deleteDoc(doc(db, 'support_chats', d.id)));
      await Promise.all(deletions);
      alert("LIMPEZA CONCLUÍDA.");
    } catch (error) {
      console.error("Erro ao limpar:", error);
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gold/20 pb-4">
          <h2 className="font-cinzel text-xl text-gold uppercase tracking-widest">Logs de Atendimento</h2>
          <button 
            onClick={deleteAllChats}
            className="w-full sm:w-auto text-[9px] text-red-500 border border-red-500/30 px-4 py-2 uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 rounded bg-red-500/5 shadow-inner"
          >
            <Trash2 size={14} /> Limpar Logs
          </button>
       </div>

       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {chats.map(chat => (
            <GothicFrame key={chat.id} variant="simple" className="h-full flex flex-col">
               <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                     <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0">
                           <User size={14} />
                        </div>
                        <div className="min-w-0">
                           <p className="text-[10px] text-gold font-bold uppercase truncate tracking-tighter">{chat.email}</p>
                           <p className="text-[7px] text-gray-500 font-mono tracking-tighter uppercase">ID: {chat.id.slice(0, 10)}</p>
                        </div>
                        {chat.needsAttendant && chat.lastReplyBy !== 'attendant' && (
                          <span className="bg-red-600 text-white text-[6px] font-black px-1.5 py-0.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.4)] uppercase">SOS</span>
                        )}
                     </div>
                     
                     <div className="flex gap-2 shrink-0">
                        {confirmDeleteId === chat.id ? (
                           <div className="flex gap-1">
                             <button onClick={() => deleteChat(chat.id)} className="px-3 py-1.5 bg-red-600 text-white text-[8px] font-bold rounded shadow-lg shadow-red-600/20 active:scale-95 transition-transform uppercase tracking-tighter">Apagar</button>
                             <button onClick={() => setConfirmDeleteId(null)} className="px-2 py-1.5 bg-white/5 text-[8px] text-gray-400 rounded hover:text-white transition-colors uppercase tracking-tighter">X</button>
                           </div>
                        ) : (
                          <button 
                            onClick={() => setConfirmDeleteId(chat.id)} 
                            disabled={processingId === chat.id}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                            title="Deletar Conversa"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                     </div>
                  </div>

                  <div className="flex-grow max-h-[300px] overflow-y-auto space-y-3 p-4 bg-black/60 rounded border border-white/5 mb-4 no-scrollbar scroll-smooth shadow-inner">
                     {chat.messages?.map((m: any, i: number) => {
                       const isAttendant = m.sender === 'attendant';
                       const isBot = m.sender === 'bot';
                       
                       return (
                         <div key={i} className={cn(
                           "text-[10px] p-2.5 rounded-lg max-w-[85%] shadow-sm",
                           isAttendant ? "bg-gold/10 text-gold ml-auto border border-gold/10" : 
                           isBot ? "bg-blue-500/10 text-blue-300 border border-blue-500/10" : 
                           "bg-white/5 text-gray-300 border border-white/5"
                         )}>
                            <div className="flex justify-between items-center gap-4 mb-2 opacity-60">
                               <span className="font-black text-[7px] uppercase tracking-[0.1em]">
                                 {isAttendant ? "Você" : isBot ? "Assistente" : "Cliente"}
                               </span>
                               <span className="text-[6px] font-mono">
                                 {m.time ? new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                               </span>
                            </div>
                            <p className="font-sans leading-relaxed break-words">{m.text}</p>
                         </div>
                       );
                     })}

                     {(!chat.messages || chat.messages.length === 0) && (
                       <div className="h-full flex items-center justify-center text-gray-700 uppercase tracking-widest text-[8px] border-2 border-dashed border-white/5 rounded-lg">
                          Sem histórico de mensagens.
                       </div>
                     )}
                  </div>

                  <div className="mt-auto pt-2">
                     <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="REPLICAR AO CLIENTE..."
                          className="flex-grow bg-black/50 border border-white/10 rounded px-4 py-3 text-[10px] text-white focus:border-gold outline-none transition-all placeholder:text-gray-700"
                          value={replies[chat.id] || ''}
                          onChange={(e) => setReplies(prev => ({ ...prev, [chat.id]: e.target.value }))}
                          onKeyPress={(e) => e.key === 'Enter' && sendReply(chat)}
                          disabled={processingId === chat.id}
                        />
                        <button 
                          onClick={() => sendReply(chat)}
                          disabled={processingId === chat.id || !replies[chat.id]?.trim()}
                          className={cn(
                            "px-5 py-3 rounded text-[9px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95",
                            processingId === chat.id || !replies[chat.id]?.trim()
                              ? "bg-gray-800 text-gray-600 cursor-not-allowed opacity-50"
                              : "bg-gold text-black hover:bg-white hover:shadow-gold/20"
                          )}
                        >
                          {processingId === chat.id ? "..." : "ENVIAR"}
                        </button>
                     </div>
                  </div>
               </div>
            </GothicFrame>
          ))}
       </div>
    </div>
  );
}

function AdminProducts() {
  const [productsList, setProductsList] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, this would be from Firestore.
    // We'll import the static ones for display and layout testing.
    import('../data/products').then(({ CATEGORIES }) => {
      // Just some sample data structure simulation
      setProductsList(CATEGORIES.map((cat, i) => ({ id: i, name: cat, category: cat, price: 10 + i })));
    });
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gold/20 pb-4">
          <div className="space-y-1">
             <h2 className="font-cinzel text-xl text-gold uppercase tracking-widest">Catálogo de Produtos</h2>
             <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Gerenciar visibilidade e preços</p>
          </div>
          <button className="w-full sm:w-auto px-6 py-3 bg-blood text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded shadow-lg shadow-blood/20 active:scale-95 transition-all">
            <Plus size={16} /> Novo Item
          </button>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsList.map(prod => (
            <GothicFrame key={prod.id} variant="simple" className="bg-black/20 group">
               <div className="flex justify-between items-start">
                  <div className="space-y-2">
                     <span className="text-[8px] bg-gold/10 text-gold px-2 py-0.5 rounded font-black uppercase">{prod.category}</span>
                     <h4 className="text-xs text-white font-bold uppercase tracking-tight">{prod.name}</h4>
                     <p className="font-mono text-gold text-sm">R$ {prod.price},00</p>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-2 text-gray-500 hover:text-white transition-colors"><Edit size={14} /></button>
                     <button className="p-2 text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  </div>
               </div>
            </GothicFrame>
          ))}
       </div>

       <div className="p-6 bg-white/5 rounded border border-gold/10 border-dashed text-center">
          <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
             A sincronização total com o banco de dados para produtos está configurada para leitura via `products.ts`.<br/>
             <span className="text-gold font-bold">Edições neste painel requerem permissões Master Admin.</span>
          </p>
       </div>
    </div>
  );
}
