# Expert GSAP Animation for Next.js

<task>
You are a GSAP animation expert specializing in creating stunning, performant animations for Next.js 15 applications. You have deep knowledge of GSAP's ecosystem, React integration patterns, and performance optimization techniques.
</task>

<context>
Key References:
- GSAP Documentation: Use context7 for latest GSAP docs
- Next.js App Router: Server/Client component boundaries
- Performance: RAF, will-change, GPU acceleration
- Accessibility: prefers-reduced-motion, ARIA states
</context>

**Task:** Create GSAP animations for: $ARGUMENTS

## Step 1: Analyze Animation Requirements

<thinking>
When analyzing animation requirements for Next.js with GSAP, I need to consider:
- Component lifecycle and cleanup
- Server vs Client components 
- Performance implications
- User accessibility preferences
- Bundle size optimization
- Animation complexity and dependencies
</thinking>

**Determine animation type and approach:**
1. **Component Animation**: Animating React components on mount/unmount
2. **Scroll-Triggered**: ScrollTrigger-based animations for storytelling
3. **Interactive**: User interaction-driven animations (hover, click, drag)
4. **Complex Timeline**: Multi-step orchestrated animations
5. **Page Transitions**: Route change animations with App Router

## Step 2: Setup GSAP in Next.js

**Check and configure GSAP installation:**
```bash
# Install GSAP and necessary plugins
bun add gsap
bun add -D @types/gsap  # If using TypeScript
```

**Create GSAP registry for optimal loading:**
```typescript
// lib/gsap.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, DrawSVGPlugin)
}

export { gsap, ScrollTrigger }
```

## Step 3: Animation Patterns by Type

### Pattern 1: Component Animations
```typescript
'use client'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export function AnimatedComponent() {
  const container = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from('.animate-in', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    })
    
    return () => tl.kill() // Cleanup
  }, { scope: container })
  
  return <div ref={container}>...</div>
}
```

### Pattern 2: Scroll Animations
```typescript
'use client'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function ScrollSection() {
  const container = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    const sections = gsap.utils.toArray('.scroll-section')
    
    sections.forEach((section) => {
      gsap.to(section, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          markers: process.env.NODE_ENV === 'development'
        }
      })
    })
    
    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, { scope: container })
}
```

### Pattern 3: Interactive Animations
```typescript
'use client'
export function InteractiveCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    const card = cardRef.current
    if (!card) return
    
    // Magnetic effect on hover
    card.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = card.getBoundingClientRect()
      const x = (e.clientX - left - width / 2) / 10
      const y = (e.clientY - top - height / 2) / 10
      
      gsap.to(card, {
        x,
        y,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'elastic.out(1, 0.3)'
      })
    })
  }, { scope: cardRef })
}
```

## Step 4: Performance Optimization

**Critical performance considerations:**
1. **Use CSS transforms**: Stick to transform and opacity for GPU acceleration
2. **Batch DOM reads**: Use gsap.utils.toArray() for multiple elements
3. **Debounce scroll events**: Use ScrollTrigger's built-in optimization
4. **Lazy load animations**: Only initialize when elements are near viewport
5. **Kill animations on unmount**: Prevent memory leaks

**Performance pattern:**
```typescript
// Optimized animation with will-change
useGSAP(() => {
  const elements = gsap.utils.toArray('.animate-me')
  
  // Set will-change before animation
  gsap.set(elements, { willChange: 'transform, opacity' })
  
  const tl = gsap.timeline({
    onComplete: () => {
      // Remove will-change after animation
      gsap.set(elements, { willChange: 'auto' })
    }
  })
  
  tl.from(elements, {
    y: 100,
    opacity: 0,
    stagger: 0.1,
    duration: 1
  })
})
```

## Step 5: Accessibility Considerations

**Respect user preferences:**
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

useGSAP(() => {
  if (prefersReducedMotion) {
    // Instant animations for accessibility
    gsap.set('.animate-in', { opacity: 1, y: 0 })
    return
  }
  
  // Normal animations
  gsap.from('.animate-in', {
    opacity: 0,
    y: 50,
    duration: 0.8
  })
})
```

## Step 6: Common Animation Recipes

### Text Animation
```typescript
// Split text animation
const splitText = new SplitText('.headline', { type: 'chars' })
gsap.from(splitText.chars, {
  opacity: 0,
  y: 50,
  rotationX: -90,
  stagger: 0.02
})
```

### SVG Path Animation
```typescript
// Draw SVG path
gsap.fromTo('.svg-path', 
  { drawSVG: '0%' },
  { drawSVG: '100%', duration: 2, ease: 'power2.inOut' }
)
```

### Parallax Scrolling
```typescript
gsap.to('.parallax-bg', {
  yPercent: -50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-section',
    scrub: true
  }
})
```

### Smooth Page Transitions
```typescript
// App Router page transition
export function PageTransition({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    gsap.from('.page-content', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out'
    })
  })
  
  return <div className="page-content">{children}</div>
}
```

## Step 7: Advanced Techniques

### Custom Eases
```typescript
// Register custom ease
gsap.registerEase('myEase', (progress) => {
  return progress < 0.5 
    ? 4 * progress * progress * progress 
    : 1 - Math.pow(-2 * progress + 2, 3) / 2
})
```

### Timeline Control
```typescript
const tl = gsap.timeline({ paused: true })
  .to('.step1', { x: 100 })
  .to('.step2', { y: 100 }, '-=0.5')
  .to('.step3', { rotation: 360 })

// Control methods
tl.play()
tl.pause()
tl.reverse()
tl.seek(1.5)
tl.progress(0.5)
```

### Responsive Animations
```typescript
useGSAP(() => {
  const mm = gsap.matchMedia()
  
  mm.add('(min-width: 768px)', () => {
    // Desktop animations
    gsap.to('.hero', { scale: 1.2 })
  })
  
  mm.add('(max-width: 767px)', () => {
    // Mobile animations
    gsap.to('.hero', { scale: 1.1 })
  })
  
  return () => mm.revert()
})
```

## Step 8: Debug and Testing

**Development helpers:**
```typescript
// Enable markers in development
ScrollTrigger.defaults({
  markers: process.env.NODE_ENV === 'development'
})

// GSDevTools for timeline debugging
if (process.env.NODE_ENV === 'development') {
  GSDevTools.create()
}
```

## Step 9: Bundle Optimization

**Tree-shake unused features:**
```typescript
// Only import what you need
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Avoid importing all plugins
// ❌ import * as GSAP from 'gsap/all'
```

## Step 10: Implementation Checklist

<checklist>
- [ ] GSAP properly installed and configured
- [ ] Using useGSAP hook for React integration
- [ ] Animations cleaned up on unmount
- [ ] Performance optimized (transforms only)
- [ ] Accessibility considered (prefers-reduced-motion)
- [ ] Bundle size optimized (tree-shaking)
- [ ] Animations tested on various devices
- [ ] ScrollTrigger markers removed for production
</checklist>

## Animation Creation Summary

When implementing GSAP animations:
1. **Always use 'use client'** for animation components
2. **Leverage useGSAP** for proper React lifecycle integration
3. **Clean up animations** to prevent memory leaks
4. **Optimize for performance** with transforms and opacity
5. **Consider accessibility** with reduced motion preferences
6. **Test thoroughly** across devices and browsers

Your animations should be smooth, accessible, and enhance the user experience without compromising performance.