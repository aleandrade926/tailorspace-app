import { useState } from 'react';
import { 
  ArrowRight,
  ShieldCheck,
  Cpu,
  FileText,
  Lock
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function OwnerLandingPage() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [stage, setStage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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
        stage === 'contrapiso' ? 'sou proprietário de um Studio no contrapiso' : 'tenho interesse na gestão do ativo'
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

          <div className="grid md:grid-cols-3 gap-6 mb-16 text-left border-y border-slate-200 py-12">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <FileText className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-slate-900">Jurídico Blindado</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Contratos atípicos que garantem a <strong className="text-slate-800">Reforma com Custo Zero</strong> para o proprietário, com total segurança tributária e irreversibilidade patrimonial.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <Cpu className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-slate-900">Operacional FTS</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Orquestramos projetos e equipe de marcenaria de ponta. A curva de tempo de adequação cai pela metade.</p>
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

      {/* Qualification Funnel */}
      <section className="px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">Análise de Compatibilidade</h2>
              <p className="text-slate-600 text-sm">
                Antes de alocar o tempo de um Assessor Executivo para um estudo de viabilidade gratuito do seu ativo, preencha os 3 campos abaixo:
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
                  <option value="contrapiso">Sou proprietário de Studio no contrapiso</option>
                  <option value="gestao">Tenho interesse na gestão do ativo</option>
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
                <Lock className="w-3.5 h-3.5" /> Informações seguras. Fale diretamente com humanos.
              </p>
            </form>
          </div>
        </div>
      </section>
      
      <footer className="mt-20 pt-8 border-t border-slate-200 text-center px-4">
        <p className="text-slate-500 text-xs">© 2026 TailorSpace. Operação Exclusiva de Aceleração de Ativos.</p>
        <p className="text-slate-400 text-[10px] mt-2">Este site não faz parte do Facebook. Disclaimer: Resultados variam conforme a região do imóvel.</p>
      </footer>
    </div>
  );
}
