import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('tenant');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isForgotPassword) {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/auth',
        });
        if (resetError) throw resetError;
        setMessage('Enviamos um link de recuperação para o seu e-mail! Verifique sua caixa de entrada.');
        setIsForgotPassword(false);
      } else if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (signInError) throw signInError;
        navigate('/dashboard');
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: role
            }
          }
        });
        if (signUpError) throw signUpError;
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao processar sua autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/20 rounded-full blur-[100px] pointer-events-none" />

      <Link to="/" className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors z-10">
        <ArrowLeft className="w-5 h-5" /> Voltar para o Site
      </Link>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-center">
          <Building2 className="w-12 h-12 text-brand-500" />
        </motion.div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {isForgotPassword ? 'Recuperar Senha' : isLogin ? 'Acesse o seu Portal' : 'Crie sua conta TailorSpace'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          {isForgotPassword ? 'Digite seu e-mail corporativo abaixo para receber o link.' : 'O principal hub de propriedades Fit-to-Suit do Brasil.'}
        </p>
      </div>

      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border border-white/10">
          
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-xl text-sm">
              {message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleAuth}>
            {!isLogin && !isForgotPassword && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Nome Completo</label>
                  <div className="mt-1 relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-dark-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 sm:text-sm" placeholder="Alexandre Santos" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300">Meu Perfil</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-3 border border-slate-700 bg-dark-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 sm:text-sm">
                    <option value="tenant">Buscar um Imóvel Customizado (Inquilino)</option>
                    <option value="owner">Tenho Imóvel para FTS (Proprietário)</option>
                    <option value="supplier">Sou Fornecedor (Móveis/Obras)</option>
                    <option value="broker">Sou Corretor (Broker)</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300">E-mail Corporativo ou Pessoal</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-dark-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 sm:text-sm" placeholder="exemplo@empresa.com.br" />
              </div>
            </div>

            {!isForgotPassword && (
              <div>
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-slate-300">Senha Segura</label>
                  {isLogin && (
                    <button type="button" onClick={() => setIsForgotPassword(true)} className="text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors">
                      Esqueceu a senha?
                    </button>
                  )}
                </div>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-dark-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 sm:text-sm" placeholder="••••••••" />
                </div>
              </div>
            )}

            <div>
              <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 transition-all">
                {loading ? 'Processando...' : isForgotPassword ? 'Enviar Link de Recuperação' : isLogin ? 'Entrar na Plataforma' : 'Criar Conta Gratuita'}
              </button>
            </div>
          </form>

          <footer className="mt-auto py-8 text-center relative z-10">
            <div className="flex items-center justify-center gap-6 mb-4">
              <a href="https://www.instagram.com/tailorspaceftsoficial/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> @tailorspaceftsoficial
              </a>
              <a href="https://www.facebook.com/tailorspaceftsoficial" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> Facebook
              </a>
            </div>
          </footer>

          <div className="mt-6 text-center space-y-2">
            {isForgotPassword ? (
              <button type="button" onClick={() => setIsForgotPassword(false)} className="text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors">
                Lembrou a senha? Voltar para o Login
              </button>
            ) : (
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors">
                {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já possui conta? Faça login'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
