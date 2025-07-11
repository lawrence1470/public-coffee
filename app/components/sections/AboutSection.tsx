"use client";

import { motion } from "framer-motion";
import { AiOutlineArrowDown } from "react-icons/ai";

export function AboutSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="about-section">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2>Our Premium Collection</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Discover the artistry behind every cup. Our premium coffee
                collection features beans sourced from the world&apos;s finest
                coffee-growing regions, carefully roasted to perfection.
              </p>
              <p>
                From bold espresso blends to smooth single-origin varieties,
                each cup tells a story of passion, craftsmanship, and dedication
                to quality.
              </p>
              <div className="features-grid">
                <div className="feature">
                  <h3>Premium Quality</h3>
                  <p>Hand-selected beans from sustainable farms</p>
                </div>
                <div className="feature">
                  <h3>Expert Roasting</h3>
                  <p>Artisan roasting techniques for perfect flavor</p>
                </div>
                <div className="feature">
                  <h3>Fresh Delivery</h3>
                  <p>Delivered fresh to your door weekly</p>
                </div>
                <div className="feature">
                  <h3>Sustainability</h3>
                  <p>Supporting ethical and eco-friendly practices</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AiOutlineArrowDown
            size="1.5em"
            style={{ transform: "rotate(180deg)" }}
          />
          Back to Top
        </motion.button>
      </div>
    </section>
  );
}
