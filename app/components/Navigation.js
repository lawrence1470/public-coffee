'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './Navigation.module.css';

export default function Navigation() {
  const navRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    gsap.defaults({
      ease: "power4.out",
      duration: 0.7
    });

    const navWrap = navRef.current;
    const overlay = navWrap.querySelector(`.${styles.overlay}`);
    const menu = navWrap.querySelector(`.${styles.menu}`);
    const bgPanels = navWrap.querySelectorAll(`.${styles.bgPanel}`);
    const menuToggles = document.querySelectorAll('[data-menu-toggle]');
    const menuLinks = navWrap.querySelectorAll(`.${styles.menuLink}`);
    const fadeTargets = navWrap.querySelectorAll('[data-menu-fade]');
    const menuButton = document.querySelector(`.${styles.menuButton}`);
    const menuButtonTexts = menuButton.querySelectorAll('p');
    const menuButtonIcon = menuButton.querySelector(`.${styles.menuButtonIcon}`);

    tlRef.current = gsap.timeline();

    const openNav = () => {
      navWrap.setAttribute('data-nav', 'open');
      
      tlRef.current.clear()
        .set(navWrap, { display: 'block' })
        .set(menu, { xPercent: 0 }, '<')
        .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
        .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, '<')
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
        .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, '<')
        .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, '<+=0.35')
        .fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04 }, '<+=0.2');
    };

    const closeNav = () => {
      navWrap.setAttribute('data-nav', 'closed');
      
      tlRef.current.clear()
        .to(overlay, { autoAlpha: 0 })
        .to(menu, { xPercent: 120 }, '<')
        .to(menuButtonTexts, { yPercent: 0 }, '<')
        .to(menuButtonIcon, { rotate: 0 }, '<')
        .set(navWrap, { display: 'none' });
    };

    // Toggle menu open/close
    menuToggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const state = navWrap.getAttribute('data-nav');
        if (state === 'open') {
          closeNav();
        } else {
          openNav();
        }
      });
    });

    // Close menu when clicking a link
    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navWrap.getAttribute('data-nav') === 'open') {
          closeNav();
        }
      });
    });

    // Close menu with Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && navWrap.getAttribute('data-nav') === 'open') {
        closeNav();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Initial state
    gsap.set(navWrap, { display: 'none' });

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.isFull}`}>
          <nav className={styles.navRow}>
            <Link href="/" aria-label="home" className={styles.navLogoRow}>
              <span className={styles.navLogoWordmark}>CoffeeBird</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className={styles.navLogoIcon}>
                <path d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z" fill="currentColor"/>
                <path d="M12 6C12.55 6 13 6.45 13 7V11.17L15.59 13.76C15.98 14.15 15.98 14.78 15.59 15.17C15.2 15.56 14.57 15.56 14.18 15.17L11.3 12.29C11.11 12.1 11 11.85 11 11.59V7C11 6.45 11.45 6 12 6Z" fill="currentColor"/>
                <path d="M17 14H18C18.55 14 19 13.55 19 13V10C19 9.45 18.55 9 18 9H17V14Z" fill="currentColor"/>
              </svg>
            </Link>
            <div className={styles.navRowRight}>
              <button role="button" data-menu-toggle="" className={styles.menuButton}>
                <div className={styles.menuButtonText}>
                  <p className={styles.pLarge}>Menu</p>
                  <p className={styles.pLarge}>Close</p>
                </div>
                <div className={styles.iconWrap}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none" className={styles.menuButtonIcon}>
                    <path d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z" fill="currentColor"></path>
                    <path d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z" fill="currentColor"></path>
                    <path d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z" fill="currentColor"></path>
                    <path d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z" fill="currentColor"></path>
                    <path d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z" fill="currentColor"></path>
                    <path d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z" fill="currentColor"></path>
                  </svg>
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div data-nav="closed" className={styles.nav} ref={navRef}>
        <div data-menu-toggle="" className={styles.overlay}></div>
        <nav className={styles.menu}>
          <div className={styles.menuBg}>
            <div className={`${styles.bgPanel} ${styles.first}`}></div>
            <div className={`${styles.bgPanel} ${styles.second}`}></div>
            <div className={styles.bgPanel}></div>
          </div>
          <div className={styles.menuInner}>
            <ul className={styles.menuList}>
              <li className={styles.menuListItem}>
                <Link href="/about-us" className={styles.menuLink}>
                  <p className={styles.menuLinkHeading}>Our Story</p>
                  <p className={styles.eyebrow}>01</p>
                  <div className={styles.menuLinkBg}></div>
                </Link>
              </li>
              <li className={styles.menuListItem}>
                <Link href="/roasters" className={styles.menuLink}>
                  <p className={styles.menuLinkHeading}>Roasters</p>
                  <p className={styles.eyebrow}>02</p>
                  <div className={styles.menuLinkBg}></div>
                </Link>
              </li>
              <li className={styles.menuListItem}>
                <Link href="/experiences" className={styles.menuLink}>
                  <p className={styles.menuLinkHeading}>Experiences</p>
                  <p className={styles.eyebrow}>03</p>
                  <div className={styles.menuLinkBg}></div>
                </Link>
              </li>
              <li className={styles.menuListItem}>
                <Link href="/journal" className={styles.menuLink}>
                  <p className={styles.menuLinkHeading}>Journal</p>
                  <p className={styles.eyebrow}>04</p>
                  <div className={styles.menuLinkBg}></div>
                </Link>
              </li>
              <li className={styles.menuListItem}>
                <Link href="/membership" className={styles.menuLink}>
                  <p className={styles.menuLinkHeading}>Membership</p>
                  <p className={styles.eyebrow}>05</p>
                  <div className={styles.menuLinkBg}></div>
                </Link>
              </li>
            </ul>
            <div className={styles.menuDetails}>
              <p data-menu-fade="" className={styles.pSmall}>Socials</p>
              <div className={styles.socialsRow}>
                <a data-menu-fade="" href="#" className={`${styles.pLarge} ${styles.textLink}`}>Instagram</a>
                <a data-menu-fade="" href="#" className={`${styles.pLarge} ${styles.textLink}`}>LinkedIn</a>
                <a data-menu-fade="" href="#" className={`${styles.pLarge} ${styles.textLink}`}>X/Twitter</a>
                <a data-menu-fade="" href="#" className={`${styles.pLarge} ${styles.textLink}`}>Awwwards</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}