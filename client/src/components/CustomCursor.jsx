import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

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
  const [isMounted, setIsMounted] = useState(false)
  const [supportsHover, setSupportsHover] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const pointerX = useMotionValue(-100)
  const pointerY = useMotionValue(-100)
  const ringX = useSpring(pointerX, { stiffness: 420, damping: 34, mass: 0.5 })
  const ringY = useSpring(pointerY, { stiffness: 420, damping: 34, mass: 0.5 })
  const dotX = useSpring(pointerX, { stiffness: 900, damping: 45, mass: 0.18 })
  const dotY = useSpring(pointerY, { stiffness: 900, damping: 45, mass: 0.18 })

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
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
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
      setIsHovering(false)
    }

    document.addEventListener('pointermove', updatePointer, { passive: true })
    document.addEventListener('pointerover', handlePointerOver, { passive: true })
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('pointerenter', handlePointerEnter)
    window.addEventListener('blur', handleWindowBlur)

    return () => {
      document.removeEventListener('pointermove', updatePointer)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('pointerenter', handlePointerEnter)
      window.removeEventListener('blur', handleWindowBlur)
    }
  }, [isMounted, supportsHover, pointerX, pointerY])

  if (!isMounted || !supportsHover) {
    return null
  }

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          width: 28,
          height: 28,
          marginLeft: -14,
          marginTop: -14,
          borderRadius: '9999px',
          border: '1px solid rgba(255, 255, 255, 0.45)',
          background: 'rgba(255, 255, 255, 0.03)',
          boxShadow: '0 0 18px rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(2px)'
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.9 : isHovering ? 1.2 : 1,
          borderColor: isHovering ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.45)',
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.03)'
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      />

      <motion.div
        className="fixed left-0 top-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.96)',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.35)'
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.85 : 1
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 40 }}
      />
    </>
  )
}

export default CustomCursor
