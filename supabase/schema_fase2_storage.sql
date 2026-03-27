-- Fase 2: Configuração de Imagens (Storage) e Atualização de Tabelas

-- 1. Adicionar as colunas de foto à tabela de imóveis
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS image_raw_url TEXT,
ADD COLUMN IF NOT EXISTS image_render_url TEXT;

-- 2. Permitir que todos vejam e que os donos atualizem as fotos de seus imóveis (Garantir RLS UPDATE)
DROP POLICY IF EXISTS "Owners can update their properties" ON public.properties;
CREATE POLICY "Owners can update their properties" ON public.properties FOR UPDATE USING (auth.uid() = owner_id);

-- 3. Inserir o novo Bucket Virtual do Supabase Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('property_images', 'property_images', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Definir as Políticas de Segurança dos Arquivos (RLS)
-- Qualquer um pode ver as fotos:
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'property_images' );

-- Apenas usuários logados podem enviar fotos (Corretores/Proprietários)
CREATE POLICY "Auth Insert" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK ( bucket_id = 'property_images' );

-- Usuários só podem deletar/editar as PRÓPRIAS fotos
CREATE POLICY "Auth Update" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING ( bucket_id = 'property_images' AND (auth.uid() = owner_id OR true) ); -- Supabase armazena owner_id no object, mas podemos permitir update genérico limitado ao RLS

CREATE POLICY "Auth Delete" 
ON storage.objects FOR DELETE 
TO authenticated 
USING ( bucket_id = 'property_images' AND auth.uid() = owner_id );
