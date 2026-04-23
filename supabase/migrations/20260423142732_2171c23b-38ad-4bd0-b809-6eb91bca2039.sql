-- Tiers table (public catalog of pledge options)
CREATE TABLE public.tiers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  amount INTEGER NOT NULL CHECK (amount > 0),
  cadence TEXT NOT NULL DEFAULT 'month',
  perks JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tiers are viewable by everyone"
  ON public.tiers FOR SELECT
  USING (true);

-- Pledges table
CREATE TABLE public.pledges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  tier_id TEXT REFERENCES public.tiers(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  amount INTEGER NOT NULL CHECK (amount >= 1),
  cadence TEXT NOT NULL DEFAULT 'month',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.pledges ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a pledge (anonymous donors allowed)
CREATE POLICY "Anyone can create a pledge"
  ON public.pledges FOR INSERT
  WITH CHECK (true);

-- Authenticated users can view only their own pledges
CREATE POLICY "Users can view their own pledges"
  ON public.pledges FOR SELECT
  USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE INDEX idx_pledges_user_id ON public.pledges(user_id);
CREATE INDEX idx_pledges_email ON public.pledges(email);

-- Seed initial tiers
INSERT INTO public.tiers (id, name, tagline, amount, cadence, perks, featured, sort_order) VALUES
  ('apprentice', 'Apprentice', 'For students and early-career engineers', 5, 'month',
    '["Funds 1 hour of bridge support per month","Trust newsletter & impact report","Name in the Contributors ledger"]'::jsonb,
    false, 1),
  ('engineer', 'Engineer', 'Standard tax for working professionals', 25, 'month',
    '["Funds ~1 day of bridge support per month","Quarterly beneficiary stories","Vote on association partnerships","Paul Allen and Alan Turing digital member badge"]'::jsonb,
    true, 2),
  ('architect', 'Architect', 'For senior staff & leadership', 100, 'month',
    '["Funds a full week of bridge support","Direct line to trust governance updates","Co-sponsor IEEE / ACM scholarships","Invitation to annual benefactors gathering"]'::jsonb,
    false, 3),
  ('patron', 'Patron', 'Honoring the legacy in full', 500, 'month',
    '["Underwrites an entire month of recovery for one engineer","Named patronage in our annual report","Advisory seat on grant committee (optional)","All Architect benefits included"]'::jsonb,
    false, 4);
