import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { apiClient } from '../utils/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      icon: '🎨',
      gradient: 'from-primary to-secondary'
    },
    {
      title: 'Personal Profile',
      subtitle: '@its_sverma',
      description: 'Connect with me personally',
      link: 'https://instagram.com/its_sverma',
      icon: '👋',
      gradient: 'from-secondary to-accent'
    },
    {
      title: 'Email Me',
      subtitle: 'souravverma5436@gmail.com',
      description: 'Send me a direct email',
      link: 'mailto:souravverma5436@gmail.com',
      icon: '📧',
      gradient: 'from-accent to-primary'
    }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 🧪 Validation
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
      const response = await apiClient.submitContact(formData)

      if (response.data.success) {
        toast.success("Message sent successfully! I'll get back to you soon.")
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        })
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('❌ Contact Error:', error)

      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Server not responding. Please try again later.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-4 sm:mb-6">
              Let's Work Together
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Ready to bring your vision to life? Get in touch and let's create something amazing together
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass rounded-3xl p-8">
              <h2 className="text-3xl font-bold mb-6">Send Me a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark-lighter border border-gray-600 rounded-xl focus:border-primary focus:outline-none cursor-hover"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark-lighter border border-gray-600 rounded-xl focus:border-primary focus:outline-none cursor-hover"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone/WhatsApp number (optional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark-lighter border border-gray-600 rounded-xl focus:border-primary focus:outline-none cursor-hover"
                />
                <p className="text-xs text-gray-400 -mt-4 ml-1">
                  📱 Optional - for WhatsApp or phone contact
                </p>

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark-lighter border border-gray-600 rounded-xl focus:border-primary focus:outline-none cursor-hover"
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark-lighter border border-gray-600 rounded-xl resize-none focus:border-primary focus:outline-none cursor-hover"
                  required
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-semibold transition cursor-hover ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-secondary hover:scale-105'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Methods */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Other Ways to Connect</h2>
            {contactMethods.map((m) => (
              <a
                key={m.title}
                href={m.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block glass rounded-2xl p-6 hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold">{m.title}</h3>
                <p className="text-primary">{m.subtitle}</p>
                <p className="text-gray-400 text-sm">{m.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
