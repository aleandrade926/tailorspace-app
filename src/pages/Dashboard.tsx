import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Plus, Home, Sparkles, Handshake, Sofa, ShoppingBag, Banknote, Lock } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Navigation State (Imóveis vs Mobília)
  const [activeTab, setActiveTab] = useState<'properties' | 'furniture'>('properties');
  const [subscriptionPlan, setSubscriptionPlan] = useState('free');

  // --- Real Estate States ---
  const [properties, setProperties] = useState<any[]>([]);
  const [marketProperties, setMarketProperties] = useState<any[]>([]);
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [propTitle, setPropTitle] = useState('');
  const [propAddress, setPropAddress] = useState('');
  const [propDesc, setPropDesc] = useState('');
  const [propRent, setPropRent] = useState('');
  const [propBudget, setPropBudget] = useState('');
  const [propStatus, setPropStatus] = useState('raw_contrapiso');

  // --- Furniture States ---
  const [_furnitures, setFurnitures] = useState<any[]>([]);
  const [marketFurnitures, setMarketFurnitures] = useState<any[]>([]);
  const [isAddingFurniture, setIsAddingFurniture] = useState(false);
  const [furnTitle, setFurnTitle] = useState('');
  const [furnDesc, setFurnDesc] = useState('');
  const [furnCondition, setFurnCondition] = useState('used');
  const [furnPrice, setFurnPrice] = useState('');

  // Common File State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // --- Fetchers ---
  const fetchOwnerProperties = async (userId: string) => {
    const { data } = await supabase.from('properties').select('*').eq('owner_id', userId).order('created_at', { ascending: false });
    if (data) setProperties(data);
  };
  const fetchMarketProperties = async () => {
    const { data } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
    if (data) setMarketProperties(data);
  };
  
  const fetchOwnerFurnitures = async (userId: string) => {
    const { data } = await supabase.from('furniture').select('*').eq('supplier_id', userId).order('created_at', { ascending: false });
    if (data) setFurnitures(data);
  };
  const fetchMarketFurnitures = async () => {
    const { data } = await supabase.from('furniture').select('*').order('created_at', { ascending: false });
    if (data) setMarketFurnitures(data);
  };

  const loadAllData = async (sessionUser: any) => {
    // Buscar plano de assinatura
    const { data: profile } = await supabase.from('users').select('subscription_plan').eq('id', sessionUser.id).single();
    if (profile) setSubscriptionPlan(profile.subscription_plan || 'free');

    const r = sessionUser.user_metadata?.role;
    if (r === 'owner' || r === 'broker') {
      fetchOwnerProperties(sessionUser.id);
      fetchMarketFurnitures(); // Donos de imóveis veem vitrine de moveis!
    } else if (r === 'tenant') {
      fetchMarketProperties();
      fetchMarketFurnitures(); 
    } else if (r === 'supplier') {
      fetchOwnerFurnitures(sessionUser.id);
      fetchMarketProperties();
    } else {
      fetchOwnerProperties(sessionUser.id);
      fetchOwnerFurnitures(sessionUser.id);
      fetchMarketProperties();
      fetchMarketFurnitures();
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate('/auth'); } 
      else { setUser(session.user); loadAllData(session.user); }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/auth');
      else { setUser(session.user); loadAllData(session.user); }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const uploadImageToBucket = async (): Promise<string | null> => {
    if (!imageFile || !user) return null;
    setUploadingImage(true);
    const fileExt = imageFile.name.split('.').pop();
    const filePath = `${user.id}/${Math.random()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('property_images').upload(filePath, imageFile); // Usando o mesmo bucket pra Movel
    setUploadingImage(false);
    
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage.from('property_images').getPublicUrl(filePath);
      return publicUrl;
    }
    alert("Erro ao enviar a imagem.");
    return null;
  };

  // --- Handlers Property ---
  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault(); if (!user) return; setLoading(true);
    const image_raw_url = await uploadImageToBucket();
    const obj = { owner_id: user.id, title: propTitle, address: propAddress, description: propDesc, rent_price: parseFloat(propRent), fit_out_budget: parseFloat(propBudget) || 0, status: propStatus, image_raw_url };
    const { error } = await supabase.from('properties').insert([obj]);
    
    if (!error) {
      setIsAddingProperty(false);
      setPropTitle(''); setPropAddress(''); setPropDesc(''); setPropRent(''); setPropBudget(''); setPropStatus('raw_contrapiso'); setImageFile(null);
      fetchOwnerProperties(user.id);
    } else alert("Erro: " + error.message);
    setLoading(false);
  };

  const handlePropertyInterest = async (id: string) => {
    if (!window.confirm("Confirmar interesse na Laje/Imóvel para FTS?")) return;
    const { error } = await supabase.from('matches_contracts').insert([{ property_id: id, tenant_id: user.id, status: 'negotiating' }]);
    if (!error) alert("Lead Imobiliário (Match) Gravado com Sucesso!");
  };

  // --- Handlers Furniture ---
  const handleAddFurniture = async (e: React.FormEvent) => {
    e.preventDefault(); if (!user) return; setLoading(true);
    const image_raw_url = await uploadImageToBucket();
    const obj = { supplier_id: user.id, title: furnTitle, description: furnDesc, condition: furnCondition, full_price: parseFloat(furnPrice), image_raw_url };
    const { error } = await supabase.from('furniture').insert([obj]);
    
    if (!error) {
      setIsAddingFurniture(false);
      setFurnTitle(''); setFurnDesc(''); setFurnCondition('used'); setFurnPrice(''); setImageFile(null);
      fetchOwnerFurnitures(user.id);
    } else alert("Erro: " + error.message);
    setLoading(false);
  };

  const handleFurnitureInterest = async (id: string) => {
    if (!window.confirm("Gerar interesse técnico parar incluir este Móvel no FTS/Carência do seu pacote?")) return;
    const { error } = await supabase.from('furniture_interests').insert([{ furniture_id: id, interested_user_id: user.id }]);
    if (!error) alert("Lead de Mobília Gravado! A TailorSpace vai costurar isso no contrato de comodato/carência!");
    else alert("Algo falhou: " + error.message);
  };


  if (loading && !user) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-brand-500">Carregando painel...</div>;

  const role = user?.user_metadata?.role || 'tenant';
  const isOwner = role === 'owner' || role === 'broker';

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 pb-20">
      <nav className="glass border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Tailorspace" className="w-8 h-8 object-contain" />
          <span className="font-bold text-lg hidden sm:inline">TailorSpace FTS Hub</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex bg-dark-800 rounded-full p-1 border border-white/5 shadow-inner">
            <button onClick={() => setActiveTab('properties')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${activeTab === 'properties' ? 'bg-brand-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>🏢 Real Estate</button>
            <button onClick={() => setActiveTab('furniture')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${activeTab === 'furniture' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>🛋️ Galeria de Móveis</button>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm border-l border-white/10 pl-6 hidden md:flex">
            <User className="w-4 h-4" />
            <span>{user?.user_metadata?.full_name || user?.email}</span>
            <span className="bg-brand-500/20 text-brand-400 font-bold px-2 py-0.5 rounded text-xs uppercase ml-2">{role}</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium"><LogOut className="w-4 h-4" /> Sair</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel de Negócios, {user?.user_metadata?.full_name?.split(' ')[0]}!</h1>
            {activeTab === 'properties' ? (
                <p className="text-slate-400">Hub do Mercado Imobiliário. Publique lajes cruas e conquiste seu Fit-to-Suit.</p>
            ) : (
                <p className="text-indigo-300">Mercado de Ativos Físicos. Use Peças como Moeda de Troca, Carência ou Comodato.</p>
            )}
          </div>
          
          {/* Action Buttons based on Role & Tab */}
          {activeTab === 'properties' && isOwner && !isAddingProperty && (
            <button onClick={() => setIsAddingProperty(true)} className="flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-600 shadow-lg shadow-brand-500/25"><Plus className="w-5 h-5"/> Lançar Imóvel</button>
          )}
          {activeTab === 'furniture' && !isAddingFurniture && (
            <button onClick={() => setIsAddingFurniture(true)} className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 shadow-lg shadow-indigo-500/25"><Plus className="w-5 h-5"/> Cadastrar Móvel Pessoal</button>
          )}
        </header>

        {/* -------------------- TAB: PROPERTIES -------------------- */}
        {activeTab === 'properties' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            {isAddingProperty && (
               <div className="glass p-8 rounded-3xl border border-white/10 mb-10 shadow-2xl relative"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold flex items-center gap-2"><Sparkles className="w-6 h-6 text-brand-500"/> Cadastrar Laje/Imóvel</h2><button onClick={() => setIsAddingProperty(false)} className="text-slate-400 hover:text-white">Cancelar</button></div>
                 <form onSubmit={handleAddProperty} className="space-y-6">
                   <div className="grid md:grid-cols-2 gap-4">
                     <div><label className="block text-sm text-slate-300 mb-1">Título</label><input required value={propTitle} onChange={e=>setPropTitle(e.target.value)} className="w-full bg-dark-800 border-none rounded-xl px-4 py-3 text-white" /></div>
                     <div><label className="block text-sm text-slate-300 mb-1">Status Base</label><select value={propStatus} onChange={e=>setPropStatus(e.target.value)} className="w-full bg-dark-800 border-none rounded-xl px-4 py-3 text-white"><option value="raw_contrapiso">Cru / Contrapiso</option><option value="needs_furniture">Sem Mobília</option></select></div>
                   </div>
                   <div><label className="block text-sm text-slate-300 mb-1">Endereço</label><input required value={propAddress} onChange={e=>setPropAddress(e.target.value)} className="w-full bg-dark-800 border-none rounded-xl px-4 py-3 text-white" /></div>
                   <div className="grid md:grid-cols-2 gap-4">
                     <div><label className="block text-sm text-slate-300 mb-1">Pedida Aluguel (R$)</label><input type="number" required value={propRent} onChange={e=>setPropRent(e.target.value)} className="w-full bg-dark-800 border-none rounded-xl px-4 py-3 text-white" /></div>
                     <div><label className="block text-sm text-slate-300 mb-1">Budget Orçamento FTS (R$)</label><input type="number" value={propBudget} onChange={e=>setPropBudget(e.target.value)} className="w-full bg-dark-800 border-none rounded-xl px-4 py-3 text-white" /></div>
                   </div>
                   <div><label className="block text-sm text-slate-300 mb-1">Foto da Laje</label><input type="file" accept="image/*" onChange={e=>e.target.files && setImageFile(e.target.files[0])} className="w-full p-2" /></div>
                   <div className="flex justify-end pt-4"><button type="submit" disabled={loading||uploadingImage} className="bg-brand-500 px-8 py-3 rounded-xl font-bold">Publicar Imóvel</button></div>
                 </form>
               </div>
            )}
            
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Home className="text-brand-500"/> {isOwner ? 'Meus Ativos Imobiliários' : 'Marketplace de Lajes'}</h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {(isOwner ? properties : marketProperties).map(prop => <PropertyCard key={prop.id} prop={prop} isOwner={isOwner} onInterest={handlePropertyInterest} plan={subscriptionPlan} />)}
            </div>
            {(isOwner ? properties : marketProperties).length === 0 && <p className="text-slate-500">Nenhum imóvel disponível aqui no momento.</p>}
          </div>
        )}

        {/* -------------------- TAB: FURNITURE -------------------- */}
        {activeTab === 'furniture' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            {isAddingFurniture && (
               <div className="glass p-8 rounded-3xl border border-indigo-500/30 mb-10 shadow-2xl relative"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-100"><Sofa className="w-6 h-6 text-indigo-500"/> Ofertar Mobília para Permuta/FTS</h2><button onClick={() => setIsAddingFurniture(false)} className="text-slate-400 hover:text-white">Cancelar</button></div>
                 <form onSubmit={handleAddFurniture} className="space-y-6">
                   <div className="grid md:grid-cols-2 gap-4">
                     <div><label className="block text-sm text-slate-300 mb-1">Que móvel é esse? (Ex: Rack Vintage de Madeira)</label><input required value={furnTitle} onChange={e=>setFurnTitle(e.target.value)} className="w-full bg-dark-800 border-none rounded-xl px-4 py-3 text-white" /></div>
                     <div><label className="block text-sm text-slate-300 mb-1">Condição Física</label><select value={furnCondition} onChange={e=>setFurnCondition(e.target.value)} className="w-full bg-dark-800 border-none rounded-xl px-4 py-3 text-white"><option value="new">Novo na Caixa</option><option value="used">Usado (Bom Estado)</option><option value="needs_repair">Móvel Velho (Aceito Comodato por Storage)</option></select></div>
                   </div>
                   <div><label className="block text-sm text-slate-300 mb-1">Descrição</label><input required value={furnDesc} onChange={e=>setFurnDesc(e.target.value)} className="w-full bg-dark-800 border-none rounded-xl px-4 py-3 text-white" /></div>
                   <div><label className="block text-sm text-indigo-300 mb-1">Qual o valor monetário estimado dessa peça? (Usado no desconto da Carência/HabitiCoins) R$</label><input type="number" required value={furnPrice} onChange={e=>setFurnPrice(e.target.value)} className="w-full bg-dark-800 border-indigo-500/50 focus:ring-indigo-500 rounded-xl px-4 py-3 text-white" /></div>
                   <div><label className="block text-sm text-slate-300 mb-1">Foto Real da Peça</label><input type="file" accept="image/*" onChange={e=>e.target.files && setImageFile(e.target.files[0])} className="w-full p-2" /></div>
                   <div className="flex justify-end pt-4"><button type="submit" disabled={loading||uploadingImage} className="bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/20">Registrar Peça no Motor de Match</button></div>
                 </form>
               </div>
            )}
            
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><ShoppingBag className="text-indigo-500"/> Peças Avulsas do Ecossistema</h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {marketFurnitures.map(furn => <FurnitureCard key={furn.id} furn={furn} isOwner={furn.supplier_id === user.id} onInterest={handleFurnitureInterest} plan={subscriptionPlan} />)}
            </div>
            {marketFurnitures.length === 0 && <p className="text-slate-500">Ainda não há móveis de terceiros disponíveis para anexar em locações.</p>}
          </div>
        )}
      </main>

      {/* Footer Social */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <a href="https://www.instagram.com/tailorspaceftsoficial/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-brand-500"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> @tailorspaceftsoficial
          </a>
          <a href="https://www.facebook.com/tailorspaceftsoficial" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-brand-500"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> TailorSpace - Fit to Suit Brasil
          </a>
        </div>
        <p className="text-slate-600 text-xs mt-8">Painel Exclusivo | Operação FTS © 2026</p>
      </footer>
    </div>
  );
}

// Subcomponente Real Estate
function PropertyCard({ prop, isOwner, onInterest, plan }: { prop: any, isOwner: boolean, onInterest: (id: string) => void, plan?: string }) {
  const isFree = plan === 'free';
  return (
    <div className="glass rounded-2xl overflow-hidden hover:border-brand-500/50 flex flex-col border border-white/10 group bg-dark-800 relative">
      <div className="h-48 bg-dark-900 relative"><div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105" style={{ backgroundImage: `url('${prop.image_raw_url}')` }}/><div className="absolute inset-0 bg-gradient-to-t from-dark-900 opacity-90" /><div className="absolute top-4 right-4 bg-brand-500 text-xs font-bold px-3 py-1 rounded-full">{prop.status}</div></div>
      <div className="p-5 relative z-10 flex-1 flex flex-col">
        <h3 className="font-bold text-lg line-clamp-1">{prop.title}</h3>
        <Flex justify="between" className="mt-4 border-t border-white/10 pt-4"><div className="text-brand-400 font-bold text-xl">R$ {prop.rent_price}</div><div className="text-emerald-400 font-bold text-sm">+ Orçamento Livre</div></Flex>
        {!isOwner && (
          isFree ? (
            <a href="/pricing" className="w-full mt-4 bg-white/10 text-slate-300 py-2 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-white/20 transition-all"><Lock className="w-4 h-4"/> Upgrade para Match</a>
          ) : (
            <button onClick={() => onInterest(prop.id)} className="w-full mt-4 bg-white text-dark-900 py-2 rounded-xl font-bold flex justify-center gap-2 hover:bg-slate-200 transition-all"><Handshake className="w-4 h-4"/> Quero FTS Neste Imóvel!</button>
          )
        )}
      </div>
    </div>
  );
}

// Subcomponente Furniture
function FurnitureCard({ furn, isOwner, onInterest, plan }: { furn: any, isOwner: boolean, onInterest: (id: string) => void, plan?: string }) {
  const isFree = plan === 'free';
  return (
    <div className="glass rounded-2xl overflow-hidden shadow-2xl hover:border-indigo-500/50 flex flex-col border border-indigo-500/10 group bg-dark-800">
      <div className="h-48 bg-dark-900 relative"><div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105" style={{ backgroundImage: `url('${furn.image_raw_url}')` }}/><div className="absolute top-4 left-4 bg-indigo-900 border border-indigo-500 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full">{furn.condition}</div></div>
      <div className="p-4 relative z-10 flex-1 flex flex-col">
        <h3 className="font-bold text-md text-white line-clamp-1 mb-1">{furn.title}</h3>
        <p className="text-xs text-slate-400 line-clamp-2 min-h-[32px]">{furn.description}</p>
        <Flex justify="between" className="mt-auto border-t border-white/10 pt-3 items-center">
            <div className="text-[10px] text-slate-500 leading-tight">Valor Equivalente<br/>p/ Carência:</div>
            <div className="text-indigo-400 font-bold text-lg"><Banknote className="w-4 h-4 inline mr-1 opacity-70"/>{furn.full_price}</div>
        </Flex>
        {!isOwner && (
          isFree ? (
            <a href="/pricing" className="w-full mt-3 bg-indigo-500/10 hover:bg-indigo-500/30 text-indigo-300/50 border border-indigo-500/20 py-2 rounded-lg text-sm font-bold flex justify-center items-center gap-2 transition-all"><Lock className="w-3 h-3"/> Plano Premium</a>
          ) : (
            <button onClick={() => onInterest(furn.id)} className="w-full mt-3 bg-indigo-500/20 hover:bg-indigo-500 hover:text-white text-indigo-300 border border-indigo-500/50 py-2 rounded-lg text-sm font-bold transition-all">Demonstrar Interesse</button>
          )
        )}
      </div>
    </div>
  );
}

const Flex = ({children, className, justify}: any) => <div className={`flex items-center justify-${justify} ${className}`}>{children}</div>;
