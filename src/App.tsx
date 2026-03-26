
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, ShieldCheck, Zap, PenTool } from 'lucide-react';

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
            <a href="#how-it-works" className="hover:text-white transition-colors">Como Funciona</a>
            <a href="#benefits" className="hover:text-white transition-colors">Vantagens</a>
            <Link to="/pricing" className="hover:text-white transition-colors">Planos e Monetização</Link>
          </div>
          <button className="bg-white text-dark-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-200 transition-colors">
            Acessar Plataforma
          </button>
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
              O Futuro do Real Estate Corporativo
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              O Seu Espaço Ideal,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400">
                Construído Sob Medida.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Conectamos empresas a investidores e construtores no modelo Fit to Suit (Built to Suit). Expanda suas operações sem descapitalizar o seu negócio principal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-brand-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/25">
                Quero um Projeto <ArrowRight className="w-4 h-4" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 glass text-white rounded-full font-semibold hover:bg-white/10 transition-all">
                Sou Investidor
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="how-it-works" className="py-24 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Como a TailorSpace Funciona</h2>
            <p className="text-slate-400">O processo mais eficiente para expansão imobiliária corporativa.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: PenTool, title: 'Desenho do Projeto', desc: 'Sua empresa define todas as especificações, localização e necessidades do imóvel ideal.' },
              { icon: Zap, title: 'Match Perfeito', desc: 'Nossa plataforma conecta seu projeto com nossa base de investidores e loteadores validados.' },
              { icon: ShieldCheck, title: 'Entrega Chave na Mão', desc: 'O investidor constrói o imóvel sob medida e sua empresa aluga por meio de um contrato de longo prazo.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="glass p-8 rounded-2xl hover:border-brand-500/50 transition-colors group"
              >
                <div className="w-14 h-14 bg-brand-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-brand-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
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
              Pagar com Stripe
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
              Assinar Plano Investidor (Stripe)
            </button>
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
      </Routes>
    </Router>
  );
}
