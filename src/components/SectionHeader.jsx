import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sectionHeaderVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const SectionHeader = ({ icon: Icon, title, className = "" }) => {
    const [isInView, setIsInView] = useState(false);

    // Handle scroll to trigger animation once
    useEffect(() => {
        const handleScroll = () => {
            const headerElement = document.getElementById(title);
            if (headerElement) {
                const rect = headerElement.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight) {
                    setIsInView(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Run once on mount to check visibility

        return () => window.removeEventListener("scroll", handleScroll);
    }, [title]);

    return (
        <div
            id={title}
            className={`flex items-center gap-4 mb-8 ${className}`}
        >
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <motion.h2
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={sectionHeaderVariants}
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
            >
                {title}
            </motion.h2>
        </div>
    );
};

export default SectionHeader;