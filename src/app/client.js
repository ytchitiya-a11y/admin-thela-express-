import axios from 'axios';
import { auth } from '../firebase';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getStats = () => api.get('/admin/stats');
export const getAllOrders = () => api.get('/admin/orders');
export const getAllDeliveryPartners = () => api.get('/admin/delivery-partners');
export const getProducts = () => api.get('/products');

// formData must include: name, category, price, stock, image (file)
export const addProduct = (formData) => api.post('/admin/products', formData);
export const updateProduct = (id, formData) => api.put(`/admin/products/${id}`, formData);

export default api;
