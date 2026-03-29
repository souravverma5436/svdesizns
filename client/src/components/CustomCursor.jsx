import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const CURSOR_OFFSET = 6
const FOLLOWER_OFFSET = 20
const GLOW_OFFSET = 30

const isInteractiveTarget = (target) => {
  if (!(target instanceof HTMLElement)) return false

  return Boolean(
    target.closest('button') ||
    target.closest('a') ||
    target.closest('input') ||
    target.closest('textarea') ||
    target.closest('select') ||
    target.closest('[role="button"]') ||
    target.closest('[role="link"]') ||
    target.closest('.cursor-hover')
  )
}

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const animationFrameRef = useRef(null)
  const targetPositionRef = useRef({ x: -100, y: -100 })
  const followerPositionRef = useRef({ x: -100, y: -100 })

  const [isMounted, setIsMounted] = useState(false)
  const [supportsHover, setSupportsHover] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [glowPosition, setGlowPosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return undefined

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updateCapability = () => setSupportsHover(mediaQuery.matches)

    updateCapability()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateCapability)
      return () => mediaQuery.removeEventListener('change', updateCapability)
    }

    mediaQuery.addListener(updateCapability)
    return () => mediaQuery.removeListener(updateCapability)
  }, [isMounted])

  useEffect(() => {
    if (!isMounted || !supportsHover) return undefined

    const updatePointer = (event) => {
      const nextPosition = { x: event.clientX, y: event.clientY }
      targetPositionRef.current = nextPosition
      setGlowPosition(nextPosition)
      setIsVisible(true)
    }

    const handlePointerOver = (event) => {
      setIsHovering(isInteractiveTarget(event.target))
    }

    const handlePointerDown = () => setIsClicking(true)
    const handlePointerUp = () => setIsClicking(false)
    const handlePointerLeave = () => setIsVisible(false)
    const handlePointerEnter = () => setIsVisible(true)
    const handleWindowBlur = () => {
      setIsVisible(false)
      setIsClicking(false)
    }

    const animate = () => {
      if (cursorRef.current && followerRef.current) {
        const target = targetPositionRef.current
        const follower = followerPositionRef.current

        cursorRef.current.style.transform = `translate3d(${target.x - CURSOR_OFFSET}px, ${target.y - CURSOR_OFFSET}px, 0)`

        follower.x += (target.x - FOLLOWER_OFFSET - follower.x) * 0.18
        follower.y += (target.y - FOLLOWER_OFFSET - follower.y) * 0.18

        followerRef.current.style.transform = `translate3d(${follower.x}px, ${follower.y}px, 0)`
      }

      animationFrameRef.current = window.requestAnimationFrame(animate)
    }

    document.addEventListener('pointermove', updatePointer, { passive: true })
    document.addEventListener('pointerover', handlePointerOver, { passive: true })
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('pointerenter', handlePointerEnter)
    window.addEventListener('blur', handleWindowBlur)

    animationFrameRef.current = window.requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('pointermove', updatePointer)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('pointerenter', handlePointerEnter)
      window.removeEventListener('blur', handleWindowBlur)

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isMounted, supportsHover])

  if (!isMounted || !supportsHover) {
    return null
  }

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed left-0 top-0 pointer-events-none z-[9999] mix-blend-mode-difference"
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
        }}
        animate={{
          scale: isClicking ? 0.75 : isHovering ? 1.45 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
          mass: 0.5
        }}
      />

      <motion.div
        ref={followerRef}
        className="fixed left-0 top-0 pointer-events-none z-[9998]"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid rgba(99, 102, 241, 0.3)',
          background: 'rgba(99, 102, 241, 0.05)',
          backdropFilter: 'blur(4px)'
        }}
        animate={{
          scale: isClicking ? 0.88 : isHovering ? 1.15 : 1,
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

      <motion.div
        className="fixed pointer-events-none z-[9997]"
        style={{
          left: glowPosition.x - GLOW_OFFSET,
          top: glowPosition.y - GLOW_OFFSET,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)'
        }}
        animate={{
          opacity: isVisible && isHovering ? 1 : 0,
          scale: isVisible && isHovering ? 1 : 0.6
        }}
        transition={{ duration: 0.18 }}
      />
    </>
  )
}

export default CustomCursor
