import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://my-project-d6i8e2-rita-cafe-api.tose.sh',
  timeout: 5000,
})

export const getCategories = () => api.get('/categories')
export const getCategoryBySlug = (slug) => api.get(`/categories?slug=${slug}`)
export const getMenuItems = () => api.get('/menuItems')
export const getMenuItemsByCategory = (slug) => api.get(`/menuItems?categorySlug=${slug}`)
export const getBanners = () => api.get('/banners')
export const getInfo = () => api.get('/info')
export const getTestimonials = () => api.get('/testimonials')

export default api