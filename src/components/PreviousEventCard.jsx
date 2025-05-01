import {BookOpen} from "lucide-react";
import {useTranslation} from "react-i18next";
import {motion} from "framer-motion";
import React from "react";

export function PreviousEventCard({ title, date, time, location, materialLink }) {
    const { t } = useTranslation();

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-background rounded-lg p-6 border hover:border-primary/50 transition-colors"
        >
            <h3 className="text font-semibold mb-1">{title}</h3>
            <p className="text-muted-foreground mb-1">{date}, {time}</p>
            <p className="text-muted-foreground mb-3">{location}</p>
            {materialLink && (
                <a
                    href={materialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
                >
                    <BookOpen className="w-4 h-4 mr-1" />
                    {t("previous_events.material")}
                </a>
            )}
        </motion.div>
    )
}