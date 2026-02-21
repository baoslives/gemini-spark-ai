import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Home } from "@/pages/Home";
import { Studio } from "@/pages/Studio";
import { StudioMockup } from "@/pages/StudioMockup";
import { OutputGallery } from "@/pages/OutputGallery";
import { Assets } from "@/pages/Assets";
import { AIAgent } from "@/pages/AIAgent";
import { PostsProvider } from "@/contexts/PostsContext";

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
      case "ai-agent":
      case "ai-agent-history":
        return <AIAgent />;
      default:
        return <Home />;
    }
  };

  return (
    <PostsProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 ml-44">
          {renderContent()}
        </main>
      </div>
    </PostsProvider>
  );
};

export default Index;
