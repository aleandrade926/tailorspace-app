import { ArrowRight, FileText, Briefcase, Gavel, Scale, TrendingUp } from 'lucide-react';

export default function AdvisoryPage() {
  const handleCheckout = () => {
    // Pixel tracking para carrinho/agendamento
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout');
    }
    
    // Usa o WhatsApp central do Alexandre (Tudo comigo por enquanto)
    const text = encodeURIComponent('Olá, vi a página da FTS Advisory. Gostaria de entender o valor da Consultoria Multidisciplinar e solicitar o meu Parecer de Viabilidade Estratégica (PVE).');
    window.location.href = `https://wa.me/5511993725876?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 font-sans selection:bg-slate-700 pb-20">
      
      {/* Top Bar Ultra Sobrio */}
      <nav className="w-full z-50 bg-dark-900 border-b border-white/5 py-6">
        <div className="max-w-4xl mx-auto px-4 md:px-6 flex justify-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white opacity-90">
              TAILORSPACE <span className="font-light tracking-widest text-slate-400">| ADVISORY</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Dobra 1 */}
      <section className="pt-20 pb-16 px-4 md:px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-slate-500 mb-8 font-serif">
            Consultoria Multidisciplinar
          </p>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-tight text-white font-serif">
            A locação tradicional está <span className="text-slate-400 italic">destruindo a rentabilidade</span> do seu patrimônio imobilizado.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
            A Reforma Tributária e as novas dinâmicas de mercado exigem mais do que uma imobiliária: exigem <strong>Engenharia Contratual</strong>. Descubra a viabilidade do modelo <em>Build to Suit</em> e blinde seu ativo contra a defasagem e a inadimplência.
          </p>

          <button 
            onClick={handleCheckout}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-white text-dark-900 font-bold tracking-wide uppercase text-sm rounded transition-all hover:bg-slate-200 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <Gavel className="w-5 h-5" />
            Solicitar Parecer de Viabilidade
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 md:px-6 my-10">
        <hr className="border-white/5" />
      </div>

      {/* A Dor - Dobra 2 */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 font-serif">
              O seu imóvel no contrapiso não é um ativo, <span className="text-red-400/80">é um passivo fiscal.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Enquanto o seu estúdio ou laje permanece vazio ou alugado nos moldes antigos, você acumula custos de IPTU, condomínio e perde o custo de oportunidade do capital.
            </p>
          </div>

          <div className="bg-dark-800 border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <TrendingUp className="absolute -right-10 -bottom-10 w-64 h-64 text-white/[0.02]" />
            <p className="text-lg md:text-xl leading-relaxed text-slate-300 font-light relative z-10 text-center">
              A TailorSpace Advisory atua na interseção exata entre o Direito Imobiliário, a Estratégia Tributária e o Mercado de Capitais. Nós não intermediamos inquilinos; <strong className="text-white">nós reestruturamos o seu ativo para que ele opere na sua eficiência máxima.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* O Entregavel - Dobra 3 */}
      <section className="py-16 px-4 md:px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-serif">O Parecer de Viabilidade Estratégica</h2>
            <p className="text-slate-500 tracking-widest uppercase text-sm font-semibold">O Dossiê Executivo (PVE)</p>
          </div>

          <p className="text-slate-300 mb-10 text-center max-w-2xl mx-auto">
            Ao contratar nossa Consultoria Multidisciplinar, você receberá um material estritamente confidencial e personalizado sobre a saúde e projeção do seu imóvel, contendo:
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-white/10 rounded-xl p-8 bg-dark-900/50 hover:bg-dark-800 transition-colors">
              <Scale className="w-8 h-8 text-slate-400 mb-6" />
              <h3 className="text-lg font-bold text-white mb-3">Matriz de Risco e Blindagem</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Como o Contrato Atípico de Build to Suit reverte o risco de vacância e trava a mobília e acabamento como patrimônio irreversível do proprietário.
              </p>
            </div>
            
            <div className="border border-white/10 rounded-xl p-8 bg-dark-900/50 hover:bg-dark-800 transition-colors">
              <FileText className="w-8 h-8 text-slate-400 mb-6" />
              <h3 className="text-lg font-bold text-white mb-3">Engenharia Tributária</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Simulação do impacto da nova carga fiscal (IBS/CBS) sobre a receita de locação e as estratégias de elisão fiscal permitidas pela jurisprudência.
              </p>
            </div>

            <div className="border border-white/10 rounded-xl p-8 bg-dark-900/50 hover:bg-dark-800 transition-colors">
              <TrendingUp className="w-8 h-8 text-slate-400 mb-6" />
              <h3 className="text-lg font-bold text-white mb-3">Teto de Rentabilidade</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Projeção matemática de carência versus valorização do ativo. Saiba exatos os meses em que o imóvel "se paga" e entra em lucro tangível.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A Autoridade - Dobra 4 */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_2fr] gap-12 items-center">
          <div className="aspect-[3/4] bg-dark-800 rounded-xl border border-white/10 overflow-hidden relative shadow-2xl">
            {/* Foto será carregada daqui quando colocarem advisory-ceo.png nas pastas públicas */}
            <div className="absolute inset-0 bg-dark-800 flex items-center justify-center">
                <Briefcase className="w-16 h-16 text-white/5" />
            </div>
            <img src="/advisory-ceo.png" alt="Head of Advisory" className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 mix-blend-luminosity z-10" onError={(e) => e.currentTarget.style.display = 'none'} />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-2 font-serif">A Diretoria de Advisory</h2>
            <p className="text-slate-500 uppercase tracking-widest text-xs font-semibold mb-6">Excelência USP / Autarquias Federais</p>
            
            <p className="text-slate-300 leading-relaxed mb-6 font-light">
              Conduzida por especialistas de currículo magistral em estruturação jurídica e tributária de grandes operações. Nossa Head de Advisory traz a precisão analítica e a segurança institucional de esferas federais para a mesa de negociação do seu passivo imobiliário.
            </p>
            <p className="text-slate-300 leading-relaxed font-light">
              Tratamos a reestruturação e a engenharia tributária do seu imóvel com a seriedade e complexidade de uma verdadeira operação de aquisição corporativa.
            </p>
          </div>
        </div>
      </section>

      {/* Fechamento - Dobra 5 */}
      <section className="py-20 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="bg-dark-800 rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-8 text-center font-serif">Como a Consultoria Funciona:</h2>
            
            <div className="space-y-6 mb-12">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border border-slate-500 flex items-center justify-center text-sm font-bold text-slate-400 shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-white mb-1">Agendamento & Diagnóstico</h4>
                  <p className="text-sm text-slate-400">Você solicita o agendamento através da nossa assessoria e é filtrado para uma call diagnóstica central direto com a Diretoria.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border border-slate-500 flex items-center justify-center text-sm font-bold text-slate-400 shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-white mb-1">O Dossiê (PVE) em suas mãos</h4>
                  <p className="text-sm text-slate-400">Com a estrutura de dados mapeada, nossa inteligência técnica elabora o Parecer completo do seu imóvel em janela técnica otimizada.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border-brand-500/50 bg-brand-500/10 flex items-center justify-center text-sm font-bold text-brand-400 shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-white mb-1">Garantia TailorSpace (Cashback FTS)</h4>
                  <p className="text-sm text-slate-400">Se o parecer apontar viabilidade absoluta e você decidir executar o método BTS com a estrutura do marketplace TailorSpace (projeto, obras e inquilino pronto), <strong className="text-white">100% do valor desta consultoria será abatido</strong> do seu contrato de execução final.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white text-dark-900 font-bold tracking-wide uppercase text-sm rounded transition-all hover:bg-slate-200 hover:scale-[1.01]"
            >
              <Briefcase className="w-5 h-5" />
              Agendar Minha Consultoria (PVE)
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">
              Protegido por Confidencialidade e LGPD. Operação Juridicamente Blindada.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
