import React, { useState } from 'react';
import { 
  ArrowRight,
  ShieldCheck,
  Cpu,
  FileText,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function OwnerLandingPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [region, setRegion] = useState('');
  const [stage, setStage] = useState('');
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !whatsapp || !region || !stage) {
      setFormError('Por favor, preencha todos os campos para continuarmos.');
      return;
    }
    
    setLoading(true);
    setFormError(null);
    
    const { error } = await supabase
      .from('leads')
      .insert([{ 
        name: name.trim(), 
        email: email.trim().toLowerCase(), 
        whatsapp: whatsapp.trim(),
        region: region.trim(),
        stage: stage,
        source: 'proprietario_qualificado' 
      }]);
      
    setLoading(false);
    if (error) {
      setFormError('Ocorreu um erro técnico. Tente novamente.');
      console.error('Supabase error:', error);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 font-sans selection:bg-brand-500/30 pb-20">
      {/* Top Bar Minimalista */}
      <nav className="w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-white/5 py-6">
        <div className="max-w-4xl mx-auto px-4 md:px-6 flex justify-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Tailorspace" className="w-10 h-10 object-contain shrink-0" />
            <span className="text-xl font-bold tracking-tight text-white">
              Tailor<span className="text-brand-500">Space</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-12 md:pt-16 pb-12 px-4 md:px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center gap-2 py-1.5 px-4 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold mb-6 tracking-wide uppercase">
            <Lock className="w-3.5 h-3.5" /> Acesso Condicionado
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Destrave o Caixa do Seu Imóvel Parado Transformando <span className="text-gradient">CAPEX em OPEX</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Seu Studio ou Sala Comercial no contrapiso entregue "chave na mão" para o inquilino, sem você precisar derreter seu patrimônio com marcenaria pesada e projetos caros. 
          </p>

          {/* VSL Video */}
          <div className="w-full max-w-3xl mx-auto bg-dark-800 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative aspect-video mb-16">
            <iframe 
               width="100%" 
               height="100%" 
               src="https://www.youtube.com/embed/kfzVZal1Azs?rel=0&modestbranding=1" 
               title="Acesso Condicionado" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
               referrerPolicy="strict-origin-when-cross-origin" 
               allowFullScreen
               className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16 text-left border-y border-white/5 py-12">
            <div className="glass p-6 rounded-2xl">
              <FileText className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">Jurídico Blindado</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Operação arquitetada através do Instituto da Carência, garantindo zero risco trabalhista ou tributário indevido.</p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <Cpu className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">Operacional FTS</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Orquestramos projetos e equipe de marcenaria de ponta. A curva de tempo de adequação cai pela metade.</p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">Alta Liquidez</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Imóveis "no osso" encalham. Studios da TailorSpace têm fila de inquilinos premium já aprovados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Qualification Funnel */}
      <section className="px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="glass p-8 md:p-12 rounded-3xl border border-brand-500/20 shadow-2xl shadow-brand-500/10">
            {!submitted ? (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Teste de Compatibilidade Operacional</h2>
                  <p className="text-slate-400 text-sm">
                    Devido ao alto volume de parceiros, nós precisamos entender em qual fase está o seu ativo para liberar uma reunião estratégica de viabilidade com nossa equipe.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">Nome Completo</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-dark-800 border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-500/50 outline-none transition-all"
                        placeholder="Ex: João Silva"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">E-mail</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-dark-800 border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-500/50 outline-none transition-all"
                        placeholder="email@exemplo.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">WhatsApp</label>
                      <input 
                        type="tel" 
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full bg-dark-800 border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-500/50 outline-none transition-all"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">Bairro / Cidade do Imóvel</label>
                      <input 
                        type="text" 
                        required
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full bg-dark-800 border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-500/50 outline-none transition-all"
                        placeholder="Ex: Pinheiros, São Paulo"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="stage" className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">Qual a Fase Atual da Obra?</label>
                    <select 
                      id="stage"
                      title="Fase atual da obra"
                      required
                      value={stage}
                      onChange={(e) => setStage(e.target.value)}
                      className="w-full bg-dark-800 border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-500/50 outline-none transition-all appearance-none"
                    >
                      <option value="" disabled>Selecione uma opção...</option>
                      <option value="contrapiso">No contrapiso</option>
                      <option value="acabamento_sem_moveis">Com acabamento, mas sem móveis</option>
                      <option value="armarios_cozinha_banheiro">Com armários na cozinha e no banheiro</option>
                      <option value="retrofit">Imóvel Antigo precisando de Retrofit</option>
                    </select>
                  </div>
                  
                  {formError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium text-center">
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2 text-lg"
                  >
                    {loading ? 'Analisando...' : <>Analisar Perfil & Ver Agenda <ArrowRight className="w-5 h-5" /></>}
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Seus dados estão seguros. Não enviamos spam.
                  </p>
                </form>
              </>
            ) : (
              <div className="animation-fade-in text-center pt-4">
                <div className="w-16 h-16 bg-brand-500/20 text-brand-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Perfil Mapeado!</h3>
                <p className="text-slate-300 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
                  Temos total sinergia para transformar as despesas do seu ativo numa fonte premium de renda usando nosso ecossistema FTS. <strong>Selecione agora mesmo, abaixo, o melhor horário para nossa reunião de diagnóstico:</strong>
                </p>
                
                {/* Calendly Embed */}
                <div className="bg-dark-800 rounded-xl overflow-hidden border border-white/5 h-[600px] w-full relative mb-4">
                  {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                  <iframe 
                    src="https://calendly.com/tailorspace28/30min" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0"
                    title="Agende sua reunião TailorSpace"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <footer className="mt-20 pt-8 border-t border-white/5 text-center px-4">
        <p className="text-slate-600 text-xs">© 2026 TailorSpace. Operação Exclusiva de Aceleração de Ativos.</p>
        <p className="text-slate-700 text-[10px] mt-1">Este site não faz parte do Facebook. Disclaimer: Resultados variam conforme a região do imóvel.</p>
      </footer>
    </div>
  );
}
