import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { brandAnimations, viewportAnimations } from '../utils/animations'
import { featuredProjects } from '../data/projects'

const Home = () => {
  const [counters, setCounters] = useState({ projects: 0, clients: 0, experience: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    const targets = { projects: 150, clients: 50, experience: 3 }
    const steps = 40
    const stepTime = 1000 / steps
    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      setCounters({
        projects: Math.floor(targets.projects * progress),
        clients: Math.floor(targets.clients * progress),
        experience: Math.floor(targets.experience * progress)
      })
      if (currentStep >= steps) { clearInterval(interval); setCounters(targets) }
    }, stepTime)
    const timer = setTimeout(() => {}, 500)
    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const openFeaturedProject = (project) => {
    if (!project) return

    if (project.websiteUrl) {
      window.open(project.websiteUrl, '_blank', 'noopener,noreferrer')
      return
    }

    navigate(`/portfolio?project=${project.id}`)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="ambient-float absolute left-[10%] top-24 h-32 w-32 rounded-full bg-primary/15 blur-3xl" />
          <div className="ambient-float absolute right-[12%] top-40 h-40 w-40 rounded-full bg-secondary/12 blur-3xl [animation-delay:1.2s]" />
          <div className="ambient-float absolute bottom-20 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl [animation-delay:2.2s]" />
        </div>

        <div className="max-w-6xl mx-auto text-center w-full relative scene-3d">
          <motion.div
            {...brandAnimations.slideInUp}
            className="preserve-3d relative"
            style={{ transformPerspective: 1400 }}
          >
            <motion.h1
              className="layer-depth-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
              {...brandAnimations.textReveal}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="text-white">Hi, I'm </span>
              <br className="sm:hidden" />
              <span className="text-gradient">Sourav Verma</span>
            </motion.h1>

            <motion.p
              className="layer-depth-1 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 leading-relaxed"
              {...brandAnimations.textReveal}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Creative Graphic Designer & Visual Storyteller
            </motion.p>

            <motion.div
              className="layer-depth-1 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
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

            <motion.div
              className="hidden xl:flex absolute left-0 top-10 glass rounded-2xl px-4 py-3 card-3d preserve-3d"
              initial={{ opacity: 0, x: -40, rotateY: 16 }}
              animate={{ opacity: 1, x: 0, rotateY: -10, y: [0, -10, 0] }}
              transition={{ delay: 0.55, duration: 0.9, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
              style={{ transformPerspective: 1200 }}
            >
              <div className="layer-depth-1 text-left">
                <p className="text-xs uppercase tracking-[0.25em] text-primary/80">Creative Focus</p>
                <p className="mt-2 text-sm font-semibold text-white">Branding + Web Presence</p>
              </div>
            </motion.div>

            <motion.div
              className="hidden xl:flex absolute right-0 bottom-6 glass rounded-2xl px-4 py-3 card-3d preserve-3d"
              initial={{ opacity: 0, x: 40, rotateY: -16 }}
              animate={{ opacity: 1, x: 0, rotateY: 10, y: [0, 12, 0] }}
              transition={{ delay: 0.7, duration: 0.9, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
              style={{ transformPerspective: 1200 }}
            >
              <div className="layer-depth-1 text-left">
                <p className="text-xs uppercase tracking-[0.25em] text-secondary/90">Client Ready</p>
                <p className="mt-2 text-sm font-semibold text-white">Fast, polished, responsive design</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="hidden lg:block absolute top-20 left-10 w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20" {...brandAnimations.floating} />
          <motion.div className="hidden lg:block absolute bottom-20 right-10 w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-r from-secondary to-accent rounded-lg opacity-20" {...brandAnimations.floating} />
          <motion.div className="hidden xl:block absolute top-1/3 right-20 w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-r from-accent to-primary rounded-full opacity-15" {...brandAnimations.pulse} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8" {...brandAnimations.staggerContainer} {...viewportAnimations.fadeInUp}>
            {[
              { value: counters.projects, label: 'Projects Completed', delay: 0.2 },
              { value: counters.clients, label: 'Happy Clients', delay: 0.4 },
              { value: counters.experience, label: 'Years Experience', delay: 0.6 }
            ].map(({ value, label, delay }) => (
              <motion.div key={label} className="scene-3d" {...brandAnimations.staggerItem}>
                <motion.div
                  className="text-center glass rounded-xl sm:rounded-2xl p-6 sm:p-8 card-hover card-3d cursor-hover preserve-3d"
                  {...brandAnimations.cardHover}
                  {...brandAnimations.glowHover}
                  whileHover={{ y: -10, rotateX: 8, rotateY: -8, scale: 1.02 }}
                  style={{ transformPerspective: 1200 }}
                >
                  <motion.div className="layer-depth-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-2" {...brandAnimations.counter} transition={{ delay }}>
                    {value}+
                  </motion.div>
                  <p className="layer-depth-1 text-gray-300 text-sm sm:text-base">{label}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section id="portfolio" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-4">Featured Work</h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Explore some of my recent design projects and creative solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="scene-3d"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
              <motion.div
                key={project.id}
                className="glass rounded-xl sm:rounded-2xl overflow-hidden card-hover card-3d cursor-hover group preserve-3d"
                initial={{ opacity: 0, y: 50 }}
                whileHover={{ y: -12, rotateX: 7, rotateY: project.websiteUrl ? -7 : 7, scale: 1.01 }}
                style={{ transformPerspective: 1400 }}
                onClick={() => openFeaturedProject(project)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openFeaturedProject(project)
                  }
                }}
                role="link"
                tabIndex={0}
              >
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-800">
                  <img src={project.image} alt={project.title} className="layer-depth-1 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-70" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm layer-depth-2">
                    {project.websiteUrl ? 'Open Project' : 'Quick View'}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="layer-depth-2 text-lg sm:text-xl font-semibold transition-colors group-hover:text-primary">{project.title}</h3>
                    <span className="layer-depth-1 px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">{project.category}</span>
                  </div>
                  <p className="layer-depth-1 text-gray-400 text-sm sm:text-base line-clamp-2">{project.description}</p>
                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-primary hover:text-secondary transition text-sm"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Visit Website →
                    </a>
                  )}
                  {!project.websiteUrl && (
                    <span className="inline-block mt-3 text-primary group-hover:text-secondary transition text-sm">
                      View Project →
                    </span>
                  )}
                </div>
              </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-8 sm:mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} viewport={{ once: true }}>
            <Link to="/portfolio" className="btn-primary cursor-hover">View All Projects</Link>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-4 sm:mb-6"
              whileHover={{ rotateX: 4, rotateY: -4, scale: 1.01 }}
              style={{ transformPerspective: 1200 }}
            >
              Let's Create Something Amazing
            </motion.h2>
            <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Ready to bring your vision to life? Let's discuss your next project
            </p>
            <Link to="/contact" className="btn-primary cursor-hover">Get In Touch</Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
