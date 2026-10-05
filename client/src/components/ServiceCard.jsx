import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const ServiceCard = ({ title, description, icon, delay }) => {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      transitionSpeed={1500}
      scale={1.02}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
        className="relative group h-full p-8 glass rounded-2xl border border-white/10 hover:border-primary/50 transition-colors duration-500 overflow-hidden"
      >
        {/* Glow effect that follows the tilt */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </TILT>
  );
};

export default ServiceCard;
