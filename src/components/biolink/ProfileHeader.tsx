import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Profile } from '@/types/biolink';

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const initials = profile.display_name
    ? profile.display_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div className="flex flex-col items-center text-center space-y-4 opacity-0 animate-fade-up">
      <div className="relative">
        <div className="absolute inset-0 rounded-full gradient-bg blur-xl opacity-50 scale-110" />
        <Avatar className="w-28 h-28 border-4 border-card shadow-glow relative">
          <AvatarImage src={profile.avatar_url || ''} alt={profile.display_name || 'Profile'} />
          <AvatarFallback className="text-2xl font-bold gradient-bg text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold font-display text-foreground">
          {profile.display_name || 'Anonymous'}
        </h1>
        {profile.username && (
          <p className="text-sm text-muted-foreground">@{profile.username}</p>
        )}
        {profile.bio && (
          <p className="text-muted-foreground max-w-xs leading-relaxed">
            {profile.bio}
          </p>
        )}
      </div>
    </div>
  );
}
