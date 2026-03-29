import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-dark-lighter border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ rotateX: 4, scale: 1.01 }}
            style={{ transformPerspective: 1000 }}
          >
            <a
              href="https://svermaportfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors inline-block"
            >
              © {new Date().getFullYear()} Sv_desizns. All rights reserved. Designed by Sourav Verma
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
