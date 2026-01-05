import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Paperclip, Image, Video, BarChart3, X, FileText, User, Play } from "lucide-react";
import greenGemRing from "@/assets/green-gem-ring.png";
import ringVideo from "@/assets/ring-video.mp4";

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
  showMedia?: boolean;
  mediaType?: "image" | "video" | "both";
  showChart?: boolean;
}

// Scripted conversation flow
const scriptedConversation: { trigger: string; response: Message }[] = [
  {
    trigger: "brand",
    response: {
      id: "ai-1",
      role: "ai",
      content: "Brand guidelines and target audiences have been loaded as my reference.\nWhat would you like me to help with?",
    },
  },
  {
    trigger: "green gem ring",
    response: {
      id: "ai-2",
      role: "ai",
      content: "Understood.\nPlease confirm the following:\n\n• Platform (e.g. Instagram, TikTok, Facebook)\n• Target audience\n• Language",
    },
  },
  {
    trigger: "instagram and rednote",
    response: {
      id: "ai-3",
      role: "ai",
      content: `Got it. Please wait while I prepare your content…

🎨 Generating image: young woman wearing the green gem ring
🎞 Creating a 5s product video clip with branding and shimmer animation

✅ Done! Here's your preview:`,
      showMedia: true,
      mediaType: "both",
    },
  },
  {
    trigger: "schedule",
    response: {
      id: "ai-4",
      role: "ai",
      content: `Based on your audience (working professionals), the best times are:

📱 Instagram:
• Tuesday: 6PM–8PM
• Wednesday: 12PM–1PM
• Sunday: 7PM–9PM
👉 Recommended: Tuesday at 7:15PM

📱 RedNote (小红书):
• Weekdays: 12PM–1PM or 8PM–10PM
👉 Recommended: Tuesday at 8:30PM (to hit peak discovery window)

Would you like me to schedule both posts accordingly?`,
    },
  },
  {
    trigger: "yes",
    response: {
      id: "ai-5",
      role: "ai",
      content: `✅ Done!

• Instagram post scheduled for Tuesday at 7:15PM
• RedNote 中文版 scheduled for Tuesday at 8:30PM

You'll receive confirmation once both are live, followed by a 24-hour performance summary.`,
    },
  },
  {
    trigger: "24-hour performance",
    response: {
      id: "ai-6",
      role: "ai",
      content: `📊 Here's your 24-hour performance summary:

**RedNote (小红书):**
• Engagement Rate: 6.2%
• Saves: 115
• Comments: 32
• Top comment: "颜色太美了！种草～"
👍 Sentiment: 92% Positive
❤️ Brand Sentiment increased by 18% from previous post
📈 Performing better than Instagram for this campaign

**Instagram:**
• Engagement Rate: 3.1%
• Likes: 207
• Comments: 19
• Top comment: "This is 🔥🔥🔥"

---

🧠 **Comment Insight Engine**
Detected 4 negative comments under your latest Instagram post.

🗨️ Examples:
• "Didn't that KOL say she got ghosted?"
• "Your diamond just fell out?!"
• "Scam vibes tbh."

📉 Likely triggered by the KOL's recent public remarks + a product complaint.

---

✅ Action:
Recommend posting a short, calm update to clarify and steer sentiment back toward the product.

Would you like me to draft a community response, or prep a soft-reset campaign post to steer sentiment back toward the product story?`,
    },
  },
  {
    trigger: "analysis of this week",
    response: {
      id: "ai-7",
      role: "ai",
      content: `📊 **Weekly Social Performance Summary**

**Instagram**
• Total Posts: 3
• Top Post: Green Gem Ring Launch
• Engagement Rate: 4.2%
• Saves: 212 | Shares: 93
• Comments: 42 (✅ 89% positive, ❗ 11% negative)
• Spike in visibility on Tuesday 7–9PM

**RedNote (小红书)**
• Total Posts: 2
• Top Post: Green Gem 戒指 美图
• Engagement Rate: 6.8%
• Comments: 55 | Saves: 188
• Brand Affinity ↑ +19% compared to last week

📈 **Engagement Trend Chart:**`,
      showChart: true,
    },
  },
  {
    trigger: "next week",
    response: {
      id: "ai-8",
      role: "ai",
      content: `🧠 Based on this week's insights and trending content:

📅 **Next Week Post Suggestions**

**1. "Behind the Ring" Story (Tue or Wed)**
Showcase craftsmanship, brand values, and how the ring is made. Softly reminds users of your process & ethics.
🎯 Builds trust → good timing after recent KOL noise.

**2. User-Generated Content Push (Fri)**
Curate reposts from actual customers wearing your pieces. Add "tag us to be featured" CTA.
🎯 Increases authenticity + engagement

**3. RedNote Mini-Campaign (Weekend)**
Topic: "How to Style Green Jewelry for Work"
Add carousel + captions in simplified Chinese
💡 Trending right now among office fashion bloggers

Would you like me to auto-generate visuals and copy for the Tuesday story post?`,
    },
  },
];

