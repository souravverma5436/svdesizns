import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { apiClient } from '../utils/api'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getServices()
      setServices(response.data.data || [])
    } catch (error) {
      console.error('Error fetching services:', error)
      // Fallback to default services if API fails
      const fallbackServices = [
        {
          _id: '1',
          name: 'Logo Design',
          description: 'Create memorable and impactful logos that represent your brand identity perfectly',
          priceINR: 4150,
          features: ['Custom Logo Design', 'Multiple Concepts', 'Vector Files', 'Brand Guidelines']
        },
        {
          _id: '2',
          name: 'Branding',
          description: 'Complete brand identity solutions including logo, colors, typography, and guidelines',
          priceINR: 16600,
          features: ['Logo Design', 'Color Palette', 'Typography', 'Brand Guidelines', 'Business Cards']
        },
        {
          _id: '3',
          name: 'Social Media Creatives',
          description: 'Eye-catching social media graphics that boost engagement and brand awareness',
          priceINR: 2490,
          features: ['Instagram Posts', 'Story Templates', 'Facebook Covers', 'LinkedIn Graphics']
        },
        {
          _id: '4',
          name: 'Posters & Ads',
          description: 'Compelling poster designs and advertisements that capture attention and drive action',
          priceINR: 3320,
          features: ['Event Posters', 'Print Ads', 'Digital Banners', 'Promotional Materials']
        },
        {
          _id: '5',
          name: 'Website Development',
          description: 'Professional website design and development services. From landing pages to full-featured web applications, built with modern technologies and best practices.',
          priceINR: 15000,
          features: ['Responsive Design', 'Modern UI/UX', 'SEO Optimized', 'Fast Loading', 'Mobile Friendly', 'Custom Development']
        }
      ]
      setServices(fallbackServices)
    } finally {
      setLoading(false)
    }
  }

  const getServiceIcon = (serviceName) => {
    const icons = {
      'Logo Design': '🎨',
      'Branding': '🏢',
      'Social Media Creatives': '📱',
      'Posters & Ads': '📢',
      'Websites': '🌐',
      'Website Development': '💻'
    }
    return icons[serviceName] || '✨'
  }

  const getServiceGradient = (index) => {
    const gradients = [
      'from-primary to-secondary',
      'from-secondary to-accent',
      'from-accent to-primary',
      'from-primary via-secondary to-accent'
    ]
    return gradients[index % gradients.length]
  }

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'Understanding your brand, goals, and target audience'
    },
    {
      step: '02',
      title: 'Concept',
      description: 'Creating initial design concepts and ideas'
    },
    {
      step: '03',
      title: 'Design',
      description: 'Developing and refining the chosen concept'
    },
    {
      step: '04',
      title: 'Delivery',
      description: 'Final files and brand guidelines delivery'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading services...</p>
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
              My Services
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Professional design services to elevate your brand and create lasting impressions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 card-hover cursor-hover group relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getServiceGradient(index)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Service Icon */}
                <motion.div
                  className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {getServiceIcon(service.name)}
                </motion.div>

                {/* Service Content */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                
                {/* Website Link if available */}
                {service.websiteUrl && (
                  <a
                    href={service.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-primary/20 text-primary rounded-full text-xs sm:text-sm font-medium hover:bg-primary/30 transition-all cursor-hover"
                  >
                    🌐 View Example
                  </a>
                )}
                
                {/* Service Image if available */}
                {service.imageUrl && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-32 sm:h-40 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                
                <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-4 sm:mb-6">
                  {service.features?.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center text-gray-400 text-sm sm:text-base"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + idx * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Price and CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xl sm:text-2xl font-bold text-gradient">
                      {typeof service.priceINR === 'string' 
                        ? service.priceINR 
                        : `₹${service.priceINR?.toLocaleString('en-IN') || 'Contact for pricing'}`
                      }
                    </div>
                    <div className="text-sm text-gray-400">
                      {typeof service.priceINR === 'string' ? 'Custom pricing' : 'Starting from'}
                    </div>
                  </div>
                  <motion.button
                    className="btn-primary w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Navigate to contact page with service pre-selected
                      window.location.href = `/contact?service=${encodeURIComponent(service.name)}`
                    }}
                  >
                    Get Started
                  </motion.button>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${getServiceGradient(index)} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-dark-light/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-4">
              My Design Process
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-4">
              A structured approach to ensure every project delivers exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Step Number */}
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.step}
                </motion.div>

                {/* Step Content */}
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{item.description}</p>

                {/* Connection Line - Hidden on mobile */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 sm:top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-4 sm:mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Let's discuss your design needs and create something amazing together
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <motion.a
                href="/contact"
                className="btn-primary cursor-hover w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
              </motion.a>
              <motion.a
                href="https://instagram.com/sv_desizns"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary cursor-hover w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
            </div>
          </motion.div>

          {/* Floating Elements - Hidden on mobile */}
          <motion.div
            className="hidden sm:block absolute top-20 left-10 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20"
            animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="hidden sm:block absolute bottom-20 right-10 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-secondary to-accent rounded-lg opacity-20"
            animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>
    </div>
  )
}

export default Services