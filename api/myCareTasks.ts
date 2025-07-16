import axios from 'axios';
import Constants from 'expo-constants';
import { supabase } from './supabaseClient';

export type CareTask = {
  schedule_id: number;
  due_at: string;
  completed_at: string;
  created_at: string;
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

export const getMyCareTasks = async (userId: string) => {
  const headers = await getAuthHeaders();
  return await axios.get(`${API_BASE}/api/users/${userId}/care_tasks`, { headers });
};
