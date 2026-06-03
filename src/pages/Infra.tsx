import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, CheckCircle2 } from 'lucide-react';
import '../infra.css';

const InfraPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "TailorSpace Infra | Engenharia Financeira & Geração Distribuída";
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    setError(null);
    
    const { error: supabaseError } = await supabase
      .from('leads')
      .insert([{ name: name.trim(), email: email.trim().toLowerCase(), source: 'infra' }]);
      
    setLoading(false);
    if (supabaseError) {
      setError('Ocorreu um erro ao enviar seus dados. Tente novamente.');
      console.error(supabaseError);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="infra-container">
      {/* Hero Section */}
      <section className="infra-hero">
        <div className="infra-hero-content">
          <h1 className="infra-brand">TailorSpace Infra</h1>
          <h2 className="infra-hero-title">Áreas estratégicas para energia distribuída, cogeração e mobilidade elétrica.</h2>
          <p className="infra-hero-subtitle">
            Originamos, auditamos e estruturamos terrenos, galpões e áreas ociosas em pequenos municípios para implantação de mini usinas, eletropostos, hubs energéticos e infraestrutura descentralizada.
          </p>
          <div className="infra-cta-group">
            <button onClick={scrollToForm} className="infra-btn-primary">Fale com a equipe de estruturação</button>
            <button onClick={scrollToForm} className="infra-btn-secondary">Cadastrar área para análise</button>
          </div>
        </div>
      </section>

      {/* A Tese Section */}
      <section className="infra-tese">
        <div className="infra-tese-content">
          <h2 className="infra-section-title">Municípios pequenos, ativos grandes.</h2>
          <p className="infra-tese-text">
            Enquanto o mercado disputa áreas caras nos grandes centros, a TailorSpace estrutura ativos de infraestrutura em regiões com terra disponível, menor atrito imobiliário e vocação para geração distribuída.
            <br/><br/>
            Transformamos a ociosidade local em <strong>Build to Suit de Elétrons</strong> para grandes corporações.
          </p>
        </div>
      </section>

      {/* Linhas de Infraestrutura Section */}
      <section className="infra-linhas">
        <div className="infra-linhas-content">
          <h2 className="infra-section-title">Nossas Linhas de Atuação</h2>
          <div className="infra-cards-grid">
            <div className="infra-card">
              <h3>Geração distribuída e cogeração</h3>
              <p>Mini usinas solares, biodigestores, créditos de energia e contratos de longo prazo.</p>
            </div>
            <div className="infra-card">
              <h3>Oásis de Recarga</h3>
              <p>Eletropostos, hubs de parada, recarga para frotas e veículos elétricos em rotas estratégicas.</p>
            </div>
            <div className="infra-card">
              <h3>Infraestrutura de borda</h3>
              <p>Micro data centers, telecom, armazenamento energético e ativos passivos.</p>
            </div>
            <div className="infra-card">
              <h3>Hubs multimodais futuros</h3>
              <p>Preparação para mobilidade aérea, drones logísticos e infraestrutura elétrica avançada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="infra-engenharia">
        <div className="infra-engenharia-content">
          <h2 className="infra-section-title">A Engenharia da Operação</h2>
          <div className="infra-steps">
            <div className="infra-step">
              <span className="infra-step-number">1</span>
              <h4>Identificação da área</h4>
            </div>
            <div className="infra-step">
              <span className="infra-step-number">2</span>
              <h4>Análise documental e territorial</h4>
            </div>
            <div className="infra-step">
              <span className="infra-step-number">3</span>
              <h4>Modelagem jurídica e econômica</h4>
            </div>
            <div className="infra-step">
              <span className="infra-step-number">4</span>
              <h4>Estruturação para investidor, operador ou empresa âncora</h4>
            </div>
            <div className="infra-step">
              <span className="infra-step-number">5</span>
              <h4>Contratos de longo prazo</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA Final */}
      <footer className="infra-footer" ref={formRef}>
        <div className="infra-footer-content">
          <div className="infra-footer-block" style={{ gridColumn: '1 / -1', maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.75rem', color: 'var(--infra-gold)', marginBottom: '1rem' }}>Conecte-se com a TailorSpace Infra</h3>
            <p style={{ color: 'var(--infra-text-muted)', marginBottom: '2rem' }}>Seja você uma empresa buscando estruturar capacidade energética, ou um proprietário/corretor com uma área ociosa com potencial.</p>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--infra-text-main)' }}>Nome ou Empresa</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '1rem', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#121212', color: '#fff' }}
                    placeholder="Seu nome ou empresa"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--infra-text-main)' }}>E-mail Corporativo</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '1rem', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#121212', color: '#fff' }}
                    placeholder="email@empresa.com.br"
                  />
                </div>
                {error && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</p>}
                <button type="submit" disabled={loading} className="infra-btn-primary" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                  {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Enviando...</> : 'Solicitar Contato Estratégico'}
                </button>
              </form>
            ) : (
              <div style={{ padding: '2rem', backgroundColor: 'rgba(46, 139, 87, 0.1)', border: '1px solid var(--infra-green)', borderRadius: '8px', textAlign: 'center' }}>
                <CheckCircle2 style={{ width: '3rem', height: '3rem', color: 'var(--infra-green)', margin: '0 auto 1rem' }} />
                <h4 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Recebemos seu contato!</h4>
                <p style={{ color: 'var(--infra-text-muted)' }}>Nossa equipe de estruturação analisará seus dados e entrará em contato em breve.</p>
              </div>
            )}
          </div>
        </div>
        <div className="infra-footer-copy">
          <p>&copy; {new Date().getFullYear()} TailorSpace Infra. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default InfraPage;

