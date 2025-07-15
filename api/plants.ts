import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function getAllPlants() {
  return [
    {
      plant_id: 1,
      nickname: 'Mock Fern',
      profile_description: 'Thrives in the shade',
      plant_type_id: 't1',
      photo_url: 'https://www.houseplant.co.uk/cdn/shop/files/Boston_Fern_Green_Moment_Indoor_Tropical_Houseplant.jpg?v=1737121676',
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
      photo_url: 'https://www.thespruce.com/thmb/M6SiFoORxKkHf5xXL5l95zXS9Xo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/grow-desert-rose-plants-indoors-1902974-hero-64a97e2c287a4da38dab14acd4bfb8c4.jpg',
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
      photo_url: 'https://www.livinghouse.ca/shared/media/products/89/main_image-1615843695.jpg',
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
      photo_url: 'https://media.houseandgarden.co.uk/photos/6736030759a56cf43ffed622/master/w_1600%2Cc_limit/517540986',
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
      photo_url: 'https://andreadekker.com/wp-content/uploads/2010/11/Wilted-Basil.jpg',
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
  userId: string,
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
  const res = await axios.post(`${API_BASE_URL}/users/${userId}/plants`, plant, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data.plant
}
