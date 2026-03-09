import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'

const Knob = ({ onclick, enabled}) => {
  return (
    <div>
        {/* Knob container */}
      <div 
        onClick={onclick}
        className={`relative w-12 h-6 rounded-2xl ${enabled ? "bg-amber-800" : "bg-gray-300"}`}>
        {/* Knob */}
        <motion.div 
            initial={{ opacity: 0.5, x: enabled ? "-90%" : "90%"}}
            animate={{ opacity: 1, x: enabled ? "20%" : 0}}
            transition={{ duration: 0.3, ease: "easeInOut"}}
            className={`p-3 rounded-full absolute transition-opacity ease-in-out ${enabled ? "bg-white right-0" : "bg-gray-200 left-0"}`}/>
      </div>
    </div>
  )
}

export default Knob
