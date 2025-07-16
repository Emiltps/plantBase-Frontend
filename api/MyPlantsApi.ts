import axios from 'axios';
import Constants from 'expo-constants';
import { supabase } from './supabaseClient';

export type Plant = {
  plant_id: number;
  nickname: string;
  profile_description: string;
  photo_url?: string;
  owner_id: string;
  plant_type_id: string;
  notes?: string;
  status: string;
  created_at: string;
  died_at: string | null;
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

export async function getUserPlants(userId: any) {
  const headers = await getAuthHeaders();
  return axios.get<{ plants: Plant[] }>(`${API_BASE}/api/users/${userId}/plants`, { headers });
}

export async function updatePlant(
  plantId: string,
  updates: {
    nickname?: string;
    notes?: string;
    status?: string;
  }
) {
  const headers = await getAuthHeaders();
  return axios.patch<{ plant: Plant }>(`${API_BASE}/api/plants/${plantId}`, updates, { headers });
}
