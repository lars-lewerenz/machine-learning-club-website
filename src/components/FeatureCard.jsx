
import React from "react"
import { motion } from "framer-motion"

export function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-background rounded-lg p-6 border hover:border-primary/50 transition-colors"
    >
      <div className="flex flex-col items-center text-center">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          {React.cloneElement(icon, { className: "h-6 w-6 text-primary" })}
        </div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}
