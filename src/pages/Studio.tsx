import { useState } from "react";
import { Sparkles, Send, Paperclip, Image, Video, BarChart3 } from "lucide-react";

const suggestions = [
  {
    icon: Image,
    title: "Generate product image",
    description: "Create stunning visuals for your jewelry",
  },
  {
    icon: Video,
    title: "Create video content",
    description: "Short clips with branding and animations",
  },
  {
    icon: BarChart3,
    title: "Analyze performance",
    description: "Get insights on your social media metrics",
  },
  {
    icon: Sparkles,
    title: "Plan campaign",
    description: "AI-powered content strategy suggestions",
  },
];

export const Studio = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Sending:", message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Logo/Icon */}
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-primary-foreground" />
        </div>

        {/* Welcome Text */}
        <h1 className="text-2xl font-semibold mb-2">How can I help you today?</h1>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          Create images, videos, captions, schedule posts, or get analytics insights for your marketing campaigns.
        </p>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-2xl mb-8">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="flex items-start gap-3 p-4 bg-card border rounded-xl text-left hover:border-foreground/20 transition-colors"
              onClick={() => setMessage(suggestion.title)}
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <suggestion.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">{suggestion.title}</p>
                <p className="text-xs text-muted-foreground">{suggestion.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="p-4 border-t bg-card">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2 bg-muted rounded-xl p-2">
            <button className="p-2 hover:bg-background rounded-lg transition-colors">
              <Paperclip className="w-5 h-5 text-muted-foreground" />
            </button>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tell me what you'd like to create..."
              className="flex-1 bg-transparent border-none outline-none resize-none text-sm py-2 px-1 min-h-[24px] max-h-[120px]"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            AI may produce inaccurate information. Verify important content.
          </p>
        </div>
      </div>
    </div>
  );
};
