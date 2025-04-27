import React from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next";

export function MaterialCard({ title, description, link, icon: Icon }) {

  const { t } = useTranslation();
  return (
      <motion.div
          whileHover={{ y: -5 }}
          className="bg-background rounded-lg p-6 border hover:border-primary/50 transition-colors"
      >
        <div className="flex items-start gap-2">
          <Icon className="h-6 w-6 text-primary" /> {/* Set a fixed size for the icon */}
          <div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>

            <a href={link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                {t('materials.to_material')}
                <ChevronRight className="ml-2 h-4 w-4"/>
              </Button>
            </a>
          </div>
        </div>
      </motion.div>
  )
}
