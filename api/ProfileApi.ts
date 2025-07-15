import axios from 'axios';
import Constants from 'expo-constants';
import { supabase } from './supabaseClient';

export type Profile = {
  username: string;
  profile_image: string;
};

const API_BASE = Constants.expoConfig?.extra?.apiBaseUrl;

async function getAuthHeaders() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    Authorization: `Bearer ${session?.access_token}`,
  };
}

export async function getProfile(userId: string) {
  const headers = await getAuthHeaders();
  return axios.get<{ profile: Profile }>(`${API_BASE}/api/users/${userId}/profile`, { headers });
}

export async function updateProfile(userId: string, data: Partial<Profile>) {
  const headers = await getAuthHeaders();
  return axios.patch(`${API_BASE}/api/users/${userId}/profile`, data, { headers });
}
