"use client";

import { useState, type ReactNode } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import "./TiltCard.css";

type TiltCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  gradient?: string;
  details?: string;
};

export function TiltCard({
  title,
  description,
  icon,
  gradient = "linear-gradient(135deg, #0066B3 0%, #FF8C00 100%)",
  details,
}: TiltCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      glareEnable
      glareMaxOpacity={0.2}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="12px"
      scale={1.04}
      transitionSpeed={1000}
      className="tilt-container"
    >
      <motion.div
        className="feature-card"
        style={{ background: gradient }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsExpanded((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsExpanded((prev) => !prev);
          }
        }}
      >
        <div className="card-icon">{icon}</div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>

        <AnimatePresence>
          {isExpanded && details && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="card-details"
            >
              {details}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="expand-indicator"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.div>
      </motion.div>
    </Tilt>
  );
}
