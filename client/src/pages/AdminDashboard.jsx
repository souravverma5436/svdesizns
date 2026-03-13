import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { apiClient } from '../utils/api'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('messages')
  const [expandedMessage, setExpandedMessage] = useState(null)
  const [stats, setStats] = useState(null)
  const [messages, setMessages] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: 'all',
    service: 'all',
    search: '',
    page: 1
  })
  const [pagination, setPagination] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('') // 'portfolio' or 'service'
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageUploadMethod, setImageUploadMethod] = useState('url') // 'url' or 'upload'
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
      return
    }
    
    fetchStats()
    if (activeTab === 'messages') {
      fetchMessages()
    } else if (activeTab === 'portfolio') {
      fetchPortfolio()
    } else if (activeTab === 'services') {
      fetchServices()
    }
  }, [filters, navigate, activeTab])

  const fetchStats = async () => {
    try {
      const response = await apiClient.getStats()
      setStats(response.data.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
      // Error handling is done in the API interceptor
    }
  }

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const params = {}
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') params[key] = value
      })

      const response = await apiClient.getMessages(params)
      setMessages(response.data.data.messages)
      setPagination(response.data.data.pagination)
    } catch (error) {
      console.error('Error fetching messages:', error)
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const fetchPortfolio = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getAdminPortfolio()
      setPortfolio(response.data.data || [])
    } catch (error) {
      console.error('Error fetching portfolio:', error)
      toast.error('Failed to load portfolio')
    } finally {
      setLoading(false)
    }
  }

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getAdminServices()
      setServices(response.data.data || [])
    } catch (error) {
      console.error('Error fetching services:', error)
      toast.error('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (messageId, newStatus) => {
    try {
      await apiClient.updateMessageStatus(messageId, newStatus)
      toast.success('Status updated successfully')
      fetchMessages()
      fetchStats()
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      return
    }

    try {
      await apiClient.deleteMessage(messageId)
      toast.success('Message deleted successfully')
      fetchMessages()
      fetchStats()
    } catch (error) {
      console.error('Error deleting message:', error)
      toast.error('Failed to delete message')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    // Trigger a storage event to update navbar
    window.dispatchEvent(new Event('storage'))
    toast.success('Logged out successfully')
    navigate('/')
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    try {
      setUploadingImage(true)
      const formDataToUpload = new FormData()
      formDataToUpload.append('image', file)

      const response = await apiClient.uploadImage(formDataToUpload)
      
      if (response.data.success) {
        // Update formData with image URL
        setFormData(prevData => ({ 
          ...prevData, 
          imageUrl: response.data.data.imageUrl
        }))
        toast.success('Image uploaded successfully!')
      }
    } catch (error) {
      console.error('Image upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  const openModal = (type, item = null) => {
    setModalType(type)
    setEditingItem(item)
    setImageUploadMethod('url') // Reset to URL method
    if (type === 'portfolio') {
      setFormData(item || {
        title: '',
        description: '',
        category: 'Logo Design',
        imageUrl: '',
        websiteUrl: '',
        tags: [],
        isActive: true
      })
    } else if (type === 'service') {
      setFormData(item || {
        name: '',
        description: '',
        priceINR: '',
        imageUrl: '',
        websiteUrl: '',
        features: [],
        isActive: true
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalType('')
    setEditingItem(null)
    setFormData({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (modalType === 'portfolio') {
        const portfolioData = {
          ...formData,
          tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(tag => tag.trim()) : formData.tags,
          websiteUrl: formData.websiteUrl || undefined, // Only include if provided
          imageUrl: formData.imageUrl // Always include imageUrl
        }
        
        console.log('📤 Submitting portfolio data:', portfolioData)
        
        if (editingItem) {
          const response = await apiClient.updatePortfolio(editingItem._id, portfolioData)
          console.log('✅ Update response:', response.data)
          toast.success('Portfolio item updated successfully')
        } else {
          await apiClient.createPortfolio(portfolioData)
          toast.success('Portfolio item created successfully')
        }
        
        // Clear cache to force refresh
        sessionStorage.removeItem('portfolioItems')
        sessionStorage.removeItem('portfolioItemsTime')
        sessionStorage.removeItem('featuredProjects')
        
        // Close modal first
        closeModal()
        
        // Then refresh portfolio list
        await fetchPortfolio()
      } else if (modalType === 'service') {
        // Handle "On Demand" pricing or numeric pricing
        const priceValue = formData.priceINR === 'On Demand' || formData.priceINR === 'on demand' 
          ? 'On Demand' 
          : parseFloat(formData.priceINR)
        
        const serviceData = {
          ...formData,
          priceINR: priceValue,
          features: typeof formData.features === 'string' ? formData.features.split(',').map(feature => feature.trim()) : formData.features,
          imageUrl: formData.imageUrl || undefined,
          websiteUrl: formData.websiteUrl || undefined
        }
        
        if (editingItem) {
          await apiClient.updateService(editingItem._id, serviceData)
          toast.success('Service updated successfully')
        } else {
          await apiClient.createService(serviceData)
          toast.success('Service created successfully')
        }
        
        // Close modal first
        closeModal()
        
        // Then refresh services list
        await fetchServices()
      }
    } catch (error) {
      console.error('Error saving item:', error)
      toast.error('Failed to save item')
    }
  }

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    
    try {
      if (type === 'portfolio') {
        await apiClient.deletePortfolio(id)
        toast.success('Portfolio item deleted successfully')
        fetchPortfolio()
      } else if (type === 'service') {
        await apiClient.deleteService(id)
        toast.success('Service deleted successfully')
        fetchServices()
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      toast.error('Failed to delete item')
    }
  }

  const StatCard = ({ title, value, color, icon }) => (
    <motion.div
      className="glass rounded-2xl p-4 sm:p-6 card-hover cursor-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-xs sm:text-sm">{title}</p>
          <p className={`text-2xl sm:text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`text-2xl sm:text-4xl ${color}`}>{icon}</div>
      </div>
    </motion.div>
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'text-yellow-400 bg-yellow-400/20'
      case 'read': return 'text-blue-400 bg-blue-400/20'
      case 'replied': return 'text-green-400 bg-green-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const tabs = [
    { id: 'messages', name: 'Messages', icon: '📧' },
    { id: 'portfolio', name: 'Portfolio', icon: '🎨' },
    { id: 'services', name: 'Services', icon: '⚡' }
  ]

  if (!stats) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gradient">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Manage your portfolio content</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary cursor-hover w-full sm:w-auto"
          >
            Logout
          </button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Total Messages"
            value={stats?.totalMessages || 0}
            color="text-primary"
            icon="📧"
          />
          <StatCard
            title="Portfolio Items"
            value={portfolio?.length || 0}
            color="text-secondary"
            icon="🎨"
          />
          <StatCard
            title="Services"
            value={services?.length || 0}
            color="text-accent"
            icon="⚡"
          />
          <StatCard
            title="Recent (7 days)"
            value={stats?.recentMessages || 0}
            color="text-green-400"
            icon="📈"
          />
        </div>

        {/* Tabs */}
        <motion.div
          className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 cursor-hover text-sm sm:text-base ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'glass text-gray-300 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'messages' && (
            <div>
              {/* Messages Filters */}
              <motion.div
                className="glass rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                      className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none cursor-hover text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Service</label>
                    <select
                      value={filters.service}
                      onChange={(e) => setFilters({ ...filters, service: e.target.value, page: 1 })}
                      className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none cursor-hover text-sm"
                    >
                      <option value="all">All Services</option>
                      <option value="Logo Design">Logo Design</option>
                      <option value="Branding">Branding</option>
                      <option value="Social Media Creatives">Social Media</option>
                      <option value="Posters & Ads">Posters & Ads</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2">Search</label>
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                      placeholder="Search by name, email, or message..."
                      className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none cursor-hover text-sm"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Messages Table */}
              <motion.div
                className="glass rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="p-4 sm:p-6 border-b border-gray-700">
                  <h2 className="text-xl sm:text-2xl font-semibold">Contact Messages</h2>
                </div>

                {loading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading messages...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-400">No messages found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-dark-lighter">
                        <tr>
                          <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                            Service
                          </th>
                          <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">
                            Message
                          </th>
                          <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                            Date
                          </th>
                          <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {messages.map((message) => (
                          <React.Fragment key={message._id}>
                            <motion.tr
                              className="hover:bg-dark-lighter/50 transition-colors cursor-pointer"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              onClick={() => setExpandedMessage(expandedMessage === message._id ? null : message._id)}
                            >
                              <td className="px-3 sm:px-6 py-4">
                                <div>
                                  <div className="font-medium text-white text-sm">{message.name}</div>
                                  <div className="text-xs text-gray-400 truncate max-w-[120px] sm:max-w-none">{message.email}</div>
                                  {message.phone && (
                                    <div className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-none">📱 {message.phone}</div>
                                  )}
                                </div>
                              </td>
                              <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">
                                <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">
                                  {message.service}
                                </span>
                              </td>
                              <td className="px-3 sm:px-6 py-4 hidden md:table-cell">
                                <div className="text-gray-300 text-sm">
                                  {expandedMessage === message._id ? (
                                    <div className="whitespace-pre-wrap">{message.message}</div>
                                  ) : (
                                    <div className="truncate max-w-md">
                                      {message.message}
                                    </div>
                                  )}
                                  <button className="text-primary text-xs mt-1 hover:underline">
                                    {expandedMessage === message._id ? '▲ Show less' : '▼ Show more'}
                                  </button>
                                </div>
                              </td>
                              <td className="px-3 sm:px-6 py-4">
                                <select
                                  value={message.status}
                                  onChange={(e) => {
                                    e.stopPropagation()
                                    handleStatusUpdate(message._id, e.target.value)
                                  }}
                                  className={`px-2 py-1 rounded-full text-xs border-0 cursor-hover ${getStatusColor(message.status)}`}
                                >
                                  <option value="new">New</option>
                                  <option value="read">Read</option>
                                  <option value="replied">Replied</option>
                                </select>
                              </td>
                              <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-400 hidden sm:table-cell">
                                {new Date(message.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-3 sm:px-6 py-4">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteMessage(message._id)
                                  }}
                                  className="text-red-500 hover:text-red-400 transition cursor-hover text-sm"
                                  title="Delete message"
                                >
                                  🗑️
                                </button>
                              </td>
                            </motion.tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="p-4 sm:p-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-xs sm:text-sm text-gray-400">
                      Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                      {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                      {pagination.total} results
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setFilters({ ...filters, page: pagination.page - 1 })}
                        disabled={pagination.page === 1}
                        className="px-3 py-1 bg-dark-lighter rounded cursor-hover disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setFilters({ ...filters, page: pagination.page + 1 })}
                        disabled={pagination.page === pagination.pages}
                        className="px-3 py-1 bg-dark-lighter rounded cursor-hover disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div>
              <motion.div
                className="glass rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="p-4 sm:p-6 border-b border-gray-700 flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-semibold">Portfolio Items</h2>
                  <button
                    onClick={() => openModal('portfolio')}
                    className="btn-primary cursor-hover"
                  >
                    Add Portfolio Item
                  </button>
                </div>

                {loading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading portfolio...</p>
                  </div>
                ) : portfolio.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-400">No portfolio items found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6">
                    {portfolio.map((item) => (
                      <motion.div
                        key={item._id}
                        className="glass rounded-xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="h-48 bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                          {item.imageUrl ? (
                            <img
                              src={`${item.imageUrl}${item.imageUrl.includes('?') ? '&' : '?'}t=${Date.now()}`}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              key={`${item._id}-${item.imageUrl}`}
                            />
                          ) : (
                            <span className="text-2xl font-bold text-white opacity-80">
                              {item.title.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2 text-sm sm:text-base">{item.title}</h3>
                          <p className="text-gray-400 text-xs sm:text-sm mb-2 line-clamp-2">{item.description}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">
                              {item.category}
                            </span>
                            {item.tags?.slice(0, 2).map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-dark-lighter rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openModal('portfolio', item)}
                              className="flex-1 px-3 py-1 bg-primary/20 text-primary rounded cursor-hover text-xs sm:text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete('portfolio', item._id)}
                              className="flex-1 px-3 py-1 bg-red-500/20 text-red-400 rounded cursor-hover text-xs sm:text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <motion.div
                className="glass rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="p-4 sm:p-6 border-b border-gray-700 flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-semibold">Services</h2>
                  <button
                    onClick={() => openModal('service')}
                    className="btn-primary cursor-hover"
                  >
                    Add Service
                  </button>
                </div>

                {loading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading services...</p>
                  </div>
                ) : services.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-400">No services found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6">
                    {services.map((service) => (
                      <motion.div
                        key={service._id}
                        className="glass rounded-xl p-4 sm:p-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          {service.category && (
                            <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">
                              {service.category}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{service.description}</p>
                        <div className="mb-3">
                          <span className="text-xl font-bold text-gradient">
                            ₹{service.priceINR?.toLocaleString('en-IN') || 'N/A'}
                          </span>
                        </div>
                        {service.features && service.features.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-2">Features:</p>
                            <div className="flex flex-wrap gap-1">
                              {service.features.slice(0, 3).map((feature, idx) => (
                                <span key={idx} className="px-2 py-1 bg-dark-lighter rounded-full text-xs">
                                  {feature}
                                </span>
                              ))}
                              {service.features.length > 3 && (
                                <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">
                                  +{service.features.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal('service', service)}
                            className="flex-1 px-3 py-2 bg-primary/20 text-primary rounded cursor-hover text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete('service', service._id)}
                            className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded cursor-hover text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Modal */}
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            <motion.div
              className="relative glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gradient">
                    {editingItem ? 'Edit' : 'Add'} {modalType === 'portfolio' ? 'Portfolio Item' : 'Service'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 bg-dark-light rounded-full flex items-center justify-center cursor-hover hover:bg-primary transition-colors"
                  >
                    <span className="text-white text-xl">×</span>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {modalType === 'portfolio' ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                          type="text"
                          value={formData.title || ''}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          value={formData.description || ''}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none h-24"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                          value={formData.category || 'Logo Design'}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none"
                          required
                        >
                          <option value="Logo Design">Logo Design</option>
                          <option value="Branding">Branding</option>
                          <option value="Social Media Creatives">Social Media Creatives</option>
                          <option value="Posters & Ads">Posters & Ads</option>
                          <option value="Websites">Websites</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Image</label>
                        
                        {/* Toggle between URL and Upload */}
                        <div className="flex gap-2 mb-3">
                          <button
                            type="button"
                            onClick={() => setImageUploadMethod('url')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              imageUploadMethod === 'url'
                                ? 'bg-primary text-white'
                                : 'bg-dark-lighter text-gray-400 hover:text-white'
                            }`}
                          >
                            🔗 Image URL
                          </button>
                          <button
                            type="button"
                            onClick={() => setImageUploadMethod('upload')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              imageUploadMethod === 'upload'
                                ? 'bg-primary text-white'
                                : 'bg-dark-lighter text-gray-400 hover:text-white'
                            }`}
                          >
                            📤 Upload Image
                          </button>
                        </div>

                        {imageUploadMethod === 'url' ? (
                          <>
                            <input
                              type="url"
                              value={formData.imageUrl || ''}
                              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                              className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none"
                              placeholder="https://example.com/image.jpg"
                              required={!editingItem}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Paste image URL from Imgur, Cloudinary, or any image hosting service
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80 cursor-pointer"
                                disabled={uploadingImage}
                              />
                              {uploadingImage && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full"></div>
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Upload image (max 5MB) - JPG, PNG, GIF, WebP
                            </p>
                            {formData.imageUrl && (
                              <div className="mt-2 p-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                                <p className="text-xs text-green-400">✓ Image uploaded successfully</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Website URL (Optional - for Websites category)</label>
                        <input
                          type="url"
                          value={formData.websiteUrl || ''}
                          onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none"
                          placeholder="https://example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags || ''}
                          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none"
                          placeholder="e.g., Logo, Branding, Modern"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Service Name</label>
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                          value={formData.category || 'Other'}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none"
                        >
                          <option value="Logo Design">Logo Design</option>
                          <option value="Branding">Branding</option>
                          <option value="Social Media Creatives">Social Media Creatives</option>
                          <option value="Posters & Ads">Posters & Ads</option>
                          <option value="Websites">Websites</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          value={formData.description || ''}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none h-24"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Price (INR or "On Demand")</label>
                        <input
                          type="text"
                          value={formData.priceINR || ''}
                          onChange={(e) => setFormData({ ...formData, priceINR: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none"
                          placeholder='Enter number or "On Demand" for websites'
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Enter a number for fixed pricing or "On Demand" for custom pricing
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Image URL (Optional)</label>
                        <input
                          type="url"
                          value={formData.imageUrl || ''}
                          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none"
                          placeholder="https://example.com/service-image.jpg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Website URL (Optional - for Websites service)</label>
                        <input
                          type="url"
                          value={formData.websiteUrl || ''}
                          onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none"
                          placeholder="https://example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Features (comma-separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(formData.features) ? formData.features.join(', ') : formData.features || ''}
                          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-lighter border border-gray-600 rounded-lg focus:border-primary focus:outline-none"
                          placeholder="e.g., Custom Design, Vector Files, Brand Guidelines"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive !== false}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-primary bg-dark-lighter border-gray-600 rounded focus:ring-primary"
                    />
                    <label htmlFor="isActive" className="text-sm">Active</label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg cursor-hover hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 btn-primary cursor-hover"
                    >
                      {editingItem ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard