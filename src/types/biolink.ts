export interface Profile {
  id: string;
  user_id: string;
  username: string | null;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  theme: string;
  primary_color: string;
  secondary_color: string;
  created_at: string;
  updated_at: string;
}

export interface Link {
  id: string;
  profile_id: string;
  title: string;
  url: string;
  icon: string;
  position: number;
  is_active: boolean;
  click_count: number;
  created_at: string;
  updated_at: string;
}

export interface LinkClick {
  id: string;
  link_id: string;
  clicked_at: string;
  user_agent: string | null;
  referrer: string | null;
}

export type SocialPlatform = 
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'tiktok'
  | 'twitter'
  | 'linkedin'
  | 'whatsapp'
  | 'telegram'
  | 'github'
  | 'website'
  | 'email'
  | 'link';
