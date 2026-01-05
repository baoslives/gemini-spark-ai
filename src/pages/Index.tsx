import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Home } from "@/pages/Home";
import { Studio } from "@/pages/Studio";
import { OutputGallery } from "@/pages/OutputGallery";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "studio":
        return <Studio />;
      case "output-gallery":
        return <OutputGallery />;
      case "assets":
        return (
          <div className="p-8">
            <h1 className="text-2xl font-semibold mb-2">Assets</h1>
            <p className="text-muted-foreground">Your brand assets and media library.</p>
          </div>
        );
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
