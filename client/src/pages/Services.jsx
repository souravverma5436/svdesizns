import React from 'react'
import { motion } from 'framer-motion'
import services from '../data/services'

const getServiceIcon = (name) => {
  const icons = { 'Logo Design': '🎨', 'Branding': '🏢', 'Social Media Creatives': '📱', 'Posters & Ads': '📢', 'Website Development': '💻', 'Websites': '🌐' }
  return icons[name] || '✨'
}

const getServiceGradient = (index) => {
  const gradients = ['from-primary to-secondary', 'from-secondary to-accent', 'from-accent to-primary', 'from-primary via-secondary to-accent']
  return gradients[index % gradients.length]
}

const process = [
  { step: '01', title: 'Discovery', description: 'Understanding your brand, goals, and target audience' },
  { step: '02', title: 'Concept', description: 'Creating initial design concepts and ideas' },
  { step: '03', title: 'Design', description: 'Developing and refining the chosen concept' },
  { step: '04', title: 'Delivery', description: 'Final files and brand guidelines delivery' }
]

const Services = () => {
  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Header */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-4 sm:mb-6">My Services</h1>
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
                key={service.id}
                className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 card-hover cursor-hover group relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${getServiceGradient(index)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <motion.div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  {getServiceIcon(service.name)}
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>

                <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>

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

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xl sm:text-2xl font-bold text-gradient">
                      {typeof service.priceINR === 'string' ? service.priceINR : `₹${service.priceINR?.toLocaleString('en-IN')}`}
                    </div>
                    <div className="text-sm text-gray-400">
                      {typeof service.priceINR === 'string' ? 'Custom pricing' : 'Starting from'}
                    </div>
                  </div>
                  <motion.a
                    href={`/contact?service=${encodeURIComponent(service.name)}`}
                    className="btn-primary w-full sm:w-auto text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.a>
                </div>

                <motion.div className={`absolute -inset-1 bg-gradient-to-r ${getServiceGradient(index)} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-4 sm:mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Let's discuss your design needs and create something amazing together
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
