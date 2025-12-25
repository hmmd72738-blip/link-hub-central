import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Profile, Link } from '@/types/biolink';

export function useProfile(username: string) {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();
      
      if (error) throw error;
      return data as Profile;
    },
    enabled: !!username,
  });
}

export function useProfileByUserId(userId: string | undefined) {
  return useQuery({
    queryKey: ['profile', 'user', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data as Profile | null;
    },
    enabled: !!userId,
  });
}

export function useLinks(profileId: string | undefined) {
  return useQuery({
    queryKey: ['links', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('profile_id', profileId)
        .eq('is_active', true)
        .order('position', { ascending: true });
      
      if (error) throw error;
      return data as Link[];
    },
    enabled: !!profileId,
  });
}

export function useAllLinks(profileId: string | undefined) {
  return useQuery({
    queryKey: ['links', 'all', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('profile_id', profileId)
        .order('position', { ascending: true });
      
      if (error) throw error;
      return data as Link[];
    },
    enabled: !!profileId,
  });
}
