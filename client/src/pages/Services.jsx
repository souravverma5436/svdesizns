import React, { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'
import services from '../data/services'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-[#1a1a2e] border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/70 transition-all duration-200'

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
  const [fb, setFb] = useState({ name: '', email: '', rating: '', comment: '' })
  const [fbSubmitting, setFbSubmitting] = useState(false)
  const [fbDone, setFbDone] = useState(false)

  const handleFb = (e) => setFb({ ...fb, [e.target.name]: e.target.value })

  const submitFeedback = async (e) => {
    e.preventDefault()
    if (!fb.name || !fb.email || !fb.rating || !fb.comment) {
      toast.error('Please fill in all fields')
      return
    }
    setFbSubmitting(true)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: fb.name,
          from_email: fb.email,
          phone: 'N/A — Feedback Form',
          service: `⭐ FEEDBACK — ${fb.rating}/5 Stars (${['','Poor','Fair','Good','Great','Excellent'][Number(fb.rating)]})`,
          message: `Rating: ${fb.rating}/5 ⭐ — ${['','Poor','Fair','Good','Great','Excellent'][Number(fb.rating)]}\n\n${fb.comment}`
        },
        EMAILJS_PUBLIC_KEY
      )
      setFbDone(true)
      setFb({ name: '', email: '', rating: '', comment: '' })
    } catch (err) {
      console.error(err)
      toast.error('Could not send feedback. Please try again.')
    } finally {
      setFbSubmitting(false)
    }
  }

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
              className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/15 p-5 sm:p-8 lg:p-10"
              style={{
                background: 'linear-gradient(145deg, rgba(26,26,46,0.98) 0%, rgba(22,33,62,0.95) 100%)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)'
              }}
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

              <div className="relative grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
                {service.plans.map((plan, planIndex) => {
                  const isPopular = Boolean(plan.popular)
                  
                  // Distinct color schemes for each tier
                  const tierColors = {
                    Basic: {
                      bg: 'linear-gradient(160deg, rgba(99,102,241,0.15) 0%, rgba(79,70,229,0.08) 100%)',
                      border: 'border-indigo-500/30',
                      accent: 'bg-gradient-to-r from-indigo-500/50 to-blue-500/50',
                      badge: 'text-indigo-400',
                      check: 'bg-indigo-500/25 text-indigo-400'
                    },
                    Standard: {
                      bg: 'linear-gradient(160deg, rgba(139,92,246,0.25) 0%, rgba(124,58,237,0.15) 100%)',
                      border: 'border-purple-500/50',
                      accent: 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500',
                      badge: 'text-purple-300',
                      check: 'bg-purple-500/30 text-purple-300'
                    },
                    Premium: {
                      bg: 'linear-gradient(160deg, rgba(236,72,153,0.18) 0%, rgba(219,39,119,0.10) 100%)',
                      border: 'border-pink-500/35',
                      accent: 'bg-gradient-to-r from-pink-500/50 to-rose-500/50',
                      badge: 'text-pink-400',
                      check: 'bg-pink-500/25 text-pink-400'
                    }
                  }

                  const colors = tierColors[plan.name] || tierColors.Basic

                  return (
                    <motion.div
                      key={`${service.id}-${plan.name}`}
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.55, delay: planIndex * 0.1 }}
                      whileHover={{ y: -6 }}
                      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${colors.border} ${
                        isPopular ? 'shadow-[0_0_50px_rgba(139,92,246,0.3)]' : 'hover:border-opacity-60'
                      }`}
                      style={{ background: colors.bg }}
                    >
                      {/* top accent bar */}
                      <div className={`h-1 w-full ${colors.accent}`} />

                      {isPopular && (
                        <div className="absolute right-4 top-4 rounded-full bg-purple-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                          Most Popular
                        </div>
                      )}

                      <div className="flex flex-col flex-1 p-5 sm:p-6">
                        {/* Plan name */}
                        <p className={`text-xs font-bold uppercase tracking-[0.25em] mb-3 ${colors.badge}`}>
                          {plan.name} Plan
                        </p>

                        {/* Price */}
                        <div className="mb-1">
                          <span className="text-3xl sm:text-4xl font-extrabold text-white">{plan.price}</span>
                        </div>
                        <p className="text-gray-300 text-xs mb-5 leading-relaxed">
                          {plan.name === 'Basic' && 'Perfect entry point for a polished presence.'}
                          {plan.name === 'Standard' && 'Best balance of quality and value for growing brands.'}
                          {plan.name === 'Premium' && 'Full-scale package for maximum brand impact.'}
                        </p>

                        {/* Divider */}
                        <div className="h-px mb-5 bg-white/15" />

                        {/* Features */}
                        <ul className="space-y-2.5 mb-6 flex-1">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2.5">
                              <span className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${colors.check}`}>
                                ✓
                              </span>
                              <span className="text-gray-100 text-sm leading-snug">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <a
                          href={`/contact?service=${encodeURIComponent(service.name)}&plan=${encodeURIComponent(plan.name)}`}
                          className={`mt-auto w-full text-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                            isPopular
                              ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:shadow-lg hover:shadow-purple-500/40 hover:scale-[1.02]'
                              : 'bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/40'
                          }`}
                        >
                          Get Started →
                        </a>
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

      {/* ── Feedback Section ── */}
      <section className="py-16 px-4 sm:py-20 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/40 bg-primary/10 text-primary">
              Share Your Experience
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-3">Leave Feedback</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Worked with me before? Your honest feedback helps me improve and helps others make informed decisions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)'
            }}
          >
            {/* top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-primary to-secondary" />

            {fbDone ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gradient">Thank You!</h3>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                  Your feedback has been received. It means a lot and helps me keep improving.
                </p>
                <button onClick={() => setFbDone(false)} className="btn-secondary cursor-hover text-sm mt-1">
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submitFeedback} className="space-y-4">

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Your Name *</label>
                    <input type="text" name="name" placeholder="Your Name"
                      value={fb.name} onChange={handleFb} className={inputClass} required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email Address *</label>
                    <input type="email" name="email" placeholder="Your Email"
                      value={fb.email} onChange={handleFb} className={inputClass} required />
                  </div>
                </div>

                {/* Star rating */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 ml-1">Overall Rating *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFb(f => ({ ...f, rating: String(star) }))}
                        className={`w-10 h-10 rounded-xl border text-lg transition-all duration-150 cursor-hover ${
                          Number(fb.rating) >= star
                            ? 'bg-yellow-400/20 border-yellow-400/60 text-yellow-400'
                            : 'bg-white/5 border-white/10 text-gray-600 hover:border-yellow-400/40 hover:text-yellow-400/60'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    {fb.rating && (
                      <span className="self-center ml-2 text-sm text-gray-400">
                        {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][Number(fb.rating)]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Your Feedback *</label>
                  <textarea
                    name="comment" rows={4}
                    placeholder="Share your experience — what went well, what could be better…"
                    value={fb.comment} onChange={handleFb}
                    className={`${inputClass} resize-none`} required
                  />
                </div>

                <button
                  type="submit" disabled={fbSubmitting}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    fbSubmitting
                      ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-accent/80 to-primary text-white hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] cursor-hover'
                  }`}
                >
                  {fbSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Submit Feedback
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-dark-light/30">
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
