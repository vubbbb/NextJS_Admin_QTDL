import axios from 'axios'
import { HOST } from '../utils/constants'


const apiClient = axios.create({
    baseURL: HOST,
})

// Tùy chọn thêm header Authorization nếu cần
apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default apiClient;

