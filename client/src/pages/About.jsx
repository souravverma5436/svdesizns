import { motion } from 'framer-motion'

const About = () => {
  const skills = [
    { name: 'Logo Design', level: 95 },
    { name: 'Branding', level: 90 },
    { name: 'Social Media Design', level: 88 },
    { name: 'Web Design & Development', level: 86 },
    { name: 'Print Design', level: 85 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'Illustration', level: 75 }
  ]

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-4 sm:mb-6">
              About Me
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Passionate graphic designer with a love for creating visual stories that connect and inspire
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Profile Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 card-hover">
                <div className="w-full h-56 sm:h-72 lg:h-96 bg-gradient-to-br from-primary to-secondary rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <span className="text-5xl sm:text-6xl font-bold text-white">SV</span>
                </div>
              </div>

              <motion.div
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-full opacity-60"
                animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-lg opacity-60"
                animate={{ y: [0, 10, 0], rotate: [0, -180, -360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                Creative Designer & Visual Storyteller
              </h2>
              <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base lg:text-lg">
                <p>
                  Hello! I'm Sourav Verma, a passionate graphic designer with over 3 years of experience
                  in creating compelling visual narratives. I specialize in brand identity, logo design,
                  and social media creatives that help businesses stand out.
                </p>
                <p>
                  My design philosophy centers around the belief that great design should not only look
                  beautiful but also communicate effectively. I work closely with clients to understand
                  their vision and translate it into impactful visual solutions.
                </p>
                <p>
                  When I'm not designing, you can find me exploring new design trends or sharing my
                  work on Instagram where I connect with fellow creatives from around the world.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="https://instagram.com/sv_desizns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary cursor-hover text-center"
                >
                  Design Portfolio
                </a>
                <a
                  href="https://instagram.com/its_sverma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary cursor-hover text-center"
                >
                  Personal Profile
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-dark-light/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-3 sm:mb-4">
              Skills & Expertise
            </h2>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
              Areas where I excel and continue to grow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="glass rounded-xl p-4 sm:p-6 cursor-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-semibold">{skill.name}</h3>
                  <span className="text-primary font-bold text-sm sm:text-base">{skill.level}%</span>
                </div>
                <div className="w-full bg-dark-lighter rounded-full h-2 sm:h-3">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-secondary h-2 sm:h-3 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-3 sm:mb-4">
              My Journey
            </h2>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
              Key milestones in my design career
            </p>
          </motion.div>

          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {[
              { year: '2024', title: 'Senior Graphic Designer', description: 'Leading design projects and mentoring junior designers' },
              { year: '2023', title: 'Freelance Designer', description: 'Expanded client base and specialized in brand identity' },
              { year: '2022', title: 'Junior Designer', description: 'Started professional journey in graphic design' }
            ].map((item, index) => (
              <motion.div
                key={item.year}
                className="flex items-center gap-4 sm:gap-6 lg:gap-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center font-bold text-xs sm:text-sm lg:text-lg text-center leading-tight p-2">
                  {item.year}
                </div>
                <div className="glass rounded-xl p-4 sm:p-6 flex-1 cursor-hover card-hover min-w-0">
                  <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm sm:text-base">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
