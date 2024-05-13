"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main>
      <div className="w-full h-100%" id="hero">
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
              Know Better.
            </div>
            <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
              This website is awesome, trust me.
            </div>
            <button
              className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
              onClick={() => {}}
            >
              Debug now
            </button>
          </motion.div>
        </AuroraBackground>
      </div>
    </main>
  );
}
