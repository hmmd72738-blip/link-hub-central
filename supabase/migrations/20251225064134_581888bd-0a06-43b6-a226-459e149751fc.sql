-- Create profiles table for storing user bio link profiles
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  username TEXT UNIQUE,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  theme TEXT DEFAULT 'gradient',
  primary_color TEXT DEFAULT '#FF6B6B',
  secondary_color TEXT DEFAULT '#4ECDC4',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create links table for storing bio links
CREATE TABLE public.links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT DEFAULT 'link',
  position INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create link_clicks table for analytics
CREATE TABLE public.link_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  link_id UUID REFERENCES public.links(id) ON DELETE CASCADE NOT NULL,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  referrer TEXT
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_clicks ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Links policies
CREATE POLICY "Active links are viewable by everyone" 
ON public.links FOR SELECT 
USING (is_active = true OR EXISTS (
  SELECT 1 FROM public.profiles WHERE profiles.id = links.profile_id AND profiles.user_id = auth.uid()
));

CREATE POLICY "Users can manage their own links" 
ON public.links FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles WHERE profiles.id = links.profile_id AND profiles.user_id = auth.uid()
));

-- Link clicks policies (anyone can insert clicks for tracking)
CREATE POLICY "Anyone can record link clicks" 
ON public.link_clicks FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Link owners can view their click analytics" 
ON public.link_clicks FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.links l 
  JOIN public.profiles p ON l.profile_id = p.id 
  WHERE l.id = link_clicks.link_id AND p.user_id = auth.uid()
));

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_links_updated_at
BEFORE UPDATE ON public.links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to increment click count
CREATE OR REPLACE FUNCTION public.increment_click_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.links SET click_count = click_count + 1 WHERE id = NEW.link_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER increment_link_clicks
AFTER INSERT ON public.link_clicks
FOR EACH ROW
EXECUTE FUNCTION public.increment_click_count();

-- Create index for faster username lookups
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_links_profile_id ON public.links(profile_id);
CREATE INDEX idx_link_clicks_link_id ON public.link_clicks(link_id);