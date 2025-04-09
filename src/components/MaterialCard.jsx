
import React from "react"
import { motion } from "framer-motion"
import { BookOpen, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MaterialCard({ title, description, link }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-background rounded-lg p-6 border hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start gap-4">
        <BookOpen className="h-5 w-5 text-primary" />
        <div>
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>

          <a href={link} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              Zum Material
              <ChevronRight className="ml-2 h-4 w-4"/>
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
