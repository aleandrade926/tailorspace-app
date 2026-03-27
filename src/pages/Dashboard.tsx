import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogOut, Building2, User, Plus, Home, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [fitOutBudget, setFitOutBudget] = useState('');
  const [status, setStatus] = useState('raw_contrapiso');
  
  // Imagem State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchProperties = async (userId: string) => {
    const { data } = await supabase.from('properties').select('*').eq('owner_id', userId).order('created_at', { ascending: false });
    if (data) setProperties(data);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        fetchProperties(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/auth');
      else {
        setUser(session.user);
        fetchProperties(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    let image_raw_url = null;

    // 1. Upload da imagem (se existir)
    if (imageFile) {
      setUploadingImage(true);
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('property_images').upload(filePath, imageFile);
      
      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('property_images').getPublicUrl(filePath);
        image_raw_url = publicUrl;
      } else {
        alert("Erro ao fazer upload da imagem.");
      }
      setUploadingImage(false);
    }

    // 2. Salvar dados no banco
    const newProperty = {
      owner_id: user.id,
      title,
      address,
      description,
      rent_price: parseFloat(rentPrice),
      fit_out_budget: parseFloat(fitOutBudget) || 0,
      status,
      image_raw_url // Nova coluna da Fase 2
    };

    const { error } = await supabase.from('properties').insert([newProperty]);
    
    if (!error) {
      setIsAdding(false);
      // Reset Form
      setTitle(''); setAddress(''); setDescription(''); setRentPrice(''); setFitOutBudget(''); setStatus('raw_contrapiso'); setImageFile(null);
      // Refresh List
      fetchProperties(user.id);
    } else {
      alert("Erro ao salvar imóvel: " + error.message);
    }
    setLoading(false);
  };

  if (loading && !user) {
    return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-brand-500">Carregando painel...</div>;
  }

  const role = user?.user_metadata?.role || 'tenant';
  const isOwnerOrBroker = role === 'owner' || role === 'broker';

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 pb-20">
      <nav className="glass border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-brand-500" />
          <span className="font-bold text-lg hidden sm:inline">TailorSpace Dashboard</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">{user?.user_metadata?.full_name || user?.email}</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel {role === 'owner' ? 'do Proprietário' : role === 'tenant' ? 'do Inquilino' : role === 'broker' ? 'do Corretor' : 'de Parceiros'}, {user?.user_metadata?.full_name?.split(' ')[0]}!</h1>
            <p className="text-slate-400">Gerencie seus ativos, locações e orçamentos do Fit-to-Suit.</p>
          </div>
          
          {isOwnerOrBroker && !isAdding && (
            <button onClick={() => setIsAdding(true)} className="flex items-center justify-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/25">
              <Plus className="w-5 h-5" /> Cadastrar Novo Imóvel
            </button>
          )}
        </header>

        {isAdding && isOwnerOrBroker && (
          <div className="glass p-8 rounded-3xl border border-white/10 mb-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h2 className="text-2xl font-bold flex items-center gap-2"><Sparkles className="w-6 h-6 text-brand-500"/> Anunciar Imóvel (Fit-to-Suit)</h2>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-white">Cancelar</button>
            </div>
            
            <form onSubmit={handleAddProperty} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Título do Anúncio</label>
                  <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-dark-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Ex: Laje Corporativa 500m² - Pinheiros" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Status do Imóvel</label>
                  <select value={status} onChange={e => setStatus(e.target.value)} className="w-full bg-dark-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all">
                    <option value="raw_contrapiso">Cru / No Contrapiso (Ideal para FTS Total)</option>
                    <option value="needs_furniture">Pintado / Sem Mobília (Precisa de IA)</option>
                    <option value="ready_to_move">Mobiliado / Pronto para morar</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Endereço Completo</label>
                <input type="text" required value={address} onChange={e => setAddress(e.target.value)} className="w-full bg-dark-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Av. Brigadeiro Faria Lima, São Paulo - SP" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Descrição</label>
                <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-dark-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Apartamento de 2 quartos incrível esperando customização de locatário." />
              </div>

              <div className="grid md:grid-cols-2 gap-6 pb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Valor do Aluguel Fixo (R$)</label>
                  <input type="number" required min="0" value={rentPrice} onChange={e => setRentPrice(e.target.value)} className="w-full bg-dark-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="5000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Orçamento Liberado para Obra/FTS (R$)</label>
                  <input type="number" min="0" value={fitOutBudget} onChange={e => setFitOutBudget(e.target.value)} className="w-full bg-dark-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="O quanto você aceita abater/investir na marcenaria?" />
                </div>
              </div>

              <div className="pb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand-400"/> Foto Real (Cru/Bagunçado)</label>
                <p className="text-xs text-slate-500 mb-2">Faça o upload da foto do contrapiso ou da mobília antiga. Usaremos ela na nossa ferramenta Master Key para gerar a simulação com Inteligência Artificial depois!</p>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => e.target.files && setImageFile(e.target.files[0])} 
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-500 file:text-white hover:file:bg-brand-600 border border-slate-700 rounded-xl p-2 bg-dark-800 text-slate-300 cursor-pointer" 
                />
              </div>
              
              <div className="border-t border-slate-700 pt-6 flex justify-end">
                <button type="submit" disabled={loading || uploadingImage} className="bg-brand-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-600 transition-colors disabled:opacity-50">
                  {loading || uploadingImage ? 'Processando & Salvando...' : 'Publicar no Marketplace'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Home className="w-6 h-6 text-brand-500" />
            <h2 className="text-2xl font-bold">Meus Imóveis</h2>
          </div>
          
          {properties.length === 0 ? (
            <div className="glass p-10 text-center rounded-2xl border border-white/5 opacity-70">
              <p className="text-slate-400 mb-2">Você ainda não possui imóveis associados ao seu perfil.</p>
              {isOwnerOrBroker && <p className="text-brand-400 font-medium cursor-pointer hover:underline" onClick={() => setIsAdding(true)}>Clique em "Cadastrar Novo Imóvel" para começar a receber lances de locatários e arquitetos!</p>}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(prop => (
                <div key={prop.id} className="glass rounded-2xl overflow-hidden hover:border-brand-500/50 transition-colors flex flex-col h-full border border-white/10 group">
                  <div className="h-48 bg-dark-800 relative flex items-center justify-center overflow-hidden">
                     {/* Imagem Real do Storage ou Placeholder */}
                     <div 
                        className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity" 
                        style={{ backgroundImage: `url('${prop.image_raw_url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}')` }}
                     />
                     <div className="absolute top-4 right-4 bg-brand-900 border border-brand-500 text-brand-400 text-xs font-bold px-3 py-1 rounded-full uppercase truncate max-w-[150px]">
                       {prop.status.replace('_', ' ')}
                     </div>
                     <button className="absolute bottom-4 right-4 glass z-10 px-4 py-2 rounded-full text-xs font-bold text-white shadow-xl flex items-center gap-2 hover:bg-brand-500 transition-colors backdrop-blur-md border border-white/20">
                       <Sparkles className="w-3 h-3 text-brand-400"/> IA Render Inativo
                     </button>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{prop.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">{prop.address}</p>
                    <div className="mt-auto border-t border-white/10 pt-4 flex justify-between items-end">
                       <div>
                         <p className="text-xs text-slate-500 font-medium">Aluguel Base</p>
                         <p className="font-bold text-xl text-brand-400">R$ {prop.rent_price.toLocaleString('pt-BR')}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-xs text-slate-500 font-medium">Orçamento Obra</p>
                         <p className="font-bold text-lg text-emerald-400">R$ {prop.fit_out_budget?.toLocaleString('pt-BR') || '0'}</p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Futuro Módulo Match */}
        <div className="glass p-6 rounded-2xl opacity-50 border border-white/5 mt-10">
          <h3 className="font-bold mb-2">Matches / Projetos de Customização ativos</h3>
          <p className="text-slate-500 text-sm">Nesta área aparecerão os locatários que aceitaram locar os seus imóveis mediante um projeto *Fit-to-Suit*. A Bridge e os Lojistas financiarão as simulações IA por aqui.</p>
        </div>
      </main>
    </div>
  );
}
