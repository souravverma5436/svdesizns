import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'
import services, { printingServices } from '../data/services'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-[#1a1a2e] border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400/70 transition-all duration-200'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true }
})

const process = [
  { step: '01', title: 'Discovery',  description: 'Understanding your brand, goals, and target audience' },
  { step: '02', title: 'Concept',    description: 'Creating initial design concepts and ideas' },
  { step: '03', title: 'Design',     description: 'Developing and refining the chosen concept' },
  { step: '04', title: 'Delivery',   description: 'Final files and brand guidelines delivery' }
]

const tierColors = {
  Basic: {
    bg: 'linear-gradient(160deg,rgba(6,182,212,0.10) 0%,rgba(8,145,178,0.05) 100%)',
    border: 'border-cyan-500/25 hover:border-cyan-400/50',
    bar: 'bg-gradient-to-r from-cyan-500/60 to-blue-500/60',
    badge: 'text-cyan-400',
    check: 'bg-cyan-500/20 text-cyan-400',
    btn: 'bg-white/8 text-white border border-white/15 hover:bg-cyan-500/15 hover:border-cyan-400/50'
  },
  Standard: {
    bg: 'linear-gradient(160deg,rgba(139,92,246,0.22) 0%,rgba(99,102,241,0.14) 100%)',
    border: 'border-purple-500/50',
    bar: 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500',
    badge: 'text-purple-300',
    check: 'bg-purple-500/25 text-purple-300',
    btn: 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02]'
  },
  Premium: {
    bg: 'linear-gradient(160deg,rgba(236,72,153,0.15) 0%,rgba(219,39,119,0.08) 100%)',
    border: 'border-pink-500/30 hover:border-pink-400/55',
    bar: 'bg-gradient-to-r from-pink-500/60 to-rose-500/60',
    badge: 'text-pink-400',
    check: 'bg-pink-500/20 text-pink-400',
    btn: 'bg-white/8 text-white border border-white/15 hover:bg-pink-500/15 hover:border-pink-400/50'
  }
}

