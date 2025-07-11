"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Steps animation
      if (stepsRef.current) {
        const steps = stepsRef.current.querySelectorAll('.growth-step');
        
        gsap.from(steps, {
          x: -100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        });

        // Number counters
        steps.forEach((step) => {
          const numberEl = step.querySelector('.step-number');
          if (numberEl) {
            gsap.from(numberEl, {
              scale: 0,
              rotation: -180,
              duration: 1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-minimal-container">
        <h2 ref={titleRef} className="about-title">
          How Subscriptions
          <br />
          <span className="title-highlight">Transform Your Business</span>
        </h2>
        
        <p ref={subtitleRef} className="about-subtitle">
          Simple steps to predictable growth
        </p>

        <div ref={stepsRef} className="growth-steps">
          <div className="growth-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Launch in Minutes</h3>
              <p>Set your plans, upload your logo, go live instantly</p>
            </div>
          </div>

          <div className="growth-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Watch Subscribers Grow</h3>
              <p>Customers love the savings and convenience</p>
            </div>
          </div>

          <div className="growth-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Enjoy Predictable Revenue</h3>
              <p>Monthly recurring income you can count on</p>
            </div>
          </div>
        </div>

        <div className="revenue-visual">
          <div className="revenue-line"></div>
          <span className="revenue-label">Your Revenue</span>
        </div>
      </div>
    </section>
  );
}
