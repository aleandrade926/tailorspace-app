import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogOut, Building2, User } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/auth');
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-brand-500">Carregando painel...</div>;
  }

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100">
      <nav className="glass border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-brand-500" />
          <span className="font-bold text-lg">TailorSpace Dashboard</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <User className="w-4 h-4" />
            {user?.user_metadata?.full_name || user?.email}
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo(a) ao seu Painel, {user?.user_metadata?.full_name?.split(' ')[0] || 'Usuário'}!</h1>
          <p className="text-slate-400">Aqui é onde a mágica do Fit to Suit vai acontecer.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-2xl border-l-4 border-brand-500">
            <h3 className="font-bold mb-2 text-lg">Seu Perfil</h3>
            <p className="text-slate-400 text-sm mb-4">Você está logado como: <span className="text-brand-400 uppercase font-bold">{user?.user_metadata?.role || 'Inquilino'}</span></p>
            <div className="text-xs text-slate-500 break-all">{user?.email}</div>
          </div>
          
          <div className="glass p-6 rounded-2xl opacity-50 border border-white/5 cursor-not-allowed">
            <h3 className="font-bold mb-2">Meus Imóveis</h3>
            <p className="text-slate-500 text-sm">Módulo em construção na Fase 2.</p>
          </div>

          <div className="glass p-6 rounded-2xl opacity-50 border border-white/5 cursor-not-allowed">
            <h3 className="font-bold mb-2">Matches / Contratos</h3>
            <p className="text-slate-500 text-sm">Módulo em construção na Fase 2.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
