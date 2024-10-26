"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
const heading = "Bring your";
const heading1 = "creative ideas to life. ✨";
const Tagline = () => {
  const headingChars = heading.split("");
  const headingChars1 = heading1.split("");

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        stiffness: 100,
        type: "tween",
        easings: "easeIn",
        delayChildren: 0.1,
      },
    },
  } as Variants;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.03 }}
      className="text-center font-semibold lg:my-24 text my-16 overflow-hidden py-1 flex flex-col items-center gap-2 md:gap-4"
    >
      <div>
        {headingChars.map((char, index) => (
          <motion.span
            variants={charVariants}
            key={index}
            className={
              char === " " ? "sm:p-1" : "text-xl sm:text-4xl lg:text-5xl"
            }
          >
            {char}
          </motion.span>
        ))}
      </div>
      <div>
        {headingChars1.map((char, index) => (
          <motion.span
            variants={charVariants}
            key={index}
            className={
              char === " " ? "sm:p-1" : "text-xl sm:text-4xl lg:text-5xl"
            }
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default Tagline;
