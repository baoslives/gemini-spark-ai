import { useState, useRef } from "react";
import { Calendar, Clock, Instagram, MoreHorizontal, Heart, Play, ChevronLeft, ChevronRight } from "lucide-react";
import greenGemRing from "@/assets/green-gem-ring.png";
import goldNecklace from "@/assets/gold-necklace.png";
import diamondEarrings from "@/assets/diamond-earrings.png";
import silverBracelet from "@/assets/silver-bracelet.png";
import ringVideoLaunch from "@/assets/ring-video-launch.mp4";
import gemOnRock from "@/assets/gem-on-rock.png";
import { PostDetailModal } from "@/components/PostDetailModal";

interface ScheduledPost {
  id: string;
  title: string;
  caption: string;
  image: string;
  platform: "Instagram" | "RedNote" | "LinkedIn" | "TikTok";
  scheduledDate: string;
  scheduledTime: string;
  status: "scheduled" | "draft" | "posted";
  likes?: number;
  likedBy?: string;
  mediaType?: "image" | "video" | "carousel";
  video?: string;
  carouselImages?: string[];
}

const scheduledPosts: ScheduledPost[] = [
  // Scheduled Content (only Instagram and RedNote)
  {
    id: "1",
    title: "Green Gem Ring Launch",
    caption: "What do you think of the design? Drop a '🔥' in the comments if you'd wear this!\n\n#FineJewelry #EmeraldElegance #StatementRing #LuxuryStyle",
    image: greenGemRing,
    platform: "Instagram",
    scheduledDate: "2026-01-07",
    scheduledTime: "19:15",
    status: "scheduled",
    mediaType: "video",
    video: ringVideoLaunch,
  },
  {
    id: "2",
    title: "绿宝石戒指 美图",
    caption: "「优雅，永恒，自信。」全新绿色宝石戒指，专为日常闪耀而生。\n\n#绿宝石戒指 #轻奢风格 #自信穿搭 #日常珠宝",
    image: greenGemRing,
    platform: "RedNote",
    scheduledDate: "2026-01-07",
    scheduledTime: "20:30",
    status: "scheduled",
  },
  {
    id: "3",
    title: "Behind the Ring Story",
    caption: "Every piece tells a story. Discover the craftsmanship behind our signature green gem ring.\n\n#BehindTheScenes #JewelryCraftsmanship #Handmade",
    image: gemOnRock,
    platform: "Instagram",
    scheduledDate: "2026-01-08",
    scheduledTime: "12:00",
    status: "scheduled",
    mediaType: "carousel",
    carouselImages: [gemOnRock, greenGemRing],
  },
  // Draft Content
  {
    id: "4",
    title: "User Generated Content",
    caption: "You wear it, we feature it! Tag us to be featured in our next spotlight.\n\n#UGC #CustomerLove #JewelryCommunity",
    image: diamondEarrings,
    platform: "Instagram",
    scheduledDate: "2026-01-10",
    scheduledTime: "18:00",
    status: "draft",
  },
  {
    id: "5",
    title: "Valentine's Preview",
    caption: "Love is in the details 💕 Sneak peek at our Valentine's collection.\n\n#ValentinesDay #GiftForHer #LuxuryJewelry",
    image: silverBracelet,
    platform: "Instagram",
    scheduledDate: "2026-01-15",
    scheduledTime: "10:00",
    status: "draft",
  },
  {
    id: "6",
    title: "情人节系列预告",
    caption: "爱在细节中 💕 情人节系列抢先看！\n\n#情人节礼物 #轻奢珠宝 #送礼首选",
    image: goldNecklace,
    platform: "RedNote",
    scheduledDate: "2026-01-15",
    scheduledTime: "20:00",
    status: "draft",
  },
  // Past Posted Content (no green gem ring)
  {
    id: "7",
    title: "Holiday Collection Launch",
    caption: "Introducing our stunning Holiday Collection ✨ Perfect gifts for your loved ones.\n\n#HolidayJewelry #GiftIdeas #LuxuryGifts",
    image: goldNecklace,
    platform: "Instagram",
    scheduledDate: "2025-12-20",
    scheduledTime: "18:00",
    status: "posted",
    likes: 52341,
    likedBy: "jewelry_lovers",
  },
  {
    id: "8",
    title: "Diamond Studs Feature",
    caption: "Timeless elegance in every sparkle. Our diamond studs are the perfect everyday luxury.\n\n#DiamondEarrings #TimelessJewelry #EverydayLuxury",
    image: diamondEarrings,
    platform: "LinkedIn",
    scheduledDate: "2025-12-22",
    scheduledTime: "09:00",
    status: "posted",
    likes: 8923,
    likedBy: "professional_style",
  },
  {
    id: "9",
    title: "节日系列首发",
    caption: "新年新气象 💚 翡翠手链系列正式上线！\n\n#翡翠手链 #新年礼物 #轻奢珠宝",
    image: silverBracelet,
    platform: "RedNote",
    scheduledDate: "2025-12-28",
    scheduledTime: "20:00",
    status: "posted",
    likes: 31567,
    likedBy: "小红书时尚",
  },
  {
    id: "10",
    title: "New Year Unboxing",
    caption: "POV: You just received the perfect New Year's gift 💎✨ #JewelryTok #Unboxing #LuxuryLifestyle",
    image: goldNecklace,
    platform: "TikTok",
    scheduledDate: "2025-12-31",
    scheduledTime: "12:00",
    status: "posted",
    likes: 128453,
    likedBy: "tiktok_viral",
  },
  {
    id: "11",
    title: "Elegant Everyday Moments",
    caption: "Shine bright in every moment ✨ Our diamond collection for the modern woman.\n\n#DiamondJewelry #ModernElegance #LuxuryStyle",
    image: diamondEarrings,
    platform: "Instagram",
    scheduledDate: "2026-01-02",
    scheduledTime: "19:00",
    status: "posted",
    likes: 38291,
    likedBy: "style_maven",
  },
  {
    id: "12",
    title: "翡翠手链日常搭配",
    caption: "日常穿搭也要精致 💚 翡翠手链让你每天都闪耀！\n\n#日常珠宝 #翡翠手链 #精致生活",
    image: silverBracelet,
    platform: "RedNote",
    scheduledDate: "2026-01-03",
    scheduledTime: "20:00",
    status: "posted",
    likes: 25674,
    likedBy: "珠宝达人",
  },
];

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "Instagram":
      return <Instagram className="w-4 h-4" />;
    case "RedNote":
      return <span className="text-xs font-bold text-red-500">小红书</span>;
    case "LinkedIn":
      return <span className="text-xs font-bold text-blue-600">in</span>;
    case "TikTok":
      return <span className="text-xs font-bold">♪</span>;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "scheduled":
      return <span className="text-xs px-2 py-1 rounded-full bg-emerald-light text-emerald">Scheduled</span>;
    case "draft":
      return <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">Draft</span>;
    case "posted":
      return <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">Posted</span>;
    default:
      return null;
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

