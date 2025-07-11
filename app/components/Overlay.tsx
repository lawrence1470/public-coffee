"use client";

import { Logo } from "@pmndrs/branding";
import { motion } from "framer-motion";
import {
  AiOutlineShopping,
  AiOutlineArrowRight,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { useSnapshot } from "valtio";
import { state } from "../store";

export function Overlay() {
  const snap = useSnapshot(state);
  const transition = { type: "spring" as const, duration: 0.8 };
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
  };

  const scrollToAbout = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <Logo width="40" height="40" />
        <motion.div
          animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }}
          transition={transition}
        >
          <AiOutlineShopping size="3em" />
        </motion.div>
      </motion.header>
      <motion.section key="main" {...config}>
        <div className="section--container">
          <motion.div
            key="title"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring" as const,
              damping: 5,
              stiffness: 40,
              restDelta: 0.001,
              duration: 0.3,
            }}
          >
            <h1>LET&apos;S DO IT.</h1>
          </motion.div>
          <div className="support--content">
            <motion.div
              key="p"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring" as const,
                damping: 7,
                stiffness: 30,
                restDelta: 0.001,
                duration: 0.6,
                delay: 0.2,
                delayChildren: 0.2,
              }}
            >
              <p>
                Experience our premium coffee collection with our stunning 3D
                mug showcase. <strong>Discover the perfect blend</strong> for
                your taste.
              </p>
              <motion.button
                key="button"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 5,
                  stiffness: 40,
                  restDelta: 0.001,
                  duration: 0.3,
                  delay: 0.4,
                }}
                className="explore-button"
                style={{
                  backgroundColor: snap.color,
                  color: "#ffffff",
                  border: "none",
                  padding: "1rem 2rem",
                  borderRadius: "0.5rem",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1rem",
                }}
                onClick={() => {
                  // Handle button click
                  console.log("Explore collection clicked");
                }}
              >
                EXPLORE COLLECTION
                <AiOutlineArrowRight size="1.2em" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Scroll down indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          damping: 5,
          stiffness: 40,
          delay: 1,
        }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--color-text-primary)",
          textAlign: "center",
          width: "200px",
          marginLeft: "-100px",
        }}
        onClick={scrollToAbout}
      >
        <span
          style={{
            fontSize: "0.9rem",
            marginBottom: "0.5rem",
            textAlign: "center",
            display: "block",
            width: "100%",
          }}
        >
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <AiOutlineArrowDown size="1.5em" />
        </motion.div>
      </motion.div>
    </div>
  );
}
