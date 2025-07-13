import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL

export async function getAllPlants() {
    return [
    {
      plant_id: 1,
      nickname: 'Mock Fern',
      profile_description: 'Thrives in the shade',
      plant_type_id: 't1',
      photo_url: '',
      notes: 'Mist daily',
      status: 'ALIVE',
      created_at: '2025-07-01T08:00:00.000Z',
      died_at: null,
      owner_id: 'mock-user-id',
    },
  ]
    // const res = await axios.get(`${API_BASE_URL}/plants`)
    // return res.data.plants
}

export async function getNextDueForPlant(plantId: string) {
    const res = await axios.get(`${API_BASE_URL}/plants/${plantId}/care_schedules/next_due`)
    return res.data.nextDue
}