import { useState } from 'react';
import { 
  ArrowRight,
  ShieldCheck,
  Cpu,
  FileText,
  Lock,
  Wallet,
  Clock,
  CheckCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function OwnerLandingPage() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [stage, setStage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp || !stage) {
      setFormError('Por favor, preencha todos os campos para continuarmos.');
      return;
    }
    
    setLoading(true);
    setFormError(null);
    
    const { error } = await supabase
      .from('leads')
      .insert([{ 
        name: name.trim(), 
        email: 'wpp_only@tailorspace.com.br', 
        whatsapp: whatsapp.trim(),
        region: 'N/A',
        stage: stage,
        source: 'proprietario_qualificado' 
      }]);
      
    if (error) {
      setLoading(false);
      setFormError('Ocorreu um erro técnico. Tente novamente.');
      console.error('Supabase error:', error);
    } else {
      // Dispara o Evento de Conversão no Pixel (Lead)
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead');
      }

      const text = encodeURIComponent(`Olá, vi a página da FTS. Meu nome é ${name.trim()} e ${
        stage === 'contrapiso' 
          ? 'sou proprietário de Studio ou apartamento no contrapiso ou sem acabamento e preciso de mobília' 
          : 'tenho um apartamento antigo que precisa de um tapa para voltar a alugar'
      }. Gostaria de falar com um Assessor Executivo.`);
      window.location.href = `https://wa.me/5511993725876?text=${text}`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand-500/30 pb-20">
      {/* Top Bar Minimalista */}
      <nav className="w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-4 md:px-6 flex justify-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Tailorspace" className="w-10 h-10 object-contain shrink-0 drop-shadow-sm" />
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Tailor<span className="text-brand-500">Space</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-12 md:pt-16 pb-12 px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900">
            Pare de Perder Dinheiro com Imóvel Vazio: Mobilie com o Capital do Próprio Inquilino e <span className="text-brand-500">Alugue 3x Mais Rápido</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Você pode ter o seu imóvel valorizado com a customização feita pelo inquilino na primeira locação, e depois o seu ativo que estava parado estará disponível para a locação <em>short</em> ou <em>long stay</em> sem nenhum custo para o proprietário.
          </p>

          {/* VSL Video */}
          <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative aspect-video mb-16">
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

          {/* Infográfico 3 Passos - Versão Pro */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-10 text-slate-900 text-center">Como a Engenharia FTS Funciona</h3>
            <div className="relative grid md:grid-cols-3 gap-8 text-left">
              <div className="hidden md:block absolute top-1/2 left-[25%] right-[25%] h-0.5 bg-brand-100 -translate-y-1/2 z-0"></div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 relative z-10 shadow-md hover:shadow-xl transition-shadow group">
                <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-bold text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform">1</div>
                <h4 className="font-bold text-slate-900 mb-4 text-xl flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-brand-500" /> Capital Externo
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm">Captamos o <strong>Inquilino B2B</strong> que já possui o capital para investir na personalização total do seu imóvel.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 relative z-10 shadow-md hover:shadow-xl transition-shadow group">
                <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-bold text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform">2</div>
                <h4 className="font-bold text-slate-900 mb-4 text-xl flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-500" /> Carência Inteligente
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm">O investimento do inquilino é compensado via desconto no aluguel. Você <strong>não desembolsa capital próprio</strong> para a obra.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 relative z-10 shadow-md hover:shadow-xl transition-shadow group">
                <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-bold text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform">3</div>
                <h4 className="font-bold text-slate-900 mb-4 text-xl flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-500" /> Ativo Formado
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm">Após o período de compensação, você herda um <strong>imóvel 100% mobiliado e pronto</strong> para render no mercado hoteleiro.</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16 text-left border-t border-slate-200 pt-12">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <FileText className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-slate-900">Jurídico Blindado</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Contratos atípicos que garantem a <strong className="text-slate-800">Reforma com Custo Zero</strong> para o proprietário, com total segurança tributária e irreversibilidade patrimonial.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <Cpu className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-slate-900">Operacional FTS</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Cuidamos de tudo: seleção e instalação de móveis, armários, luminárias e cortinas. Seu imóvel sai do osso para o mercado em tempo recorde.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <ShieldCheck className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-slate-900">Alta Liquidez</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Imóveis "no osso" encalham. Studios da TailorSpace têm fila de inquilinos premium já aprovados.</p>
            </div>
          </div>
          
          {/* Institutional Positioning / Compliance */}
          <div className="max-w-3xl mx-auto bg-slate-900 text-slate-100 p-8 rounded-2xl mb-16 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl"></div>
            <h3 className="text-xl font-bold mb-4 font-serif text-white">Nossa Natureza Operacional</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Nossa operação <strong className="text-white font-semibold">não atua sob o formato de uma imobiliária</strong>. A TailorSpace é formada por uma <strong className="text-white font-semibold">Equipe Multidisciplinar</strong> — abrangendo as áreas Jurídica, Tecnológica, Design e Decoração, e experientes <em>Brokers</em>. Nosso foco é exclusivamente voltado para a <strong className="text-white font-semibold">preparação inteligente e reestruturação do seu ativo</strong> para que ele alcance hiperliquidez e a maior rentabilidade possível neste novo mercado.
            </p>
          </div>
        </div>
      </section>

      {/* Prova de Mercado Real */}
      <section className="px-4 md:px-6 mb-16 relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-slate-900 tracking-tight">O Mercado Já Prova: A Apresentação Vale Mais que o Imóvel</h2>
        <p className="text-slate-500 text-sm mb-10">Mesmo prédio. Mesma planta. Dois apartamentos de 80m², 2 quartos, sem vaga.</p>

        <div className="grid md:grid-cols-3 gap-4 items-center mb-6">
          {/* Imóvel sem acabamento */}
          <div className="bg-slate-100 rounded-3xl overflow-hidden text-left border-2 border-slate-200">
            <button onClick={() => setLightboxSrc('/antes-sem-acabamento.jpg')} className="w-full relative group cursor-zoom-in">
              <img src="/antes-sem-acabamento.jpg" alt="Imóvel sem acabamento" loading="lazy" decoding="async" className="w-full h-48 object-cover grayscale opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">🔍 Ampliar</span>
              </div>
            </button>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Imóvel sem acabamento</p>
              <p className="text-4xl font-extrabold text-slate-500 mb-1">R$ 3.700</p>
              <p className="text-slate-400 text-sm mb-4">/mês</p>
              <ul className="space-y-1.5 text-sm text-slate-500">
                <li>✗ Piso de taco antigo</li>
                <li>✗ Paredes nuas</li>
                <li>✗ Sem cortinas ou luminárias</li>
                <li>✗ Parado há meses</li>
              </ul>
            </div>
          </div>

          {/* Diferença */}
          <div className="flex flex-col items-center justify-center py-6">
            <div className="bg-brand-500 text-white rounded-2xl px-6 py-4 shadow-xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Diferença</p>
              <p className="text-3xl font-extrabold">+R$ 1.300</p>
              <p className="text-sm opacity-80">por mês</p>
              <p className="text-xs mt-2 opacity-70">+R$ 15.600 / ano</p>
            </div>
          </div>

          {/* Imóvel com tapa */}
          <div className="bg-white rounded-3xl overflow-hidden text-left border-2 border-brand-400 shadow-xl">
            <button onClick={() => setLightboxSrc('/depois-com-tapa.jpg')} className="w-full relative group cursor-zoom-in">
              <img src="/depois-com-tapa.jpg" alt="Imóvel com tapa FTS" loading="lazy" decoding="async" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">🔍 Ampliar</span>
              </div>
            </button>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-3">Com tapa FTS</p>
              <p className="text-4xl font-extrabold text-brand-600 mb-1">R$ 5.000</p>
              <p className="text-slate-400 text-sm mb-4">/mês</p>
              <ul className="space-y-1.5 text-sm text-slate-600">
                <li>✓ Piso novo, paredes pintadas</li>
                <li>✓ Iluminação e cortinas</li>
                <li>✓ Mobiliário selecionado</li>
                <li>✓ Alugado rapidamente</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 italic">Comparativo baseado em anúncios públicos de locação no mesmo empreendimento em São Paulo.</p>
      </section>

      {/* Qualification Funnel */}
      <section className="px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">Fale com um Especialista em Direito Imobiliário e FTS</h2>
              <p className="text-slate-600 text-sm">
                Preencha apenas 3 campos e seja conectado imediatamente via WhatsApp à nossa equipe de experts na área jurídica do mercado imobiliário e corporativo.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all"
                  placeholder="Ex: Carlos Albuquerque"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">WhatsApp</label>
                <input 
                  type="tel" 
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label htmlFor="stage" className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Perfil do Imóvel</label>
                <select 
                  id="stage"
                  title="Perfil do Imóvel"
                  required
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all appearance-none"
                >
                  <option value="" disabled>Selecione uma opção...</option>
                  <option value="contrapiso">Sou proprietário de Studio ou apartamento no contrapiso ou sem acabamento (precisa de mobília)</option>
                  <option value="retrofit">Tenho apartamento antigo que precisa de um tapa para alugar</option>
                </select>
              </div>
              
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium text-center">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-bold py-4 px-3 sm:px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg text-center"
              >
                {loading ? 'Redirecionando...' : <>QUERO ENTENDER MELHOR FALANDO COM UM PROFISSIONAL <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" /></>}
              </button>
              <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Conversa gratuita e sem compromisso · Equipe com experiência em Consultoria Jurídica e Fiscal no mercado imobiliário privado e corporativo.
              </p>
            </form>
          </div>
        </div>
      </section>
      
      <footer className="mt-20 pt-8 border-t border-slate-200 text-center px-4">
        <p className="text-slate-500 text-xs">© 2026 TailorSpace. Operação Exclusiva de Aceleração de Ativos.</p>
        <p className="text-slate-400 text-[10px] mt-2">Este site não faz parte do Facebook. Disclaimer: Resultados variam conforme a região do imóvel.</p>
      </footer>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            onClick={() => setLightboxSrc(null)}
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold transition-colors"
          >✕</button>
          <img
            src={lightboxSrc}
            alt="Imóvel ampliado"
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-4 text-white/50 text-xs">Fonte: QuintoAndar (anúncio público de locação)</p>
        </div>
      )}
    </div>
  );
}
