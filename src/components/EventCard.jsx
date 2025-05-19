
import React from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {useTranslation} from "react-i18next";

export function EventCard({ title, date, time, location }) {
  const createICSFile = () => {
    const startDate = new Date(date + " " + time.split("-")[0].trim())
    const endDate = new Date(date + " " + time.split("-")[1].trim())
    
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:Machine Learning Club: ${title}`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n")

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }
  const { t } = useTranslation();

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-background rounded-lg p-6 border hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start gap-4">
        <Calendar className="h-5 w-5 text-primary" />
        <div className="flex-1">
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-1">
            <Clock className="inline h-4 w-4 mr-1" />
            {time}
          </p>
          <p className="text-sm text-muted-foreground">{date}</p>
          <p className="text-sm text-muted-foreground mb-4">{location}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={createICSFile}
            className="w-full flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            {t('events.add_to_calendar')}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
