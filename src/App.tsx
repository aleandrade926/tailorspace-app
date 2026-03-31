import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, ShieldCheck, Search, Cpu, Key, FileText, Quote } from 'lucide-react';

import AuthPage from './pages/Auth';
import DashboardPage from './pages/Dashboard';
import BrokerClassPage from './pages/BrokerClassPage';

function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 selection:bg-brand-500 selection:text-white pb-20">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-brand-500" />
            <span className="text-xl font-bold tracking-tight">TailorSpace</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#manifesto" className="hover:text-white transition-colors">O Manifesto</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">Como Funciona</a>
            <Link to="/pricing" className="hover:text-white transition-colors text-brand-400">Planos e Monetização</Link>
            <a href="https://www.instagram.com/tailorspaceftsoficial/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 text-slate-400 transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/tailorspaceftsoficial" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 text-slate-400 transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
          <Link to="/auth" className="bg-white text-dark-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">
            Acessar Plataforma
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20 text-sm font-medium mb-6">
              O 1º Marketplace de Fit-out, Mobília e Build-to-Suit do Brasil
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Não alugue o que existe.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400">
                Alugue feito sob medida.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Seu Studio ou Escritório mobiliado como você sempre sonhou, sem gastar com obra. Conectamos imóveis em contrapiso e retrofits vazios a moradores e startups. Reforma e mobília diluídas no seu aluguel.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth" className="w-full sm:w-auto px-8 py-4 bg-brand-500 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/25">
                Quero Alugar Sob Medida <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://calendly.com/tailorspace28/30min" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 glass text-white rounded-full font-bold hover:bg-white/10 transition-all border border-brand-500/30">
                Tenho Imóvel Vazio (Diagnóstico)
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capa Visual */}
      <section className="px-6 py-12 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer" onClick={() => window.open('/aulas', '_self')}>
            <img
              src="/capa-site.png"
              alt="Conectamos Imóveis Vazios a Quem Quer Morar Sob Medida — TailorSpace"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/30 via-transparent to-transparent" />
            <div className="absolute bottom-6 right-6">
              <span className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-3 rounded-full text-sm shadow-lg transition-colors">
                Ver Aula Gratuita →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section id="manifesto" className="py-24 relative overflow-hidden bg-dark-800">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <Quote className="w-10 h-10 text-brand-500 opacity-50" />
            <h2 className="text-3xl md:text-4xl font-bold">O Manifesto TailorSpace</h2>
          </div>
          
          <div className="space-y-6 text-lg text-slate-300 leading-relaxed font-light">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              O mercado imobiliário brasileiro está travado. De um lado, proprietários e investidores compraram Studios e Apartamentos na planta para alugar no QuintoAndar ou Airbnb, mas a chave chegou e eles não têm mais liquidez para a obra, piso, planejados e mobília. O imóvel entra pro buraco negro gerando despesas pesadas de condomínio.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              Do outro lado, moradores e empresas em crescimento querem entrar no espaço com a mala pronta e com tudo lindo, mas sem precisar derreter o próprio patrimônio comprando mobília e sofrendo com marcenaria para um imóvel que nem é deles.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white font-medium border-l-4 border-brand-500 pl-6 py-2 my-8 glass rounded-r-xl">
              A TailorSpace nasceu para curar essa dor bilionária. Somos a ponte inteligente que une o Imóvel Vazio à Demanda Aquecida, usando o modelo "Fit-out As A Service".
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              Seja por financiamento via fintech parceira ou investidores imobiliários ávidos por rentabilidade, nós usamos a garantia da própria locação para viabilizar 100% da mobília e obra do Studio cru ou retrofit. 
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              Para o inquilino (Pessoa ou PJ), entregamos a conveniência de um espaço pronto e hipercustomizado pagando apenas a assinatura do aluguel. Para o proprietário, injetamos capital e vida no ativo sem custo antecipado, transformando prejuízo em altíssima rentabilidade passiva.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-brand-400 font-medium text-xl pt-4">
              Nós não alugamos o que já existe; desenhamos o encaixe perfeito e entregamos a chave.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="how-it-works" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-xl text-slate-400">Do briefing à entrega das chaves, nós orquestramos tudo para você.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', icon: FileText, title: 'Briefing', desc: 'Entendemos a sua necessidade exata — para morar ou para trabalhar, mapeando o layout perfeito para o seu estilo de vida ou negócio.' },
              { step: '02', icon: Search, title: 'Search Digital', desc: 'Nossa inteligência localiza imóveis "off-market" (no contrapiso ou antigos) que as plataformas tradicionais ignoram por precisarem de adequação.' },
              { step: '03', icon: Cpu, title: 'Build (Fit-out com IA)', desc: 'Apresentamos plantas 3D fotorrealistas instantâneas. Nossa fintech parceira (Bridge) financia e executa toda a readequação e mobiliário.' },
              { step: '04', icon: Key, title: 'Run', desc: 'Espaço entregue "chave na mão", protegido por um contrato atípico e seguro para todas as partes, com o custo diluído na locação.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass p-8 rounded-3xl hover:border-brand-500/50 transition-all group hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 text-7xl font-black text-white/5 group-hover:text-brand-500/10 transition-colors pointer-events-none">
                  {feature.step}
                </div>
                <div className="w-14 h-14 bg-brand-500/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-500 transition-all">
                  <feature.icon className="w-7 h-7 text-brand-500 group-hover:text-white" />
                </div>
                <div className="text-brand-500 font-mono text-sm font-bold mb-2">PASSO {feature.step}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultoria High Ticket (Peixe Assado) Section */}
      <section className="py-24 bg-dark-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20 text-sm font-bold mb-6 tracking-wider">
                A SOLUÇÃO DONE-FOR-YOU
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Nós mobiliamos e alugamos para você.</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Você tem um Studio ou Sala Comercial vazia gerando prejuízo? Com a nossa Consultoria Especializada, nós orquestramos 100% da adequação do seu imóvel usando a nossa estrutura jurídica e de parceiros, resolvendo o problema de ponta a ponta.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-brand-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Pilar Jurídico</h4>
                    <p className="text-slate-400">Contratos blindados de locação com cláusulas de carência e reversão total de benfeitorias.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0">
                    <Cpu className="w-6 h-6 text-brand-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Pilar Operacional</h4>
                    <p className="text-slate-400">Curadoria premium de parceiros de marcenaria e montagem FTS. Nós tocamos o projeto para o inquilino.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-brand-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Pilar Financeiro</h4>
                    <p className="text-slate-400">Planilha de Viabilidade e ROI comprovando a rentabilidade da carência vs. imóvel parado.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass p-10 rounded-3xl border border-brand-500/30 shadow-2xl shadow-brand-500/10 text-center flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold mb-4">Agenda Limitada</h3>
              <p className="text-slate-400 mb-8">Devido à alta demanda de inquilinos, selecionamos apenas os imóveis com perfil estratégico para a nossa carteira de atendimento 1 a 1.</p>
              <a href="https://calendly.com/tailorspace28/30min" target="_blank" rel="noopener noreferrer" className="w-full py-5 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/25 text-lg flex items-center justify-center gap-2">
                Agendar Reunião Estratégica <ArrowRight className="w-5 h-5"/>
              </a>
              <p className="mt-4 text-xs text-slate-500">Diagnóstico Online Gratuito - 30 minutos</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-900/30 border-y border-brand-500/20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Dê o próximo passo para o futuro da locação</h2>
          <p className="text-lg text-slate-300 mb-10">
            Seja você um Inquilino buscando o espaço perfeito ou um Proprietário com um imóvel parado gerando despesas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth" className="w-full sm:w-auto px-8 py-4 bg-white text-dark-900 rounded-full font-bold hover:bg-slate-200 transition-colors shadow-xl shadow-white/10">
              Quero Alugar Sob Medida
            </Link>
            <a href="https://calendly.com/tailorspace28/30min" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-brand-500 text-white rounded-full font-bold hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/25">
              Quero Mobiliar Meu Imóvel
            </a>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="py-12 text-center">
        <div className="mb-6">
          <Building2 className="w-8 h-8 text-slate-600 mx-auto" />
        </div>
        <p className="text-slate-400 mb-2">
          Dúvidas ou projetos especiais? Fale conosco: <a href="mailto:comercial@tailorspace.com.br" className="text-brand-500 hover:text-brand-400 transition-colors">comercial@tailorspace.com.br</a>
        </p>
        <div className="flex items-center justify-center gap-6 my-4">
          <a href="https://www.instagram.com/tailorspaceftsoficial/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-brand-400 transition-colors text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> @tailorspaceftsoficial
          </a>
          <a href="https://www.facebook.com/tailorspaceftsoficial" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-brand-400 transition-colors text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> TailorSpace - Fit to Suit Brasil
          </a>
        </div>
        <p className="text-slate-600 text-sm">© 2026 TailorSpace. Todos os direitos reservados. O 1º Marketplace de Fit to Suit do Brasil.</p>
      </footer>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col items-center pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6 w-full relative">
        <Link to="/" className="absolute top-0 left-6 text-brand-500 flex items-center gap-2 hover:underline mb-8">
          &larr; Voltar
        </Link>
        <div className="text-center mb-16 pt-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Módulos de Monetização</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Escolha o plano ideal para alavancar seus projetos imobiliários e escalar suas operações Fit to Suit.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Tenant Plan */}
          <div className="glass p-8 md:p-10 rounded-3xl relative overflow-hidden border-white/10 flex flex-col">
            <h3 className="text-2xl font-bold mb-2">TailorSpace Pass</h3>
            <p className="text-slate-400 mb-6 flex-1">More num espaço customizado com a sua cara, sem gastar 1 centavo antecipado com marcenaria pesada.</p>
            <div className="text-5xl font-bold mb-8">R$ 197<span className="text-lg text-slate-500 font-normal">/mês</span></div>
            <ul className="space-y-4 mb-10 text-sm">
              <li className="flex items-start gap-3 text-slate-300"><ShieldCheck className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" /> <span><strong>Match de Imóveis:</strong> Curadoria de Studios no contrapiso prontos para carência.</span></li>
              <li className="flex items-start gap-3 text-slate-300"><ShieldCheck className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" /> <span><strong>Fit-Out Diluído:</strong> Seu projeto 100% financiado e embutido no aluguel.</span></li>
              <li className="flex items-start gap-3 text-slate-300"><ShieldCheck className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" /> <span><strong>Zero Obra:</strong> Nós gerenciamos a montagem. Você só pega a chave na mão.</span></li>
              <li className="flex items-start gap-3 text-slate-300"><ShieldCheck className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" /> <span><strong>APP TailorSpace:</strong> Gestão digital, contratos blindados, suporte e vistorias.</span></li>
            </ul>
            <a href={import.meta.env.VITE_HOTMART_TENANT_URL || '#'} target="_blank" rel="noopener noreferrer" className="block text-center w-full py-4 glass text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Assinar o TailorSpace Pass
            </a>
          </div>

          {/* Investor Plan */}
          <div className="glass p-8 md:p-10 rounded-3xl relative overflow-hidden ring-2 ring-brand-500 flex flex-col shadow-2xl shadow-brand-500/20">
            <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider">High Ticket</div>
            <h3 className="text-2xl font-bold mb-2">Aceleração de Ativos FTS</h3>
            <p className="text-slate-400 mb-6 flex-1">Destrave lucros em imóveis no contrapiso com a nossa Mentoria Estratégica, Cofre Jurídico e Software exclusivo.</p>
            <div className="text-5xl font-bold mb-8">R$ 1.990<span className="text-lg text-slate-500 font-normal">/mês</span></div>
            <ul className="space-y-4 mb-10 text-sm">
              <li className="flex items-start gap-3 text-slate-300"><ShieldCheck className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" /> <span><strong>Setup 1-a-1:</strong> Diagnóstico e destravamento individual comigo.</span></li>
              <li className="flex items-start gap-3 text-slate-300"><ShieldCheck className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" /> <span><strong>Mentoria:</strong> Encontros quinzenais para análise de casos e estratégia.</span></li>
              <li className="flex items-start gap-3 text-slate-300"><ShieldCheck className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" /> <span><strong>Cofre Jurídico:</strong> Acesso às nossas minutas de Carência e Reversão.</span></li>
              <li className="flex items-start gap-3 text-slate-300"><ShieldCheck className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" /> <span><strong>Ecossistema VIP:</strong> Fura-fila V.I.P no nosso Deal Flow de Imóveis.</span></li>
            </ul>
            <a href={import.meta.env.VITE_HOTMART_INVESTOR_URL || '#'} target="_blank" rel="noopener noreferrer" className="block text-center w-full py-4 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 shadow-lg shadow-brand-500/25 transition-all text-lg">
              Entrar na Aceleração via Hotmart
            </a>
          </div>
        </div>

        {/* Contact Footer */}
        <div className="mt-16 pb-8 text-center">
          <p className="text-slate-500 mb-2">Precisa customizar um alto volume de ativos operacionais?</p>
          <a href="mailto:comercial@tailorspace.com.br" className="text-brand-500 font-medium hover:text-brand-400 transition-colors">Fale com nossos especialistas: comercial@tailorspace.com.br</a>
          <div className="flex items-center justify-center gap-6 mt-6">
            <a href="https://www.instagram.com/tailorspaceftsoficial/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-brand-400 transition-colors text-sm">
              <Instagram className="w-5 h-5" /> @tailorspaceftsoficial
            </a>
            <a href="https://www.facebook.com/tailorspaceftsoficial" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-brand-400 transition-colors text-sm">
              <Facebook className="w-5 h-5" /> TailorSpace - Fit to Suit Brasil
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/aulas" element={<BrokerClassPage />} />
      </Routes>
    </Router>
  );
}
