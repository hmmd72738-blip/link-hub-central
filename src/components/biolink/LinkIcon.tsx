import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Send, 
  Github, 
  Globe, 
  Mail, 
  Link as LinkIcon,
  Music2
} from 'lucide-react';
import type { SocialPlatform } from '@/types/biolink';

interface LinkIconProps {
  icon: string;
  className?: string;
}

const iconMap: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Music2,
  twitter: Twitter,
  linkedin: Linkedin,
  whatsapp: MessageCircle,
  telegram: Send,
  github: Github,
  website: Globe,
  email: Mail,
  link: LinkIcon,
};

export function SocialIcon({ icon, className = "w-5 h-5" }: LinkIconProps) {
  const IconComponent = iconMap[icon as SocialPlatform] || LinkIcon;
  return <IconComponent className={className} />;
}
