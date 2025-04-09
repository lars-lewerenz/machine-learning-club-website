
import React from "react"
import { motion } from "framer-motion"

export function NavLink({ href, children }) {
  return (
    <motion.a 
      href={href} 
      className="text-sm hover:text-primary transition-colors relative"
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.a>
  )
}
