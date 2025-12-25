import { ProfileHeader } from '@/components/biolink/ProfileHeader';
import { BioLinkCard } from '@/components/biolink/BioLinkCard';
import { Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { Profile, Link as LinkType } from '@/types/biolink';

const demoProfile: Profile = {
  id: 'demo',
  user_id: 'demo',
  username: 'creator',
  display_name: 'ক্রিয়েটিভ ক্রিয়েটর',
  bio: 'ডিজিটাল ক্রিয়েটর | কনটেন্ট মেকার | টেক এনথুসিয়াস্ট 🚀',
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
  theme: 'gradient',
  primary_color: '#FF6B6B',
  secondary_color: '#4ECDC4',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const demoLinks: LinkType[] = [
  {
    id: '1',
    profile_id: 'demo',
    title: 'আমার YouTube চ্যানেল',
    url: 'https://youtube.com',
    icon: 'youtube',
    position: 0,
    is_active: true,
    click_count: 1234,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    profile_id: 'demo',
    title: 'Instagram ফলো করুন',
    url: 'https://instagram.com',
    icon: 'instagram',
    position: 1,
    is_active: true,
    click_count: 856,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    profile_id: 'demo',
    title: 'Facebook পেজ',
    url: 'https://facebook.com',
    icon: 'facebook',
    position: 2,
    is_active: true,
    click_count: 542,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    profile_id: 'demo',
    title: 'TikTok ভিডিও',
    url: 'https://tiktok.com',
    icon: 'tiktok',
    position: 3,
    is_active: true,
    click_count: 389,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    profile_id: 'demo',
    title: 'WhatsApp এ মেসেজ করুন',
    url: 'https://wa.me/1234567890',
    icon: 'whatsapp',
    position: 4,
    is_active: true,
    click_count: 267,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    profile_id: 'demo',
    title: 'আমার ওয়েবসাইট',
    url: 'https://example.com',
    icon: 'website',
    position: 5,
    is_active: true,
    click_count: 198,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function Demo() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-card/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-card/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Demo Badge */}
          <div className="text-center opacity-0 animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium">
              ✨ ডেমো প্রোফাইল
            </span>
          </div>

          <ProfileHeader profile={demoProfile} />

          <div className="space-y-3">
            {demoLinks.map((link, index) => (
              <BioLinkCard key={link.id} link={link} index={index} />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center pt-8 space-y-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.7s' }}>
            <p className="text-muted-foreground">আপনার নিজের Bio Link তৈরি করুন</p>
            <Button variant="gradient" size="lg" asChild>
              <Link to="/auth">
                বিনামূল্যে শুরু করুন
              </Link>
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              <Link2 className="w-4 h-4" />
              <span>Bio Link দিয়ে তৈরি</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
