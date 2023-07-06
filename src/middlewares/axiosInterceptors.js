import axios from 'axios';
import Cookies from 'universal-cookie/es6';

axios.interceptors.request.use((config) => {
  const cookies = new Cookies();
  if (cookies.get('auth-token')) config.headers['auth-token'] = cookies.get('auth-token');
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 419) {
      const cookies = new Cookies();
      await cookies.remove('user', { path: '/' });
      await cookies.remove('role', { path: '/' });
      await cookies.remove('auth-token', { path: '/' });
      window.location = '/login';
    }
    return Promise.reject(error);
  },
);