export const OutputGallery = () => {
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "scheduled" | "draft" | "posted">("all");

  // Sort posts: scheduled first, then drafts, then posted
  const sortedAndFilteredPosts = scheduledPosts
    .filter((post) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "scheduled") return post.status === "scheduled";
      if (activeFilter === "draft") return post.status === "draft";
      if (activeFilter === "posted") return post.status === "posted";
      return true;
    })
    .sort((a, b) => {
      const statusOrder = { scheduled: 0, draft: 1, posted: 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    });

  const handlePostClick = (post: ScheduledPost) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleUpdatePost = (updatedPost: ScheduledPost) => {
    console.log("Updating post:", updatedPost);
    // Future: Update the post in state/backend
    setSelectedPost(null);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Output Gallery</h1>
          <p className="text-muted-foreground">Manage your scheduled and draft posts</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeFilter === "all" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card border hover:bg-muted"
            }`}
          >
            All Posts
          </button>
          <button 
            onClick={() => setActiveFilter("scheduled")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeFilter === "scheduled" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card border hover:bg-muted"
            }`}
          >
            Scheduled
          </button>
          <button 
            onClick={() => setActiveFilter("draft")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeFilter === "draft" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card border hover:bg-muted"
            }`}
          >
            Drafts
          </button>
          <button 
            onClick={() => setActiveFilter("posted")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeFilter === "posted" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card border hover:bg-muted"
            }`}
          >
            Posted
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-6">
        {sortedAndFilteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post)}
            className="bg-card rounded-xl border overflow-hidden hover:border-foreground/20 transition-all cursor-pointer group"
          >
            {/* Media */}
            <div className="aspect-square relative">
              {post.mediaType === "video" && post.video ? (
                <div className="relative w-full h-full">
                  <video
                    src={post.video}
                    className="w-full h-full object-cover"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-foreground ml-0.5" />
                    </div>
                  </div>
                </div>
              ) : post.mediaType === "carousel" && post.carouselImages ? (
                <div className="relative w-full h-full">
                  <img
                    src={post.carouselImages[0]}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                    {post.carouselImages.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-white" : "bg-white/50"}`} 
                      />
                    ))}
                  </div>
                  <div className="absolute top-3 right-12 bg-black/50 backdrop-blur-sm rounded px-1.5 py-0.5">
                    <span className="text-white text-[10px] font-medium">1/{post.carouselImages.length}</span>
                  </div>
                </div>
              ) : (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-3 left-3">
                {getStatusBadge(post.status)}
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 bg-background/80 backdrop-blur-sm rounded-lg">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  {getPlatformIcon(post.platform)}
                  <span className="text-xs">{post.platform}</span>
                </div>
              </div>
              <p className="font-medium text-sm mb-2 line-clamp-1">{post.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.caption}</p>
              {post.status === "posted" && post.likes && post.likedBy ? (
                <div className="flex items-center gap-1.5 text-xs">
                  <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                  <span>
                    Liked by <span className="font-medium">{post.likedBy}</span> and{" "}
                    <span className="font-medium">{post.likes.toLocaleString()} others</span>
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.scheduledDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(post.scheduledTime)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={handleCloseModal}
          onUpdate={handleUpdatePost}
        />
      )}
    </div>
  );
};
