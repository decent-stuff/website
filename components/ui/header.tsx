import React from "react";

interface HeaderSectionProps {
    title: string;
    subtitle: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ title, subtitle }) => {
    return (
        <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">
                {title}
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
                {subtitle}
            </p>
        </div>
    );
};

export default HeaderSection;
