import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

interface Message {
  id: string;
  role: "user" | "ai" | "system";
  content: string;
  type?: "text" | "file-upload" | "generating" | "content-preview" | "schedule-confirm" | "analytics" | "weekly-analytics" | "comment-insight" | "suggestions" | "system-prompt";
  metadata?: any;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "system",
    content: "You are an AI assistant representing our brand. Use the uploaded brand book, guidelines, and target audience definitions as your knowledge base.\n\nFollow the defined tone, terminology, and brand rules at all times. Adjust language and level of detail based on the specified target audience. Do not invent or assume information.\n\nApply the same brand rules consistently across all supported languages. Ask for clarification when information is missing or unclear.",
    type: "system-prompt",
    metadata: { fileName: "Desireegem_brandguide.pdf" },
  },
  {
    id: "2",
    role: "ai",
    content: "Brand guidelines and target audiences have been loaded as my reference.\nWhat would you like me to help with?",
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
      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-thin p-8 space-y-6"
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
      <div className="p-6 max-w-3xl mx-auto w-full">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};