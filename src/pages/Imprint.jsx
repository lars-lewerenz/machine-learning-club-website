import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Building2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom"; // Adjust this based on your routing setup

export function Imprint() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
            <main className="container max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-white/20"
                >
                    {/* Back Button */}
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition mb-6">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>

                    <div className="flex items-center gap-3 mb-6">
                        <Building2 className="w-10 h-10 text-blue-400" />
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            {t("imprint.title")}
                        </h1>
                    </div>

                    <div className="text-gray-300 leading-relaxed space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-200">{t("imprint.responsible.title")}</h2>
                            <p className="mt-2">Machine Learning Club</p>
                            <p className="mt-2">
                                {t("imprint.university.name")}<br/>
                                {t("imprint.university.street")}<br/>
                                {t("imprint.university.city")}, {t("imprint.university.country")}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">{t("imprint.representative.title")}</h2>
                            <p>{t("imprint.representative.name")}</p>
                            <p>{t("imprint.representative.position")}</p>
                            <p>{t("imprint.representative.address")}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-200">{t("imprint.contact.title")}</h2>
                            <p className="mt-2">
                                <span className="font-medium text-gray-100">Email: </span>
                                <a href="mailto:contact@machine-learning.club" className="text-blue-400 hover:text-blue-300">contact@machine-learning.club</a>
                            </p>
                        </section>

                        <section>
                        <h2 className="text-2xl font-semibold text-gray-200">{t("imprint.legal.title")}</h2>
                            <p className="mt-2">{t("imprint.legal.desc")}</p>
                        </section>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
