import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Plus, Mic, Send, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
interface Message {
  id: string;
  role: "user" | "ai" | "system";
  content: string;
  type?: "text" | "file-upload" | "generating" | "content-preview" | "schedule-confirm" | "analytics" | "weekly-analytics" | "comment-insight" | "suggestions" | "system-prompt";
  metadata?: any;
}

const systemPromptText = `You are an AI assistant representing our brand. Use the uploaded brand book, guidelines, and target audience definitions as your knowledge base.
Follow the defined tone, terminology, and brand rules at all times. Adjust language and level of detail based on the specified target audience. Do not invent or assume information.
Apply the same brand rules consistently across all supported languages. Ask for clarification when information is missing or unclear.`;

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasStarted = messages.length > 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
  }, [inputValue]);

  const handleSend = (message: string) => {
    if (!message.trim()) return;

    // If this is the first message, add the system prompt first
    if (!hasStarted) {
      const systemMessage: Message = {
        id: "system-1",
        role: "system",
        content: systemPromptText,
        type: "system-prompt",
        metadata: { fileName: "MaisonRiviere_brandguide.pdf" },
      };

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: message,
      };

      setMessages([systemMessage, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "Brand guidelines and target audiences have been loaded as my reference.\nWhat would you like me to help with?",
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    } else {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: message,
      };
      setMessages(prev => [...prev, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "I understand. How can I help you with your marketing today?",
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
      setInputValue("");
    }
  };

  // Welcome/Empty state with Analytics Dashboard
  if (!hasStarted) {
    return (
      <div className="flex flex-col h-screen">
        {/* Analytics Dashboard */}
        <div className="flex-1 overflow-y-auto p-6 pb-48 scrollbar-thin">
          <AnalyticsDashboard />
        </div>

        {/* Input area at bottom */}
        <div className="fixed bottom-0 left-44 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
          <div className="max-w-3xl mx-auto space-y-3">
            {/* Model selector and settings */}
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm border rounded-full hover:bg-muted transition-colors">
                Gemini-3
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-full hover:bg-muted transition-colors">
                <Settings className="w-3.5 h-3.5" />
                <span>Setting</span>
              </button>
            </div>

            {/* Simple input */}
            <div className="border rounded-2xl bg-card shadow-sm overflow-hidden">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything"
                className="w-full px-4 py-3 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground resize-none min-h-[80px]"
                rows={3}
              />
              
              {/* Bottom toolbar */}
              <div className="flex items-center justify-between px-3 py-2 border-t">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
                
                <Button 
                  size="icon" 
                  className="rounded-full w-9 h-9"
                  disabled={!inputValue.trim()}
                  onClick={() => {
                    handleSend(inputValue);
                    setInputValue("");
                  }}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Conversation state
  return (
    <div className="flex flex-col h-screen">
      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-thin p-8 space-y-6"
      >
        {messages.map((message) => (
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