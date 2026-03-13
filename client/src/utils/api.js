import axios from 'axios'
import toast from 'react-hot-toast'

// Create centralized axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 8000, // Reduced to 8 seconds for faster failure
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('🔑 Token attached to request:', config.url)
    }
    return config
  },
  (error) => {
    console.error('❌ Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.response?.data)
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      console.log('🚪 Unauthorized - clearing token and redirecting to login')
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      window.dispatchEvent(new Event('storage')) // Trigger navbar update
      window.location.href = '/admin/login'
      toast.error('Session expired. Please login again.')
      return Promise.reject(error)
    }
    
    if (error.response?.status === 403) {
      toast.error('Access denied. Insufficient permissions.')
      return Promise.reject(error)
    }
    
    // Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.')
      return Promise.reject(error)
    }
    
    return Promise.reject(error)
  }
)

// API methods
export const apiClient = {
  // Health check
  health: () => api.get('/api/health'),
  
  // Contact endpoints
  submitContact: (data) => api.post('/api/contact', data),
  
  // Public endpoints
  getPortfolio: () => api.get('/api/portfolio'),
  getServices: () => api.get('/api/services'),
  
  // Auth endpoints
  adminLogin: (credentials) => api.post('/api/admin/login', credentials),
  
  // Admin endpoints (protected)
  getStats: () => api.get('/api/admin/stats'),
  getMessages: (params) => api.get('/api/admin/messages', { params }),
  updateMessageStatus: (id, status) => api.patch(`/api/admin/messages/${id}/status`, { status }),
  deleteMessage: (id) => api.delete(`/api/admin/messages/${id}`),
  
  // Portfolio management (protected)
  getAdminPortfolio: () => api.get('/api/admin/portfolio'),
  createPortfolio: (data) => api.post('/api/admin/portfolio', data),
  updatePortfolio: (id, data) => api.put(`/api/admin/portfolio/${id}`, data),
  deletePortfolio: (id) => api.delete(`/api/admin/portfolio/${id}`),
  
  // Services management (protected)
  getAdminServices: () => api.get('/api/admin/services'),
  createService: (data) => api.post('/api/admin/services', data),
  updateService: (id, data) => api.put(`/api/admin/services/${id}`, data),
  deleteService: (id) => api.delete(`/api/admin/services/${id}`),
  
  // Image upload (protected)
  uploadImage: (formData) => api.post('/api/admin/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export default api