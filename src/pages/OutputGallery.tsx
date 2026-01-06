import { useState } from "react";
import { Calendar, Clock, Instagram, MoreHorizontal, Heart } from "lucide-react";
import greenGemRing from "@/assets/green-gem-ring.png";
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
}

const scheduledPosts: ScheduledPost[] = [
  {
    id: "1",
    title: "Green Gem Ring Launch",
    caption: "What do you think of the design? Drop a '🔥' in the comments if you'd wear this!\n\n#FineJewelry #EmeraldElegance #StatementRing #LuxuryStyle",
    image: greenGemRing,
    platform: "Instagram",
    scheduledDate: "2026-01-05",
    scheduledTime: "19:15",
    status: "posted",
    likes: 44686,
    likedBy: "craig_love",
  },
  {
    id: "2",
    title: "绿宝石戒指 美图",
    caption: "「优雅，永恒，自信。」全新绿色宝石戒指，专为日常闪耀而生。\n\n#绿宝石戒指 #轻奢风格 #自信穿搭 #日常珠宝",
    image: greenGemRing,
    platform: "RedNote",
    scheduledDate: "2026-01-05",
    scheduledTime: "20:30",
    status: "posted",
    likes: 12853,
    likedBy: "xiaomei_style",
  },
  {
    id: "3",
    title: "Professional Elegance",
    caption: "Elevate your professional presence with timeless elegance. The Green Gem Ring - for those who lead with style.\n\n#ProfessionalStyle #LuxuryJewelry #CareerWomen",
    image: greenGemRing,
    platform: "LinkedIn",
    scheduledDate: "2026-01-07",
    scheduledTime: "09:00",
    status: "scheduled",
  },
  {
    id: "4",
    title: "Behind the Ring Story",
    caption: "Every piece tells a story. Discover the craftsmanship behind our signature green gem ring.\n\n#BehindTheScenes #JewelryCraftsmanship #Handmade",
    image: greenGemRing,
    platform: "Instagram",
    scheduledDate: "2026-01-08",
    scheduledTime: "12:00",
    status: "draft",
  },
  {
    id: "5",
    title: "Ring Reveal Moment",
    caption: "The moment you've been waiting for ✨ #GreenGemRing #JewelryTok #Unboxing #LuxuryLifestyle",
    image: greenGemRing,
    platform: "TikTok",
    scheduledDate: "2026-01-09",
    scheduledTime: "18:00",
    status: "scheduled",
  },
  {
    id: "6",
    title: "User Generated Content",
    caption: "You wear it, we feature it! Tag us to be featured in our next spotlight.\n\n#UGC #CustomerLove #JewelryCommunity",
    image: greenGemRing,
    platform: "Instagram",
    scheduledDate: "2026-01-10",
    scheduledTime: "18:00",
    status: "draft",
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
          <button className="px-4 py-2 bg-card border rounded-lg text-sm hover:bg-muted transition-colors">
            All Posts
          </button>
          <button className="px-4 py-2 bg-card border rounded-lg text-sm hover:bg-muted transition-colors">
            Scheduled
          </button>
          <button className="px-4 py-2 bg-card border rounded-lg text-sm hover:bg-muted transition-colors">
            Drafts
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-6">
        {scheduledPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post)}
            className="bg-card rounded-xl border overflow-hidden hover:border-foreground/20 transition-all cursor-pointer group"
          >
            {/* Image */}
            <div className="aspect-square relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
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
