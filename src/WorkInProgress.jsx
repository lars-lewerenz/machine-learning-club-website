import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Database, LineChart, BrainCircuit } from "lucide-react";
import { supabase } from './lib/supabase.js';

export default function WorkInProgress() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const { error } = await supabase
                .from("waiting_list")
                .insert([{ email }]);

            if (error) {
                setMessage("⚠️ Failed to sign up. Please try again.");
            } else {
                setMessage("✅ You're signed up! We'll notify you when the website goes live.");
                setEmail("");
            }
        } catch (error) {
            setMessage("Network error. Please try again later.");
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-center p-6 md:p-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl px-8 py-10 bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700"
            >
                {/* Machine Learning Icons with Animation */}
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="flex justify-center items-center mb-4 gap-4"
                >
                    <Database className="h-14 w-14 text-blue-400" />
                    <LineChart className="h-14 w-14 text-purple-400" />
                </motion.div>

                {/* Title - Focused on Machine Learning */}
                <motion.h1
                    className="pb-1 text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-6 leading-snug"
                >
                    Training Models. Optimizing Networks.
                </motion.h1>

                {/* Neural Network Pulsing Animation */}
                <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="flex justify-center items-center"
                >
                    <BrainCircuit className="h-12 w-12 text-purple-500" />
                </motion.div>

                <p className="pt-5 text-lg text-gray-300">
                    Our new ML club is launching soon. Be the first to explore cutting-edge models!
                </p>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center w-full">
                    <motion.input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full max-w-sm p-3 bg-gray-800 bg-opacity-60 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        whileFocus={{ scale: 1.05 }}
                    />
                    <motion.button
                        type="submit"
                        className="mt-4 px-6 py-3 text-lg font-semibold rounded-lg transition-all bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                    >
                        {loading ? <Loader2 className="animate-spin h-6 w-6 mx-auto" /> : "Notify Me"}
                    </motion.button>
                </form>

                {message && (
                    <motion.p
                        className="text-sm text-gray-400 mt-4"
                        aria-live="polite"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {message}
                    </motion.p>
                )}

                {/* Contact Information */}
                <p className="text-sm text-gray-400 mt-6">
                    Questions? <a href="mailto:contact@machine-learning.club" className="text-blue-400 hover:text-blue-300">Email us</a>
                </p>
            </motion.div>
        </div>
    );
}
