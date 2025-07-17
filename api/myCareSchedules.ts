import axios from 'axios'
import Constants from 'expo-constants'
import { supabase } from './supabaseClient'

export type TaskType = 'water' | 'fertilise' | 'prune' | 'other'

const API_BASE = Constants.expoConfig?.extra?.apiBaseUrl

async function getAuthHeaders() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return {
    Authorization: `Bearer ${session?.access_token}`,
  }
}

export const updateSchedule = async (
  careScheduleId: number,
  updates: {
    task_type?: TaskType
    interval_days?: number
    next_due?: string
  }
) => {
  const headers = await getAuthHeaders()
  const url = `${API_BASE}/api/care_schedules/${careScheduleId}`

  const response = await axios.patch(url, updates, { headers })
  return response.data
}

export const createSchedule = async (
  plantId: number,
  schedule: {
    task_type: TaskType;
    interval_days: number;
    next_due: string;
  }
) => {
  const headers = await getAuthHeaders()
  const url = `${API_BASE}/api/plants/${plantId}/care_schedules`

  try {
    const response = await axios.post(url, schedule, { headers })
    return response.data
  } catch (error: any) {
    throw error
  }
}
