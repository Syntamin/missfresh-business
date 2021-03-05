import axios from '../axios';

export default {
  searchProductsAll(params) {
    return axios.get('/products/all', { params });
  },
  removeProduct(params) {
    return axios.delete(`/products/${params}`);
  },
  addProduct(params) {
    return axios.post('/products/add', params);
  },
  detailProduct(params) {
    return axios.get(`/products/${params}`);
  },
  editProduct(params) {
    return axios.put('/products/edit', params);
  },
};
