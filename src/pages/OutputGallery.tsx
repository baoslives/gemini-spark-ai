import { useState } from "react";
import { Instagram, Facebook, Play, Calendar, Clock, Heart, X, MoreHorizontal, MessageCircle, Send, Bookmark, BarChart3, ArrowUpRight } from "lucide-react";
import greenGemRing from "@/assets/green-gem-ring.png";
import goldNecklace from "@/assets/gold-necklace.png";
import diamondEarrings from "@/assets/diamond-earrings.png";
import silverBracelet from "@/assets/silver-bracelet.png";
import gemOnRock from "@/assets/gem-on-rock.png";
import pinkGemRing from "@/assets/pink-gem-ring.png";
import blueGemEarrings from "@/assets/blue-gem-earrings.png";
import purpleGemEarring from "@/assets/purple-gem-earring.png";
import rubyNecklace from "@/assets/ruby-necklace.png";
import jadeNecklace from "@/assets/jade-necklace.png";
import emeraldEarringsBox from "@/assets/emerald-earrings-box.png";
import emeraldRingModel from "@/assets/emerald-ring-model.png";
import ringVideo from "@/assets/ring-video.mp4";

interface Post {
  id: string;
  platforms: { name: string; likedBy?: string; likes?: number }[];
  media: string;
  mediaType: "image" | "video";
  hasCarousel?: boolean;
  status: "scheduled" | "suggested" | "draft" | "posted";
  scheduledDate?: string;
  scheduledTime?: string;
  title: string;
  caption: string;
}

const posts: Post[] = [
  {
    id: "1",
    platforms: [{ name: "Instagram" }, { name: "RedNote" }],
    media: ringVideo,
    mediaType: "video",
    status: "scheduled",
    scheduledDate: "Wed, Jan 7",
    scheduledTime: "7:15 PM",
    title: "Green Gem Ri...",
    caption: "What do you think of the design? Dr...",
  },
  {
    id: "2",
    platforms: [{ name: "RedNote" }],
    media: emeraldRingModel,
    mediaType: "image",
    hasCarousel: true,
    status: "scheduled",
    scheduledDate: "Thu, Jan 8",
    scheduledTime: "8:30 PM",
    title: "绿宝石戒指 美图",
    caption: "「优雅，永恒，自信。」全新绿色...",
  },
  {
    id: "3",
    platforms: [{ name: "Instagram" }],
    media: gemOnRock,
    mediaType: "image",
    hasCarousel: true,
    status: "suggested",
    scheduledDate: "Thu, Jan 8",
    scheduledTime: "12:00 PM",
    title: "Behind the Rin...",
    caption: "Every piece tells a story. Discover th...",
  },
  {
    id: "4",
    platforms: [{ name: "Instagram" }],
    media: goldNecklace,
    mediaType: "image",
    status: "draft",
    scheduledDate: "Sat, Jan 10",
    scheduledTime: "6:00 PM",
    title: "User Generate...",
    caption: "You wear it, we feature it! Tag us t...",
  },
  {
    id: "5",
    platforms: [{ name: "Instagram" }, { name: "Facebook" }],
    media: diamondEarrings,
    mediaType: "image",
    status: "posted",
    title: "Holiday Collection",
    caption: "Introducing our stunning Holiday...",
  },
  {
    id: "6",
    platforms: [{ name: "RedNote" }, { name: "TikTok" }],
    media: silverBracelet,
    mediaType: "image",
    status: "posted",
    title: "节日系列首发",
    caption: "新年新气象 💚 翡翠手链系列正式上...",
  },
  {
    id: "7",
    platforms: [{ name: "Instagram" }],
    media: pinkGemRing,
    mediaType: "image",
    status: "scheduled",
    scheduledDate: "Thu, Jan 9",
    scheduledTime: "3:00 PM",
    title: "Pink Diamond...",
    caption: "The rarest of all colors. Our pink dia...",
  },
  {
    id: "8",
    platforms: [{ name: "RedNote" }],
    media: blueGemEarrings,
    mediaType: "image",
    status: "draft",
    scheduledDate: "Fri, Jan 10",
    scheduledTime: "11:00 AM",
    title: "冰蓝耳环系列",
    caption: "如冰雪般清澈的蓝宝石耳环...",
  },
  {
    id: "9",
    platforms: [{ name: "Instagram" }, { name: "Facebook" }],
    media: purpleGemEarring,
    mediaType: "image",
    status: "posted",
    title: "Amethyst Drop...",
    caption: "Elegance in every drop. Our new am...",
  },
  {
    id: "10",
    platforms: [{ name: "TikTok" }],
    media: rubyNecklace,
    mediaType: "image",
    status: "posted",
    title: "Ruby Pendant",
    caption: "Deep red passion. The ultimate sta...",
  },
  {
    id: "11",
    platforms: [{ name: "Instagram" }, { name: "RedNote" }],
    media: jadeNecklace,
    mediaType: "image",
    status: "scheduled",
    scheduledDate: "Fri, Jan 10",
    scheduledTime: "2:00 PM",
    title: "Jade Beads Co...",
    caption: "Timeless elegance meets modern de...",
  },
  {
    id: "12",
    platforms: [{ name: "RedNote" }],
    media: emeraldEarringsBox,
    mediaType: "image",
    status: "scheduled",
    scheduledDate: "Sat, Jan 11",
    scheduledTime: "6:00 PM",
    title: "祖母绿耳环礼盒",
    caption: "奢华礼盒装，送礼首选 💎...",
  },
];

