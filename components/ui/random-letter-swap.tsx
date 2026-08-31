"use client";

import React from "react";
import { motion, type HTMLMotionProps, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

export interface RandomLetterSwapProps extends HTMLMotionProps<"span"> {
  label: string;
  staggerDuration?: number;
  transition?: Transition;
  reverse?: boolean;
  inline?: boolean;
}

export function RandomLetterSwap({
  label,
  staggerDuration = 0.025,
  transition = { duration: 0.6, type: "spring" },
  reverse = false,
  inline = false,
  className,
  ...props
}: RandomLetterSwapProps) {
  const characters = Array.from(label);

  return (
    <motion.span
      className={cn(
        "relative overflow-hidden cursor-pointer select-none",
        inline ? "inline-flex" : "flex",
        className
      )}
      initial="initial"
      whileHover="hovered"
      {...props}
    >
      <span className="inline-flex">
        {characters.map((char, i) => (
          <motion.span
            key={`top-${i}`}
            className="inline-block"
            variants={{
              initial: { y: 0 },
              hovered: { y: reverse ? "100%" : "-100%" },
            }}
            transition={{
              ...transition,
              delay: i * staggerDuration,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
      <span className="absolute inset-0 inline-flex">
        {characters.map((char, i) => (
          <motion.span
            key={`bottom-${i}`}
            className="inline-block"
            variants={{
              initial: { y: reverse ? "-100%" : "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              ...transition,
              delay: i * staggerDuration,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}

export default RandomLetterSwap;
