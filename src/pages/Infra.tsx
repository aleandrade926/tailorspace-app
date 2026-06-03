import { useEffect } from 'react';
import '../infra.css';

const InfraPage = () => {
  useEffect(() => {
    // Altera o title para a página infra
    document.title = "TailorSpace Infra | Engenharia Financeira & Geração Distribuída";
  }, []);

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
            <button className="infra-btn-primary">Fale com a equipe de estruturação</button>
            <button className="infra-btn-secondary">Cadastrar área para análise</button>
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
      <footer className="infra-footer">
        <div className="infra-footer-content">
          <div className="infra-footer-block">
            <h3>Para empresas, fundos e operadores</h3>
            <button className="infra-btn-primary">Fale com a equipe de estruturação</button>
          </div>
          <div className="infra-footer-block">
            <h3>Para corretores, proprietários e parceiros locais</h3>
            <button className="infra-btn-secondary">Cadastrar área ou tornar-se parceiro</button>
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
