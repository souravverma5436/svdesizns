import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import projects from '../data/projects'

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'Logo Design', name: 'Logo Design' },
    { id: 'Branding', name: 'Branding' },
    { id: 'Social Media Creatives', name: 'Social Media' },
    { id: 'Posters & Ads', name: 'Posters & Ads' },
    { id: 'Websites', name: 'Websites' }
  ]

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  const openModal = (project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'unset'
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('project')
    setSearchParams(nextParams, { replace: true })
  }

  const nextProject = () => {
    const idx = projects.findIndex(p => p.id === selectedProject.id)
    setSelectedProject(projects[(idx + 1) % projects.length])
  }

  const prevProject = () => {
    const idx = projects.findIndex(p => p.id === selectedProject.id)
    setSelectedProject(projects[idx === 0 ? projects.length - 1 : idx - 1])
  }

  useEffect(() => {
    const projectId = Number(searchParams.get('project'))

    if (!projectId) return

    const matchedProject = projects.find((project) => project.id === projectId)
    if (matchedProject) {
      setSelectedCategory('all')
      openModal(matchedProject)
    }
  }, [searchParams])

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

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
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8" layout>
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
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
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
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
                        <span key={tag} className="px-2 sm:px-3 py-1 bg-dark-lighter rounded-full text-xs sm:text-sm text-gray-300">
                          {tag}
                        </span>
                      ))}
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
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              className="relative glass rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-dark-light rounded-full flex items-center justify-center cursor-hover hover:bg-primary transition-colors"
              >
                <span className="text-white text-lg sm:text-xl">×</span>
              </button>

              {projects.length > 1 && (
                <>
                  <button onClick={prevProject} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-dark-light rounded-full flex items-center justify-center cursor-hover hover:bg-primary transition-colors">
                    <span className="text-white text-sm sm:text-base">‹</span>
                  </button>
                  <button onClick={nextProject} className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-dark-light rounded-full flex items-center justify-center cursor-hover hover:bg-primary transition-colors">
                    <span className="text-white text-sm sm:text-base">›</span>
                  </button>
                </>
              )}

              <div className="bg-black flex items-center justify-center">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gradient mb-3 sm:mb-4">
                  {selectedProject.title}
                </h2>
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
                {selectedProject.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-xs sm:text-sm font-medium">
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
