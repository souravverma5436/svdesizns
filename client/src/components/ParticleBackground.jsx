import React, { useEffect, useMemo, useState } from 'react'

const createParticles = (count) => (
  Array.from({ length: count }, (_, index) => ({
    id: index,
    left: `${(index * 37) % 100}%`,
    top: `${(index * 19) % 100}%`,
    delay: `${(index % 8) * 0.6}s`,
    duration: `${8 + (index % 5)}s`
  }))
)

const ParticleBackground = () => {
  const [showParticles, setShowParticles] = useState(false)
  const particles = useMemo(() => createParticles(28), [])

  useEffect(() => {
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isLargeScreen = window.matchMedia('(min-width: 768px)').matches

    if (!hasReducedMotion && isLargeScreen) {
      const timer = window.setTimeout(() => setShowParticles(true), 250)
      return () => window.clearTimeout(timer)
    }

    return undefined
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.14),transparent_28%),linear-gradient(135deg,#0f0f23_0%,#1a1a2e_50%,#16213e_100%)] opacity-95" />

      {showParticles && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle absolute h-1 w-1 rounded-full bg-primary/70"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,15,35,0.24)_65%,rgba(15,15,35,0.5)_100%)]" />
    </div>
  )
}

export default ParticleBackground
