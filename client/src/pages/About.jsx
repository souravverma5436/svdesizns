import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true }
})

const About = () => {
  const skills = [
    { name: 'Logo Design',              level: 95, icon: '✦' },
    { name: 'Brand Identity',           level: 90, icon: '◈' },
    { name: 'Social Media Design',      level: 88, icon: '◉' },
    { name: 'Web Design & Development', level: 86, icon: '⬡' },
    { name: 'UI / UX Design',           level: 82, icon: '◎' },
    { name: 'Print & Poster Design',    level: 85, icon: '▣' },
    { name: 'Illustration',             level: 75, icon: '✧' },
    { name: 'React & Frontend Dev',     level: 78, icon: '⬢' },
  ]

  const services = [
    {
      icon: '🎨',
      title: 'Graphic Design',
      desc: 'Logos, brand kits, posters, social media creatives, and print collateral crafted to make your brand unforgettable.'
    },
    {
      icon: '💻',
      title: 'Web Development',
      desc: 'Responsive, fast, and visually stunning websites built with React, Tailwind CSS, and modern web standards — from landing pages to full platforms.'
    },
    {
      icon: '📱',
      title: 'UI / UX Design',
      desc: 'Clean, intuitive interfaces designed with the user in mind. Wireframes, prototypes, and pixel-perfect designs that convert.'
    },
    {
      icon: '🚀',
      title: 'Brand Strategy',
      desc: 'Cohesive visual identity systems that tell your brand story consistently across every touchpoint — digital and print.'
    },
  ]

  const timeline = [
    {
      year: '2024 – Present',
      title: 'Senior Graphic Designer & Web Developer',
      org: 'Freelance',
      desc: 'Leading end-to-end design and development projects for clients across India and internationally. Delivering brand identities, websites, and digital campaigns.'
    },
    {
      year: '2023',
      title: 'Freelance Designer',
      org: 'Independent',
      desc: 'Expanded into web development alongside graphic design. Built client websites using React and delivered complete branding packages for startups and small businesses.'
    },
    {
      year: '2022',
      title: 'Junior Graphic Designer',
      org: 'Design Studio',
      desc: 'Began professional career in graphic design — logos, social media creatives, and print materials. Developed a strong foundation in visual communication.'
    },
  ]

  return (
    <div className="min-h-screen pt-16 sm:pt-20">

      {/* ── Hero ── */}
      <section className="py-16 px-4 sm:py-20 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12 sm:mb-16" {...fadeUp()}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/40 bg-primary/10 text-primary">
              About Me
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gradient mb-4 leading-tight">
              Designer. Developer. Creator.
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              I craft visual experiences that are beautiful, functional, and built to last — from brand identities to full-stack web applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Avatar card */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8">
                {/* Monogram */}
                <div className="w-full h-56 sm:h-72 lg:h-80 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-3">
                  <span className="text-6xl sm:text-7xl font-bold text-white tracking-tight">SV</span>
                  <span className="text-white/70 text-sm sm:text-base font-medium tracking-widest uppercase">Sourav Verma</span>
                </div>

                {/* Quick stats row */}
                <div className="grid grid-cols-3 gap-3 mt-5">
                  {[
                    { val: '3+', label: 'Years Exp.' },
                    { val: '150+', label: 'Projects' },
                    { val: '50+', label: 'Clients' },
                  ].map(s => (
                    <div key={s.label} className="text-center py-3 rounded-xl bg-white/5 border border-white/8">
                      <p className="text-lg sm:text-xl font-bold text-gradient">{s.val}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating orbs */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-full opacity-50"
                animate={{ y: [0, -12, 0], rotate: [0, 180, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-lg opacity-50"
                animate={{ y: [0, 12, 0], rotate: [0, -180, -360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="space-y-5"
            >
              <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
                Creative Graphic Designer &<br className="hidden sm:block" /> Full-Stack Web Developer
              </h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Hi, I'm <span className="text-white font-semibold">Sourav Verma</span> — a passionate designer and developer with over 3 years of experience turning ideas into compelling visual and digital experiences. I specialise in brand identity, logo design, and building modern websites that don't just look great but perform exceptionally.
              </p>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                On the development side, I build responsive, high-performance web applications using <span className="text-primary font-medium">React</span>, <span className="text-primary font-medium">Tailwind CSS</span>, and modern JavaScript. I've delivered full websites for clients ranging from spiritual organisations to pet care platforms — always with clean code, smooth animations, and mobile-first design.
              </p>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                My design philosophy is simple: great design should communicate clearly, feel effortless, and leave a lasting impression. I work closely with every client to understand their vision and translate it into something that truly stands out.
              </p>

              {/* Tech stack pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['React', 'Tailwind CSS', 'JavaScript', 'Figma', 'Photoshop', 'Illustrator', 'Node.js', 'Framer Motion'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 border border-primary/20 text-primary/90">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href="https://instagram.com/sv_desizns" target="_blank" rel="noopener noreferrer" className="btn-primary cursor-hover text-center">
                  Design Portfolio
                </a>
                <a href="https://instagram.com/its_sverma" target="_blank" rel="noopener noreferrer" className="btn-secondary cursor-hover text-center">
                  Personal Profile
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What I Do ── */}
      <section className="py-16 px-4 sm:py-20 sm:px-6 lg:py-24 lg:px-8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp()}>
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/40 bg-primary/10 text-primary">
              Services
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-3">What I Do</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              A full-service creative offering — from pixels to production
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className="glass rounded-2xl p-6 sm:p-7 card-hover cursor-hover group"
                {...fadeUp(i * 0.1)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-2xl">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="py-16 px-4 sm:py-20 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp()}>
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/40 bg-primary/10 text-primary">
              Expertise
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-3">Skills & Tools</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              Areas where I consistently deliver high-quality results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="glass rounded-xl p-5 sm:p-6 cursor-hover"
                {...fadeUp(i * 0.07)}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-primary text-base">{skill.icon}</span>
                    <h3 className="text-sm sm:text-base font-semibold">{skill.name}</h3>
                  </div>
                  <span className="text-primary font-bold text-sm tabular-nums">{skill.level}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ delay: i * 0.07 + 0.4, duration: 1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-16 px-4 sm:py-20 sm:px-6 lg:py-24 lg:px-8 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp()}>
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/40 bg-primary/10 text-primary">
              Experience
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-3">My Journey</h2>
            <p className="text-gray-400 text-sm sm:text-base">Key milestones in my design and development career</p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="flex gap-5 sm:gap-7"
                  {...fadeUp(i * 0.15)}
                >
                  {/* dot */}
                  <div className="flex-shrink-0 relative z-10 mt-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* content */}
                  <div className="glass rounded-xl p-5 sm:p-6 flex-1 card-hover cursor-hover">
                    <span className="inline-block mb-2 text-xs font-semibold text-primary tracking-wide uppercase">
                      {item.year}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold mb-0.5">{item.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm mb-2 font-medium">{item.org}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4 sm:py-20 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
            {...fadeUp()}
          >
            {/* bg glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-4 relative">
              Let's Build Something Great
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-lg mx-auto relative leading-relaxed">
              Whether you need a stunning brand identity, a high-performance website, or both — I'm ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
              <a href="/contact" className="btn-primary cursor-hover">Start a Project</a>
              <a href="/portfolio" className="btn-secondary cursor-hover">View My Work</a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default About
