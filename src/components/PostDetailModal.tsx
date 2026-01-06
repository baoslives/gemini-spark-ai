import { useState, useRef } from "react";
import { X, RefreshCw, Instagram, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Check, Play } from "lucide-react";

interface CarouselItem {
  type: "image" | "video";
  src: string;
}

interface ScheduledPost {
  id: string;
  title: string;
  caption: string;
  image: string;
  platform: string;
  scheduledDate: string;
  scheduledTime: string;
  status: "scheduled" | "draft" | "posted";
  likes?: number;
  likedBy?: string;
  mediaType?: "image" | "video" | "carousel";
  video?: string;
  carouselImages?: string[];
  carouselItems?: CarouselItem[];
}

interface PostDetailModalProps {
  post: ScheduledPost;
  onClose: () => void;
  onUpdate: (post: ScheduledPost) => void;
}

const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, iconText: null },
  { id: "rednote", name: "小红书 (RedNote)", icon: null, iconText: "小红书" },
  { id: "linkedin", name: "LinkedIn", icon: null, iconText: "in" },
  { id: "tiktok", name: "TikTok", icon: null, iconText: "♪" },
  { id: "facebook", name: "Facebook", icon: null, iconText: "f" },
  { id: "twitter", name: "X (Twitter)", icon: null, iconText: "𝕏" },
];

export const PostDetailModal = ({ post, onClose, onUpdate }: PostDetailModalProps) => {
  const [caption, setCaption] = useState(post.caption);
  const [selectedPlatforms, setSelectedPlatforms] = useState([post.platform.toLowerCase()]);
  const [scheduledDate, setScheduledDate] = useState(post.scheduledDate);
  const [scheduledTime, setScheduledTime] = useState(post.scheduledTime);
  const [customizeEnabled, setCustomizeEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSave = () => {
    onUpdate({
      ...post,
      caption,
      scheduledDate,
      scheduledTime,
    });
  };

  const handlePostNow = () => {
    console.log("Posting now:", post.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex">
        {/* Left Side - Post Preview */}
        <div className="flex-1 p-8 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6">New social media post</h2>

          {/* AI Caption */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">AI Caption Suggest:</p>
            <div className="bg-card border rounded-xl p-4 mb-3">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-transparent border-none outline-none resize-none text-sm min-h-[100px]"
              />
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl hover:bg-primary/90 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Re-generate Caption
            </button>
          </div>

          {/* Post Preview */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Post preview:</p>
            <div className="bg-card border rounded-xl overflow-hidden">
              {/* Instagram Header */}
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                    DG
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Desiree Gems</p>
                    <p className="text-xs text-muted-foreground">Singapore, Singapore</p>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Media */}
              <div className="aspect-square relative">
                {post.mediaType === "video" && post.video ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      src={post.video}
                      className="w-full h-full object-cover"
                      loop
                      onEnded={() => setIsPlaying(false)}
                    />
                    {!isPlaying && (
                      <button
                        onClick={toggleVideo}
                        className="absolute inset-0 flex items-center justify-center bg-black/20"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="w-7 h-7 text-foreground ml-1" />
                        </div>
                      </button>
                    )}
                  </div>
                ) : post.mediaType === "carousel" && post.carouselItems ? (
                  <div className="relative w-full h-full">
                    {post.carouselItems[carouselIndex].type === "video" ? (
                      <div className="relative w-full h-full">
                        <video
                          ref={videoRef}
                          src={post.carouselItems[carouselIndex].src}
                          className="w-full h-full object-cover"
                          loop
                          onEnded={() => setIsPlaying(false)}
                        />
                        {!isPlaying && (
                          <button
                            onClick={toggleVideo}
                            className="absolute inset-0 flex items-center justify-center bg-black/20"
                          >
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                              <Play className="w-7 h-7 text-foreground ml-1" />
                            </div>
                          </button>
                        )}
                      </div>
                    ) : (
                      <img
                        src={post.carouselItems[carouselIndex].src}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {post.carouselItems.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setCarouselIndex(idx);
                            setIsPlaying(false);
                            if (videoRef.current) videoRef.current.pause();
                          }}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            idx === carouselIndex ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : post.mediaType === "carousel" && post.carouselImages ? (
                  <div className="relative w-full h-full">
                    <img
                      src={post.carouselImages[carouselIndex]}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {post.carouselImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCarouselIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            idx === carouselIndex ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                )}
              </div>

              {/* Actions */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <Heart className="w-6 h-6" />
                    <MessageCircle className="w-6 h-6" />
                    <Send className="w-6 h-6" />
                  </div>
                  <Bookmark className="w-6 h-6" />
                </div>
                {post.status === "posted" && post.likes && post.likedBy ? (
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Liked by </span>
                    <span className="font-semibold">{post.likedBy}</span>
                    <span> and </span>
                    <span className="font-semibold">{post.likes.toLocaleString()} others</span>
                  </p>
                ) : null}
                <p className="text-sm">
                  <span className="font-semibold">Desiree Gems</span>{" "}
                  {caption.split("\n")[0]}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {caption.split("\n").filter(line => line.startsWith("#")).join(" ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Settings */}
        <div className="w-80 bg-card border-l p-6 flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Customize Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCustomizeEnabled(!customizeEnabled)}
                className={`w-10 h-6 rounded-full transition-colors relative ${
                  customizeEnabled ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                    customizeEnabled ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
            <span className="text-sm">Customise post for selected social media</span>
          </div>

          {/* Platform Selection */}
          <div className="space-y-2 mb-6">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                  selectedPlatforms.includes(platform.id)
                    ? "bg-muted border-foreground/20"
                    : "hover:bg-muted/50"
                }`}
              >
                {platform.icon ? (
                  <platform.icon className="w-5 h-5" />
                ) : (
                  <div className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                    platform.id === "rednote" ? "bg-red-500 text-white" : 
                    platform.id === "linkedin" ? "bg-blue-600 text-white" :
                    platform.id === "tiktok" ? "bg-black text-white" :
                    "bg-muted"
                  }`}>
                    {platform.iconText}
                  </div>
                )}
                <span className="text-sm flex-1 text-left">{platform.name}</span>
                {selectedPlatforms.includes(platform.id) && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Schedule Settings */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-xs font-mono tracking-widest text-muted-foreground mb-2 block">
                DATE
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full bg-muted border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-mono tracking-widest text-muted-foreground mb-2 block">
                TIME
              </label>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full bg-muted border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-background border rounded-xl overflow-hidden mb-6">
            <div className="flex items-center gap-2 p-3 border-b">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-emerald-600 flex items-center justify-center text-white text-[8px] font-bold">
                DG
              </div>
              <div>
                <p className="text-xs font-semibold">Desiree Gems</p>
                <p className="text-[10px] text-muted-foreground">3 min</p>
              </div>
            </div>
            <p className="text-[10px] p-3 line-clamp-3">{caption}</p>
            <div className="aspect-video">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center justify-around p-2 border-t text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" /> Like
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" /> Comment
              </span>
              <span className="flex items-center gap-1">
                <Send className="w-3 h-3" /> Share
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto space-y-2">
            <button
              onClick={handlePostNow}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
            >
              Post Now
            </button>
            <button
              onClick={handleSave}
              className="w-full py-3 bg-card border rounded-xl hover:bg-muted transition-colors font-medium"
            >
              Schedule Post
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
