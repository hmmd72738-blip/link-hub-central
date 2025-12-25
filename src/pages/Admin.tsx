import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfileByUserId, useAllLinks } from '@/hooks/useBioLink';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SocialIcon } from '@/components/biolink/LinkIcon';
import { toast } from 'sonner';
import { 
  LogOut, 
  Plus, 
  Trash2, 
  Save, 
  ExternalLink, 
  GripVertical,
  BarChart3,
  Link2,
  User,
  Palette
} from 'lucide-react';
import type { Profile, Link, SocialPlatform } from '@/types/biolink';
import { useQueryClient } from '@tanstack/react-query';

const ICON_OPTIONS: { value: SocialPlatform; label: string }[] = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'github', label: 'GitHub' },
  { value: 'website', label: 'Website' },
  { value: 'email', label: 'Email' },
  { value: 'link', label: 'অন্যান্য' },
];

export default function Admin() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: profile, isLoading: profileLoading } = useProfileByUserId(user?.id);
  const { data: links, isLoading: linksLoading } = useAllLinks(profile?.id);

  const [profileForm, setProfileForm] = useState({
    username: '',
    display_name: '',
    bio: '',
    avatar_url: '',
  });

  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    icon: 'link' as SocialPlatform,
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        username: profile.username || '',
        display_name: profile.display_name || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
      });
    }
  }, [profile]);

  const handleCreateProfile = async () => {
    if (!user) return;

    const { error } = await supabase.from('profiles').insert({
      user_id: user.id,
      username: profileForm.username || null,
      display_name: profileForm.display_name || null,
      bio: profileForm.bio || null,
      avatar_url: profileForm.avatar_url || null,
    });

    if (error) {
      toast.error('প্রোফাইল তৈরি করতে সমস্যা হয়েছে');
    } else {
      toast.success('প্রোফাইল তৈরি হয়েছে!');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  };

  const handleUpdateProfile = async () => {
    if (!profile) return;
    setIsSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        username: profileForm.username || null,
        display_name: profileForm.display_name || null,
        bio: profileForm.bio || null,
        avatar_url: profileForm.avatar_url || null,
      })
      .eq('id', profile.id);

    setIsSaving(false);
    if (error) {
      if (error.code === '23505') {
        toast.error('এই ইউজারনেম ইতিমধ্যে নেওয়া হয়েছে');
      } else {
        toast.error('প্রোফাইল আপডেট করতে সমস্যা হয়েছে');
      }
    } else {
      toast.success('প্রোফাইল আপডেট হয়েছে!');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  };

  const handleAddLink = async () => {
    if (!profile || !newLink.title || !newLink.url) {
      toast.error('টাইটেল এবং URL দিন');
      return;
    }

    const position = links ? links.length : 0;

    const { error } = await supabase.from('links').insert({
      profile_id: profile.id,
      title: newLink.title,
      url: newLink.url,
      icon: newLink.icon,
      position,
    });

    if (error) {
      toast.error('লিংক যোগ করতে সমস্যা হয়েছে');
    } else {
      toast.success('লিংক যোগ হয়েছে!');
      setNewLink({ title: '', url: '', icon: 'link' });
      queryClient.invalidateQueries({ queryKey: ['links'] });
    }
  };

  const handleToggleLink = async (linkId: string, isActive: boolean) => {
    const { error } = await supabase
      .from('links')
      .update({ is_active: isActive })
      .eq('id', linkId);

    if (error) {
      toast.error('লিংক আপডেট করতে সমস্যা হয়েছে');
    } else {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    const { error } = await supabase.from('links').delete().eq('id', linkId);

    if (error) {
      toast.error('লিংক মুছতে সমস্যা হয়েছে');
    } else {
      toast.success('লিংক মুছে ফেলা হয়েছে');
      queryClient.invalidateQueries({ queryKey: ['links'] });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">লোড হচ্ছে...</div>
      </div>
    );
  }

  const initials = profileForm.display_name
    ? profileForm.display_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0].toUpperCase() || '?';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Link2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">Bio Link</span>
          </div>
          
          <div className="flex items-center gap-4">
            {profile?.username && (
              <Button variant="ghost" size="sm" asChild>
                <a href={`/${profile.username}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  প্রিভিউ
                </a>
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Section */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <CardTitle>প্রোফাইল সেটআপ</CardTitle>
              </div>
              <CardDescription>আপনার Bio Link প্রোফাইল কাস্টমাইজ করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Avatar className="w-24 h-24 border-4 border-border">
                  <AvatarImage src={profileForm.avatar_url} />
                  <AvatarFallback className="text-xl font-bold gradient-bg text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar_url">অবতার URL</Label>
                <Input
                  id="avatar_url"
                  placeholder="https://example.com/avatar.jpg"
                  value={profileForm.avatar_url}
                  onChange={(e) => setProfileForm({ ...profileForm, avatar_url: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">ইউজারনেম</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-input bg-muted text-sm text-muted-foreground">
                    /
                  </span>
                  <Input
                    id="username"
                    placeholder="yourname"
                    value={profileForm.username}
                    onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                    className="rounded-l-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_name">প্রদর্শন নাম</Label>
                <Input
                  id="display_name"
                  placeholder="Your Name"
                  value={profileForm.display_name}
                  onChange={(e) => setProfileForm({ ...profileForm, display_name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">বায়ো</Label>
                <Textarea
                  id="bio"
                  placeholder="আপনার সম্পর্কে কিছু লিখুন..."
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  rows={3}
                />
              </div>

              <Button 
                variant="gradient" 
                className="w-full"
                onClick={profile ? handleUpdateProfile : handleCreateProfile}
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'সেভ হচ্ছে...' : profile ? 'আপডেট করুন' : 'প্রোফাইল তৈরি করুন'}
              </Button>
            </CardContent>
          </Card>

          {/* Links Section */}
          <div className="space-y-6">
            {/* Add New Link */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  <CardTitle>নতুন লিংক যোগ করুন</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>আইকন</Label>
                  <Select
                    value={newLink.icon}
                    onValueChange={(value) => setNewLink({ ...newLink, icon: value as SocialPlatform })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <SocialIcon icon={option.value} className="w-4 h-4" />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link_title">টাইটেল</Label>
                  <Input
                    id="link_title"
                    placeholder="আমার Facebook পেজ"
                    value={newLink.title}
                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link_url">URL</Label>
                  <Input
                    id="link_url"
                    placeholder="https://facebook.com/yourpage"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  />
                </div>

                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={handleAddLink}
                  disabled={!profile}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  লিংক যোগ করুন
                </Button>
              </CardContent>
            </Card>

            {/* Links List */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <CardTitle>আপনার লিংকসমূহ</CardTitle>
                </div>
                <CardDescription>ক্লিক অ্যানালিটিক্স সহ</CardDescription>
              </CardHeader>
              <CardContent>
                {linksLoading ? (
                  <div className="text-center py-4 text-muted-foreground">লোড হচ্ছে...</div>
                ) : links && links.length > 0 ? (
                  <div className="space-y-3">
                    {links.map((link) => (
                      <div
                        key={link.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 group"
                      >
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                        
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <SocialIcon icon={link.icon} className="w-5 h-5 text-primary" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{link.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{link.url}</p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <BarChart3 className="w-4 h-4" />
                          <span>{link.click_count}</span>
                        </div>

                        <Switch
                          checked={link.is_active}
                          onCheckedChange={(checked) => handleToggleLink(link.id, checked)}
                        />

                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                          onClick={() => handleDeleteLink(link.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Link2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>এখনো কোনো লিংক নেই</p>
                    <p className="text-sm">উপরে নতুন লিংক যোগ করুন</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
