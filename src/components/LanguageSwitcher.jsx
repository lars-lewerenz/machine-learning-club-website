import React from 'react';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';
import {Button} from "@/components/ui/button.jsx";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'de' : 'en'; // Toggle between German and English
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="flex items-center gap-2">
            {/* Language Toggle Button with Flags */}
            <Button
                variant="outline"
                onClick={toggleLanguage}
                className="p-2 rounded-full text-primary flex items-center gap-2"
            >
                <Flag
                    code={i18n.language === 'en' ? 'US' : 'DE'}
                    alt={i18n.language === 'en' ? 'English' : 'German'}
                    className="w-6 h-4"
                />
                {i18n.language === 'en' ? 'EN' : 'DE'}
            </Button>
        </div>
    );
};

export default LanguageSwitcher;
