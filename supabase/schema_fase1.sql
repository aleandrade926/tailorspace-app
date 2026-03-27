-- Fase 1: Arquitetura Core do TailorSpace (QuintoAndar + Fit-to-Suit)

-- 1. Tabela de Usuários Estendida
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('tenant', 'owner', 'broker', 'supplier')),
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ativar RLS (Row Level Security) para Usuários
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only read and update their own data" ON public.users FOR SELECT USING (auth.uid() = id);

-- 2. Tabela de Imóveis (Properties)
CREATE TABLE public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('raw_contrapiso', 'needs_furniture', 'ready_to_move')),
  rent_price DECIMAL(10, 2) NOT NULL,
  fit_out_budget DECIMAL(10, 2), -- Orçamento liberado para obra/mobília
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Properties are viewable by everyone" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Owners can create properties" ON public.properties FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- 3. Tabela de Matches/Projetos FTS (Contracts)
CREATE TABLE public.matches_contracts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.users(id),
  status TEXT NOT NULL CHECK (status IN ('negotiating', 'building_fit_out', 'active_rent', 'finished')),
  monthly_total DECIMAL(10, 2), -- Aluguel + Parcela da Mobília
  contract_terms JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.matches_contracts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenants and Owners can view their own contracts" ON public.matches_contracts 
  FOR SELECT USING (auth.uid() = tenant_id OR auth.uid() IN (SELECT owner_id FROM public.properties WHERE properties.id = property_id));

-- Trigger Automática para o Auth do Supabase
-- Toda vez que registrar alguém na tela de login, cria o perfil aqui:
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, new.raw_user_meta_data->>'role');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
