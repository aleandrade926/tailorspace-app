import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogOut, Building2, User, Plus, Home, Sparkles, MapPin, Handshake } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // States do Proprietario
  const [properties, setProperties] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  
  // States do Inquilino (A Vitrine)
  const [marketProperties, setMarketProperties] = useState<any[]>([]);

  // Form State
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [fitOutBudget, setFitOutBudget] = useState('');
  const [status, setStatus] = useState('raw_contrapiso');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch functions
  const fetchOwnerProperties = async (userId: string) => {
    const { data } = await supabase.from('properties').select('*').eq('owner_id', userId).order('created_at', { ascending: false });
    if (data) setProperties(data);
  };

  const fetchMarketProperties = async () => {
    const { data } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
    if (data) setMarketProperties(data);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        const userRole = session.user.user_metadata?.role;
        if (userRole === 'owner' || userRole === 'broker') {
          fetchOwnerProperties(session.user.id);
        } else {
          fetchMarketProperties();
        }
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/auth');
      else {
        setUser(session.user);
        const userRole = session.user.user_metadata?.role;
        if (userRole === 'owner' || userRole === 'broker') {
          fetchOwnerProperties(session.user.id);
        } else {
          fetchMarketProperties();
        }
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

    if (imageFile) {
      setUploadingImage(true);
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('property_images').upload(filePath, imageFile);
      
      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('property_images').getPublicUrl(filePath);
        image_raw_url = publicUrl;
      }
      setUploadingImage(false);
    }

    const newProperty = {
      owner_id: user.id,
      title,
      address,
      description,
      rent_price: parseFloat(rentPrice),
      fit_out_budget: parseFloat(fitOutBudget) || 0,
      status,
      image_raw_url
    };

    const { error } = await supabase.from('properties').insert([newProperty]);
    
    if (!error) {
      setIsAdding(false);
      setTitle(''); setAddress(''); setDescription(''); setRentPrice(''); setFitOutBudget(''); setStatus('raw_contrapiso'); setImageFile(null);
      fetchOwnerProperties(user.id);
    } else {
      alert("Erro ao salvar imóvel: " + error.message);
    }
    setLoading(false);
  };

  const handleInterest = async (propertyId: string) => {
    const confirmation = window.confirm("Você tem interesse neste imóvel? Se confirmar, a TailorSpace será notificada para criar uma simulação FTS exclusiva para você com o proprietário!");
    if (!confirmation) return;

    const match = {
      property_id: propertyId,
      tenant_id: user.id,
      status: 'negotiating'
    };

    const { error } = await supabase.from('matches_contracts').insert([match]);
    
    if (!error) {
      alert("🎉 Genial! O seu interesse (Match) foi registrado! Nossa equipe entrará em contato rápido para montarmos o projeto da mobília.");
    } else {
      alert("Ocorreu um erro ao enviar interesse: " + error.message);
    }
  };

  if (loading && !user) {
    return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-brand-500">Carregando painel...</div>;
  }

  const role: string = user?.user_metadata?.role || 'tenant';
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
            <span className="bg-brand-500/20 text-brand-400 font-bold px-2 py-0.5 rounded text-xs uppercase ml-2">{role}</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel de Negócios, {user?.user_metadata?.full_name?.split(' ')[0]}!</h1>
            {isOwnerOrBroker ? (
              <p className="text-slate-400">Gerencie seus ativos, locações e orçamentos do Fit-to-Suit.</p>
            ) : (
              <p className="text-brand-400 font-medium text-lg">Escolha uma laje crua. Nós entregamos mobiliada. Zero dor de cabeça.</p>
            )}
          </div>
          
          {isOwnerOrBroker && !isAdding && (
            <button onClick={() => setIsAdding(true)} className="flex items-center justify-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/25">
              <Plus className="w-5 h-5" /> Cadastrar Novo Imóvel
            </button>
          )}
        </header>

        {/* --- OWNER VIEW: ADD PROPERTY FORM --- */}
        {isAdding && isOwnerOrBroker && (
          <div className="glass p-8 rounded-3xl border border-white/10 mb-10 shadow-2xl relative overflow-hidden">
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
                <div className="mt-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input type="text" required value={address} onChange={e => setAddress(e.target.value)} className="w-full pl-10 bg-dark-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Av. Brigadeiro Faria Lima, São Paulo - SP" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Descrição Comercial</label>
                <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-dark-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Espaço cru incrível esperando customização corporativa ou residencial FTS." />
              </div>

              <div className="grid md:grid-cols-2 gap-6 pb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Valor do Aluguel Fixo (R$)</label>
                  <input type="number" required min="0" value={rentPrice} onChange={e => setRentPrice(e.target.value)} className="w-full bg-dark-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="5000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Budget Liberado p/ Decorador FTS (R$)</label>
                  <input type="number" min="0" value={fitOutBudget} onChange={e => setFitOutBudget(e.target.value)} className="w-full bg-dark-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Desconto ou aporte máximo na marcenaria" />
                </div>
              </div>

              <div className="pb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand-400"/> Imagem do Ambiente Cru</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => e.target.files && setImageFile(e.target.files[0])} 
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-brand-500 file:text-white hover:file:bg-brand-600 border border-slate-700 rounded-xl p-2 bg-dark-800 text-slate-300 cursor-pointer" 
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

        {/* --- COMMON VIEW: LIST OF PROPERTIES --- */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Home className="w-6 h-6 text-brand-500" />
            <h2 className="text-2xl font-bold">{isOwnerOrBroker ? 'Meus Imóveis' : 'Vitrine de Imóveis (Oportunidades)'}</h2>
          </div>
          
          {isOwnerOrBroker ? (
            // OWNER/BROKER VIEW = properties array
            properties.length === 0 ? (
              <div className="glass p-10 text-center rounded-2xl border border-white/5 opacity-70">
                <p className="text-slate-400 mb-2">Você ainda não possui imóveis associados ao seu perfil.</p>
                <p className="text-brand-400 font-medium cursor-pointer hover:underline" onClick={() => setIsAdding(true)}>Clique em "Cadastrar Novo Imóvel" para começar a receber lances de locatários e arquitetos!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map(prop => <PropertyCard key={prop.id} prop={prop} isOwner={true} onInterest={handleInterest} />)}
              </div>
            )
          ) : (
            // TENANT VIEW = marketProperties array
            marketProperties.length === 0 ? (
               <div className="glass p-10 text-center rounded-2xl border border-white/5 opacity-70">
                  <p className="text-slate-400">O Marketplace ainda não possui imóveis públicos disponíveis. Aguarde anúncios dos proprietários!</p>
               </div>
            ) : (
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {marketProperties.map(prop => <PropertyCard key={prop.id} prop={prop} isOwner={false} onInterest={handleInterest} />)}
               </div>
            )
          )}
        </div>
        
      </main>
    </div>
  );
}

