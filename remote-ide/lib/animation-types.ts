import { Variants, RepeatType } from "framer-motion";

/**
 * Type-safe animation variants for the application
 * This file centralizes all animation type definitions
 */

/**
 * Container animation variants - used for staggered children animations
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

/**
 * Item animation variants - used for individual elements in containers
 */
export const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

/**
 * Feature animation variants - used for scrolling feature sections
 */
export const featureVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

/**
 * Pulse animation variants - used for attention-grabbing elements
 */
export const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as RepeatType,
    },
  },
};

/**
 * Cursor animation transitions - used for live cursor displays
 * Factory function to generate properly typed cursor animations
 */
export const createCursorAnimation = (
  path: [number, number, number, number, number][],
  duration: number,
  delay: number = 0
) => ({
  initial: { left: path[0][0], top: path[1][0] },
  animate: {
    left: path[0],
    top: path[1],
  },
  transition: {
    duration,
    repeat: Infinity,
    repeatType: "loop" as RepeatType,
    delay,
  },
});

/**
 * Logo animation - used for the animated logo
 */
export const logoAnimation = {
  animate: {
    rotate: [0, 10, 0, -10, 0],
    scale: [1, 1.1, 1],
  },
  transition: {
    duration: 5,
    repeat: Infinity,
    repeatType: "reverse" as RepeatType,
  },
};

/**
 * Scroll indicator animation - used for the scroll down arrow
 */
export const scrollIndicatorAnimation = {
  animate: { y: [0, 10, 0] },
  transition: {
    duration: 1.5,
    repeat: Infinity,
  },
};