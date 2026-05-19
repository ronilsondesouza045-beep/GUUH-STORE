import { useState, useEffect } from 'react';
import { Star, Trash2, Edit2, Send, X, MessageSquareQuote } from 'lucide-react';
import { db, auth } from '../services/firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  deleteDoc, 
  doc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import GothicFrame from './GothicFrame';
import { cn } from '../lib/utils';

export default function Testimonials() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newFeedback, setNewFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeedbacks(data);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao carregar feedbacks:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("Você precisa estar logado para avaliar.");
      return;
    }

    if (!newFeedback.trim()) return;

    try {
      if (editingId) {
        await updateDoc(doc(db, 'feedbacks', editingId), {
          text: newFeedback,
          rating,
          updatedAt: serverTimestamp()
        });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'feedbacks'), {
          userId: auth.currentUser.uid,
          userName: auth.currentUser.displayName || 'Cliente Anônimo',
          userEmail: auth.currentUser.email,
          userAvatar: auth.currentUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${auth.currentUser.email}`,
          text: newFeedback,
          rating,
          createdAt: serverTimestamp()
        });
      }
      setNewFeedback('');
      setRating(5);
      setShowForm(false);
    } catch (error) {
      console.error("Erro ao salvar feedback:", error);
      alert("Ocorreu um erro ao enviar sua avaliação.");
    }
  };

  const handleEdit = (fb: any) => {
    setEditingId(fb.id);
    setNewFeedback(fb.text);
    setRating(fb.rating);
    setShowForm(true);
    window.scrollTo({ top: document.getElementById('feedback-form')?.offsetTop ? document.getElementById('feedback-form')!.offsetTop - 100 : 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir seu feedback?")) return;
    try {
      await deleteDoc(doc(db, 'feedbacks', id));
    } catch (error) {
      console.error("Erro ao excluir feedback:", error);
    }
  };

  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="font-cinzel text-3xl text-gold tracking-widest uppercase">
          Feedback dos <span className="text-white">Clientes</span>
        </h2>
        <p className="text-gray-400 text-sm font-light max-w-xl mx-auto italic">
          O que dizem sobre nossa qualidade e atendimento premium.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center mb-8">
          {!showForm ? (
            <button 
              onClick={() => {
                if (!auth.currentUser) {
                  window.location.href = '/login';
                  return;
                }
                setShowForm(true);
              }}
              className="px-6 py-3 bg-white/5 border border-gold text-gold hover:bg-gold hover:text-black transition-all rounded font-cinzel text-xs tracking-widest uppercase flex items-center gap-2"
            >
              DEIXAR MINHA AVALIAÇÃO <Star size={14} className="fill-current" />
            </button>
          ) : (
            <div id="feedback-form" className="w-full">
              <GothicFrame variant="gold" className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-cinzel text-gold text-sm tracking-widest uppercase">
                      {editingId ? 'EDITAR AVALIAÇÃO' : 'NOVA AVALIAÇÃO'}
                    </h3>
                    <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="text-gray-500 hover:text-white">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={cn(
                          "transition-all transform hover:scale-110",
                          star <= rating ? "text-gold" : "text-gray-700"
                        )}
                      >
                        <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                    placeholder="Conte sua experiência com a Zahrir..."
                    className="w-full bg-black/40 border border-gold/20 rounded p-4 text-xs text-white focus:outline-none focus:border-gold h-32 resize-none"
                    required
                  />

                  <div className="flex justify-end gap-3">
                    <button 
                      type="button" 
                      onClick={() => { setShowForm(false); setEditingId(null); }}
                      className="px-4 py-2 text-xs text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-gold text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2"
                    >
                      {editingId ? 'ATUALIZAR' : 'PUBLICAR'} <Send size={14} />
                    </button>
                  </div>
                </form>
              </GothicFrame>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {feedbacks.map((fb) => (
                <motion.div
                  key={fb.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                >
                  <GothicFrame variant="simple" className="h-full group relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-gold/10 pointer-events-none group-hover:text-gold/20 transition-colors">
                      <MessageSquareQuote size={48} />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={fb.userAvatar} 
                          alt={fb.userName} 
                          className="w-10 h-10 rounded-full border border-gold/20" 
                        />
                        <div className="min-w-0">
                          <p className="text-[10px] text-white font-bold uppercase tracking-tighter truncate">{fb.userName}</p>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={8} 
                                className={i < fb.rating ? "text-gold" : "text-gray-800"} 
                                fill={i < fb.rating ? "currentColor" : "none"} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-gray-400 font-sans leading-relaxed italic">
                        "{fb.text}"
                      </p>

                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <span className="text-[7px] text-gray-600 font-mono uppercase">
                          {fb.createdAt?.toDate ? fb.createdAt.toDate().toLocaleDateString() : 'Recentemente'}
                        </span>

                        {auth.currentUser?.uid === fb.userId && (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEdit(fb)}
                              className="p-1.5 text-gray-500 hover:text-gold transition-colors hover:bg-gold/10 rounded"
                              title="Editar"
                            >
                              <Edit2 size={12} />
                            </button>
                            <button 
                              onClick={() => handleDelete(fb.id)}
                              className="p-1.5 text-gray-500 hover:text-red-500 transition-colors hover:bg-red-500/10 rounded"
                              title="Excluir"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </GothicFrame>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && feedbacks.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded border border-white/5 border-dashed">
            <MessageSquareQuote size={40} className="mx-auto text-gray-800 mb-4 opacity-50" />
            <p className="text-xs text-gray-500 uppercase tracking-widest font-sans">Seja o primeiro a avaliar nossa loja!</p>
          </div>
        )}
      </div>
    </section>
  );
}
