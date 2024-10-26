"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const GlowButton = () => {
  return (
    <motion.button
      style={{
        width: "110px",
        height: "40px",
        border: "none",
        outline: "none",
        color: "#fff",
        background: "#111",
        cursor: "pointer",
        position: "relative",
        zIndex: 0,
        borderRadius: "100px",
        fontSize: "16px",
        fontWeight: "bold",
        overflow: "hidden",
      }}
      whileHover={{
        scale: 1.05,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <Link href="/plus">Get Plus</Link>
      {/* Animated Border */}
      <motion.div
        style={{
          position: "absolute",
          top: "-2px",
          left: "-2px",
          width: "calc(100% + 4px)",
          height: "calc(100% + 4px)",
          borderRadius: "10px",
          background:
            "linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000)",
          backgroundSize: "400%",
          zIndex: -1,
          filter: "blur(4px)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "200% 0%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Inner Background */}
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "calc(100%)",
          height: "calc(100%)",
          background: "rgba(3, 3, 3, 0.5)",
          filter: "blur(2px)",
          borderRadius: "8px",
          zIndex: -1,
        }}
      />
    </motion.button>
  );
};

export default GlowButton;
