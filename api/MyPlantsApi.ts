import axios from 'axios';

const api = axios.create({
  baseURL: 'https://plantbase-be.onrender.com/', //admend once hosted
  timeout: 9000,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

const getPlants = (userId: string) => api.get(`/api/${userId}/plants`);

export default getPlants;
