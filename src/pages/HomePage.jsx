import React, { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslation } from 'react-i18next';
import {
    Brain,
    Network,
    Code,
    Database,
    Cpu,
    Users,
    Trophy,
    Calendar as CalendarIcon,
    Send,
    Mail,
    BookOpen,
    Sparkles,
    GraduationCap,
    Sun,
    Moon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { NavLink } from "@/components/NavLink"
import { FooterLink } from "@/components/FooterLink"
import { FeatureCard } from "@/components/FeatureCard"
import { EventCard } from "@/components/EventCard"
import { ChallengeCard } from "@/components/ChallengeCard"
import { HallOfFameCard } from "@/components/HallOfFameCard"
import LanguageSwitcher from "@/components/LanguageSwitcher.jsx";
import SectionHeader from "@/components/SectionHeader.jsx";
import WorkInProgress from "@/WorkInProgress.jsx";
import {supabase} from "@/lib/supabase.js";
import {showErrorToast, showSuccessToast} from "@/lib/toasts.js";
import {useDarkMode} from "@/hooks/useDarkMode.js";
import MaterialsSection from "@/components/MaterialsSection.jsx";
import { PreviousEventCard } from "@/components/PreviousEventCard.jsx";

const SITE_UNDER_CONSTRUCTION = false; // Set to `false` when the site is ready

export function HomePage() {
    if (SITE_UNDER_CONSTRUCTION) {
        return <WorkInProgress/>
    }
    const { scrollYProgress } = useScroll()
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const { t } = useTranslation(); // i18n hook to access the current language
    const [darkMode, toggleDarkMode] = useDarkMode();

    useEffect(() => {
        const handleMouseMove = (e) => {
            window.requestAnimationFrame(() => {
                setMousePosition({ x: e.clientX, y: e.clientY });
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;  // Get email from form

        try {
            const {error} = await supabase
                .from("newsletter")
                .insert([{email}]);

            if (!error) {
                showSuccessToast(t("newsletter.subscribed"))
                e.target.reset()
            } else {
                showErrorToast(t("newsletter.error"))
            }
        } catch (error) {
            showErrorToast(t("newsletter.error"))
            console.error(error);
        }
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const message = e.target.message.value;

        try {
            const {error} = await supabase
                .from("contact")
                .insert([{name, email, message}]);

            if (!error) {
                showSuccessToast(t("contact.sent"))
                e.target.reset()
            } else {
                showErrorToast(t("contact.error"))
            }
        } catch (error) {
            showErrorToast(t("contact.error"))
            console.error(error)
        }
    };

    const backgroundX = useTransform(scrollYProgress, [0, 1], [0, 100])
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100])

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-background-dark' : 'bg-background'} relative`}>
            {/* Neural Network Background Animation */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                        x: backgroundX,
                        y: backgroundY,
                    }}
                />
            </div>

            {/* Navigation */}
            <nav className={`fixed w-full ${darkMode ? 'bg-dark/80' : 'bg-background/80'} backdrop-blur-sm z-50 border-b`}>
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <motion.div className="flex items-center gap-2" whileHover={{scale: 1.05}}>
                        <Brain className="h-6 w-6 text-primary"/>
                        <span className="font-bold text-lg">Machine Learning Club</span>
                    </motion.div>
                    <div className="hidden md:flex items-center gap-6">
                        <NavLink href="#challenge">{t('navigation.challenge')}</NavLink>
                        <NavLink href="#events">{t('navigation.events')}</NavLink>
                        <NavLink href="#hall-of-fame">{t('navigation.hall_of_fame')}</NavLink>
                        <NavLink href="#materials">{t('navigation.materials')}</NavLink>
                        <NavLink href="#about">{t('navigation.about')}</NavLink>
                    </div>
                    <div className="flex items-center gap-4"> {/* Align both language switcher and dark mode toggle */}
                        <LanguageSwitcher/>
                        <Button
                            variant="outline"
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full text-primary"
                        >
                            {darkMode ? <Sun className="h-6 w-6"/> : <Moon className="h-6 w-6"/>}
                        </Button>
                    </div>
                </div>
            </nav>


            {/* Title Section */}
            <section className="pt-32 pb-16 px-4 relative overflow-hidden">
                <div className="container mx-auto relative">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.7}}
                        className="text-center relative z-10"
                    >
                        <motion.div
                            animate={{
                                x: (mousePosition.x - window.innerWidth / 2) * 0.02,
                                y: (mousePosition.y - window.innerHeight / 2) * 0.02,
                            }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
                        />
                        <motion.div
                            initial={{scale: 0.5, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            transition={{duration: 0.5}}
                            className="mb-6 flex justify-center"
                        >
                            <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <GraduationCap className="h-10 w-10 text-primary"/>
                            </div>
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            {t('hero.title')}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            {t('hero.description')}
                        </p>
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.5}}
                            className="absolute -bottom-16 left-1/2 -translate-x-1/2"
                        >
                            <Sparkles className="h-8 w-8 text-primary animate-pulse"/>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Current Challenge Section */}
            <section id="challenge" className="py-16 even:bg-muted/50">
                <div className="container mx-auto px-4">
                    <SectionHeader icon={Trophy} title={t('current_challenge.title')}/>
                    <ChallengeCard
                        title={t('challenges.bike_sharing_demand_prediction.name')}
                        description={t('challenges.bike_sharing_demand_prediction.description')}
                        deadline={t('challenges.bike_sharing_demand_prediction.deadline')}
                        presentationDate={t('challenges.bike_sharing_demand_prediction.presentation')}
                        link={t('challenges.bike_sharing_demand_prediction.link')}
                    />
                </div>
            </section>

            {/* Events Section */}
            <section id="events" className="py-16">
                <div className="container mx-auto px-4">
                    <SectionHeader icon={CalendarIcon} title={t('events.title')}/>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <EventCard
                            title={t('events.third_meeting.name')}
                            date={t('events.third_meeting.date')}
                            time={t('events.third_meeting.time')}
                            location={t('events.third_meeting.location')}
                        />
                    </div>
                </div>
            </section>

            {/* Previous events section */}
            <section id="previous-events" className="py-16 bg-muted/50">
                <div className="container mx-auto px-4">
                    <SectionHeader icon={CalendarIcon} title={t("previous_events.title")}/>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <PreviousEventCard
                            title={t('events.second_meeting.name')}
                            date={t('events.second_meeting.date')}
                            time={t('events.second_meeting.time')}
                            location={t('events.second_meeting.location')}
                            materialLink="/materials/MLC_Zweites_Treffen.pdf"
                            kaggleLink="https://www.kaggle.com/t/3c7d6ca1cc8a4a9eab222f5482f7ce67"
                        />
                        <PreviousEventCard
                            title={t('events.first_meeting.name')}
                            date={t('events.first_meeting.date')}
                            time={t('events.first_meeting.time')}
                            location={t('events.first_meeting.location')}
                            materialLink="/materials/MLC_Erstes_Treffen.pdf"
                            kaggleLink="https://www.kaggle.com/t/debf7387451c41ec8fd3bbb8343c5adf"
                            githubLink="https://github.com/lars-lewerenz/mlc-challenges/blob/master/predict_strokes/simple_model.ipynb"
                        />
                    </div>
                </div>
            </section>

            {/* Hall of Fame Section */}
            <section id="hall-of-fame" className="py-16">
                <div className="container mx-auto px-4">
                    <SectionHeader icon={Trophy} title={t('hall_of_fame.title')}/>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <HallOfFameCard
                            title={t('hall_of_fame.2025_may.challenge_title')}
                            date={t('hall_of_fame.2025_may.date')}
                            winner={t('hall_of_fame.2025_may.winner')}
                            description={t('hall_of_fame.2025_may.description')}
                        />
                    </div>
                </div>
            </section>

            {/* Focus Section */}
            <section className="py-16 bg-muted/50">
                <div className="container mx-auto px-4">
                    <SectionHeader icon={Cpu} title={t('features.title')}/>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={<Network />}
                            title={t('features.neural_networks.title')}
                            description={t('features.neural_networks.description')}
                        />
                        <FeatureCard
                            icon={<Code />}
                            title={t('features.coding_practice.title')}
                            description={t('features.coding_practice.description')}
                        />
                        <FeatureCard
                            icon={<Database />}
                            title={t('features.data_science.title')}
                            description={t('features.data_science.description')}
                        />
                        <FeatureCard
                            icon={<Cpu />}
                            title={t('features.deep_learning.title')}
                            description={t('features.deep_learning.description')}
                        />
                    </div>
                </div>
            </section>

            <MaterialsSection/>

            {/* About Section */}
            <section id="about" className="py-16 bg-muted/50">
                <div className="container mx-auto px-4">
                    <SectionHeader icon={Users} title={t('about.title')} className="mb-12"/>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{opacity: 0, x: -50}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.5}}
                        >
                            <p className="text-muted-foreground mb-4">
                                {t('about.description_1')}
                            </p>
                            <p className="text-muted-foreground mb-6">
                                {t('about.description_2')}
                            </p>
                            {/*<Button variant="outline">
                                {t('about.button_text')}
                                <Users className="ml-2 h-4 w-4"/>
                            </Button>*/}
                        </motion.div>
                        <motion.div
                            initial={{opacity: 0, x: 50}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.5}}
                            className="relative aspect-video rounded-lg overflow-hidden group"
                        >
                            <img alt="Studierende bei einer ML-Club Veranstaltung"
                                 className="object-cover transition-transform duration-500 group-hover:scale-110"
                                 src="https://images.unsplash.com/photo-1638029202288-451a89e0d55f"/>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact & Newsletter Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Send className="w-6 h-6 text-primary"/>
                                <h2
                                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
                                >
                                    {t("contact.title")}
                                </h2>
                            </div>
                            <form className="space-y-4" onSubmit={handleContactSubmit}>
                                <div>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder={t("contact.name")}
                                        className="w-full p-2 rounded bg-card border"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder={t("contact.email")}
                                        className="w-full p-2 rounded bg-card border"
                                        required
                                    />
                                </div>
                                <div>
                                  <textarea
                                      name="message"
                                      placeholder={t("contact.message")}
                                      className="w-full p-2 rounded bg-card border h-32"
                                      required
                                  ></textarea>
                                </div>
                                <Button className="flex items-center gap-2" type="submit">
                                    <Send className="w-4 h-4" />
                                    {t("contact.send")}
                                </Button>
                            </form>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Mail className="w-6 h-6 text-primary"/>
                                <h2
                                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
                                >
                                    {t("newsletter.title")}
                                </h2>
                            </div>
                            <p className="mb-4 text-muted-foreground">
                                {t("newsletter.description")}
                            </p>
                            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                                <input
                                    name="email"
                                    type="email"
                                    placeholder={t("newsletter.email")}
                                    className="w-full p-2 rounded bg-card border"
                                />
                                <Button type="submit" className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    {t("newsletter.subscribe")}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={`bg-background border-t py-12 ${darkMode ? 'bg-dark' : ''}`}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <motion.div
                            className="flex items-center gap-2 mb-4 md:mb-0"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Brain className="h-6 w-6 text-primary" />
                            <span className="font-bold">Machine Learning Club</span>
                        </motion.div>
                        <div className="flex gap-6">

                            <FooterLink href="/imprint">{t('footer.imprint')}</FooterLink>
                            <FooterLink href="/privacy">{t('footer.data_privacy')}</FooterLink>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}