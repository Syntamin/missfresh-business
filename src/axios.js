import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use((config) => config, (error) => Promise.reject(error));
// console.log(config);
// do some thing to judge which if needs appkey

instance.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response.data;
  }
  return response;
}, (error) => Promise.reject(error));

export default instance;
