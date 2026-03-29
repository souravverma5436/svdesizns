import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const services = [
    'Logo Design',
    'Branding',
    'Social Media Creatives',
    'Posters & Ads',
    'Websites',
    'Other'
  ]

  const contactMethods = [
    {
      title: 'Design Portfolio',
      subtitle: '@sv_desizns',
      description: 'Check out my latest design work',
      link: 'https://instagram.com/sv_desizns',
      icon: '🎨'
    },
    {
      title: 'Personal Profile',
      subtitle: '@its_sverma',
      description: 'Connect with me personally',
      link: 'https://instagram.com/its_sverma',
      icon: '👋'
    },
    {
      title: 'Email Me',
      subtitle: 'souravverma5436@gmail.com',
      description: 'Send me a direct email',
      link: 'mailto:souravverma5436@gmail.com',
      icon: '📧'
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
    } catch (error) {
      console.error('EmailJS error:', error)
      toast.error('Failed to send message. Please try again or email me directly.')
    } finally {
      setIsSubmitting(false)
    }
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
              Let’s Work Together
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Ready to bring your vision to life? Get in touch and let’s create something amazing together
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Send Me a Message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 sm:py-12"
                >
                  <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">✅</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gradient mb-3">
                    Thank you for contacting SvDesizns.
                  </h3>
                  <p className="text-gray-300 mb-6 text-sm sm:text-base">
                    We have received your message and will get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary cursor-hover"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark-lighter border border-gray-600 rounded-xl focus:border-primary focus:outline-none text-sm sm:text-base"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com *"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark-lighter border border-gray-600 rounded-xl focus:border-primary focus:outline-none text-sm sm:text-base"
                    required
                  />
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone/WhatsApp number (optional)"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-lighter border border-gray-600 rounded-xl focus:border-primary focus:outline-none text-sm sm:text-base"
                    />
                    <p className="text-xs text-gray-400 mt-1 ml-1">
                      📱 Optional — for WhatsApp or phone contact
                    </p>
                  </div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark-lighter border border-gray-600 rounded-xl focus:border-primary focus:outline-none text-sm sm:text-base"
                    required
                  >
                    <option value="">Select a service *</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project... *"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark-lighter border border-gray-600 rounded-xl resize-none focus:border-primary focus:outline-none text-sm sm:text-base"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 sm:py-4 rounded-xl font-semibold transition text-sm sm:text-base ${
                      isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary to-secondary hover:scale-105 cursor-hover'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Other Ways to Connect</h2>
            {contactMethods.map((m) => (
              <a
                key={m.title}
                href={m.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block glass rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl flex-shrink-0">{m.icon}</span>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-xl font-semibold">{m.title}</h3>
                    <p className="text-primary text-sm sm:text-base truncate">{m.subtitle}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{m.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Contact
