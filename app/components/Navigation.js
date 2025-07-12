'use client';

import { useEffect, useRef } from 'react';
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
            <a href="https://osmo.supply/" aria-label="home" target="_blank" className={styles.navLogoRow}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 66 20" fill="none" className={styles.navLogoWordmark}>
                <path d="M9.67499 19.3499C4.32499 19.3499 0.899994 15.4249 0.899994 10.0499C0.899994 4.6749 4.32499 0.774902 9.67499 0.774902C15.025 0.774902 18.45 4.6749 18.45 10.0499C18.45 15.4249 15.025 19.3499 9.67499 19.3499ZM3.77499 10.0499C3.77499 13.7249 5.44999 16.9749 9.67499 16.9749C13.9 16.9749 15.575 13.7249 15.575 10.0499C15.575 6.3749 13.9 3.1499 9.67499 3.1499C5.44999 3.1499 3.77499 6.3749 3.77499 10.0499Z" fill="currentColor"></path>
                <path d="M25.7115 19.3499C21.8365 19.3499 19.9115 17.3499 19.8365 14.7499H22.3115C22.4115 16.2249 23.3115 17.3749 25.6865 17.3749C27.8365 17.3749 28.4115 16.4249 28.4115 15.4999C28.4115 13.8999 26.7115 13.7249 25.0615 13.3749C22.8365 12.8499 20.2865 12.1999 20.2865 9.5499C20.2865 7.3499 22.0615 5.8749 25.1365 5.8749C28.6365 5.8749 30.3115 7.7499 30.4865 9.9499H28.0115C27.8365 8.9749 27.3115 7.8499 25.1865 7.8499C23.5365 7.8499 22.8365 8.4999 22.8365 9.4499C22.8365 10.7749 24.2615 10.8999 26.0615 11.2999C28.4115 11.8499 30.9615 12.5249 30.9615 15.3749C30.9615 17.8499 29.0615 19.3499 25.7115 19.3499Z" fill="currentColor"></path>
                <path d="M40.5435 10.8249C40.5435 9.1249 40.1935 7.9749 38.3186 7.9749C36.4936 7.9749 35.3435 9.2499 35.3435 11.1749V18.9999H32.8935V6.2499H35.3435V7.8499H35.3935C36.0685 6.8749 37.2435 5.8749 39.1685 5.8749C40.9435 5.8749 42.0435 6.6749 42.5435 8.0999H42.5935C43.5185 6.8749 44.8185 5.8749 46.7685 5.8749C49.3435 5.8749 50.6436 7.4249 50.6436 10.1499V18.9999H48.1936V10.8249C48.1936 9.1249 47.8435 7.9749 45.9685 7.9749C44.1435 7.9749 42.9935 9.2499 42.9935 11.1749V18.9999H40.5435V10.8249Z" fill="currentColor"></path>
                <path d="M59.0281 19.3749C55.0531 19.3749 52.6531 16.6249 52.6531 12.6249C52.6531 8.6499 55.0531 5.8499 59.0531 5.8499C63.0031 5.8499 65.4031 8.6249 65.4031 12.5999C65.4031 16.5999 63.0031 19.3749 59.0281 19.3749ZM55.2031 12.6249C55.2031 15.2749 56.4031 17.3499 59.0531 17.3499C61.6531 17.3499 62.8531 15.2749 62.8531 12.6249C62.8531 9.9499 61.6531 7.8999 59.0531 7.8999C56.4031 7.8999 55.2031 9.9499 55.2031 12.6249Z" fill="currentColor"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 160 160" fill="none" className={styles.navLogoIcon}>
                <path d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z" fill="currentColor"></path>
              </svg>
            </a>
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
                <a href="#" className={styles.menuLink}>
                  <p className={styles.menuLinkHeading}>About us</p>
                  <p className={styles.eyebrow}>01</p>
                  <div className={styles.menuLinkBg}></div>
                </a>
              </li>
              <li className={styles.menuListItem}>
                <a href="#" className={styles.menuLink}>
                  <p className={styles.menuLinkHeading}>Our work</p>
                  <p className={styles.eyebrow}>02</p>
                  <div className={styles.menuLinkBg}></div>
                </a>
              </li>
              <li className={styles.menuListItem}>
                <a href="#" className={styles.menuLink}>
                  <p className={styles.menuLinkHeading}>Services</p>
                  <p className={styles.eyebrow}>03</p>
                  <div className={styles.menuLinkBg}></div>
                </a>
              </li>
              <li className={styles.menuListItem}>
                <a href="#" className={styles.menuLink}>
                  <p className={styles.menuLinkHeading}>Blog</p>
                  <p className={styles.eyebrow}>04</p>
                  <div className={styles.menuLinkBg}></div>
                </a>
              </li>
              <li className={styles.menuListItem}>
                <a href="#" className={styles.menuLink}>
                  <p className={styles.menuLinkHeading}>Contact us</p>
                  <p className={styles.eyebrow}>05</p>
                  <div className={styles.menuLinkBg}></div>
                </a>
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