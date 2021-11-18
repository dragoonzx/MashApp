import React from 'react'
import { motion } from "framer-motion"
import logo2 from '../../assets/logo2.png'

function MashLoader() {
  return (
    <motion.div
      className="absolute top-4 left-8 z-30"
      initial={{ scale: 1.0, opacity: 0.75 }}
      animate={{ scale: 0.9, opacity: 1 }}
      transition={{
        yoyo: Infinity,
        duration: 0.5,
        ease: "easeIn",
      }}
    >
      <img src={logo2} className="h-24" alt="" />
    </motion.div>
  )
}

export default MashLoader
