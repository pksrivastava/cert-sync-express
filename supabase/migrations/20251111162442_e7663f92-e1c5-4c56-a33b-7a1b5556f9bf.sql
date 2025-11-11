-- Enhancement for Partners table
ALTER TABLE public.partners 
ADD COLUMN IF NOT EXISTS partner_code VARCHAR(6) UNIQUE,
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS agreement_url TEXT,
ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
ADD COLUMN IF NOT EXISTS primary_contact_email TEXT,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT false;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_partners_status ON public.partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_partner_code ON public.partners(partner_code);

-- SSO Configuration table
CREATE TABLE IF NOT EXISTS public.sso_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
  provider_type TEXT NOT NULL CHECK (provider_type IN ('SAML', 'OAuth2', 'OIDC')),
  is_enabled BOOLEAN DEFAULT false,
  idp_metadata_url TEXT,
  client_id TEXT,
  client_secret TEXT,
  entity_id TEXT,
  sso_url TEXT,
  certificate TEXT,
  attribute_mappings JSONB DEFAULT '{"email": "email", "firstName": "given_name", "lastName": "family_name", "userId": "sub"}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.sso_configurations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage SSO configurations"
  ON public.sso_configurations FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Marketplace Settings table
CREATE TABLE IF NOT EXISTS public.marketplace_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.marketplace_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage marketplace settings"
  ON public.marketplace_settings FOR ALL
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view marketplace settings"
  ON public.marketplace_settings FOR SELECT
  USING (true);

-- Insert default marketplace settings
INSERT INTO public.marketplace_settings (setting_key, setting_value, description)
VALUES 
  ('max_concurrent_enrollments', '{"value": 5}'::jsonb, 'Maximum concurrent course enrollments per learner'),
  ('min_karma_points', '{"value": 0}'::jsonb, 'Minimum karma points required for marketplace access'),
  ('annual_enrollment_limit', '{"value": 20, "year_start_month": 4, "year_start_day": 1}'::jsonb, 'Annual marketplace enrollment limit per user')
ON CONFLICT (setting_key) DO NOTHING;

-- Learning Platforms table
CREATE TABLE IF NOT EXISTS public.learning_platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  website_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.learning_platforms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage learning platforms"
  ON public.learning_platforms FOR ALL
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view active platforms"
  ON public.learning_platforms FOR SELECT
  USING (is_active = true OR has_role(auth.uid(), 'admin'));

-- Course Categories table
CREATE TABLE IF NOT EXISTS public.course_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage course categories"
  ON public.course_categories FOR ALL
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view active categories"
  ON public.course_categories FOR SELECT
  USING (is_active = true OR has_role(auth.uid(), 'admin'));

-- Enhancement for Courses table
ALTER TABLE public.courses
ADD COLUMN IF NOT EXISTS course_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS platform_id UUID REFERENCES public.learning_platforms(id),
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.course_categories(id),
ADD COLUMN IF NOT EXISTS external_url TEXT,
ADD COLUMN IF NOT EXISTS objectives TEXT[],
ADD COLUMN IF NOT EXISTS topics TEXT[],
ADD COLUMN IF NOT EXISTS enrollment_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS rating NUMERIC(2,1) DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_platform ON public.courses(platform_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category_id);
CREATE INDEX IF NOT EXISTS idx_courses_published ON public.courses(is_published);

-- Partner Applications/Reviews
CREATE TABLE IF NOT EXISTS public.partner_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE NOT NULL,
  reviewed_by UUID REFERENCES auth.users(id) NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('approved', 'rejected', 'pending_info')),
  comments TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.partner_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage partner reviews"
  ON public.partner_reviews FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- User Karma Points table
CREATE TABLE IF NOT EXISTS public.user_karma (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  total_points INTEGER DEFAULT 0,
  current_year_enrollments INTEGER DEFAULT 0,
  last_year_reset_date TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.user_karma ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own karma"
  ON public.user_karma FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all karma"
  ON public.user_karma FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_sso_configurations_updated_at
  BEFORE UPDATE ON public.sso_configurations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_marketplace_settings_updated_at
  BEFORE UPDATE ON public.marketplace_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_learning_platforms_updated_at
  BEFORE UPDATE ON public.learning_platforms
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_course_categories_updated_at
  BEFORE UPDATE ON public.course_categories
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_user_karma_updated_at
  BEFORE UPDATE ON public.user_karma
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();