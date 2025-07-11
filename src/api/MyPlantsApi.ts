import axios from 'axios';

const api = axios.create({
  baseURL: 'http://superbase/api', //admend once hosted
  timeout: 9000,
});

const getPlants = () => api.get('/plants');

export default getPlants;
