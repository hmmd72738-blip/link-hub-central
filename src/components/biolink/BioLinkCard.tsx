import { ExternalLink } from 'lucide-react';
import { SocialIcon } from './LinkIcon';
import type { Link } from '@/types/biolink';
import { supabase } from '@/integrations/supabase/client';

interface BioLinkCardProps {
  link: Link;
  index: number;
}

export function BioLinkCard({ link, index }: BioLinkCardProps) {
  const handleClick = async () => {
    // Record the click
    await supabase.from('link_clicks').insert({
      link_id: link.id,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    });
    
    // Open the link
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="bio-link-button group opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <SocialIcon icon={link.icon} className="w-5 h-5 text-primary" />
          </div>
          <span className="font-medium text-foreground">{link.title}</span>
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </button>
  );
}
