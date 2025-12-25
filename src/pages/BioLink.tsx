import { useParams } from 'react-router-dom';
import { useProfile, useLinks } from '@/hooks/useBioLink';
import { ProfileHeader } from '@/components/biolink/ProfileHeader';
import { BioLinkCard } from '@/components/biolink/BioLinkCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Link2 } from 'lucide-react';

export default function BioLink() {
  const { username } = useParams<{ username: string }>();
  const { data: profile, isLoading: profileLoading, error: profileError } = useProfile(username || '');
  const { data: links, isLoading: linksLoading } = useLinks(profile?.id);

  if (profileLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="w-28 h-28 rounded-full" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="text-center space-y-4 opacity-0 animate-fade-up">
          <div className="w-20 h-20 mx-auto rounded-full bg-card/50 flex items-center justify-center">
            <Link2 className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            প্রোফাইল পাওয়া যায়নি
          </h1>
          <p className="text-muted-foreground">
            এই ইউজারনেম দিয়ে কোনো প্রোফাইল নেই
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-card/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-card/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <ProfileHeader profile={profile} />

          {linksLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-2xl" />
              ))}
            </div>
          ) : links && links.length > 0 ? (
            <div className="space-y-3">
              {links.map((link, index) => (
                <BioLinkCard key={link.id} link={link} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-muted-foreground">কোনো লিংক যোগ করা হয়নি</p>
            </div>
          )}

          {/* Footer */}
          <div className="text-center pt-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <a 
              href="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              <Link2 className="w-4 h-4" />
              <span>Bio Link দিয়ে তৈরি</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
