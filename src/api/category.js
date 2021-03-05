import axios from '../axios';

export default {
  getCategory(params) {
    return axios.get('/category/all', { params });
  },
};
