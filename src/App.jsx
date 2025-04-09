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
  Medal,
  Calendar as CalendarIcon,
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
import { MaterialCard } from "@/components/MaterialCard"
import { ChallengeCard } from "@/components/ChallengeCard"
import { HallOfFameCard } from "@/components/HallOfFameCard"
import LanguageSwitcher from "@/components/LanguageSwitcher.jsx";
import SectionHeader from "@/components/SectionHeader.jsx";
import WorkInProgress from "@/WorkInProgress.jsx";

const SITE_UNDER_CONSTRUCTION = true; // Set to `false` when the site is ready

function App() {
  if (SITE_UNDER_CONSTRUCTION) {
    return <WorkInProgress/>
  }
  const { scrollYProgress } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { t, i18n } = useTranslation(); // i18n hook to access the current language
  const [darkMode, setDarkMode] = useState(false) // State for dark mode

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Persist dark mode setting in localStorage
  useEffect(() => {
    // Check localStorage first for manual override
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode !== null) {
      // If a manual setting exists, use that
      setDarkMode(savedDarkMode);
    } else {
      // Otherwise, use system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemPrefersDark);
    }

    // Apply the dark mode class based on the current mode
    if (savedDarkMode || (!savedDarkMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Listen for changes in the user's color scheme preference
    const colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleColorSchemeChange = (e) => {
      if (!localStorage.getItem('darkMode')) {  // Only update if no manual override
        const prefersDark = e.matches;
        setDarkMode(prefersDark);
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    };

    colorSchemeMediaQuery.addEventListener('change', handleColorSchemeChange);

    // Clean up the event listener when the component is unmounted
    return () => {
      colorSchemeMediaQuery.removeEventListener('change', handleColorSchemeChange);
    };
  }, []); // This effect runs once when the component mounts

  // Toggle dark mode on button click
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString()); // Save the preference

    // Toggle the dark class based on the new mode
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
              <NavLink href="#hall-of-fame">{t('navigation.hall_of_fame')}</NavLink>
              <NavLink href="#about">{t('navigation.about')}</NavLink>
              <NavLink href="#events">{t('navigation.events')}</NavLink>
              <NavLink href="#materials">{t('navigation.materials')}</NavLink>
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


        {/* Hero Section */}
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
        <section id="challenge" className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <SectionHeader icon={Trophy} title={t('current_challenge.title')}/>
            <ChallengeCard
                title={t('challenges.stroke_prediction.name')}
                description={t('challenges.stroke_prediction.description')}
                deadline={t('challenges.stroke_prediction.deadline')}
                presentationDate={t('challenges.stroke_prediction.presentation')}
                link="https://www.kaggle.com/datasets/fedesoriano/stroke-prediction-dataset"
            />
          </div>
        </section>


        {/* Events Section */}
        <section id="events" className="py-16">
          <div className="container mx-auto px-4">
            <SectionHeader icon={CalendarIcon} title={t('events.title')}/>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <EventCard
                  title={t('events.introduction_to_neural_networks.name')}
                  date={t('events.introduction_to_neural_networks.date')}
                  time={t('events.introduction_to_neural_networks.time')}
                  location={t('events.introduction_to_neural_networks.location')}
              />
            </div>
          </div>
        </section>

        {/* Hall of Fame Section */}
        <section id="hall-of-fame" className="py-16">
          <div className="container mx-auto px-4">
            <SectionHeader icon={Medal} title={t('hall_of_fame.title')}/>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <HallOfFameCard
                  title={t('hall_of_fame.2025_march.challenge_title')}
                  date={t('hall_of_fame.2025_march.date')}
                  winner={t('hall_of_fame.2025_march.winner')}
                  description={t('hall_of_fame.2025_march.description')}
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
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


        {/* Materials Section */}
        <section id="materials" className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <SectionHeader icon={BookOpen} title={t('materials.title')} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MaterialCard
                  title={t('materials.material_1.title')}
                  description={t('materials.material_1.description')}
                  link={t('materials.material_1.link')}
              />
              <MaterialCard
                  title={t('materials.material_2.title')}
                  description={t('materials.material_2.description')}
                  link={t('materials.material_2.link')}
              />
              <MaterialCard
                  title={t('materials.material_3.title')}
                  description={t('materials.material_3.description')}
                  link={t('materials.material_3.link')}
              />
            </div>
          </div>
        </section>


        {/* About Section */}
        <section id="about" className="py-16">
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
                <Button variant="outline">
                  {t('about.button_text')}
                  <Users className="ml-2 h-4 w-4"/>
                </Button>
              </motion.div>
              <motion.div
                  initial={{opacity: 0, x: 50}}
                  whileInView={{opacity: 1, x: 0}}
                  viewport={{once: true}}
                  transition={{duration: 0.5}}
                  className="relative aspect-video rounded-lg overflow-hidden group"
              >
                <img alt="Studierende bei einer ML-Club Veranstaltung"
                     className="object-cover transition-transform duration-500 group-hover:scale-105"
                     src="https://images.unsplash.com/photo-1638029202288-451a89e0d55f"/>
              </motion.div>
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
                <FooterLink href="#">{t('footer.imprint')}</FooterLink>
                <FooterLink href="#">{t('footer.data_privacy')}</FooterLink>
                <FooterLink href="#">{t('footer.contact')}</FooterLink>
              </div>
            </div>
          </div>
        </footer>
      </div>
  )
}

export default App
