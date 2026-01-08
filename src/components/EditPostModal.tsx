import { useState } from "react";
import { X, Instagram, Facebook, Upload, Sparkles, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Calendar as CalendarIcon, Clock, Play } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  platforms: { name: string }[];
  media: string;
  mediaType: "image" | "video";
  hasCarousel?: boolean;
  status: "scheduled" | "suggested" | "draft" | "posted";
  scheduledDate?: string;
  scheduledTime?: string;
  title: string;
  caption: string;
}

interface EditPostModalProps {
  post: Post;
  onClose: () => void;
}

const platforms = [
  { id: "instagram", name: "INSTAGRAM", icon: <Instagram className="w-5 h-5" /> },
  { id: "facebook", name: "FACEBOOK", icon: <Facebook className="w-5 h-5" /> },
  { id: "twitter", name: "X (TWITTER)", icon: <span className="font-bold text-lg">𝕏</span> },
  { id: "rednote", name: "XIAOHONGSHU", icon: <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">小红书</span> },
  { id: "linkedin", name: "LINKEDIN", icon: <span className="text-sm font-bold text-blue-600">in</span> },
  { id: "tiktok", name: "TIKTOK", icon: <span className="text-sm">♪</span> },
];

export const EditPostModal = ({ post, onClose }: EditPostModalProps) => {
  const [view, setView] = useState<"edit" | "schedule">("edit");
  const [selectedPlatforms, setSelectedPlatforms] = useState(
    platforms.map(p => ({ ...p, selected: post.platforms.some(pp => pp.name.toLowerCase() === p.id) }))
  );
  const [captionPrompt, setcaptionPrompt] = useState("help me write a caption with the taglines #FineJewelry #EmeraldElegance #StatementRing #LuxuryStyle");
  const [aiCaption, setAiCaption] = useState(`What do you think of the design? Drop a '🔥' in the comments if you'd wear this!"

#FineJewelry #EmeraldElegance #StatementRing #LuxuryStyle`);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.map(p => p.id === id ? { ...p, selected: !p.selected } : p)
    );
  };

  if (view === "schedule") {
    return <ScheduleView post={post} onClose={onClose} onBack={() => setView("edit")} />;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto p-8">
        {/* Header - just close button */}
        <div className="flex justify-end mb-6">
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Left: Edit Controls */}
          <div className="space-y-6">
            {/* Platform Selection */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Share to:</p>
              <div className="space-y-2">
                {selectedPlatforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors ${
                      platform.selected 
                        ? "bg-foreground text-background border-foreground" 
                        : "bg-background hover:bg-muted border-border"
                    }`}
                  >
                    {platform.icon}
                    <span className="font-mono text-sm tracking-wide">{platform.name}</span>
                    {platform.selected && <span className="ml-auto">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Media */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Selected Media:</p>
              <div className="grid grid-cols-3 gap-2">
                {/* Primary media from post */}
                <div className="aspect-square rounded-lg overflow-hidden relative">
                  {post.mediaType === "video" ? (
                    <>
                      <video src={post.media} className="w-full h-full object-cover" muted />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img src={post.media} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                {/* Show second item if carousel */}
                {post.hasCarousel && (
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img src={post.media} alt="" className="w-full h-full object-cover opacity-70" />
                  </div>
                )}
              </div>
              <button className="w-full py-3 border rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                <Upload className="w-4 h-4" />
                Add Media
              </button>
            </div>

            {/* Caption Prompt */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Instructions prompt for caption:</p>
              <div className="p-3 bg-muted/50 rounded-lg text-sm">
                {captionPrompt}
              </div>
              <button className="flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-lg text-sm">
                <Sparkles className="w-4 h-4" />
                Generate Caption
              </button>
            </div>

            {/* AI Caption Suggest */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">AI Caption Suggest:</p>
              <div className="p-4 bg-muted/30 rounded-lg text-sm whitespace-pre-wrap border-l-2 border-muted-foreground/30">
                {aiCaption}
              </div>
            </div>
          </div>

          {/* Right: Post Preview */}
          <div className="space-y-4">
            <p className="font-mono text-sm tracking-widest text-muted-foreground text-center">POST PREVIEW:</p>
            
            {/* Instagram-style preview */}
            <div className="border rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 p-3 border-b">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                  DG
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Desiree Gems</p>
                  <p className="text-xs text-muted-foreground">Singapore, Singapore</p>
                </div>
                <MoreHorizontal className="w-5 h-5" />
              </div>
              
              <div className="relative aspect-square">
                {post.mediaType === "video" ? (
                  <video src={post.media} className="w-full h-full object-cover" muted autoPlay loop />
                ) : (
                  <img src={post.media} alt="" className="w-full h-full object-cover" />
                )}
                {/* Carousel dots - only 2 items */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                </div>
              </div>

              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Heart className="w-6 h-6" />
                    <MessageCircle className="w-6 h-6" />
                    <Send className="w-6 h-6" />
                  </div>
                  <Bookmark className="w-6 h-6" />
                </div>
                <p className="text-sm">
                  <strong>Desiree Gems</strong> {aiCaption}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button className="w-full py-3 bg-foreground text-background rounded-xl text-sm font-medium">
                Publish Now
              </button>
              <button 
                onClick={() => setView("schedule")}
                className="w-full py-3 border rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-muted transition-colors"
              >
                <CalendarIcon className="w-4 h-4" />
                {post.scheduledDate || "Wed, Jan 7"} • {post.scheduledTime || "7:15 PM"}
              </button>
              <button className="w-full py-3 border rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                <Upload className="w-4 h-4" />
                Save as Draft
              </button>
              <button 
                onClick={onClose}
                className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Schedule View Component
const ScheduleView = ({ post, onClose, onBack }: { post: Post; onClose: () => void; onBack: () => void }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    post.scheduledDate ? new Date(post.scheduledDate) : new Date()
  );
  const [selectedTime, setSelectedTime] = useState(post.scheduledTime || "7:15 PM");
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const timeOptions = [
    "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM", "7:00 PM", "7:15 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM"
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-lg w-full p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="font-mono text-sm tracking-widest text-muted-foreground">
            CREATE SOCIAL POST <span className="mx-2">›</span> SCHEDULE POST
          </p>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Platform */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Schedule posting times for:</p>
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              <span className="font-mono text-sm tracking-wide">INSTAGRAM</span>
            </div>
          </div>

          {/* Optional Prompt */}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Optional prompt"
              className="w-full px-4 py-3 rounded-lg border bg-background text-sm"
            />
            <button className="flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-lg text-sm">
              <Sparkles className="w-4 h-4" />
              Get AI Recommendation
            </button>
          </div>

          {/* AI Recommendation */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">AI Recommendation:</p>
            <div className="p-4 bg-muted/30 rounded-lg text-sm space-y-2 border-l-2 border-muted-foreground/30">
              <p>Based on your audience (working professionals), the best times are:</p>
              <p>📱 Instagram:</p>
              <p>Tuesday: 6PM-8PM</p>
              <p>Wednesday: 12PM-1PM</p>
              <p>Sunday: 7PM-9PM</p>
              <p className="pt-2">👉 Recommended: Tuesday at 7:15PM</p>
            </div>
          </div>

          {/* Date & Time Pickers */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date Picker */}
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-3 border rounded-lg hover:bg-muted transition-colors text-left">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {selectedDate ? format(selectedDate, "EEEE, d MMMM yyyy") : "Select date"}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-[60]" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setDateOpen(false);
                  }}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            {/* Time Picker */}
            <Popover open={timeOpen} onOpenChange={setTimeOpen}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-3 border rounded-lg hover:bg-muted transition-colors text-left">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{selectedTime}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-0 z-[60]" align="start">
                <div className="max-h-60 overflow-y-auto p-2">
                  {timeOptions.map((time) => (
                    <button
                      key={time}
                      onClick={() => {
                        setSelectedTime(time);
                        setTimeOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors",
                        selectedTime === time && "bg-muted font-medium"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4">
            <button className="w-full py-3 bg-foreground text-background rounded-xl text-sm font-medium">
              Schedule Post
            </button>
            <button 
              onClick={onBack}
              className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
