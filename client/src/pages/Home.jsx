import React, { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { brandAnimations, viewportAnimations } from '../utils/animations'
import { featuredProjects } from '../data/projects'

const TESTIMONIALS = [
  {
    name: 'Spark Soul',
    role: 'Spiritual Wellness Platform',
    image: '/images/spark soul.webp',
    text: 'Sourav delivered an incredibly calming and modern website that perfectly captures our brand essence. The smooth animations and clean UI exceeded our expectations.',
    websiteUrl: 'https://spark-soul.vercel.app/'
  },
  {
    name: 'DogPetel',
    role: 'Pet Care & Services',
    image: '/images/dog petel.webp',
    text: 'The platform Sourav built for us is intuitive and visually stunning. Our users love the experience and our engagement has grown significantly since launch.',
    websiteUrl: 'https://dogpetel.vercel.app/'
  },
  {
    name: 'Shri Paramhans International',
    role: 'Spiritual & Cultural Organization',
    image: '/images/shriparamhansinternational.webp',
    text: 'A serene and professional website that truly represents our mission. Sourav understood our vision and translated it beautifully into a global-ready platform.',
    websiteUrl: 'http://shriparamhansinternational.com/'
  },
  {
    name: 'Cake Crush',
    role: 'Bakery Brand',
    image: '/images/cake-crush.jpg',
    text: 'The promotional poster Sourav designed for us was vibrant and eye-catching. It drove real footfall and perfectly matched our brand personality.'
  },
  {
    name: 'RK Sports',
    role: 'Sports Brand',
    image: '/images/rk-sports.jpg',
    text: 'Our new logo is bold, dynamic, and exactly what we needed. Sourav nailed the energy of our brand in the very first revision.'
  },
  {
    name: 'Riya Tuition Classes',
    role: 'Educational Institute',
    image: '/images/riya-tuition.jpg',
    text: 'The complete branding package gave our institute a professional identity. Parents and students immediately noticed the difference. Highly recommended!'
  }
]

const VISIBLE = 3   // cards visible at once
const AUTO_INTERVAL = 3000  // ms between auto-slides

const Home = () => {
  const [counters, setCounters] = useState({ projects: 0, clients: 0, experience: 0 })
  const [tIndex, setTIndex] = useState(0)
  const [direction, setDirection] = useState(1)   // 1 = left, -1 = right
  const [isPaused, setIsPaused] = useState(false)
  const autoRef = useRef(null)
  const navigate = useNavigate()

  const total = TESTIMONIALS.length

  const next = useCallback(() => {
    setDirection(1)
    setTIndex(i => (i + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setDirection(-1)
    setTIndex(i => (i - 1 + total) % total)
  }, [total])

  // Auto-advance
  useEffect(() => {
    if (isPaused) return
    autoRef.current = setInterval(next, AUTO_INTERVAL)
    return () => clearInterval(autoRef.current)
  }, [isPaused, next])

  // Get the 3 visible testimonials (wrapping)
  const visibleCards = Array.from({ length: VISIBLE }, (_, i) =>
    TESTIMONIALS[(tIndex + i) % total]
  )

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
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center w-full">
          <motion.div {...brandAnimations.slideInUp}>
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
              <motion.div key={label} className="text-center glass rounded-xl sm:rounded-2xl p-6 sm:p-8 card-hover cursor-hover" {...brandAnimations.staggerItem} {...brandAnimations.cardHover} {...brandAnimations.glowHover}>
                <motion.div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-2" {...brandAnimations.counter} transition={{ delay }}>
                  {value}+
                </motion.div>
                <p className="text-gray-300 text-sm sm:text-base">{label}</p>
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
                className="glass rounded-xl sm:rounded-2xl overflow-hidden card-hover cursor-hover group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
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
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-70" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {project.websiteUrl ? 'Open Project' : 'Quick View'}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold transition-colors group-hover:text-primary">{project.title}</h3>
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">{project.category}</span>
                  </div>
                  <p className="text-gray-400 text-sm sm:text-base line-clamp-2">{project.description}</p>
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
            ))}
          </div>

          <motion.div className="text-center mt-8 sm:mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} viewport={{ once: true }}>
            <Link to="/portfolio" className="btn-primary cursor-hover">View All Projects</Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">

        {/* ── Background ── */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* base tint */}
          <div className="absolute inset-0 bg-[#0a0a1a]" />
          {/* mesh gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.18),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_100%,rgba(139,92,246,0.12),transparent)]" />
          {/* grid lines */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />
          {/* glow orbs */}
          <div className="absolute -top-20 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Heading ── */}
          <motion.div
            className="text-center mb-14 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* eyebrow label */}
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/40 bg-primary/10 text-primary">
              Client Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-4">
              What Clients Say
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
              Real words from the brands and businesses I've had the pleasure of working with
            </p>
          </motion.div>

          {/* ── Carousel row ── */}
          <div
            className="flex items-stretch gap-3 sm:gap-5"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >

            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Previous testimonials"
              className="flex-shrink-0 self-center w-11 h-11 sm:w-13 sm:h-13 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/60 hover:bg-primary/15 transition-all duration-200 cursor-hover group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Cards */}
            <div className="flex-1 overflow-hidden">
              <motion.div
                key={tIndex}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
                initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {visibleCards.map((testimonial, i) => (
                  <div
                    key={`${testimonial.name}-${tIndex}-${i}`}
                    className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group/card"
                    style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(16px)',
                    }}
                  >
                    {/* top accent line — gradient border */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent opacity-70 group-hover/card:opacity-100 transition-opacity" />

                    <div className="p-6 sm:p-7 flex flex-col gap-5 flex-1">

                      {/* Top row: giant quote + stars */}
                      <div className="flex items-start justify-between">
                        {/* Decorative quote mark */}
                        <svg className="w-10 h-10 text-primary/40 flex-shrink-0" viewBox="0 0 40 40" fill="currentColor">
                          <path d="M0 20C0 8.954 8.954 0 20 0s20 8.954 20 20-8.954 20-20 20S0 31.046 0 20zm10.5-4.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5v1c0 3.866-3.134 7-7 7v-2c2.761 0 5-2.239 5-5v-1c0-1.381-1.119-2.5-2.5-2.5S13 15.119 13 16.5v.5h-2.5v-.5zm12 0c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5v1c0 3.866-3.134 7-7 7v-2c2.761 0 5-2.239 5-5v-1c0-1.381-1.119-2.5-2.5-2.5S25 15.119 25 16.5v.5h-2.5v-.5z"/>
                        </svg>
                        {/* 5 stars */}
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, s) => (
                            <svg key={s} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>

                      {/* Testimonial text */}
                      <p className="text-gray-300 text-sm sm:text-[0.9rem] leading-relaxed flex-1 italic">
                        "{testimonial.text}"
                      </p>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                      {/* Client info */}
                      <div className="flex items-center gap-3">
                        {/* Project image as avatar */}
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-primary/30 group-hover/card:ring-primary/60 transition-all">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                          {/* subtle overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                        <div className="min-w-0">
                          {testimonial.websiteUrl ? (
                            <a
                              href={testimonial.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block font-semibold text-white hover:text-primary transition-colors text-sm truncate"
                            >
                              {testimonial.name}
                              <span className="ml-1 text-primary/70 text-xs">↗</span>
                            </a>
                          ) : (
                            <p className="font-semibold text-white text-sm truncate">{testimonial.name}</p>
                          )}
                          <p className="text-gray-500 text-xs mt-0.5 truncate">{testimonial.role}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Next testimonials"
              className="flex-shrink-0 self-center w-11 h-11 sm:w-13 sm:h-13 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/60 hover:bg-primary/15 transition-all duration-200 cursor-hover group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>

          {/* ── Dots ── */}
          <div className="flex justify-center items-center gap-2 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > tIndex ? 1 : -1); setTIndex(i) }}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === tIndex
                    ? 'w-6 h-2 bg-gradient-to-r from-primary to-secondary'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-4 sm:mb-6">
              Let's Create Something Amazing
            </h2>
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
