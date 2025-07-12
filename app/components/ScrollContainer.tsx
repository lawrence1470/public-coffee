'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface ScrollContainerProps {
  children: React.ReactNode[]
}

export function ScrollContainer({ children }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const sectionsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return

    const container = containerRef.current
    const wrapper = wrapperRef.current
    const sections = Array.from(wrapper.children) as HTMLElement[]
    sectionsRef.current = sections

    let startY = 0
    let currentY = 0
    let startTime = 0
    let isDragging = false
    
    // Touch/Mouse drag handling
    const handleStart = (e: TouchEvent | MouseEvent) => {
      isDragging = true
      startTime = Date.now()
      startY = 'touches' in e ? e.touches[0].clientY : e.clientY
      currentY = startY
    }
    
    const handleMove = (e: TouchEvent | MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      
      currentY = 'touches' in e ? e.touches[0].clientY : e.clientY
    }
    
    const handleEnd = (e: TouchEvent | MouseEvent) => {
      if (!isDragging) return
      isDragging = false
      
      const endY = 'touches' in e ? 
        (e as TouchEvent).changedTouches[0]?.clientY || currentY : 
        (e as MouseEvent).clientY
      
      const diff = startY - endY
      const time = Date.now() - startTime
      const velocity = Math.abs(diff) / time
      
      // Lower threshold for better responsiveness
      const threshold = 30
      const velocityThreshold = 0.3
      
      if (Math.abs(diff) > threshold || velocity > velocityThreshold) {
        if (diff > 0 && currentSection < sections.length - 1) {
          navigateToSection(currentSection + 1)
        } else if (diff < 0 && currentSection > 0) {
          navigateToSection(currentSection - 1)
        } else {
          // Snap back to current section
          navigateToSection(currentSection)
        }
      } else {
        // Snap back to current section
        navigateToSection(currentSection)
      }
    }
    
    // Add event listeners
    container.addEventListener('mousedown', handleStart)
    container.addEventListener('mousemove', handleMove)
    container.addEventListener('mouseup', handleEnd)
    container.addEventListener('mouseleave', handleEnd)
    
    container.addEventListener('touchstart', handleStart, { passive: false })
    container.addEventListener('touchmove', handleMove, { passive: false })
    container.addEventListener('touchend', handleEnd, { passive: false })


    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        navigateToSection(currentSection + 1)
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        navigateToSection(currentSection - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Mouse wheel support - disabled for now to prevent scrolling
    // const handleWheel = (e: WheelEvent) => {
    //   e.preventDefault()
    //   const delta = e.deltaY
    //   const threshold = 50

    //   if (Math.abs(delta) > threshold) {
    //     if (delta > 0 && currentSection < sections.length - 1) {
    //       navigateToSection(currentSection + 1)
    //     } else if (delta < 0 && currentSection > 0) {
    //       navigateToSection(currentSection - 1)
    //     }
    //   }
    // }

    // Prevent all scrolling
    const preventScroll = (e: Event) => {
      e.preventDefault()
    }

    container.addEventListener('wheel', preventScroll, { passive: false })
    container.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      container.removeEventListener('wheel', preventScroll)
      
      container.removeEventListener('mousedown', handleStart)
      container.removeEventListener('mousemove', handleMove)
      container.removeEventListener('mouseup', handleEnd)
      container.removeEventListener('mouseleave', handleEnd)
      
      container.removeEventListener('touchstart', handleStart)
      container.removeEventListener('touchmove', handleMove)
      container.removeEventListener('touchend', handleEnd)
    }
  }, [currentSection, children.length])

  const navigateToSection = (index: number) => {
    if (!wrapperRef.current) return
    
    const sectionHeight = window.innerHeight
    const targetY = -index * sectionHeight
    
    gsap.to(wrapperRef.current, {
      y: targetY,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrentSection(index)
      }
    })
  }

  return (
    <>
      {/* Navigation Dots */}
      <div className="section-nav">
        {children.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${currentSection === index ? 'active' : ''}`}
            onClick={() => navigateToSection(index)}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Container */}
      <div ref={containerRef} className="gsap-scroll-container">
        <div ref={wrapperRef} className="gsap-scroll-wrapper">
          {children.map((child, index) => (
            <div key={index} className="gsap-section">
              {child}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}