// Engagement data for posted content
const postedEngagement: Record<string, { likedBy: string; likes: string }> = {
  "5": { likedBy: "jewelry_lovers", likes: "52,341 others" },
  "6": { likedBy: "小红书 时尚", likes: "31,567 others" },
  "9": { likedBy: "gemstone_fans", likes: "28,903 others" },
  "10": { likedBy: "ruby_collector", likes: "45,672 others" },
};

type FilterType = "all" | "scheduled" | "draft" | "posted";

const getPlatformDisplay = (platform: string) => {
  switch (platform) {
    case "Instagram":
      return { icon: <Instagram className="w-4 h-4" />, name: "Instagram", color: "" };
    case "Facebook":
      return { icon: <Facebook className="w-4 h-4" />, name: "Facebook", color: "" };
    case "RedNote":
      return { icon: <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">小红书</span>, name: "RedNote", color: "text-red-500" };
    case "LinkedIn":
      return { icon: <span className="text-xs font-bold text-blue-600">in</span>, name: "LinkedIn", color: "" };
    case "TikTok":
      return { icon: <span className="text-xs">♪</span>, name: "TikTok", color: "" };
    default:
      return { icon: null, name: platform, color: "" };
  }
};

export const OutputGallery = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const filters: { id: FilterType; label: string }[] = [
    { id: "all", label: "All" },
    { id: "scheduled", label: "Scheduled" },
    { id: "draft", label: "Draft" },
    { id: "posted", label: "Published" },
  ];

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "posted") return post.status === "posted";
    if (activeFilter === "scheduled") return post.status === "scheduled" || post.status === "suggested";
    return post.status === activeFilter;
  });

  // Sort: Scheduled > Suggested > Drafts > Posted
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const order = { scheduled: 0, suggested: 1, draft: 2, posted: 3 };
    return order[a.status] - order[b.status];
  });

  const openAnalytics = (post: Post) => {
    setSelectedPost(post);
    setShowAnalytics(true);
  };

  const closeAnalytics = () => {
    setSelectedPost(null);
    setShowAnalytics(false);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-1">Social Post</h1>
        <p className="text-muted-foreground mb-6">
          Organize your generations, uploads, and history.
        </p>

        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">Show me:</span>
          <div className="flex gap-2">
            {filters.map((filter) => {
              const getFilterStyle = () => {
                if (activeFilter !== filter.id) return "bg-background hover:bg-muted border-border";
                if (filter.id === "scheduled") return "bg-purple-500 text-white border-purple-500";
                if (filter.id === "posted") return "bg-emerald-500 text-white border-emerald-500";
                return "bg-foreground text-background border-foreground";
              };
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-2.5 rounded-xl text-sm border transition-colors ${getFilterStyle()}`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Posts Grid - 5 columns */}
      <div className="grid grid-cols-5 gap-4">
        {sortedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            engagement={postedEngagement[post.id]}
            onViewAnalytics={() => openAnalytics(post)}
            onClick={() => openAnalytics(post)}
          />
        ))}
      </div>

      {/* Analytics Modal */}
      {showAnalytics && selectedPost && (
        <AnalyticsModal post={selectedPost} onClose={closeAnalytics} />
      )}
    </div>
  );
};

// Post Card Component
const PostCard = ({
  post,
  engagement,
  onViewAnalytics,
  onClick,
}: {
  post: Post;
  engagement?: { likedBy: string; likes: string };
  onViewAnalytics: () => void;
  onClick: () => void;
}) => {
  const getStatusBadge = () => {
    switch (post.status) {
      case "scheduled":
        return (
          <span className="absolute top-2 left-2 px-2 py-1 bg-purple-500 text-white text-xs rounded">
            Scheduled
          </span>
        );
      case "suggested":
        return (
          <span className="absolute top-2 left-2 px-2 py-1 bg-orange-500 text-white text-xs rounded">
            Suggested
          </span>
        );
      case "draft":
        return (
          <span className="absolute top-2 left-2 px-2 py-1 bg-muted text-foreground text-xs rounded border">
            Draft
          </span>
        );
      case "posted":
        return (
          <span className="absolute top-2 left-2 px-2 py-1 bg-emerald-500 text-white text-xs rounded">
            Posted
          </span>
        );
    }
  };

  return (
    <div onClick={onClick} className="bg-card rounded-xl overflow-hidden border cursor-pointer hover:shadow-lg transition-shadow">
      {/* Media */}
      <div className="relative aspect-[4/5]">
        {post.mediaType === "video" ? (
          <>
            <video src={post.media} className="w-full h-full object-cover" muted />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
            </div>
          </>
        ) : (
          <img src={post.media} alt="" className="w-full h-full object-cover" />
        )}
        
        {getStatusBadge()}

        {/* Carousel dots */}
        {post.hasCarousel && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Platform icons */}
        <div className="flex items-center gap-2">
          {post.platforms.map((platform, idx) => (
            <div key={idx} className="flex items-center">
              {getPlatformDisplay(platform.name).icon}
            </div>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-medium text-sm truncate">{post.title}</h3>

        {/* Caption */}
        <p className="text-xs text-muted-foreground line-clamp-2">{post.caption}</p>

        {/* Schedule info or Engagement */}
        {post.status !== "posted" && post.scheduledDate && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.scheduledDate}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.scheduledTime}
            </div>
          </div>
        )}

        {post.status === "posted" && engagement && (
          <div className="pt-1">
            <div className="flex items-center gap-1 text-xs">
              <span>Liked by</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span className="font-medium">{engagement.likedBy}</span>
              <span className="text-muted-foreground">and {engagement.likes}</span>
            </div>
            {/* View Analytics button for posted */}
            <button
              onClick={onViewAnalytics}
              className="mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-2 border rounded-lg text-xs hover:bg-muted transition-colors"
            >
              <BarChart3 className="w-3 h-3" />
              View Analytics
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Analytics Modal
const AnalyticsModal = ({ post, onClose }: { post: Post; onClose: () => void }) => {
  const metrics = [
    { label: "FOLLOWERS", value: "+389" },
    { label: "IMPRESSIONS", value: "4.9K" },
    { label: "ENGAGEMENT RATE", value: "8.8K" },
    { label: "PROFILE REACH", value: "1.4K" },
  ];

  const chartData = [
    { day: "M", impressions: 60 },
    { day: "T", impressions: 75 },
    { day: "W", impressions: 65 },
    { day: "T", impressions: 70 },
    { day: "F", impressions: 55 },
    { day: "S", impressions: 100 },
    { day: "S", impressions: 50 },
    { day: "M", impressions: 45 },
    { day: "T", impressions: 55 },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto p-8">
        <div className="flex justify-between items-start mb-6">
          <p className="font-mono text-sm tracking-widest text-muted-foreground">PUBLISHED POST PERFORMANCE</p>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Left: Analytics */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-light mb-1">Performance Summary</h2>
              <p className="text-muted-foreground">Analyze social post performance.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <p className="font-mono text-xs tracking-widest text-muted-foreground">{metric.label}</p>
                  <p className="text-4xl font-light">{metric.value}</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-light">Growth Overview</h3>
                <p className="text-sm text-muted-foreground">Trends of follower and impressions overtime.</p>
              </div>
              <div className="h-48 flex items-end gap-1">
                {chartData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex items-end justify-center h-32 gap-0.5">
                      <div
                        className="w-4 bg-blue-400 rounded-t"
                        style={{ height: `${d.impressions}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-400" />
                  <span>Impressions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5 bg-orange-400" />
                  <span>Followers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Post Preview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              {post.platforms.map((platform, idx) => {
                const display = getPlatformDisplay(platform.name);
                return (
                  <span key={idx} className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs">
                    {display.icon}
                    {display.name}
                  </span>
                );
              })}
            </div>

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
                  <strong>Desiree Gems</strong> {post.caption}
                </p>
              </div>
            </div>

            <button className="w-full py-3 border rounded-xl text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
              <ArrowUpRight className="w-4 h-4" />
              Go to Post
            </button>
            <button className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Delete Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputGallery;
