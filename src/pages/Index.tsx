import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatContainer } from "@/components/chat/ChatContainer";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 ml-44">
        <ChatContainer />
      </main>
    </div>
  );
};

export default Index;
