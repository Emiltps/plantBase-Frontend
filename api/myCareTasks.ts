import axios from 'axios';
import Constants from 'expo-constants';
import { supabase } from './supabaseClient';

export type CareTask = {
  care_tasks_id: number;
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

export const completeTask = async (careTaskId: number): Promise<void> => {
  const headers = await getAuthHeaders();
  await axios.patch(
    `${API_BASE}/api/care_tasks/${careTaskId}/complete`,
    { completed_at: new Date().toISOString() },
    { headers }
  );
};

export const uncompleteTask = async (careTaskId: number): Promise<void> => {
  const headers = await getAuthHeaders();
  await axios.patch(
    `${API_BASE}/api/care_tasks/${careTaskId}/complete`,
    { completed_at: null },
    { headers }
  );
};
