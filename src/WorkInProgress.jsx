import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader2, Database, LineChart, BrainCircuit } from "lucide-react";
import { supabase } from './lib/supabase.js';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {useTranslation} from "react-i18next";

export default function WorkInProgress() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const { error } = await supabase
                .from("waiting_list")
                .insert([{ email }]);

            if (error) {
                setMessage(t('work_in_progress.waiting_list.failed'));
            } else {
                setMessage(t('work_in_progress.waiting_list.success'));
                setEmail("");
            }
        } catch (error) {
            setMessage(t('work_in_progress.waiting_list.error'));
        }

        setLoading(false);
    };

    // Function to create .ics file for the meeting
    const generateICS = () => {
        const eventDetails = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Machine Learning Club//EN
BEGIN:VEVENT
SUMMARY:Machine Learning Club Meeting
DTSTART:20250430T160000
DTEND:20250430T190000
LOCATION:Kleiner Hörsaal, Wegelerstraße 10
DESCRIPTION:Join us for the first Machine Learning Club meeting.
BEGIN:VALARM
TRIGGER:-PT10M
DESCRIPTION:Reminder for Machine Learning Club Meeting
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([eventDetails], { type: 'text/calendar' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'ml_club_meeting.ics';
        link.click();
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white text-center p-6 md:p-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl px-8 py-10 bg-gray-900 bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700"
            >
                <div className="flex justify-center items-center mb-6 gap-6">
                    <Database className="h-12 w-12 text-blue-400" />
                    <LineChart className="h-12 w-12 text-purple-400" />
                    <BrainCircuit className="h-12 w-12 text-pink-400" />
                </div>

                <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
                    Machine Learning Club
                </h1>

                <DotLottieReact src="animations/flying_robot.lottie" loop autoplay className="h-48 w-48 mx-auto mb-6" />

                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-semibold text-white mb-4">{t('work_in_progress.first_meeting.title')}</h3>
                    <p className="text-lg font-medium mb-2">📅 <span className="font-bold">{t('work_in_progress.first_meeting.date.name')}:</span> {t('work_in_progress.first_meeting.date.value')}</p>
                    <p className="text-lg font-medium mb-2">⏰ <span className="font-bold">{t('work_in_progress.first_meeting.time.name')}:</span> {t('work_in_progress.first_meeting.time.value')}</p>
                    <p className="text-lg font-medium mb-4">📍 <span className="font-bold">{t('work_in_progress.first_meeting.location.name')}:</span> {t('work_in_progress.first_meeting.location.value')}</p>
                    <button
                        onClick={generateICS}
                        className="px-6 py-3 text-lg font-semibold rounded-lg bg-white text-gray-800 hover:bg-gray-200 transition-all"
                    >
                        {t('work_in_progress.first_meeting.export_to_calendar')}
                    </button>
                </div>

                <p className="pt-5 text-lg text-gray-300">{t('work_in_progress.description')}</p>

                <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center w-full">
                    <input
                        type="email"
                        placeholder={t('work_in_progress.enter_email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full max-w-sm p-3 bg-gray-800 bg-opacity-60 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                        type="submit"
                        className="mt-4 px-6 py-3 text-lg font-semibold rounded-lg transition-all bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin h-6 w-6 mx-auto" /> : t('work_in_progress.notify_me')}
                    </button>
                </form>

                {message && (
                    <motion.p className="text-sm text-gray-400 mt-4" aria-live="polite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        {message}
                    </motion.p>
                )}
            </motion.div>

            {/* Footer Links */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-400">
                <p>
                    {t('work_in_progress.questions')} <a href="mailto:contact@machine-learning.club" className="text-blue-400 hover:text-blue-300">{t('work_in_progress.email_us')}</a>
                </p>
                <div className="mt-2">
                    <Link to="/imprint" className="text-blue-400 hover:text-blue-300 mr-4">{t('work_in_progress.imprint')}</Link>
                    <Link to="/privacy" className="text-blue-400 hover:text-blue-300">{t('work_in_progress.privacy')}</Link>
                </div>
            </div>
        </div>
    );
}
