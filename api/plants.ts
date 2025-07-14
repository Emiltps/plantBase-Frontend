import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function getAllPlants() {
  return [
    {
      plant_id: 1,
      nickname: 'Mock Fern',
      profile_description: 'Thrives in the shade',
      plant_type_id: 't1',
      photo_url: 'https://dummyimage.com/600x600/9bc997/ffffff&text=Fern',
      notes: 'Mist daily',
      status: 'ALIVE',
      created_at: '2025-07-01T08:00:00.000Z',
      died_at: null,
      owner_id: 'mock-user-id',
    },
    {
      plant_id: 2,
      nickname: 'Desert Rose',
      profile_description: 'Prefers dry environments',
      plant_type_id: 't2',
      photo_url: 'https://dummyimage.com/600x600/ebc6c0/ffffff&text=Rose',
      notes: 'Water once every 2 weeks',
      status: 'ALIVE',
      created_at: '2025-07-02T09:30:00.000Z',
      died_at: null,
      owner_id: 'mock-user-id',
    },
    {
      plant_id: 3,
      nickname: 'Tropical Ivy',
      profile_description: 'Loves indirect sunlight',
      plant_type_id: 't3',
      photo_url: 'https://dummyimage.com/600x600/a7d8de/ffffff&text=Ivy',
      notes: 'Trim weekly',
      status: 'ALIVE',
      created_at: '2025-07-03T10:15:00.000Z',
      died_at: null,
      owner_id: 'mock-user-id',
    },
    {
      plant_id: 4,
      nickname: 'Snake Plant',
      profile_description: 'Low maintenance and air-purifying',
      plant_type_id: 't4',
      photo_url: 'https://dummyimage.com/600x600/c5e4a5/ffffff&text=Snake',
      notes: 'Avoid overwatering',
      status: 'ALIVE',
      created_at: '2025-07-04T11:45:00.000Z',
      died_at: null,
      owner_id: 'mock-user-id',
    },
    {
      plant_id: 5,
      nickname: 'Wilted Basil',
      profile_description: 'Forgotten in the sun too long',
      plant_type_id: 't5',
      photo_url: 'https://dummyimage.com/600x600/e3b7b7/ffffff&text=Basil',
      notes: 'Attempt revival with compost tea',
      status: 'DEAD',
      created_at: '2025-07-05T08:00:00.000Z',
      died_at: '2025-07-12T18:00:00.000Z',
      owner_id: 'mock-user-id',
    },
  ];
  // const res = await axios.get(`${API_BASE_URL}/plants`)
  // return res.data.plants
}

export async function getNextDueForPlant(plantId: string) {
  const res = await axios.get(`${API_BASE_URL}/plants/${plantId}/care_schedules/next_due`);
  return res.data.nextDue;
}


export async function createPlant(
  plant: {
    plant_type_id: string
    nickname: string
    photo_url?: string
    profile_description: string
    notes: string
    status?: string
    died_at?: string | null
  },
  token: string
) {
  const res = await axios.post(`${API_BASE_URL}/plants`, plant, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data.plant
}
