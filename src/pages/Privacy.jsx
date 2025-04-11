import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function Privacy() {
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
                        <Shield className="w-10 h-10 text-blue-400" />
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            {t("privacy.title")}
                        </h1>
                    </div>

                    <div className="text-gray-300 leading-relaxed space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-200">{t("privacy.dataCollection.title")}</h2>
                            <p className="mt-2">{t("privacy.dataCollection.desc")}</p>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>{t("privacy.dataCollection.items.1")}</li>
                                <li>{t("privacy.dataCollection.items.2")}</li>
                                <li>{t("privacy.dataCollection.items.3")}</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-200">{t("privacy.cookies.title")}</h2>
                            <p className="mt-2">{t("privacy.cookies.desc")}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-200">{t("privacy.rights.title")}</h2>
                            <p className="mt-2">{t("privacy.rights.desc")}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-200">{t("privacy.contact.title")}</h2>
                            <p className="mt-2">{t("privacy.contact.desc")}</p>
                        </section>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