// Subcomponente isolado para o Card de Imóvel
function PropertyCard({ prop, isOwner, onInterest }: { prop: any, isOwner: boolean, onInterest: (id: string) => void }) {
  return (
    <div className="glass rounded-2xl overflow-hidden hover:border-brand-500/50 transition-colors flex flex-col h-full border border-white/10 group shadow-2xl bg-dark-800">
      <div className="h-56 bg-dark-900 relative flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
            style={{ backgroundImage: `url('${prop.image_raw_url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-90" />
          
          <div className="absolute top-4 right-4 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-lg">
            {prop.status.replace('_', ' ')}
          </div>
          
          <div className="absolute bottom-4 right-4 z-10 glass px-4 py-2 rounded-full text-xs font-bold text-white shadow-xl flex items-center gap-2 backdrop-blur-md border border-white/20">
            <Sparkles className="w-3 h-3 text-brand-400"/> IA Render (Em breve)
          </div>
      </div>
      <div className="p-6 flex-1 flex flex-col relative z-10 bg-dark-800/80">
        <h3 className="font-bold text-xl mb-1 line-clamp-1 text-white">{prop.title}</h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1"><MapPin className="w-3 h-3 inline mr-1 text-slate-500"/>{prop.address}</p>
        
        <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-xs text-slate-500 font-medium">Aluguel Fixo</p>
              <p className="font-bold text-2xl text-brand-400">R$ {prop.rent_price.toLocaleString('pt-BR')}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 font-medium">FTS Budget</p>
              <p className="font-bold text-lg text-emerald-400">R$ {prop.fit_out_budget?.toLocaleString('pt-BR') || '0'}</p>
            </div>
        </div>

        {!isOwner && (
          <button onClick={() => onInterest(prop.id)} className="w-full bg-white text-dark-900 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-lg flex items-center justify-center gap-2">
            <Handshake className="w-5 h-5"/> Quero FTS Neste Imóvel!
          </button>
        )}
      </div>
    </div>
  );
}
