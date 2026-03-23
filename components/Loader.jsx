"use client";

import React from "react";
import { motion } from "framer-motion";
import { CloudSun } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <CloudSun className="w-16 h-16 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
      </motion.div>
      <motion.p
        className="mt-6 text-xl font-medium tracking-widest text-white/70"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        LOADING...
      </motion.p>
    </div>
  );
}
