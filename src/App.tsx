import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const Account = lazy(() => import('./pages/Account'));
const Admin = lazy(() => import('./pages/Admin'));

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark rose-pattern selection:bg-blood flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24">
          <Suspense fallback={<div className="h-screen flex items-center justify-center font-cinzel text-gold text-2xl animate-pulse">CARREGANDO...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/produto/:id" element={<ProductDetail />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/minha-conta" element={<Account />} />
              <Route path="/admin/*" element={<Admin />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}
