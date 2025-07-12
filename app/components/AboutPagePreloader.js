'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './TerminalPreloader.module.css';

export default function AboutPagePreloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const terminalLinesRef = useRef([]);

  // Custom scramble text effect
  const scrambleText = (element, finalText, duration = 800) => {
    const chars = '▪▫□▣◈◊○◉●◐◑◒◓◔◕◖◗';
    const originalText = element.textContent;
    let scrambleInterval;
    let revealIndex = 0;
    const startTime = Date.now();

    scrambleInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      revealIndex = Math.floor(progress * finalText.length);

      let scrambled = '';
      for (let i = 0; i < finalText.length; i++) {
        if (i < revealIndex) {
          scrambled += finalText[i];
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      element.textContent = scrambled;

      if (progress >= 1) {
        clearInterval(scrambleInterval);
        element.textContent = finalText;
      }
    }, 50);

    return () => clearInterval(scrambleInterval);
  };

  useEffect(() => {
    const preloader = preloaderRef.current;
    const progressBar = progressBarRef.current;
    const terminalLines = terminalLinesRef.current;

    // Set initial states
    gsap.set(terminalLines, { opacity: 0 });
    gsap.set(progressBar, { width: '0%' });

    // Main animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Total duration
    const totalDuration = 6;

    // Animate terminal lines appearing
    terminalLines.forEach((line, index) => {
      if (!line) return;
      
      const delay = (index / terminalLines.length) * (totalDuration * 0.8);
      const baseOpacity = line.classList.contains(styles.faded) ? 0.5 : 1;

      tl.to(line, {
        opacity: baseOpacity,
        duration: 0.3,
        ease: 'power2.out'
      }, delay);

      // Apply scramble effect to scrambleable elements
      const scrambleElements = line.querySelectorAll('[data-scramble="true"]');
      scrambleElements.forEach((elem) => {
        const originalText = elem.getAttribute('data-text') || elem.textContent;
        elem.textContent = '';
        
        tl.call(() => {
          scrambleText(elem, originalText);
        }, [], delay + 0.1);
      });
    });

    // Animate progress bar
    tl.to(progressBar, {
      width: '100%',
      duration: totalDuration - 0.5,
      ease: 'none',
      onUpdate: function() {
        const progress = this.progress() * 100;
        if (progressBar) {
          progressBar.style.width = `${progress}%`;
        }
      }
    }, 0);

    // Add glitch effects
    for (let i = 0; i < 3; i++) {
      const glitchTime = 1.5 + i * 1.5;
      tl.call(() => {
        const scrambleElements = document.querySelectorAll('[data-scramble="true"]');
        const randomElements = Array.from(scrambleElements)
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        randomElements.forEach((elem) => {
          const text = elem.textContent;
          scrambleText(elem, text, 200);
        });
      }, [], glitchTime);
    }

    // Cleanup
    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className={styles.preloader} ref={preloaderRef}>
      <div className={styles.terminalPreloader}>
        <div className={styles.borderTop}>
          <span>Identity Matrix</span>
          <span>Profile Loading</span>
        </div>

        <div className={styles.terminalContainer}>
          {/* Terminal lines with about page specific content */}
          <div className={styles.terminalLine} style={{ top: '0px' }} ref={el => terminalLinesRef.current[0] = el}>
            <span className={styles.faded} data-scramble="true" data-text="Accessing Company Archives">Accessing Company Archives</span>
            <span className={styles.highlight} data-scramble="true" data-text="Archives Unlocked">Archives Unlocked</span>
          </div>

          <div className={styles.terminalLine} style={{ top: '30px' }} ref={el => terminalLinesRef.current[1] = el}>
            <span className={styles.faded} data-scramble="true" data-text="Loading Mission Statement">Loading Mission Statement</span>
            <span className={styles.highlight} data-scramble="true" data-text="Vision Initialized">Vision Initialized</span>
          </div>

          <div className={styles.terminalLine} style={{ top: '60px' }} ref={el => terminalLinesRef.current[2] = el}>
            <span className={styles.highlight} data-scramble="true" data-text="Decoding Core Values">Decoding Core Values</span>
          </div>

          <div className={styles.terminalLine} style={{ top: '90px' }} ref={el => terminalLinesRef.current[3] = el}>
            <span className={styles.highlight} data-scramble="true" data-text="Team Profiles Synchronized">Team Profiles Synchronized</span>
          </div>

          {/* Progress bar */}
          <div className={styles.progressLine} ref={el => terminalLinesRef.current[4] = el}>
            <span className={styles.progressLabel}>Loading</span>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar} ref={progressBarRef}></div>
            </div>
            <span className={styles.highlight} style={{ marginLeft: '10px' }} data-scramble="true" data-text="Identity Data">Identity Data</span>
          </div>

          {/* More terminal lines */}
          <div className={styles.terminalLine} style={{ top: '165px' }} ref={el => terminalLinesRef.current[5] = el}>
            <span className={styles.highlight} data-scramble="true" data-text="Philosophy Modules Active">Philosophy Modules Active</span>
          </div>

          <div className={styles.terminalLine} style={{ top: '195px' }} ref={el => terminalLinesRef.current[6] = el}>
            <span className={styles.highlight} data-scramble="true" data-text="Creative Framework Established">Creative Framework Established</span>
          </div>

          <div className={styles.terminalLine} style={{ top: '225px' }} ref={el => terminalLinesRef.current[7] = el}>
            <span className={styles.highlight} data-scramble="true" data-text="Innovation Protocols Online">Innovation Protocols Online</span>
          </div>

          <div className={styles.terminalLine} style={{ top: '255px' }} ref={el => terminalLinesRef.current[8] = el}>
            <span className={styles.highlight} data-scramble="true" data-text="Experience Timeline Mapped">Experience Timeline Mapped</span>
          </div>

          <div className={styles.terminalLine} style={{ top: '285px' }} ref={el => terminalLinesRef.current[9] = el}>
            <span className={styles.highlight} data-scramble="true" data-text="Story Matrix Complete">Story Matrix Complete</span>
          </div>

          {/* Faded background lines */}
          <div className={`${styles.terminalLine} ${styles.faded}`} style={{ top: '15px' }} ref={el => terminalLinesRef.current[10] = el}>
            <span data-scramble="true" data-text="Culture Parameters Set">Culture Parameters Set</span>
          </div>

          <div className={`${styles.terminalLine} ${styles.faded}`} style={{ top: '45px' }} ref={el => terminalLinesRef.current[11] = el}>
            <span data-scramble="true" data-text="Scanning Achievement Records">Scanning Achievement Records</span>
          </div>

          <div className={`${styles.terminalLine} ${styles.faded}`} style={{ top: '75px' }} ref={el => terminalLinesRef.current[12] = el}>
            <span data-scramble="true" data-text="Parsing Client Testimonials">Parsing Client Testimonials</span>
          </div>

          <div className={`${styles.terminalLine} ${styles.faded}`} style={{ top: '105px' }} ref={el => terminalLinesRef.current[13] = el}>
            <span data-scramble="true" data-text="Compiling Success Metrics">Compiling Success Metrics</span>
          </div>

          <div className={`${styles.terminalLine} ${styles.faded}`} style={{ top: '180px' }} ref={el => terminalLinesRef.current[14] = el}>
            <span data-scramble="true" data-text="Processing Brand Identity">Processing Brand Identity</span>
          </div>

          <div className={`${styles.terminalLine} ${styles.faded}`} style={{ top: '210px' }} ref={el => terminalLinesRef.current[15] = el}>
            <span data-scramble="true" data-text="Calibrating Purpose Statement">Calibrating Purpose Statement</span>
          </div>

          <div className={`${styles.terminalLine} ${styles.faded}`} style={{ top: '240px' }} ref={el => terminalLinesRef.current[16] = el}>
            <span data-scramble="true" data-text="Evaluating Impact Vectors">Evaluating Impact Vectors</span>
          </div>

          <div className={`${styles.terminalLine} ${styles.faded}`} style={{ top: '270px' }} ref={el => terminalLinesRef.current[17] = el}>
            <span data-scramble="true" data-text="Stabilizing Legacy Framework">Stabilizing Legacy Framework</span>
          </div>
        </div>

        <div className={styles.borderBottom}>
          <span>Profile Sequence Complete</span>
          <span>Identity Matrix Loaded</span>
        </div>
      </div>
    </div>
  );
}