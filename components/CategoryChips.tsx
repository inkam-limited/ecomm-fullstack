"use client";
import React from "react";
import SplitLink from "./SplitLink";
import { motion } from "framer-motion";

const data = [
  { name: "graphic", url: "/category/graphic" },
  { name: "vector", url: "/category/vector" },
  { name: "logo", url: "/category/logo" },
  { name: "digital", url: "/category/digital" },
  { name: "mockup", url: "/category/mockup" },
  { name: "illustration", url: "/category/illustration" },
];

const variants = {
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
      delay: 1,
    },
  },
};

const CategoryChips = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.03 }}
      className="flex flex-wrap gap-4 justify-center pb-12"
    >
      {data.map((item, index) => (
        <motion.div
          variants={variants}
          key={index}
          className="px-8 py-2 border border-gray-200 rounded-2xl"
        >
          <SplitLink href={`/products`}>{item.name}</SplitLink>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryChips;
