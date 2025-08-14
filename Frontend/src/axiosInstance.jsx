import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `https://pokak-task-manager.onrender.com` ,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
