import React from 'react'
import { motion } from 'framer-motion'
import services from '../data/services'

const getServiceIcon = (name) => {
  const icons = {
    'Logo Design': 'LD',
    Branding: 'BR',
    'Social Media Design': 'SM',
    'Poster / Banner Design': 'PB',
    'Website Design': 'WD',
    'Complete Package': 'CP'
  }

  return icons[name] || 'SV'
}

const process = [
  { step: '01', title: 'Discovery', description: 'Understanding your brand, goals, and target audience' },
  { step: '02', title: 'Concept', description: 'Creating initial design concepts and ideas' },
  { step: '03', title: 'Design', description: 'Developing and refining the chosen concept' },
  { step: '04', title: 'Delivery', description: 'Final files and brand guidelines delivery' }
]

const sectionAnimation = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' }
}

const Services = () => {
  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.28em] text-primary/90">
              Premium Service Packages
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-4 sm:mb-6">My Services</h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Choose the right tier for your brand and get a polished, modern design experience built to stand out.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-secondary/10 via-primary/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative">
          {services.map((service, serviceIndex) => (
            <motion.div
              key={service.id}
              {...sectionAnimation}
              transition={{ duration: 0.75, delay: serviceIndex * 0.08 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-dark-light/95 via-dark-lighter/75 to-dark-light/95 p-5 sm:p-8 lg:p-10 shadow-[0_20px_80px_rgba(15,15,35,0.45)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.18),transparent_28%)] pointer-events-none" />

              <div className="relative mb-8 flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/25 via-secondary/20 to-transparent text-sm font-semibold tracking-[0.22em] text-white shadow-[0_0_30px_rgba(99,102,241,0.18)]">
                      {getServiceIcon(service.name)}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-primary/80">Creative Service</p>
                      <h2 className="mt-1 text-2xl sm:text-3xl font-semibold text-white">{service.name}</h2>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-300">{service.description}</p>
                </div>

                <div className="inline-flex items-center self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs sm:text-sm text-gray-300 backdrop-blur-sm">
                  3 premium plans tailored to your goals
                </div>
              </div>

              <div className="relative grid grid-cols-1 gap-6 xl:grid-cols-3">
                {service.plans.map((plan, planIndex) => {
                  const isPopular = Boolean(plan.popular)
                  const cardClasses = isPopular
                    ? 'border-secondary/60 bg-gradient-to-b from-secondary/20 via-primary/10 to-white/5 shadow-[0_0_40px_rgba(139,92,246,0.22)]'
                    : 'border-white/10 bg-white/[0.03]'

                  return (
                    <motion.div
                      key={`${service.id}-${plan.name}`}
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.55, delay: planIndex * 0.1 }}
                      whileHover={{ y: -10, scale: 1.01 }}
                      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-6 sm:p-7 transition-all duration-500 ${cardClasses}`}
                    >
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-secondary/10 to-transparent" />
                        <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-secondary/20 blur-3xl" />
                        <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
                      </div>

                      {isPopular && (
                        <div className="absolute right-5 top-5 rounded-full border border-secondary/40 bg-secondary/20 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-secondary">
                          Most Popular
                        </div>
                      )}

                      <div className="relative flex h-full flex-col">
                        <div className="mb-6">
                          <p className="text-xs uppercase tracking-[0.3em] text-primary/80">{plan.name} Plan</p>
                          <div className="mt-4 flex items-end gap-2">
                            <span className="text-3xl sm:text-4xl font-bold text-white">{plan.price}</span>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-gray-300">
                            {plan.name === 'Basic' && 'A smart entry point for launching a polished presence.'}
                            {plan.name === 'Standard' && 'The perfect balance of depth, quality, and value for growing brands.'}
                            {plan.name === 'Premium' && 'A complete high-end package for brands that want maximum impact.'}
                          </p>
                        </div>

                        <div className="mb-7 h-px bg-gradient-to-r from-primary/0 via-primary/35 to-secondary/0" />

                        <ul className="mb-8 space-y-3 text-sm sm:text-base text-gray-200">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_14px_rgba(139,92,246,0.65)]" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <motion.a
                          href={`/contact?service=${encodeURIComponent(service.name)}&plan=${encodeURIComponent(plan.name)}`}
                          className={`mt-auto inline-flex items-center justify-center rounded-full px-6 py-3 text-sm sm:text-base font-medium transition-all duration-300 ${
                            isPopular
                              ? 'bg-gradient-to-r from-primary via-secondary to-primary text-white shadow-[0_12px_30px_rgba(99,102,241,0.35)]'
                              : 'border border-primary/30 bg-white/5 text-white hover:border-secondary/60 hover:bg-secondary/10'
                          }`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Get Started
                        </motion.a>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-dark-light/50">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-4">My Design Process</h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-4">
              A structured approach to ensure every project delivers exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {process.map((item, index) => (
              <motion.div key={item.step} className="text-center relative" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2, duration: 0.8 }} viewport={{ once: true }}>
                <motion.div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  {item.step}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{item.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 sm:top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-4 sm:mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Let&apos;s choose the right package for your goals and build something elevated together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <motion.a href="/contact" className="btn-primary cursor-hover w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Start a Project
              </motion.a>
              <motion.a href="https://instagram.com/sv_desizns" target="_blank" rel="noopener noreferrer" className="btn-secondary cursor-hover w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                View My Work
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
