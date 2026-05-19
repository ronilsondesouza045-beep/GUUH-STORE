import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { Chrome, Shield, User, LogIn } from 'lucide-react';
import GothicFrame from '../components/GothicFrame';
import { motion } from 'motion/react';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Save user to firestore if not exists
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: 'user',
          createdAt: new Date().toISOString()
        });
      }
      
      navigate('/minha-conta');
    } catch (error) {
      console.error(error);
      alert("Erro ao entrar com Google.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewLogin = () => {
    // Fake login logic for preview
    localStorage.setItem('shopp_zahrir_fake_user', JSON.stringify({
      uid: 'fake-uid-123',
      email: 'ronisouza495@gmail.com',
      displayName: 'Roni Souza (Preview)',
      role: 'admin'
    }));
    navigate('/minha-conta');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <GothicFrame variant="gold">
          <div className="text-center py-8 space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center bg-black/40 text-gold">
                <LogIn size={40} />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="font-cinzel text-3xl text-white tracking-widest uppercase">ENTRAR</h1>
              <p className="text-xs text-gray-400 font-light tracking-widest">Acesse sua conta para ver pedidos e suporte.</p>
            </div>

            <div className="space-y-4 pt-6">
              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-4 bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-gold transition-colors tracking-widest text-xs uppercase"
              >
                <Chrome size={20} /> Entrar com Google
              </button>
            </div>

            <div className="pt-8 flex items-center justify-center gap-4 text-gray-600">
               <Shield size={16} />
               <span className="text-[10px] uppercase tracking-widest">Conexão Criptografada</span>
            </div>
          </div>
        </GothicFrame>
      </motion.div>
    </div>
  );
}
