import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES, CATEGORY_DRIVE_LINKS } from '../data/products';
import ProductCard from '../components/ProductCard';
import GothicFrame from '../components/GothicFrame';
import { ExternalLink } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(catParam || 'Todos');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    if (catParam) setSelectedCategory(catParam);
  }, [catParam]);

  const catImage = "https://images.unsplash.com/photo-1519781542704-957ef19f9a2b?auto=format&fit=crop&q=80";

  return (
    <div className="pb-20">
      {/* Category Header Banner */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden mb-12">
        <motion.img 
          key={selectedCategory}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          src={catImage} 
          alt={selectedCategory} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
           <motion.div
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.5 }}
           >
              <span className="text-gold font-bold tracking-[0.5em] text-xs uppercase mb-4 block">Catálogo Oficial</span>
              <h1 className="font-cinzel text-4xl md:text-6xl text-white tracking-widest uppercase drop-shadow-2xl">
                {selectedCategory === 'Todos' ? 'Coleção Completa' : selectedCategory}
              </h1>
              <div className="flex items-center justify-center gap-2 mt-6 text-[10px] text-white/50 tracking-[0.2em] uppercase">
                 <span>Home</span> <ChevronRight size={10} /> <span>Catalogo</span> {selectedCategory !== 'Todos' && <><ChevronRight size={10} /> <span className="text-gold">{selectedCategory}</span></>}
              </div>
           </motion.div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4">
        {/* Search and Quick Filters */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
            <GothicFrame variant="gold" className="p-8 space-y-8 bg-black/60 backdrop-blur-md">
              <div>
                <h3 className="font-cinzel text-white text-sm tracking-[0.3em] mb-8 uppercase border-l-4 border-blood pl-4">Categorias</h3>
                <div className="space-y-1">
                  {['Todos', ...CATEGORIES].map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSearchParams(cat === 'Todos' ? {} : { cat });
                      }}
                      className={`w-full text-left px-4 py-3 text-[10px] font-bold tracking-[0.2em] transition-all rounded uppercase flex items-center justify-between group ${
                        selectedCategory === cat 
                        ? 'bg-gold text-black shadow-[0_0_15px_rgba(214,168,79,0.3)]' 
                        : 'text-gray-400 hover:text-gold hover:bg-white/5'
                      }`}
                    >
                      {cat}
                      {selectedCategory === cat && <ChevronRight size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                <input 
                  type="text" 
                  placeholder="Pesquisar no acervo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/50 border border-gold/20 rounded py-3 pl-12 pr-6 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-gold transition-all"
                />
              </div>

              <div className="p-6 bg-blood/5 border border-blood/20 rounded text-center space-y-4">
                 <h4 className="text-blood font-black text-[10px] tracking-widest uppercase">Precisa de Ajuda?</h4>
                 <p className="text-[9px] text-gray-500 uppercase leading-relaxed">Nossos especialistas estão prontos para orientar sua compra.</p>
                 <a 
                  href="https://www.instagram.com/shopp__zahrirofc?igsh=MTBxa2xhZTBuaTdtYg%3D%3D"
                  target="_blank"
                  className="block text-[9px] uppercase tracking-[0.3em] bg-blood text-white px-4 py-3 rounded font-bold hover:bg-white hover:text-black transition-all"
                 >
                  CONSULTORIA VIP
                 </a>
              </div>
            </GothicFrame>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Mobile Search & Filter */}
            <div className="lg:hidden flex flex-col gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                <input 
                  type="text" 
                  placeholder="BUSCAR ITEM..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-gold/30 rounded py-4 pl-12 pr-6 text-xs uppercase tracking-widest text-white focus:outline-none"
                />
              </div>
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center justify-center gap-3 bg-gold text-black py-4 font-black text-xs uppercase tracking-[0.3em] rounded"
              >
                <Filter size={16} /> FILTRAR CATEGORIAS
              </button>
            </div>

            {/* Grid Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-white/5 pb-4 gap-4">
               <div className="flex flex-col gap-1">
                 <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                   Exibindo <span className="text-white font-bold">{filteredProducts.length}</span> resultados
                 </p>
                 {CATEGORY_DRIVE_LINKS[selectedCategory] && (
                   <motion.a
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     href={CATEGORY_DRIVE_LINKS[selectedCategory]}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors text-[10px] font-bold tracking-[0.2em] uppercase mt-2 group"
                   >
                     <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
                     ACESSAR CATÁLOGO COMPLETO (DRIVE)
                   </motion.a>
                 )}
               </div>
               <div className="flex items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest">
                  <span>Ordenar:</span>
                  <select className="bg-transparent text-white font-bold focus:outline-none cursor-pointer">
                     <option>Lançamentos</option>
                     <option>Menor Preço</option>
                     <option>Maior Preço</option>
                  </select>
               </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-40 text-center space-y-4"
              >
                <Search size={48} className="mx-auto text-gray-700 mb-4" />
                <p className="font-cinzel text-xl text-gray-500 tracking-[0.3em] uppercase">
                  Nenhum item encontrado nesta coleção
                </p>
                <button onClick={() => setSelectedCategory('Todos')} className="text-gold text-[10px] font-bold tracking-widest border-b border-gold uppercase">Limpar Filtros</button>
              </motion.div>
            )}

            {/* General Observations */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 p-8 border border-white/10 rounded-lg bg-black/40 backdrop-blur-sm"
            >
              <h3 className="font-cinzel text-gold text-lg tracking-[0.3em] mb-6 uppercase border-b border-gold/20 pb-4">Observações Importantes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[10px] text-gray-400 tracking-wider uppercase leading-relaxed">
                <div className="space-y-4">
                  <p><span className="text-blood font-bold">• MERCADO NEGRO:</span> Qualquer produto M.N só será enviado se a conta do cliente estiver devidamente com o AGE (Verificação de idade) ativo ou se o mesmo comprovar ter mais de 18 anos. <a href="https://drive.google.com/drive/folders/1F51d0alfBNAAtt5pugP6huDrjJQ2nzul?usp=sharing" target="_blank" className="text-gold underline ml-1">[VER CATÁLOGO DRIVE]</a></p>
                  <p><span className="text-blood font-bold">• ENVIO DE NUS:</span> Somente se o cliente tiver sala comprovada com vídeo ou print. <a href="https://drive.google.com/drive/folders/1hZVNCxlZSyxpZFxv9bIjYe8N9Ytg2knl?usp=sharing" target="_blank" className="text-gold underline ml-1">[VER CATÁLOGO FEMININO]</a></p>
                </div>
                <div className="space-y-4">
                  <p><span className="text-blood font-bold">• MÓVEL YATCH:</span> É necessário acesso à conta do cliente para realizar a montagem. <a href="https://drive.google.com/drive/folders/1dkOT9DYrFZbPUYfIMRxILTPg4UsrkSF5?usp=sharing" target="_blank" className="text-gold underline ml-1">[VER SALAS]</a></p>
                  <p><span className="text-blood font-bold">• COMBOS:</span> Produtos para o mesmo @ ganham desconto especial.</p>
                  <p><span className="text-blood font-bold">• REPASSE:</span> Caso o pedido seja para repasse para outras lojas, por favor avisar antecipadamente.</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-gold/50 font-bold tracking-[0.5em] text-[8px]">ENVIOS RÁPIDOS ⚡️ ZAHIRO SHOP</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[200] bg-dark p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
               <div>
                  <span className="text-blood font-bold tracking-[0.4em] text-[10px] uppercase block mb-1">Menu de Navegação</span>
                  <h2 className="font-cinzel text-3xl text-gold uppercase tracking-tighter">Categorias</h2>
               </div>
              <button onClick={() => setIsFilterOpen(false)} className="p-3 bg-white/5 rounded-full text-white"><X size={24} /></button>
            </div>
            <div className="space-y-4">
               {['Todos', ...CATEGORIES].map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSearchParams(cat === 'Todos' ? {} : { cat });
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left p-6 font-cinzel text-sm tracking-widest border rounded transition-all flex items-center justify-between ${
                    selectedCategory === cat 
                    ? 'bg-gold text-black border-gold shadow-[0_0_20px_rgba(214,168,79,0.3)]' 
                    : 'text-gray-400 border-white/10'
                  }`}
                >
                  {cat.toUpperCase()}
                  {selectedCategory === cat && <ChevronRight size={18} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

