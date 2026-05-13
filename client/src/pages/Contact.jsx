import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay }
})

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-[#1a1a2e] border border-white/15 text-white placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:border-primary/70 transition-all duration-200'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const services = [
    'Logo Design', 'Branding', 'Social Media Creatives',
    'Posters & Ads', 'Website Design & Development', 'Complete Package', 'Other'
  ]

  const contactMethods = [
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      title: 'Design Portfolio',
      subtitle: '@sv_desizns',
      description: 'Latest design work & creatives',
      link: 'https://instagram.com/sv_desizns',
      color: 'from-pink-500/20 to-purple-500/20',
      border: 'border-pink-500/20 hover:border-pink-500/50'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      title: 'Personal Profile',
      subtitle: '@its_sverma',
      description: 'Connect with me personally',
      link: 'https://instagram.com/its_sverma',
      color: 'from-orange-500/20 to-pink-500/20',
      border: 'border-orange-500/20 hover:border-orange-500/50'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Me',
      subtitle: 'souravverma5436@gmail.com',
      description: 'Direct email — I reply within 24h',
      link: 'mailto:souravverma5436@gmail.com',
      color: 'from-primary/20 to-secondary/20',
      border: 'border-primary/20 hover:border-primary/50'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      title: 'WhatsApp',
      subtitle: '+91 62390 03217',
      description: 'Quick chat for project queries',
      link: 'https://wa.me/916239003217',
      color: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-500/20 hover:border-green-500/50'
    }
  ]

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }
    setIsSubmitting(true)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'Not provided',
          service: formData.service,
          message: formData.message
        },
        EMAILJS_PUBLIC_KEY
      )
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
    } catch (err) {
      console.error(err)
      toast.error('Failed to send. Please email me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20">

      {/* ── Hero ── */}
      <section className="relative py-16 px-4 sm:py-20 sm:px-6 lg:py-24 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <motion.div {...fadeUp()}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/40 bg-primary/10 text-primary">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gradient mb-4 leading-tight">
              Let's Work Together
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Have a project in mind? I'd love to hear about it. Fill in the form and I'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main grid ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* ── Form (3/5) ── */}
          <motion.div className="lg:col-span-3" {...fadeUp(0.1)}>
            <div
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)'
              }}
            >
              {/* top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16 gap-5"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gradient">Message Sent!</h3>
                  <p className="text-gray-400 text-sm sm:text-base max-w-sm leading-relaxed">
                    Thank you for reaching out. I've received your message and will get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary cursor-hover mt-2">
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Send Me a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Full Name *</label>
                        <input
                          type="text" name="name" placeholder="Your Name"
                          value={formData.name} onChange={handleInputChange}
                          className={inputClass} required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email Address *</label>
                        <input
                          type="email" name="email" placeholder="Your Email"
                          value={formData.email} onChange={handleInputChange}
                          className={inputClass} required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                        Phone / WhatsApp <span className="text-gray-600">(optional)</span>
                      </label>
                      <input
                        type="tel" name="phone" placeholder="+91 98765 43210"
                        value={formData.phone} onChange={handleInputChange}
                        className={inputClass}
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Service Required *</label>
                      <select
                        name="service" value={formData.service} onChange={handleInputChange}
                        className={`${inputClass} cursor-pointer appearance-none`}
                        style={{ backgroundColor: '#1a1a2e', colorScheme: 'dark' }}
                        required
                      >
                        <option value="" disabled style={{ background: '#1a1a2e', color: '#9ca3af' }}>Select a service…</option>
                        {services.map(s => (
                          <option key={s} value={s} style={{ background: '#1a1a2e', color: '#ffffff' }}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Project Details *</label>
                      <textarea
                        name="message" rows={5}
                        placeholder="Tell me about your project — goals, timeline, budget, references…"
                        value={formData.message} onChange={handleInputChange}
                        className={`${inputClass} resize-none`} required
                      />
                    </div>

                    <button
                      type="submit" disabled={isSubmitting}
                      className={`w-full py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                        isSubmitting
                          ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] cursor-hover'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-600">
                      Your information is kept private and never shared.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>

          {/* ── Right column (2/5) ── */}
          <motion.div className="lg:col-span-2 flex flex-col gap-6" {...fadeUp(0.2)}>

            {/* Availability badge */}
            <div
              className="rounded-2xl p-5 sm:p-6 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 100%)',
                border: '1px solid rgba(99,102,241,0.25)'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
                </span>
                <span className="text-green-400 text-sm font-semibold">Available for Projects</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Currently accepting new clients. Typical response time is <span className="text-white font-medium">under 24 hours</span>.
              </p>
            </div>

            {/* Contact methods */}
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-300 mb-4">Other Ways to Connect</h2>
              <div className="space-y-3">
                {contactMethods.map((m) => (
                  <a
                    key={m.title}
                    href={m.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 rounded-xl border bg-gradient-to-r ${m.color} ${m.border} transition-all duration-200 hover:-translate-y-0.5 group cursor-hover`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white/15 transition-colors">
                      {m.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-sm">{m.title}</p>
                      <p className="text-primary text-xs truncate">{m.subtitle}</p>
                      <p className="text-gray-500 text-xs">{m.description}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-400 ml-auto flex-shrink-0 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick info */}
            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)'
              }}
            >
              <h3 className="text-sm font-semibold text-gray-300 mb-4">Project Info</h3>
              <div className="space-y-3">
                {[
                  { label: 'Response Time', value: '< 24 hours' },
                  { label: 'Working Hours', value: 'Mon – Sat, 10am – 8pm IST' },
                  { label: 'Location', value: 'India (Remote Worldwide)' },
                  { label: 'Languages', value: 'Hindi & English' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between gap-4">
                    <span className="text-gray-500 text-xs">{item.label}</span>
                    <span className="text-white text-xs font-medium text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default Contact
