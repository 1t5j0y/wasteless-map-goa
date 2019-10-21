import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'

export default {
  addPoints (payload) {
    return axios.post('/map-points', payload);
  }
}