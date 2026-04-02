import React, { useState } from 'react';
import { 
  Building2, 
  ArrowRight, 
  Map, 
  Coins, 
  Rocket, 
  Users, 
  TrendingUp, 
  CheckCircle2,
  CalendarDays,
  PlayCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function BrokerClassPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setLoading(true);
    setFormError(null);
    const { error } = await supabase
      .from('leads')
      .insert([{ name: name.trim(), email: email.trim().toLowerCase(), source: 'aulas' }]);
    setLoading(false);
    if (error) {
      setFormError('Erro ao salvar. Tente novamente.');
      console.error('Supabase error:', error);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 font-sans selection:bg-brand-500/30">
      {/* Navbar Minimal*/ }
      <nav className="fixed w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
            <Building2 className="w-7 h-7 md:w-8 md:h-8 text-brand-500 group-hover:text-brand-400 transition-colors shrink-0" />
            <span className="text-lg md:text-xl font-bold tracking-tight text-white">
              Tailor<span className="text-brand-500 group-hover:text-brand-400 transition-colors">Space</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-400">
            <CalendarDays className="w-4 h-4 text-brand-500 shrink-0" />
            <span>Toda Quinta-Feira, ao vivo.</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(5,150,105,0.05),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 md:py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6 mt-4 md:mt-6 lg:mt-0">
              <PlayCircle className="w-4 h-4 shrink-0" />
              Aula Oculta | Método Fit-to-Suit
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 mt-2 md:mt-0">
              A Nova Profissão: Gere <span className="text-gradient">R$ 5.000 em 30 Dias</span> Conectando Imóveis Vazios.
            </h1>
            <p className="text-base md:text-lg text-slate-400 mb-8 leading-relaxed max-w-xl">
              Descubra o método estratégico e jurídico para lucrar alto transformando Studios no contrapiso em ativos mobiliados premium, usando o seu celular e <strong className="text-slate-200">zero investimento inicial</strong>.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-slate-500 font-medium">
              <div className="flex -space-x-3 shrink-0">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-dark-900 bg-slate-700" />
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-dark-900 bg-slate-600" />
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-dark-900 bg-slate-500" />
              </div>
              <span>Junte-se a dezenas de Novos Brokers.</span>
            </div>
          </div>

          {/* Form */}
          <div className="glass p-6 sm:p-8 md:p-10 rounded-3xl border-white/10 shadow-2xl relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto mt-8 lg:mt-0">
            {!submitted ? (
              <>
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Garanta seu Link de Acesso</h3>
                  <p className="text-slate-400 text-sm">A aula será na <strong>próxima quinta-feira</strong>. O replay sai do ar em 7 dias cravados e vai direto para a comunidade paga.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="name">Seu Primeiro Nome</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-dark-800 border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all"
                      placeholder="Ex: Alexandre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="email">Seu Melhor E-mail</label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-dark-800 border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all"
                      placeholder="seu.email@dominio.com.br"
                    />
                  </div>
                  {formError && (
                    <p className="text-red-400 text-sm text-center">{formError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 text-lg"
                  >
                    {loading ? 'Salvando...' : <>Quero Minha Vaga na Aula <ArrowRight className="w-5 h-5" /></>}
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Fique tranquilo, não enviamos SPAM.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-6 animation-fade-in">
                <div className="w-16 h-16 bg-brand-500/20 text-brand-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Pré-inscrição Completa!</h3>
                <p className="text-slate-300 mb-8 leading-relaxed text-sm">
                  O link VIP da Aula Ao Vivo será enviado no seu WhatsApp e também no grupo silencioso de avisos (Onde soltamos o material extra).
                </p>
                <div className="p-4 bg-dark-800 rounded-2xl border border-brand-500/20 mb-6">
                  <p className="font-bold text-white mb-1">Passo Único e Final:</p>
                  <p className="text-slate-400 text-xs">Entre no grupo V.I.P abaixo para não perder o link da sala.</p>
                </div>
                {/* O user pode trocar pelo link real do grupo do Whatsapp */}
                <a href="https://chat.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-[#25D366]/25 flex items-center justify-center gap-2 text-lg">
                  Entrar no Grupo de Avisos
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dores */}
      <section className="py-16 md:py-20 bg-dark-800/50 border-y border-white/5 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8">Por que o mercado tradicional está morto?</h2>
          <div className="text-base md:text-lg text-slate-300 leading-relaxed space-y-4">
            <p>
              Corretores imobiliários disputam migalhas, rezando para fechar vendas demoradas de 6 meses a 1 ano de imóveis velhos.
            </p>
            <p>
              O abismo digital: <strong>Milhares de Studios "crus" apodrecem no contrapiso</strong> perdendo rios de dinheiro em condomínio pago atoa. Ao mesmo tempo, fornecedores de mobília arquivam móveis premium em galpões industriais frios sem encontrar inquilinos bons pagadores.
            </p>
            <p className="text-brand-400 font-bold text-xl mt-6">
              Você será a ponte que falta. O mercado imobiliário tem um gap lucrativo gigante.
            </p>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-16 md:py-24 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">O Método "Broker": 3 Frentes de Dinheiro</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg hover:text-white transition-colors">
              O ecossistema TailorSpace ensina corretores e empreendedores autônomos a preencher essa lacuna perigosamente ociosa usando o seu tempo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-3xl border-white/5 hover:border-brand-500/30 transition-all group">
              <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Map className="w-7 h-7 text-brand-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">O Mapa do Tesouro</h3>
              <p className="text-slate-400 leading-relaxed">
                Aprenda a mapear imóveis "no osso" na sua cidade com proprietários aptos e abertos estruturalmente a abater aluguel no Instituto da Carência.
              </p>
            </div>

            <div className="glass p-8 rounded-3xl border-white/5 hover:border-brand-500/30 transition-all group">
              <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Coins className="w-7 h-7 text-brand-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">As 3 Linhas de Lucro</h3>
              <p className="text-slate-400 leading-relaxed">
                Não ganhe só na locação. Descubra como receber comissão paralela forte dos Fornecedores de Móveis Parceiros, Taxa Fixa de Consultoria e o Fechamento do Imóvel Cru.
              </p>
            </div>

            <div className="glass p-8 rounded-3xl border-white/5 hover:border-brand-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Aeronave de Lucro</div>
              <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="w-7 h-7 text-brand-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">O Sprint de 30 Dias</h3>
              <p className="text-slate-400 leading-relaxed">
                Nosso passo a passo semanal para assinar seu primeiro negócio imobiliário formatado como Corretor FTS (Mesmo que você não saiba marcenaria) e botar R$ 5k brutos no bolso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Para Quem é */}
      <section className="py-16 md:py-24 bg-dark-800/50 border-t border-white/5 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Quem ganha dinheiro nessa Aula?</h2>
            <p className="text-base md:text-lg text-slate-400 mb-8 md:mb-10">
              Desenhada cirurgicamente para separar curiosos de executores e parceiros estratégicos reais no ecossistema Real Estate da TailorSpace.
            </p>
            
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Corretores com Creci ou sem.</h4>
                  <p className="text-slate-400">Pessoas que odiaram ciclos gigantes de burocracia de financiamento federal (Caixa) de 10 meses e buscam liquidez e giro alto rápido.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Arquitetos de Bolso Vázio</h4>
                  <p className="text-slate-400">Projetistas que fazem Renders e Autocads perfeitos, mas não ganham absolutamente nenhuma recorrência com os móveis ou no comissionamento real sobre os Studios na ponta final do ciclo.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="glass p-6 sm:p-8 md:p-10 rounded-3xl border-brand-500/20 text-center ring-1 ring-brand-500/20 shadow-xl sm:shadow-2xl shadow-brand-500/10 mt-6 md:mt-0">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ação Exigida:</h3>
            <p className="text-sm md:text-base text-slate-300 mb-6 md:mb-8 leading-relaxed">
              O Fit-To-Suit para pequenos Studios nunca antes foi ensinado abertamente na prateleira gratuita do Brasil de locações. 
            </p>
            <p className="text-sm md:text-base text-brand-400 font-bold mb-6 md:mb-8">
              A aula NÃO VAI TER REPLAY aberto. Após 7 dias, subirá trancada diretamente para a área privativa da comunidade paga e o bonde online vai passar.
            </p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 md:py-4 px-4 md:px-6 rounded-xl transition-all shadow-xl shadow-brand-500/20 flex items-center justify-center gap-2 text-sm md:text-base">
              Voltar ao Topo e me Cadastrar <ArrowRight className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 md:py-10 px-4 border-t border-white/5 text-center text-xs md:text-sm text-slate-600 bg-dark-900">
        <p>Este sistema completo de captação faz parte do ecossistema educacional TailorSpace.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 my-6 md:my-4">
          <a href="https://www.instagram.com/tailorspaceftsoficial/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> @tailorspaceftsoficial
          </a>
          <a href="https://www.facebook.com/tailorspaceftsoficial" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> TailorSpace - Fit to Suit Brasil
          </a>
        </div>
        <p className="mt-2 text-[10px] md:text-xs opacity-50 px-2">Não temos relação com o Facebook / Grupo Meta. A rentabilidade é baseada em esforço comercial individual de locação real estate.</p>
      </footer>
    </div>
  );
}
