import {BookOpen, FileText, Laptop, Wrench} from "lucide-react"; // import more icons as needed
import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/SectionHeader.jsx";
import { MaterialCard } from "@/components/MaterialCard.jsx";

const sections = [
    {
        title: "free_books",
        emoji: "📘",
        icon: BookOpen, // Use BookOpen for free books
        materials: [1, 2, 3],
    },
    {
        title: "free_courses",
        emoji: "🎓",
        icon: Laptop, // Use Laptop for courses
        materials: [4, 5, 6, 7, 8],
    },
    {
        title: "practice_platforms",
        emoji: "🛠️",
        icon: Wrench, // Use Wrench for practice platforms
        materials: [9, 10],
    },
    {
        title: "cheat_sheets",
        emoji: "🧾",
        icon: FileText, // Use FileText for cheat sheets
        materials: [11, 12, 13, 14, 15],
    },
];

export default function MaterialsSection() {
    const { t } = useTranslation();
    return (
        <section id="materials" className="py-16">
            <div className="container mx-auto px-4 space-y-12">
                <SectionHeader icon={BookOpen} title={t("materials.title")} />
                {sections.map((section) => (
                    <div key={section.title}>
                        <h2 className="text-2xl font-bold mb-6">
                            {section.emoji} {t(`materials.${section.title}`)}
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.materials.map((id) => (
                                <MaterialCard
                                    key={id}
                                    title={t(`materials.material_${id}.title`)}
                                    description={t(`materials.material_${id}.description`)}
                                    link={t(`materials.material_${id}.link`)}
                                    icon={section.icon} // pass the specific icon for the section
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
