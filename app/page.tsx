"use client"

import React from "react"
import { motion } from "motion/react"

import AnimatedGradient from "@/fancy/components/background/animated-gradient-with-svg"
import { Hero } from "./Hero"

interface BentoCardProps { 
  colors: string[]
  delay: number
  children?: React.ReactNode
}

const BentoCard: React.FC<BentoCardProps> = ({ 
  colors,
  delay,
  children
}) => { 

  return (
    <motion.div
      className="relative overflow-hidden h-full bg-white flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
      <AnimatedGradient colors={colors} speed={15} blur="heavy" />
 
    </motion.div>
  )
}
 
export default function Home() {
  return (
    <main className="w-screen bg-background h-screen"> 
        <BentoCard 
          colors={["#DBDBDB", "#DBDBDB", "#DBDBDB"]}
          delay={0.4}
        >
          <Hero />
        </BentoCard>
    </main>
  );
}