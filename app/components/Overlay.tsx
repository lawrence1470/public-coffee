"use client";

import { Logo } from "@pmndrs/branding";
import { motion } from "framer-motion";
import { AiOutlineShopping } from "react-icons/ai";
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
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
