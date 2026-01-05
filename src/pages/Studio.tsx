import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Paperclip, Image, Video, BarChart3, X, FileText, User } from "lucide-react";

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

interface UploadedFile {
  name: string;
  type: string;
  preview?: string;
}

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  files?: UploadedFile[];
}

const simulateAIResponse = (userMessage: string): string => {
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.includes("image") || lowerMsg.includes("product")) {
    return "I'd be happy to help create a product image! Please provide:\n\n• Product details (type, color, style)\n• Target platform (Instagram, RedNote, etc.)\n• Target audience\n• Any specific mood or aesthetic";
  }
  if (lowerMsg.includes("video")) {
    return "Great choice! For video content, I'll need:\n\n• Product or scene description\n• Video duration (5s, 15s, 30s)\n• Platform format\n• Any text overlays or branding elements";
  }
  if (lowerMsg.includes("analytics") || lowerMsg.includes("performance")) {
    return "I can analyze your social media performance. Would you like:\n\n• 24-hour summary\n• Weekly report\n• Platform comparison\n• Engagement insights";
  }
  if (lowerMsg.includes("campaign") || lowerMsg.includes("plan")) {
    return "Let's plan your campaign! Tell me:\n\n• Campaign goal (awareness, engagement, sales)\n• Target platforms\n• Timeline\n• Key products to feature";
  }
  
  return "I understand. How can I help you with your marketing today? I can:\n\n• Generate product images\n• Create video content\n• Write captions\n• Analyze performance\n• Plan campaigns";
};

export const Studio = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
  }, [message]);

  const handleSend = () => {
    if (!message.trim() && uploadedFiles.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setUploadedFiles([]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: simulateAIResponse(userMessage.content),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      name: file.name,
      type: file.type,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSuggestionClick = (suggestionTitle: string) => {
    setMessage(suggestionTitle);
    textareaRef.current?.focus();
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-screen">
      {/* Messages Area or Welcome Screen */}
      <div className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <div className="h-full flex flex-col items-center justify-center px-8">
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
            <div className="grid grid-cols-2 gap-3 w-full max-w-2xl">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="flex items-start gap-3 p-4 bg-card border rounded-xl text-left hover:border-foreground/20 transition-colors"
                  onClick={() => handleSuggestionClick(suggestion.title)}
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
        ) : (
          <div className="max-w-3xl mx-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.role === "ai" ? "bg-primary" : "bg-muted"
                }`}>
                  {msg.role === "ai" ? (
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <User className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {msg.role === "ai" ? "Marketing AI" : "You"}
                  </p>
                  
                  {/* Attached Files */}
                  {msg.files && msg.files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {msg.files.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                          {file.preview ? (
                            <img src={file.preview} alt={file.name} className="w-8 h-8 rounded object-cover" />
                          ) : (
                            <FileText className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="text-xs">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className={`text-sm whitespace-pre-wrap ${
                    msg.role === "ai" ? "bg-card border rounded-xl p-4" : ""
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Marketing AI</p>
                  <div className="bg-card border rounded-xl p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="p-4 border-t bg-card">
        <div className="max-w-3xl mx-auto">
          {/* Uploaded Files Preview */}
          {uploadedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 p-3 bg-muted rounded-xl">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative group flex items-center gap-2 bg-background rounded-lg px-3 py-2 pr-8"
                >
                  {file.preview ? (
                    <img src={file.preview} alt={file.name} className="w-10 h-10 rounded object-cover" />
                  ) : (
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-3 bg-muted rounded-2xl p-3">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={handleFileClick}
              className="p-2.5 hover:bg-background rounded-xl transition-colors"
            >
              <Paperclip className="w-5 h-5 text-muted-foreground" />
            </button>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tell me what you'd like to create..."
              className="flex-1 bg-transparent border-none outline-none resize-none text-sm py-2.5 px-1 min-h-[44px] max-h-[150px]"
              rows={2}
            />
            <button
              onClick={handleSend}
              disabled={(!message.trim() && uploadedFiles.length === 0) || isTyping}
              className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
