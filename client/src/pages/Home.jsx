import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { brandAnimations, viewportAnimations, animationUtils } from '../utils/animations'
import { apiClient } from '../utils/api'

const Home = () => {
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0
  })
  const [featuredProjects, setFeaturedProjects] = useState([])

  // Fetch featured projects (2 websites + 1 poster) with caching
  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        // Check cache first
        const cached = sessionStorage.getItem('featuredProjects')
        if (cached) {
          setFeaturedProjects(JSON.parse(cached))
          return
        }

        const response = await apiClient.getPortfolio()
        const allProjects = response.data.data || []
        
        // Get 2 websites and 1 poster
        const websites = allProjects.filter(p => p.category === 'Websites').slice(0, 2)
        const posters = allProjects.filter(p => p.category === 'Posters & Ads').slice(0, 1)
        
        const featured = [...websites, ...posters]
        setFeaturedProjects(featured)
        
        // Cache for session
        sessionStorage.setItem('featuredProjects', JSON.stringify(featured))
      } catch (error) {
        console.error('Error fetching featured projects:', error)
      }
    }
    
    fetchFeaturedProjects()
  }, [])

  // Suppress THREE.js console errors
  useEffect(() => {
    const originalError = console.error
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('THREE.BufferGeometry') || 
         args[0].includes('Computed radius is NaN'))
      ) {
        return // Suppress THREE.js errors
      }
      originalError.apply(console, args)
    }
    return () => {
      console.error = originalError
    }
  }, [])

  useEffect(() => {
    const animateCounters = () => {
      const targets = { projects: 150, clients: 50, experience: 3 }
      const duration = 1000 // Reduced from 2000ms to 1000ms
      const steps = 40 // Reduced from 60 to 40
      const stepTime = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setCounters({
          projects: Math.floor(targets.projects * progress),
          clients: Math.floor(targets.clients * progress),
          experience: Math.floor(targets.experience * progress)
        })

        if (currentStep >= steps) {
          clearInterval(interval)
          setCounters(targets)
        }
      }, stepTime)
    }

    const timer = setTimeout(animateCounters, 500) // Reduced from 1000ms to 500ms
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center w-full">
          <motion.div
            {...brandAnimations.slideInUp}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
              {...brandAnimations.textReveal}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="text-white">Hi, I'm </span>
              <br className="sm:hidden" />
              <span className="text-gradient">Sourav Verma</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 leading-relaxed"
              {...brandAnimations.textReveal}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Creative Graphic Designer & Visual Storyteller
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.button
                onClick={() => scrollToSection('portfolio')}
                className="btn-primary cursor-hover w-full sm:w-auto min-w-[160px]"
                {...brandAnimations.buttonPrimary}
              >
                View Portfolio
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="btn-secondary cursor-hover w-full sm:w-auto min-w-[160px]"
                {...brandAnimations.buttonSecondary}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Enhanced Floating 3D Elements - Hidden on mobile */}
          <motion.div
            className="hidden lg:block absolute top-20 left-10 w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20"
            {...brandAnimations.floating}
            style={{ animationDelay: '0s' }}
          />
          <motion.div
            className="hidden lg:block absolute bottom-20 right-10 w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-r from-secondary to-accent rounded-lg opacity-20"
            {...brandAnimations.floating}
            style={{ animationDelay: '2s' }}
          />
          <motion.div
            className="hidden xl:block absolute top-1/3 right-20 w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-r from-accent to-primary rounded-full opacity-15"
            {...brandAnimations.pulse}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            {...brandAnimations.staggerContainer}
            {...viewportAnimations.fadeInUp}
          >
            <motion.div 
              className="text-center glass rounded-xl sm:rounded-2xl p-6 sm:p-8 card-hover cursor-hover"
              {...brandAnimations.staggerItem}
              {...brandAnimations.cardHover}
              {...brandAnimations.glowHover}
            >
              <motion.div
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-2"
                {...brandAnimations.counter}
                transition={{ delay: 0.2 }}
              >
                {counters.projects}+
              </motion.div>
              <p className="text-gray-300 text-sm sm:text-base">Projects Completed</p>
            </motion.div>

            <motion.div 
              className="text-center glass rounded-xl sm:rounded-2xl p-6 sm:p-8 card-hover cursor-hover"
              {...brandAnimations.staggerItem}
              {...brandAnimations.cardHover}
              {...brandAnimations.glowHover}
            >
              <motion.div
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-2"
                {...brandAnimations.counter}
                transition={{ delay: 0.4 }}
              >
                {counters.clients}+
              </motion.div>
              <p className="text-gray-300 text-sm sm:text-base">Happy Clients</p>
            </motion.div>

            <motion.div 
              className="text-center glass rounded-xl sm:rounded-2xl p-6 sm:p-8 card-hover cursor-hover sm:col-span-1 col-span-1"
              {...brandAnimations.staggerItem}
              {...brandAnimations.cardHover}
              {...brandAnimations.glowHover}
            >
              <motion.div
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-2"
                {...brandAnimations.counter}
                transition={{ delay: 0.6 }}
              >
                {counters.experience}+
              </motion.div>
              <p className="text-gray-300 text-sm sm:text-base">Years Experience</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section id="portfolio" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-4">
              Featured Work
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Explore some of my recent design projects and creative solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  className="glass rounded-xl sm:rounded-2xl overflow-hidden card-hover cursor-hover"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-800">
                    <img
                      src={project.imageData ? `data:${project.imageType || 'image/jpeg'};base64,${project.imageData}` : project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold">{project.title}</h3>
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base line-clamp-2">{project.description}</p>
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-primary hover:text-secondary transition text-sm"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              // Fallback placeholders while loading
              [1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  className="glass rounded-xl sm:rounded-2xl overflow-hidden card-hover cursor-hover"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: item * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-primary to-secondary opacity-80 animate-pulse" />
                  <div className="p-4 sm:p-6">
                    <div className="h-6 bg-gray-700 rounded mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-700 rounded animate-pulse" />
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <motion.div
            className="text-center mt-8 sm:mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link to="/portfolio" className="btn-primary cursor-hover">
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-4 sm:mb-6">
              Let's Create Something Amazing
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Ready to bring your vision to life? Let's discuss your next project
            </p>
            <Link to="/contact" className="btn-primary cursor-hover">
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home