const getScriptedResponse = (userMessage: string): Message | null => {
  const lowerMsg = userMessage.toLowerCase();
  
  for (const script of scriptedConversation) {
    if (lowerMsg.includes(script.trigger)) {
      return { ...script.response, id: Date.now().toString() };
    }
  }
  
  return null;
};

const defaultResponse = (userMessage: string): string => {
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

// Simple chart component
const EngagementChart = () => {
  const data = [
    { day: "Mon", ig: 2.1, rn: 4.5 },
    { day: "Tue", ig: 4.2, rn: 6.8 },
    { day: "Wed", ig: 3.8, rn: 5.2 },
    { day: "Thu", ig: 2.9, rn: 4.1 },
    { day: "Fri", ig: 2.4, rn: 3.8 },
    { day: "Sat", ig: 3.1, rn: 5.5 },
    { day: "Sun", ig: 3.5, rn: 6.2 },
  ];
  
  const maxValue = 8;
  
  return (
    <div className="mt-4 p-4 bg-muted/50 rounded-xl">
      <div className="flex items-center gap-4 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary" />
          <span>Instagram</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span>RedNote</span>
        </div>
      </div>
      <div className="flex items-end gap-2 h-32">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex gap-0.5 justify-center items-end h-24">
              <div 
                className="w-3 bg-primary rounded-t transition-all"
                style={{ height: `${(d.ig / maxValue) * 100}%` }}
              />
              <div 
                className="w-3 bg-emerald-500 rounded-t transition-all"
                style={{ height: `${(d.rn / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{d.day}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        **Sentiment Summary:**
        • Positive themes: elegance, colour tone, styling ideas
        • Negative mentions: KOL comments, 1 product quality remark
      </p>
    </div>
  );
};

// Media preview component
const MediaPreview = ({ type }: { type: "image" | "video" | "both" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {(type === "image" || type === "both") && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">📷 Image Preview:</p>
          <img 
            src={greenGemRing} 
            alt="Green gem ring on model" 
            className="rounded-xl max-w-xs shadow-lg"
          />
        </div>
      )}
      
      {(type === "video" || type === "both") && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">🎬 Video Preview (5s clip):</p>
          <div className="relative max-w-xs">
            <video 
              ref={videoRef}
              src={ringVideo}
              className="rounded-xl shadow-lg w-full"
              onEnded={() => setIsPlaying(false)}
              loop
            />
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl hover:bg-black/30 transition-colors"
            >
              {!isPlaying && (
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-5 h-5 text-foreground ml-0.5" />
                </div>
              )}
            </button>
          </div>
        </div>
      )}

      {type === "both" && (
        <div className="mt-4 p-4 bg-muted/50 rounded-xl space-y-3 text-sm">
          <div>
            <p className="font-medium mb-1">📄 Caption (EN):</p>
            <p className="text-muted-foreground italic">
              Elegant. Timeless. Unapologetically you.<br/>
              Discover the beauty of our new Green Gem Ring – a perfect match for your everyday confidence.<br/>
              #GreenGem #JewelryGoals #EverydayLuxury #WorkStyle
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">📄 RedNote 中文文案：</p>
            <p className="text-muted-foreground italic">
              「优雅，永恒，自信。」全新绿色宝石戒指，专为日常闪耀而生。<br/>
              #绿宝石戒指 #轻奢风格 #自信穿搭 #日常珠宝
            </p>
          </div>
          <p className="text-foreground font-medium mt-2">Would you like to post now or schedule?</p>
        </div>
      )}
    </div>
  );
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

    // Check for scripted response first
    const scriptedResponse = getScriptedResponse(userMessage.content);
    
    setTimeout(() => {
      if (scriptedResponse) {
        setMessages((prev) => [...prev, scriptedResponse]);
      } else {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: defaultResponse(userMessage.content),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }
      setIsTyping(false);
    }, 1500);
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

                  <div className={`text-sm ${
                    msg.role === "ai" ? "bg-card border rounded-xl p-4" : ""
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    
                    {/* Show media if applicable */}
                    {msg.showMedia && msg.mediaType && (
                      <MediaPreview type={msg.mediaType} />
                    )}
                    
                    {/* Show chart if applicable */}
                    {msg.showChart && <EngagementChart />}
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
