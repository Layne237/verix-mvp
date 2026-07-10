-- Verix DB verification fixes — run in Supabase Studio → SQL Editor
-- (project qvxakfroalahwdacatpj). Requires DDL privileges the current
-- SUPABASE_SERVICE_ROLE_KEY in .env.local does not have (see report).

-- 1) share_events: anonymous visitors must be able to log a share event,
--    but the current policy set rejects anon INSERT with a 42501 RLS error.
DROP POLICY IF EXISTS "Anyone can log share events" ON public.share_events;
CREATE POLICY "Anyone can log share events"
  ON public.share_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 2) proofs storage bucket does not exist yet (storage.buckets is empty).
INSERT INTO storage.buckets (id, name, public)
VALUES ('proofs', 'proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Public read of proof images, uploads restricted to the owning user's folder
-- (adjust the folder convention to match how before/after images are uploaded).
DROP POLICY IF EXISTS "Proof images are publicly viewable" ON storage.objects;
CREATE POLICY "Proof images are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'proofs');

DROP POLICY IF EXISTS "Users upload own proof images" ON storage.objects;
CREATE POLICY "Users upload own proof images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'proofs' AND (storage.foldername(name))[1] = auth.uid()::text);
