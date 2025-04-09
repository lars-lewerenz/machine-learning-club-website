import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function WorkInProgress() {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-center p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg px-4 py-6"
            >
                <h1 className="pb-[1%] text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-8 leading-snug">
                    We're working on something amazing!
                </h1>

                <p className="text-lg text-gray-300 mb-6">
                    Our Machine Learning website is currently under construction. Stay tuned for updates!
                </p>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                >
                    <Loader2 className="h-12 w-12 mx-auto text-blue-500" />
                </motion.div>
                <p className="text-sm text-gray-400 mt-6">
                    For inquiries, contact us at <a href="mailto:contact@machine-learning.club" className="text-blue-400 hover:text-blue-300">contact@machine-learning.club</a>
                </p>
            </motion.div>
        </div>
    );
}
