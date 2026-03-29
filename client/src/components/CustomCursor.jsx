import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const followerRefPosition = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [supportsHover, setSupportsHover] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)')
    const handleChange = () => setSupportsHover(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener?.('change', handleChange)

    return () => {
      mediaQuery.removeEventListener?.('change', handleChange)
    }
  }, [])

  useEffect(() => {
    if (!supportsHover) return undefined

    const updateCursor = (event) => {
      targetRef.current = { x: event.clientX, y: event.clientY }
      setIsVisible(true)
    }

    const animateFollower = () => {
      if (cursorRef.current && followerRef.current) {
        const { x, y } = targetRef.current
        const follower = followerRefPosition.current

        cursorRef.current.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0)`

        follower.x += (x - 20 - follower.x) * 0.16
        follower.y += (y - 20 - follower.y) * 0.16

        followerRef.current.style.transform = `translate3d(${follower.x}px, ${follower.y}px, 0)`
      }

      animationFrameRef.current = window.requestAnimationFrame(animateFollower)
    }

    const handleMouseOver = (event) => {
      const target = event.target
      const isInteractive = target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('cursor-hover') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-hover')

      setIsHovering(Boolean(isInteractive))
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    document.addEventListener('mousemove', updateCursor, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    animationFrameRef.current = window.requestAnimationFrame(animateFollower)

    return () => {
      document.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [supportsHover])

  if (!supportsHover) {
    return null
  }

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-mode-difference"
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />

      <motion.div
        ref={followerRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid rgba(99, 102, 241, 0.3)',
          background: 'rgba(99, 102, 241, 0.05)',
          backdropFilter: 'blur(4px)'
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
          opacity: isVisible ? 1 : 0,
          borderColor: isHovering ? 'rgba(139, 92, 246, 0.6)' : 'rgba(99, 102, 241, 0.3)'
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.8
        }}
      />

      {isHovering && (
        <motion.div
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: targetRef.current.x - 30,
            top: targetRef.current.y - 30,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)'
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </>
  )
}

export default CustomCursor
