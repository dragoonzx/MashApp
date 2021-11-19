import React from 'react'
import { motion } from "framer-motion"
import logo2 from '../../assets/logo2.png'

function MashLoader() {
  return (
    <div
      className="absolute min-w-full min-h-full flex items-center justify-center z-30 bg-opacity-60	bg-black"
    >
      <motion.img
        src={logo2}
        className="relative top-1/2 transform -translate-y-1/2 z-30 h-24"
        alt=""
        initial={{ scale: 1.0, opacity: 0.8 }}
        animate={{ scale: 0.9, opacity: 1 }}
        transition={{
          yoyo: Infinity,
          duration: 0.5,
          ease: "easeIn",
        }}
      />
    </div>
  )
}

export default MashLoader
