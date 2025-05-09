import { useState } from "react";
import { Education } from "./stepeni/Education";
import { Navigations } from "../../features/navigations/Navigations";

export const ParentComponent = () => {
    const [currentView, setCurrentView] = useState("education");
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleNavigate = (index) => {
        setSelectedIndex(index);
        setCurrentView("navigations"); 
    };


    return (
        <div>
            {currentView === "education" && (
                <Education onNavigate={handleNavigate} />
            )}
            {currentView === "navigations" && (
                <Navigations
                    selectedIndex={selectedIndex} 
                    list={[]} 
                />
            )}
        </div>
    );
};
