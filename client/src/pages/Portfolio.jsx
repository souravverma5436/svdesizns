import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { apiClient } from '../utils/api'

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [imageLoadingStates, setImageLoadingStates] = useState({})

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'Logo Design', name: 'Logo Design' },
    { id: 'Branding', name: 'Branding' },
    { id: 'Social Media Creatives', name: 'Social Media' },
    { id: 'Posters & Ads', name: 'Posters & Ads' },
    { id: 'Websites', name: 'Websites' }
  ]

  useEffect(() => {
    fetchPortfolioItems()
  }, [])

  const fetchPortfolioItems = async () => {
    // Show fallback data immediately while loading
    const fallbackProjects = [
      {
        _id: '1',
        title: 'Modern Tech Logo',
        category: 'Logo Design',
        description: 'Clean and modern logo design for a tech startup',
        imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
        tags: ['Logo', 'Branding', 'Tech']
      },
      {
        _id: '2',
        title: 'Restaurant Branding',
        category: 'Branding',
        description: 'Complete brand identity for a premium restaurant',
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
        tags: ['Branding', 'Identity', 'Food']
      },
      {
        _id: '3',
        title: 'Social Media Campaign',
        category: 'Social Media Creatives',
        description: 'Engaging social media graphics for fashion brand',
        imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
        tags: ['Social Media', 'Fashion', 'Campaign']
      },
      {
        _id: '7',
        title: 'Spark Soul',
        category: 'Websites',
        description: 'Modern spiritual wellness platform',
        imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop',
        websiteUrl: 'https://spark-soul.vercel.app/',
        tags: ['Website', 'React']
      }
    ]
    
    try {
      // Check cache first
      const cached = sessionStorage.getItem('portfolioItems')
      const cacheTime = sessionStorage.getItem('portfolioItemsTime')
      const now = Date.now()
      
      // Use cache if less than 5 minutes old
      if (cached && cacheTime && (now - parseInt(cacheTime)) < 300000) {
        const cachedData = JSON.parse(cached)
        setProjects(cachedData)
        setLoading(false)
        return
      }
      
      // Set fallback data immediately
      setProjects(fallbackProjects)
      setLoading(false)
      
      // Try to fetch real data
      const response = await apiClient.getPortfolio()
      const portfolioData = response.data.data || []
      
      if (portfolioData.length > 0) {
        setProjects(portfolioData)
        sessionStorage.setItem('portfolioItems', JSON.stringify(portfolioData))
        sessionStorage.setItem('portfolioItemsTime', now.toString())
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error)
      setLoading(false)
    }
  }
      // Fallback to demo data if API fails
      const fallbackProjects = [
        {
          _id: '1',
          title: 'Modern Tech Logo',
          category: 'Logo Design',
          description: 'Clean and modern logo design for a tech startup',
          imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
          tags: ['Logo', 'Branding', 'Tech']
        },
        {
          _id: '2',
          title: 'Restaurant Branding',
          category: 'Branding',
          description: 'Complete brand identity for a premium restaurant',
          imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
          tags: ['Branding', 'Identity', 'Food']
        },
        {
          _id: '3',
          title: 'Social Media Campaign',
          category: 'Social Media Creatives',
          description: 'Engaging social media graphics for fashion brand',
          imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
          tags: ['Social Media', 'Fashion', 'Campaign']
        },
        {
          _id: '4',
          title: 'Fitness App Logo',
          category: 'Logo Design',
          description: 'Dynamic logo design for fitness application',
          imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
          tags: ['Logo', 'App', 'Fitness']
        },
        {
          _id: '5',
          title: 'Coffee Shop Identity',
          category: 'Branding',
          description: 'Warm and inviting brand identity for coffee shop',
          imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
          tags: ['Branding', 'Coffee', 'Identity']
        },
        {
          _id: '6',
          title: 'Instagram Stories',
          category: 'Social Media Creatives',
          description: 'Creative Instagram story templates',
          imageUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop',
          tags: ['Social Media', 'Instagram', 'Templates']
        },
        {
          _id: '7',
          title: 'Spark Soul - Spiritual Wellness Platform',
          category: 'Websites',
          description: 'A modern spiritual wellness platform featuring meditation guides, mindfulness resources, and personal growth tools. Built with React and modern UI/UX principles.',
          imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop',
          websiteUrl: 'https://spark-soul.vercel.app/',
          tags: ['Website', 'React', 'Wellness', 'Modern Design', 'Responsive']
        },
        {
          _id: '8',
          title: 'DogPetel - Pet Care & Services',
          category: 'Websites',
          description: 'Comprehensive pet care platform offering veterinary services, pet supplies, and care tips. Features appointment booking and community forums.',
          imageUrl: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop',
          websiteUrl: 'https://dogpetel.vercel.app/',
          tags: ['Website', 'Pet Care', 'E-commerce', 'Community', 'Responsive']
        }
      ]
      setProjects(fallbackProjects)
      
      // Initialize loading states for fallback data
      const loadingStates = {}
      fallbackProjects.forEach(project => {
        loadingStates[project._id] = true
      })
      setImageLoadingStates(loadingStates)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const openModal = (project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'unset'
  }

  const nextProject = () => {
    const currentIndex = projects.findIndex(p => p._id === selectedProject._id)
    const nextIndex = (currentIndex + 1) % projects.length
    setSelectedProject(projects[nextIndex])
  }

  const prevProject = () => {
    const currentIndex = projects.findIndex(p => p._id === selectedProject._id)
    const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1
    setSelectedProject(projects[prevIndex])
  }

  const handleImageLoad = (projectId) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [projectId]: false
    }))
  }

  const handleImageError = (projectId) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [projectId]: false
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Header */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-4 sm:mb-6">
              My Portfolio
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Explore my creative journey through various design projects and visual solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 cursor-hover text-sm sm:text-base ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'glass text-gray-300 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            layout
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="glass rounded-xl sm:rounded-2xl overflow-hidden card-hover cursor-hover group"
                  onClick={() => openModal(project)}
                  whileHover={{ y: -10 }}
                >
                  {/* Project Image */}
                  <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
                    {/* Loading skeleton */}
                    {imageLoadingStates[project._id] && (
                      <div className="absolute inset-0 loading-skeleton" />
                    )}
                    
                    {/* Actual image */}
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          imageLoadingStates[project._id] ? 'opacity-0' : 'opacity-100'
                        }`}
                        loading="lazy"
                        onLoad={() => handleImageLoad(project._id)}
                        onError={() => handleImageError(project._id)}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white opacity-80">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-semibold text-sm sm:text-base bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                        View Project
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {project.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 sm:px-3 py-1 bg-dark-lighter rounded-full text-xs sm:text-sm text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags?.length > 3 && (
                        <span className="px-2 sm:px-3 py-1 bg-dark-lighter rounded-full text-xs sm:text-sm text-gray-300">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* Modal Content */}
            <motion.div
              className="relative glass rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-dark-light rounded-full flex items-center justify-center cursor-hover hover:bg-primary transition-colors"
              >
                <span className="text-white text-lg sm:text-xl">×</span>
              </button>

              {/* Navigation Buttons */}
              {projects.length > 1 && (
                <>
                  <button
                    onClick={prevProject}
                    className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-dark-light rounded-full flex items-center justify-center cursor-hover hover:bg-primary transition-colors"
                  >
                    <span className="text-white text-sm sm:text-base">‹</span>
                  </button>
                  <button
                    onClick={nextProject}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-dark-light rounded-full flex items-center justify-center cursor-hover hover:bg-primary transition-colors"
                  >
                    <span className="text-white text-sm sm:text-base">›</span>
                  </button>
                </>
              )}

              {/* Project Image */}
              <div className="h-48 sm:h-64 lg:h-96 bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center overflow-hidden">
                {selectedProject.imageUrl ? (
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white opacity-80">
                    {selectedProject.title.charAt(0)}
                  </span>
                )}
              </div>

              {/* Project Details */}
              <div className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gradient mb-3 sm:mb-4">
                  {selectedProject.title}
                </h2>
                
                {/* Website Link for Website category */}
                {selectedProject.websiteUrl && (
                  <a
                    href={selectedProject.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all cursor-hover"
                  >
                    🌐 Visit Website
                  </a>
                )}
                
                <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6">
                  {selectedProject.description}
                </p>
                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-xs sm:text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-gray-400 text-sm sm:text-base">
                  <p className="mb-3 sm:mb-4">
                    This project showcases expertise in {selectedProject.category} design, 
                    combining creativity with strategic thinking to deliver impactful visual solutions.
                  </p>
                  <p>
                    The design process involved extensive research, conceptualization, and refinement 
                    to ensure the final result perfectly aligns with the client's vision and brand identity.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Portfolio