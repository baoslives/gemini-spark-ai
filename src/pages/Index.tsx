import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Home } from "@/pages/Home";
import { Studio } from "@/pages/Studio";
import { StudioMockup } from "@/pages/StudioMockup";
import { OutputGallery } from "@/pages/OutputGallery";
import { Assets } from "@/pages/Assets";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "studio-mockup":
        return <StudioMockup />;
      case "studio":
        return <Studio />;
      case "output-gallery":
        return <OutputGallery />;
      case "assets":
        return <Assets />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 ml-44">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
