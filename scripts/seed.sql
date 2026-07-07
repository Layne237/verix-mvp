-- Verix Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Proofs table
CREATE TABLE IF NOT EXISTS public.proofs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  location_name TEXT,
  verification_score INTEGER,
  verification_data JSONB,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'flagged', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Votes table
CREATE TABLE IF NOT EXISTS public.votes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  proof_id UUID REFERENCES public.proofs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  vote TEXT NOT NULL CHECK (vote IN ('up', 'down')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(proof_id, user_id)
);

-- Flags table
CREATE TABLE IF NOT EXISTS public.flags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  proof_id UUID REFERENCES public.proofs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reason TEXT NOT NULL,
  resolved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_proofs_user_id ON public.proofs(user_id);
CREATE INDEX IF NOT EXISTS idx_proofs_status ON public.proofs(status);
CREATE INDEX IF NOT EXISTS idx_proofs_created_at ON public.proofs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_proofs_verification_score ON public.proofs(verification_score DESC);
CREATE INDEX IF NOT EXISTS idx_votes_proof_id ON public.votes(proof_id);
CREATE INDEX IF NOT EXISTS idx_flags_proof_id ON public.flags(proof_id);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proofs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flags ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Proofs policies
CREATE POLICY "Proofs are viewable by everyone"
  ON public.proofs FOR SELECT USING (true);

CREATE POLICY "Users can insert their own proofs"
  ON public.proofs FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own proofs"
  ON public.proofs FOR UPDATE USING (auth.uid() = user_id);

-- Votes policies
CREATE POLICY "Votes are viewable by everyone"
  ON public.votes FOR SELECT USING (true);

CREATE POLICY "Users can insert their own votes"
  ON public.votes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes"
  ON public.votes FOR UPDATE USING (auth.uid() = user_id);

-- Flags policies
CREATE POLICY "Flags are viewable by admins"
  ON public.flags FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

CREATE POLICY "Users can insert flags"
  ON public.flags FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Seed data
INSERT INTO public.profiles (id, email, name, role)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@verix.io', 'Admin User', 'admin'),
  ('00000000-0000-0000-0000-000000000002', 'demo@verix.io', 'Demo User', 'user')
ON CONFLICT (id) DO NOTHING;
