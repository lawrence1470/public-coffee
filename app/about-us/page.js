'use client';

import { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import AboutPagePreloader from '../components/AboutPagePreloader';
import gsap from 'gsap';
import styles from './page.module.css';

export default function AboutUs() {
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef(null);
  const quoteLinesRef = useRef([]);
  const mainContentRef = useRef(null);

  useEffect(() => {
    // Set initial states
    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, visibility: 'hidden' });
    }
    if (quoteLinesRef.current) {
      gsap.set(quoteLinesRef.current, { y: '100%' });
    }
  }, []);

  const handlePreloaderComplete = () => {
    // Create reveal timeline
    const tl = gsap.timeline();

    // Fade out preloader with clip path
    const preloader = document.querySelector('[class*="TerminalPreloader_preloader"]');
    if (preloader) {
      tl.to(preloader, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.64,
        ease: 'cubic-bezier(0.65, 0.05, 0.36, 1)',
        onComplete: () => {
          setIsLoading(false);
        }
      });
    }

    // Reveal content
    tl.to(contentRef.current, {
      opacity: 1,
      visibility: 'visible',
      duration: 0.3
    }, '-=0.3');

    // Animate quote lines
    tl.to(quoteLinesRef.current, {
      y: '0%',
      duration: 0.64,
      stagger: 0.1,
      ease: 'cubic-bezier(0.65, 0.05, 0.36, 1)'
    }, '-=0.2');

    // Fade in main content
    tl.fromTo(mainContentRef.current, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, 
      '-=0.2'
    );
  };

  return (
    <>
      {isLoading && <AboutPagePreloader onComplete={handlePreloaderComplete} />}
      
      <div className={styles.pageContainer} ref={contentRef}>
        {/* Background image */}
        <div className={styles.backgroundImage}></div>
        
        {/* Quote section */}
        <div className={styles.quoteSection}>
          <h2>
            <span className={styles.titleLine}>
              <span ref={el => quoteLinesRef.current[0] = el}>Creativity transcends space</span>
            </span>
            <span className={styles.titleLine}>
              <span ref={el => quoteLinesRef.current[1] = el}>weaving quantum threads</span>
            </span>
            <span className={styles.titleLine}>
              <span ref={el => quoteLinesRef.current[2] = el}>into new realities</span>
            </span>
            <span className={styles.titleLine}>
              <span ref={el => quoteLinesRef.current[3] = el}>beyond dimensions.</span>
            </span>
          </h2>
        </div>

        {/* Navigation */}
        <Navigation />
        
        {/* Main content */}
        <section className={styles.mainContent} ref={mainContentRef}>
          <div className={styles.contentWrapper}>
            <h1 className={styles.pageTitle}>About Us</h1>
            <div className={styles.contentGrid}>
              <div className={styles.contentColumn}>
                <p className={styles.leadText}>
                  We are explorers of the digital frontier, crafting experiences that blur the boundaries between imagination and reality.
                </p>
                <p className={styles.bodyText}>
                  Founded on the principle that great design transcends conventional limitations, we specialize in creating immersive digital experiences that captivate and inspire. Our team combines technical expertise with creative vision to push the boundaries of what's possible on the web.
                </p>
              </div>
              <div className={styles.contentColumn}>
                <p className={styles.bodyText}>
                  Every project is an opportunity to explore new dimensions of creativity. We believe in the power of thoughtful design, meticulous attention to detail, and the seamless integration of form and function.
                </p>
                <p className={styles.bodyText}>
                  From concept to execution, we approach each challenge with curiosity and dedication, ensuring that every digital experience we create leaves a lasting impression.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Scroll indicator */}
        <div className={styles.scrollText}>Scroll</div>
      </div>
    </>
  );
}