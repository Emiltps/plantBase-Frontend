import axios from 'axios';

const api = axios.create({
  baseURL: 'https://plantbase-be.onrender.com/', //admend once hosted
  timeout: 9000,
});

const getPlants = (userId: string) => api.get(`/api/${userId}/plants`);

export default getPlants;