/* ── Plan Card ── */
const PlanCard = ({ plan, serviceId, serviceName }) => {
  const colors = tierColors[plan.name] || tierColors.Basic
  const isPopular = Boolean(plan.popular)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={`relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${colors.border} ${isPopular ? 'shadow-[0_0_40px_rgba(139,92,246,0.25)]' : ''}`}
      style={{ background: colors.bg }}
    >
      <div className={`h-[3px] w-full ${colors.bar}`} />
      {isPopular && (
        <div className="absolute right-4 top-4 rounded-full bg-purple-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
          Most Popular
        </div>
      )}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <p className={`text-[11px] font-bold uppercase tracking-[0.25em] mb-3 ${colors.badge}`}>{plan.name} Plan</p>
        <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{plan.price}</p>
        <p className="text-gray-400 text-xs mb-5 leading-relaxed">
          {plan.name === 'Basic'    && 'Perfect entry point for a polished presence.'}
          {plan.name === 'Standard' && 'Best balance of quality and value for growing brands.'}
          {plan.name === 'Premium'  && 'Full-scale package for maximum brand impact.'}
        </p>
        <div className="h-px bg-white/10 mb-5" />
        <ul className="space-y-2.5 mb-6 flex-1">
          {plan.features.map(f => (
            <li key={f} className="flex items-start gap-2.5">
              <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${colors.check}`}>✓</span>
              <span className="text-gray-100 text-sm leading-snug">{f}</span>
            </li>
          ))}
        </ul>
        <a
          href={`/contact?service=${encodeURIComponent(serviceName)}&plan=${encodeURIComponent(plan.name)}`}
          className={`mt-auto w-full text-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${colors.btn}`}
        >
          Get Started →
        </a>
      </div>
    </motion.div>
  )
}

/* ── Service Block ── */
const ServiceBlock = ({ service, index }) => (
  <motion.div
    {...fadeUp(index * 0.06)}
    className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 p-5 sm:p-8 lg:p-10"
    style={{
      background: 'linear-gradient(145deg,rgba(26,26,46,0.98) 0%,rgba(22,33,62,0.95) 100%)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.05)'
    }}
  >
    {/* subtle radial glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.08),transparent_40%)] pointer-events-none" />

    {/* Header */}
    <div className="relative mb-7 flex flex-col gap-4 border-b border-white/8 pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-cyan-500/20 to-blue-600/15 text-xs sm:text-sm font-bold tracking-widest text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            {service.icon}
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/70 mb-0.5">Creative Service</p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{service.name}</h2>
          </div>
        </div>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">{service.description}</p>
      </div>
      <span className="inline-flex items-center self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-400 backdrop-blur-sm whitespace-nowrap">
        3 premium plans
      </span>
    </div>

    {/* Plans grid */}
    <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {service.plans.map(plan => (
        <PlanCard key={plan.name} plan={plan} serviceId={service.id} serviceName={service.name} />
      ))}
    </div>

    {/* Flexible pricing note for Website Design */}
    {service.flexiblePricing && (
      <motion.div
        {...fadeUp(0.2)}
        className="relative mt-6 rounded-2xl overflow-hidden p-5 sm:p-6"
        style={{
          background: 'linear-gradient(135deg,rgba(6,182,212,0.08) 0%,rgba(8,145,178,0.04) 100%)',
          border: '1px solid rgba(6,182,212,0.3)',
          boxShadow: '0 0 30px rgba(6,182,212,0.08)'
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">✨</span>
          <div>
            <p className="font-bold text-cyan-300 text-sm sm:text-base mb-1">Flexible Pricing Available</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Website pricing can also be customized according to the client's budget and project requirements.
            </p>
          </div>
        </div>
      </motion.div>
    )}
  </motion.div>
)

const Services = () => {
  const [fb, setFb] = useState({ name: '', email: '', rating: '', comment: '' })
  const [fbSubmitting, setFbSubmitting] = useState(false)
  const [fbDone, setFbDone] = useState(false)

  const handleFb = (e) => setFb({ ...fb, [e.target.name]: e.target.value })

  const submitFeedback = async (e) => {
    e.preventDefault()
    if (!fb.name || !fb.email || !fb.rating || !fb.comment) { toast.error('Please fill in all fields'); return }
    setFbSubmitting(true)
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: fb.name, from_email: fb.email, phone: 'N/A — Feedback Form',
        service: `⭐ FEEDBACK — ${fb.rating}/5 Stars (${['','Poor','Fair','Good','Great','Excellent'][Number(fb.rating)]})`,
        message: `Rating: ${fb.rating}/5 ⭐ — ${['','Poor','Fair','Good','Great','Excellent'][Number(fb.rating)]}\n\n${fb.comment}`
      }, EMAILJS_PUBLIC_KEY)
      setFbDone(true)
      setFb({ name: '', email: '', rating: '', comment: '' })
    } catch (err) {
      console.error(err)
      toast.error('Could not send feedback. Please try again.')
    } finally { setFbSubmitting(false) }
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-16 px-4 sm:py-20 sm:px-6 lg:py-24 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/8 rounded-full blur-[120px]" />
          <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-purple-500/8 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/8 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-400 mb-5">
              Premium Service Packages
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gradient mb-4 leading-tight">My Services</h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Choose the right tier for your brand and get a polished, modern design experience built to stand out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Service Blocks ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          {services.map((service, i) => (
            <ServiceBlock key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ── Printing Solutions ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeUp()}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-cyan-400/20 p-5 sm:p-8 lg:p-10"
            style={{
              background: 'linear-gradient(145deg,rgba(6,182,212,0.06) 0%,rgba(26,26,46,0.98) 40%,rgba(22,33,62,0.95) 100%)',
              boxShadow: '0 0 60px rgba(6,182,212,0.06),0 20px 60px rgba(0,0,0,0.4)'
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.07),transparent_40%)] pointer-events-none" />

            {/* Header */}
            <div className="relative mb-8 flex flex-col gap-4 border-b border-white/8 pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/25 to-teal-600/15 text-[10px] sm:text-xs font-bold tracking-widest text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                    PRINT
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/70 mb-0.5">Creative Service</p>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Printing Solutions</h2>
                  </div>
                </div>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">{printingServices.description}</p>
              </div>
              {/* Highlights */}
              <div className="flex flex-wrap gap-2 self-start">
                {printingServices.highlights.map(h => (
                  <span key={h} className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-3 py-1 text-xs text-cyan-300">
                    <span className="text-cyan-400">✓</span> {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
              {printingServices.categories.map(cat => (
                <div
                  key={cat.title}
                  className="rounded-2xl border border-white/8 p-5 sm:p-6 group hover:border-cyan-400/30 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{cat.icon}</span>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map(item => (
                      <span key={item} className="inline-flex items-center gap-1 rounded-lg border border-white/8 bg-white/4 px-2.5 py-1 text-xs text-gray-300 hover:border-cyan-400/30 hover:text-cyan-300 transition-all">
                        <span className="text-cyan-500 text-[10px]">✓</span> {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact for pricing */}
            <div className="relative mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 sm:p-6">
              <div>
                <p className="font-bold text-cyan-300 text-base mb-1">Contact for Pricing</p>
                <p className="text-gray-400 text-sm">Custom quotes available based on quantity and requirements.</p>
              </div>
              <a
                href="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-300 hover:bg-cyan-400/20 hover:border-cyan-400/70 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-200"
              >
                Get Custom Quote →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Design Process ── */}
      <section className="py-16 px-4 sm:py-20 sm:px-6 lg:py-24 lg:px-8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12 sm:mb-16" {...fadeUp()}>
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-cyan-400/30 bg-cyan-400/8 text-cyan-400">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-3">My Design Process</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">A structured approach to ensure every project delivers exceptional results</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {process.map((item, index) => (
              <motion.div key={item.step} className="text-center relative" {...fadeUp(index * 0.1)}>
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {item.step}
                </motion.div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 sm:top-10 left-full w-full h-px bg-gradient-to-r from-cyan-500/40 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feedback ── */}
      <section className="py-16 px-4 sm:py-20 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div className="text-center mb-10" {...fadeUp()}>
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/40 bg-primary/10 text-primary">
              Share Your Experience
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-3">Leave Feedback</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Worked with me before? Your honest feedback helps me improve and helps others make informed decisions.
            </p>
          </motion.div>
          <motion.div
            {...fadeUp(0.1)}
            className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden"
            style={{ background: 'linear-gradient(145deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-primary to-secondary" />
            {fbDone ? (
              <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-10 gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-primary flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gradient">Thank You!</h3>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed">Your feedback has been received. It means a lot and helps me keep improving.</p>
                <button onClick={() => setFbDone(false)} className="btn-secondary cursor-hover text-sm mt-1">Submit Another</button>
              </motion.div>
            ) : (
              <form onSubmit={submitFeedback} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Your Name *</label>
                    <input type="text" name="name" placeholder="Your Name" value={fb.name} onChange={handleFb} className={inputClass} required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email Address *</label>
                    <input type="email" name="email" placeholder="Your Email" value={fb.email} onChange={handleFb} className={inputClass} required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 ml-1">Overall Rating *</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(star => (
                      <button key={star} type="button" onClick={() => setFb(f => ({ ...f, rating: String(star) }))}
                        className={`w-10 h-10 rounded-xl border text-lg transition-all duration-150 cursor-hover ${Number(fb.rating) >= star ? 'bg-yellow-400/20 border-yellow-400/60 text-yellow-400' : 'bg-white/5 border-white/10 text-gray-600 hover:border-yellow-400/40 hover:text-yellow-400/60'}`}>
                        ★
                      </button>
                    ))}
                    {fb.rating && <span className="self-center ml-2 text-sm text-gray-400">{['','Poor','Fair','Good','Great','Excellent'][Number(fb.rating)]}</span>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Your Feedback *</label>
                  <textarea name="comment" rows={4} placeholder="Share your experience — what went well, what could be better…" value={fb.comment} onChange={handleFb} className={`${inputClass} resize-none`} required />
                </div>
                <button type="submit" disabled={fbSubmitting}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${fbSubmitting ? 'bg-white/10 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-primary text-white hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] cursor-hover'}`}>
                  {fbSubmitting ? (<><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Sending…</>) : (<>Submit Feedback <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></>)}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Custom Pricing CTA ── */}
      <section className="py-16 px-4 sm:py-20 sm:px-6 lg:py-24 lg:px-8 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp()}>
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-cyan-400/30 bg-cyan-400/8 text-cyan-400">
              Get In Touch
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-3">Need Custom Pricing?</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Get personalized packages for your business, startup, or brand requirements.
            </p>
          </motion.div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              { icon: '📞', label: 'Phone', value: '6239003217', href: 'tel:+916239003217' },
              { icon: '📷', label: 'Instagram', value: '@sv_desizns', href: 'https://instagram.com/sv_desizns' },
              { icon: '🌐', label: 'Website', value: 'svdesizns.vercel.app', href: 'https://svdesizns.vercel.app/' }
            ].map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 p-6 text-center group hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300"
                style={{ background: 'linear-gradient(145deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.02) 100%)' }}
              >
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">{c.label}</p>
                  <p className="font-semibold text-white text-sm group-hover:text-cyan-300 transition-colors">{c.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* CTA buttons */}
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" {...fadeUp(0.3)}>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] cursor-hover"
              style={{ background: 'linear-gradient(135deg,#06b6d4,#6366f1)', boxShadow: '0 0 20px rgba(6,182,212,0.2)' }}
            >
              Contact Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="https://wa.me/916239003217"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/8 px-8 py-3.5 text-sm font-bold text-cyan-300 transition-all duration-300 hover:bg-cyan-400/15 hover:border-cyan-400/70 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:scale-105 cursor-hover"
            >
              Get Custom Quote
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default Services
