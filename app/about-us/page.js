'use client';

import AboutPagePreloader from '../components/AboutPagePreloader';

export default function AboutUs() {
  const handlePreloaderComplete = () => {
    // Preloader has completed its animation
    // The terminal text will remain visible
  };

  return <AboutPagePreloader onComplete={handlePreloaderComplete} />;
}