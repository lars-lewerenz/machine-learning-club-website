import React from "react"
import { motion } from "framer-motion"
import { Medal, Calendar } from "lucide-react"
import { useTranslation } from "react-i18next"

export function HallOfFameCard({ title, winner, description, date }) {
  const { t } = useTranslation();
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-background rounded-lg p-6 border hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Medal className="h-5 w-5 text-primary" />
        </div>
        <div>
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            {date}
          </span>
          <h3 className="font-semibold mt-2 mb-1">{title}</h3>
          <p className="text-sm text-primary font-medium mb-2">
            {t('hall_of_fame.winner')}: {winner}
          </p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
