import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, ShieldCheck, Search, Cpu, Key, FileText, Quote } from 'lucide-react';

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
          </div>
          <a href="https://studios.tailorspace.com.br/geral" target="_blank" rel="noopener noreferrer" className="bg-white text-dark-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-200 transition-colors">
            Começar Agora
          </a>
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
              O 1º Marketplace de Fit to Suit (FTS) do Brasil
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Não alugue o que existe.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400">
                Alugue feito sob medida.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Conectamos imóveis com alto potencial a empresas e pessoas que buscam espaços perfeitamente customizados. Reforma e mobília inclusas em uma única taxa mensal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://studios.tailorspace.com.br/geral" className="w-full sm:w-auto px-8 py-4 bg-brand-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/25">
                Descubra Seu Espaço <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/pricing" className="w-full sm:w-auto px-8 py-4 glass text-white rounded-full font-semibold hover:bg-white/10 transition-all">
                Sou Investidor
              </Link>
            </div>
          </motion.div>
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
              O mercado imobiliário de alto padrão parou no tempo porque opera em duas metades que não se comunicam. De um lado, a corretagem tenta empurrar imóveis crus, no contrapiso ou com plantas desatualizadas que não refletem o estilo de vida do cliente. Do outro, a indústria das remodelações projeta espaços incríveis, mas exige a descapitalização imediata e brutal de quem vai morar.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              O mercado força uma escolha injusta: ou aceita o genérico, ou esgota a sua liquidez para adequar um imóvel que não é seu.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white font-medium border-l-4 border-brand-500 pl-6 py-2 my-8 glass rounded-r-xl">
              A TailorSpace nasceu para fundir estes dois mundos. Não somos uma imobiliária tradicional, nem uma simples construtora. Somos a primeira Operadora de Fit to Suit (FTS) Residencial e Corporativa do Brasil.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              A nossa engenharia atua exatamente no vácuo entre a corretagem e a execução (o fit-out), usando a própria procura de locação para financiar e viabilizar a adequação completa do espaço, num único contrato blindado.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              Nós transformamos a carência do arrendamento em espaços personalizados e hipervalorização dos ativos. Para o inquilino, entregamos um lar de primeira classe desenhado com a sua identidade, sem colocar a mão no bolso para a obra; tudo é resolvido numa mensalidade premium. Para o proprietário, curamos a dor do imóvel parado ao injetar capital e infraestrutura de luxo no seu espaço, a custo zero.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-brand-400 font-medium text-xl pt-4">
              Nós não arrendamos o que já existe; desenhamos o encaixe perfeito e entregamos a chave.
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

      {/* CTA Section */}
      <section className="py-20 bg-brand-900/30 border-y border-brand-500/20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Dê o próximo passo para o futuro da locação</h2>
          <p className="text-lg text-slate-300 mb-10">
            Seja você um Inquilino buscando o espaço perfeito ou um Proprietário com um imóvel parado gerando despesas.
          </p>
          <a href="https://studios.tailorspace.com.br/geral" className="inline-flex px-10 py-5 bg-white text-dark-900 rounded-full font-bold text-lg hover:bg-slate-200 transition-colors shadow-xl shadow-white/10">
            Começar Agora
          </a>
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
            <h3 className="text-2xl font-bold mb-2">Empresas (Locatários)</h3>
            <p className="text-slate-400 mb-6 flex-1">Para corporações estruturando sua nova sede sob medida sem descapitalizar o core business.</p>
            <div className="text-5xl font-bold mb-8">R$ 499<span className="text-lg text-slate-500 font-normal">/mês</span></div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-slate-300"><ShieldCheck className="w-6 h-6 text-brand-500" /> Publicação de até 3 projetos Fit to Suit</li>
              <li className="flex items-center gap-3 text-slate-300"><ShieldCheck className="w-6 h-6 text-brand-500" /> Assessoria jurídica e contratual</li>
              <li className="flex items-center gap-3 text-slate-300"><ShieldCheck className="w-6 h-6 text-brand-500" /> Match direto com +500 investidores</li>
            </ul>
            <button className="w-full py-4 glass text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Pagar com Hotmart/Stripe
            </button>
          </div>

          {/* Investor Plan */}
          <div className="glass p-8 md:p-10 rounded-3xl relative overflow-hidden ring-2 ring-brand-500 flex flex-col shadow-2xl shadow-brand-500/20">
            <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider">Premium</div>
            <h3 className="text-2xl font-bold mb-2">Investidores & Fundos</h3>
            <p className="text-slate-400 mb-6 flex-1">Acesso prime aos melhores ativos imobiliários e oportunidades Triple A do mercado.</p>
            <div className="text-5xl font-bold mb-8">R$ 1.990<span className="text-lg text-slate-500 font-normal">/mês</span></div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-slate-300"><ShieldCheck className="w-6 h-6 text-brand-500" /> Deal Flow ilimitado na plataforma</li>
              <li className="flex items-center gap-3 text-slate-300"><ShieldCheck className="w-6 h-6 text-brand-500" /> Deal origination customizado</li>
              <li className="flex items-center gap-3 text-slate-300"><ShieldCheck className="w-6 h-6 text-brand-500" /> Prioridade no bid de leilões FTS</li>
            </ul>
            <button className="w-full py-4 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 shadow-lg shadow-brand-500/25 transition-all text-lg">
              Assinar Plano Investidor
            </button>
          </div>
        </div>

        {/* Contact Footer */}
        <div className="mt-16 pb-8 text-center">
          <p className="text-slate-500 mb-2">Precisa customizar um alto volume de ativos operacionais?</p>
          <a href="mailto:comercial@tailorspace.com.br" className="text-brand-500 font-medium hover:text-brand-400 transition-colors">Fale com nossos especialistas: comercial@tailorspace.com.br</a>
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
      </Routes>
    </Router>
  );
}
