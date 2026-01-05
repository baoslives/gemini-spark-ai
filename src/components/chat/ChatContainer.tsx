import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  type?: "text" | "file-upload" | "generating" | "content-preview" | "schedule-confirm" | "analytics" | "weekly-analytics" | "comment-insight" | "suggestions";
  metadata?: any;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "You are an AI assistant representing our brand. Use the uploaded brand book, guidelines, and target audience definitions as your knowledge base.\nFollow the defined tone, terminology, and brand rules at all times. Adjust language and level of detail based on the specified target audience. Do not invent or assume information.\nApply the same brand rules consistently across all supported languages. Ask for clarification when information is missing or unclear.",
  },
  {
    id: "2",
    role: "user",
    content: "",
    type: "file-upload",
    metadata: { fileName: "Desireegem_brandguide.pdf" },
  },
  {
    id: "3",
    role: "ai",
    content: "Brand guidelines and target audiences have been loaded as my reference.\nWhat would you like me to help with?",
  },
  {
    id: "4",
    role: "user",
    content: "I want a social media post for a new jewelry product, a green gem ring. Show a young woman wearing this ring and create a picture and short video clip.",
  },
  {
    id: "5",
    role: "ai",
    content: "Understood.\nPlease confirm the following:\n• Platform (e.g. Instagram, TikTok, Facebook)\n• Target audience\n• Language",
  },
  {
    id: "6",
    role: "user",
    content: "Instagram and RedNote.\nWorking professionals.\nEnglish.\nImage and video.",
  },
  {
    id: "7",
    role: "ai",
    content: "Got it. Please wait while I prepare your content…",
    type: "generating",
  },
  {
    id: "8",
    role: "ai",
    content: "",
    type: "content-preview",
  },
  {
    id: "9",
    role: "user",
    content: "Schedule it please. Suggest a good time.",
  },
  {
    id: "10",
    role: "ai",
    content: "Based on your audience (working professionals), the best times are:",
    type: "schedule-confirm",
  },
  {
    id: "11",
    role: "user",
    content: "Yes, please do that.",
  },
  {
    id: "12",
    role: "ai",
    content: "✅ Done!\n\n📱 Instagram post scheduled for Tuesday at 7:15PM\n📱 RedNote 中文版 scheduled for Tuesday at 8:30PM\n\nYou'll receive confirmation once both are live, followed by a 24-hour performance summary.",
  },
  {
    id: "13",
    role: "user",
    content: "Please give me the 24-hour performance summary of IG and RedNote.",
  },
  {
    id: "14",
    role: "ai",
    content: "",
    type: "analytics",
    metadata: {
      analytics: [
        {
          platform: "RedNote (小红书)",
          engagementRate: "6.2%",
          saves: 115,
          comments: 32,
          topComment: "颜色太美了！种草～",
          sentiment: "92%",
          brandSentiment: "18% from previous post",
        },
        {
          platform: "Instagram",
          engagementRate: "3.1%",
          likes: 207,
          comments: 19,
          topComment: "This is 🔥🔥🔥",
        },
      ],
    },
  },
  {
    id: "15",
    role: "ai",
    content: "",
    type: "comment-insight",
    metadata: {
      negativeComments: [
        "Didn't that KOL say she got ghosted?",
        "Your diamond just fell out?!",
        "Scam vibes tbh.",
      ],
    },
  },
  {
    id: "16",
    role: "user",
    content: "No. Give me the analysis of this week.",
  },
  {
    id: "17",
    role: "ai",
    content: "",
    type: "weekly-analytics",
    metadata: {
      weeklyData: [
        {
          platform: "Instagram",
          posts: 3,
          topPost: "Green Gem Ring Launch",
          engagementRate: "4.2%",
          saves: 212,
          shares: 93,
          comments: 42,
        },
        {
          platform: "RedNote (小红书)",
          posts: 2,
          topPost: "Green Gem 戒指 美图",
          engagementRate: "6.8%",
          comments: 55,
          saves: 188,
          brandAffinity: "↑ +19% compared to last week",
        },
      ],
    },
  },
  {
    id: "18",
    role: "user",
    content: "Plan next week's social post suggestions.",
  },
  {
    id: "19",
    role: "ai",
    content: "",
    type: "suggestions",
  },
];

export const ChatContainer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const handleSend = (message: string) => {
    console.log("Sending message:", message);
    // Future: Handle new messages
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold">Marketing AI Agent</h1>
            <p className="text-xs text-muted-foreground">Generate content, schedule posts, analyze performance</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-light text-emerald px-2 py-1 rounded-full font-medium">
            ● Connected
          </span>
        </div>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-4"
      >
        {initialMessages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            type={message.type}
            metadata={message.metadata}
          />
        ))}
      </div>
      
      {/* Input */}
      <div className="p-4 border-t bg-card">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};
