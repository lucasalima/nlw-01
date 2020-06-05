import axios from 'axios';

const api = axios.create({
  baseURL: 'http://2b43dc958de1.ngrok.io',
});

export default api;
