-- Fase 3: Marketplace de Mobília e Fornecedores

-- 1. Tabela de Móveis Avulsos (Furniture)
CREATE TABLE public.furniture (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  supplier_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  condition TEXT CHECK (condition IN ('new', 'used', 'needs_repair')),
  full_price DECIMAL(10, 2), -- Valor de mercado real (para permuta/carência)
  image_raw_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ativar Segurança de Linha para Móveis
ALTER TABLE public.furniture ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Furniture is viewable by everyone" ON public.furniture FOR SELECT USING (true);
CREATE POLICY "Suppliers can create furniture" ON public.furniture FOR INSERT TO authenticated WITH CHECK (auth.uid() = supplier_id);
CREATE POLICY "Suppliers can update their furniture" ON public.furniture FOR UPDATE USING (auth.uid() = supplier_id);

-- 2. Tabela de Interesse/Leads para a Mobília
CREATE TABLE public.furniture_interests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  furniture_id UUID REFERENCES public.furniture(id) ON DELETE CASCADE,
  interested_user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending_negotiation',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.furniture_interests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can express interest in furniture" ON public.furniture_interests FOR INSERT TO authenticated WITH CHECK (auth.uid() = interested_user_id);
CREATE POLICY "Users and Owners can see their furniture interests" ON public.furniture_interests 
  FOR SELECT USING (auth.uid() = interested_user_id OR auth.uid() IN (SELECT supplier_id FROM public.furniture WHERE furniture.id = furniture_id));
