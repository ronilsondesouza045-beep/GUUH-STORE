import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, ChevronRight, ChevronLeft, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth } from '../services/firebase';
import { addDoc, collection, onSnapshot, query, where, orderBy, updateDoc, doc } from 'firebase/firestore';

const PRESET_ANSWERS = {
  'precos': 'Nossos preços variam conforme a categoria. Você pode conferir tudo no Catálogo clicando em PRODUTOS no menu superior.',
  'como comprar': 'Para comprar, adicione os itens ao carrinho, preencha seus dados e finalize o pedido. O pagamento é via PIX.',
  'pix': 'Aceitamos PIX automático no site. A chave PIX da Shopp Zahrir é: b1316a56-c319-4d82-8114-6000dcb714b0.',
  'entrega': 'O prazo de entrega varia de 15 minutos a 24 horas após a confirmação do comprovante no atendimento.',
  'ap/age': 'Produtos +18 exigem AGE e AP verificados em sua conta IMVU para envio e visualização correta.',
  'instagram': 'Nosso Instagram oficial é @guuh_zahirofc. Siga para ver novidades e feedbacks!'
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  const scrollButtons = (direction: 'left' | 'right') => {
    if (buttonsRef.current) {
      const scrollAmount = 150;
      buttonsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      const q = query(
        collection(db, 'support_chats'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('createdAt', 'asc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const chat = snapshot.docs[0];
          setChatId(chat.id);
          const newMessages = chat.data().messages || [];
          
          if (!isOpen && newMessages.length > messages.length) {
            const lastMsg = newMessages[newMessages.length - 1];
            if (lastMsg.sender === 'attendant') {
              setHasNewMessage(true);
            }
          }
          
          setMessages(newMessages);
        } else if (isOpen) {
          // Initialize chat only if open
          startNewChat();
        }
      });
      return () => unsubscribe();
    }
  }, [auth.currentUser, isOpen, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const startNewChat = async () => {
    if (!auth.currentUser) return;
    const initialMessages = [{ 
      sender: 'bot', 
      text: `Olá! Sou o assistente virtual da Shopp Zahrir. Como posso ajudar você hoje?`, 
      time: new Date().toISOString() 
    }];
    const docRef = await addDoc(collection(db, 'support_chats'), {
      userId: auth.currentUser.uid,
      email: auth.currentUser.email,
      messages: initialMessages,
      status: 'open',
      createdAt: new Date().toISOString()
    });
    setChatId(docRef.id);
  };

  const handleSend = async (text: string, sender: 'user' | 'bot' = 'user') => {
    if (!text.trim() || !chatId) return;

    const newMessage = { sender, text, time: new Date().toISOString() };
    const updatedMessages = [...messages, newMessage];

    await updateDoc(doc(db, 'support_chats', chatId), {
      messages: updatedMessages
    });

    if (sender === 'user') {
      setInput('');

      // Desativar respostas do bot se houver um atendente no chat
      const hasAttendant = messages.some(m => m.sender === 'attendant');
      if (hasAttendant) return;

      // Se o usuário pedir atendente explicitamente
      if (text.toLowerCase().includes('atendente') || text.toLowerCase().includes('humano')) {
        await updateDoc(doc(db, 'support_chats', chatId), {
          needsAttendant: true,
          updatedAt: new Date().toISOString()
        });
      }

      // Check for keywords in bot reply
      setTimeout(() => {
        const lowerText = text.toLowerCase();
        let botReply = '';
        
        // Procurar por respostas pré-definidas
        for (const [key, val] of Object.entries(PRESET_ANSWERS)) {
          if (lowerText.includes(key)) {
            botReply = val;
            break;
          }
        }

        // Se não houver resposta pré-definida e o bot não tiver dado o prompt de atendente recentemente
        if (!botReply) {
          const lastBotMessage = [...messages].reverse().find(m => m.sender === 'bot');
          const attendantPrompt = 'Entendi! Deseja falar com um atendente humano? Se sim, aguarde um momento que em breve responderemos.';
          
          if (lastBotMessage?.text === attendantPrompt) {
            // Evita repetir o prompt de atendente se foi a última coisa que o bot disse
            return;
          }
          botReply = attendantPrompt;
        }

        if (botReply) {
          handleSend(botReply, 'bot');
        }
      }, 1000);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blood text-white rounded-full flex items-center justify-center blood-glow z-50 hover:scale-110 transition-transform"
      >
        <MessageCircle size={28} />
        {hasNewMessage && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-dark rounded-full animate-bounce" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 right-0 sm:bottom-24 sm:right-6 w-full sm:w-[380px] h-[100dvh] sm:h-[600px] sm:max-h-[85vh] bg-dark border-x sm:border border-gold/20 flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.9)] z-50 overflow-hidden sm:rounded-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blood to-dark p-4 flex items-center justify-between border-b border-gold/20 shadow-lg shrink-0">
               <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full border border-gold/30 p-0.5 bg-black shadow-inner">
                     <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Zahrir" alt="Bot" className="w-full h-full rounded-full" />
                     <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-dark rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  </div>
                  <div>
                    <h4 className="font-cinzel text-[10px] text-white font-bold tracking-[0.2em] uppercase">Suporte Zahrir</h4>
                    <span className="text-[7px] text-green-400 uppercase font-black tracking-widest animate-pulse">Atendimento Ativo</span>
                  </div>
               </div>
               <button 
                 onClick={() => setIsOpen(false)} 
                 className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
               >
                 <X size={22} />
               </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-[url('https://www.transparenttextures.com/patterns/black-linen-2.png')] bg-repeat scroll-smooth no-scrollbar">
               <div className="text-center py-2 mb-4">
                  <span className="text-[7px] text-gray-500 bg-white/5 px-2 py-1 rounded-full uppercase tracking-widest border border-white/5">
                     As conversas podem ser monitoradas por um atendente
                  </span>
               </div>
               
               {messages.map((m, i) => {
                 const isUser = m.sender === 'user';
                 const isAttendant = m.sender === 'attendant';
                 
                 return (
                   <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg text-xs leading-relaxed ${
                        isUser 
                        ? 'bg-blood text-white rounded-br-none border border-gold/20' 
                        : isAttendant
                        ? 'bg-gold/20 text-gold rounded-bl-none border border-gold/30'
                        : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
                      }`}>
                         {isAttendant && <p className="text-[7px] font-bold uppercase mb-1 opacity-60">Atendente</p>}
                         {m.text}
                      </div>
                   </div>
                 );
               })}
               {!auth.currentUser && (
                 <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-8">
                    <User size={40} className="text-gold/20" />
                    <p className="text-xs text-gray-400 font-sans">Faça login para iniciar um atendimento personalizado.</p>
                    <button 
                      onClick={() => { setIsOpen(false); window.location.href='/login'; }}
                      className="text-[10px] text-gold border border-gold px-4 py-2 uppercase tracking-widest hover:bg-gold hover:text-black transition-all font-cinzel"
                    >
                      Ir para Login
                    </button>
                 </div>
               )}
            </div>

            {/* Quick Actions Container */}
            <div className="relative border-t border-white/5 bg-black/20 group">
               {/* Scroll Arrows */}
               <button 
                 onClick={() => scrollButtons('left')}
                 className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/60 text-gold opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 <ChevronLeft size={16} />
               </button>
               <button 
                 onClick={() => scrollButtons('right')}
                 className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/60 text-gold opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 <ChevronRight size={16} />
               </button>

               <div 
                 ref={buttonsRef}
                 className="px-6 py-3 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth"
               >
                  {Object.keys(PRESET_ANSWERS).map(key => (
                    <button 
                      key={key}
                      onClick={() => handleSend(key)}
                      className="text-[9px] whitespace-nowrap bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-gray-400 hover:text-gold hover:border-gold hover:bg-gold/5 transition-all uppercase tracking-tighter font-bold"
                    >
                      {key}
                    </button>
                  ))}
               </div>
               {/* Subtle fade edges for horizontal scroll */}
               <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-black to-transparent pointer-events-none opacity-50" />
               <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-black to-transparent pointer-events-none opacity-50" />
            </div>

            {/* Input Wrapper */}
            <div className="bg-black/80 backdrop-blur-md border-t border-gold/20 p-4 pb-8 sm:pb-4 flex flex-col gap-3 shrink-0">
               {!messages.some(m => m.sender === 'attendant') && (
                 <button 
                   onClick={() => handleSend('Falar com atendente')}
                   className="w-full py-1.5 bg-white/5 border border-white/10 text-gold text-[8px] font-bold uppercase tracking-[0.2em] rounded hover:bg-gold hover:text-black transition-all"
                 >
                   Falar com Atendente Humano
                 </button>
               )}

               <form 
                 onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                 className="flex gap-2"
               >
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Sua mensagem..."
                    className="flex-grow bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs text-white focus:outline-none focus:border-gold transition-all placeholder:text-gray-600"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim()}
                    className="w-12 h-12 bg-gold text-black rounded-full flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform active:scale-95 disabled:opacity-20 shadow-[0_0_20px_rgba(214,168,79,0.3)]"
                  >
                    <Send size={20} />
                  </button>
               </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
