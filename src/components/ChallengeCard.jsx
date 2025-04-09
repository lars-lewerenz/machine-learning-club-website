
import React from "react"
import { motion } from "framer-motion"
import { Trophy, Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChallengeCard({ title, description, deadline, presentationDate, link }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-lg p-6 border border-primary/20 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="space-y-2 mb-6">
            <p className="text-sm flex items-center text-muted-foreground">
              <Calendar className="inline h-4 w-4 mr-2"/>
              Abgabe bis: {deadline}
            </p>
            <p className="text-sm flex items-center text-muted-foreground">
              <Calendar className="inline h-4 w-4 mr-2"/>
              Präsentation: {presentationDate}
            </p>
          </div>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Button className="w-full">
              Zur Challenge
              <ChevronRight className="ml-2 h-4 w-4"/>
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
