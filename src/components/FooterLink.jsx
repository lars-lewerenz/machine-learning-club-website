
import React from "react"
import { motion } from "framer-motion"

export function FooterLink({ href, children }) {
  return (
    <motion.a 
      href={href} 
      className="text-sm text-muted-foreground hover:text-primary transition-colors"
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.a>
  )
}
