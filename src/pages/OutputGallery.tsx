import { useState } from "react";
import { Instagram, Facebook, ChevronDown, Settings, Calendar, Clock, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, X, Sparkles, Upload, BarChart3, ArrowUpRight } from "lucide-react";
import greenGemRing from "@/assets/green-gem-ring.png";
import goldNecklace from "@/assets/gold-necklace.png";
import diamondEarrings from "@/assets/diamond-earrings.png";
import silverBracelet from "@/assets/silver-bracelet.png";
import gemOnRock from "@/assets/gem-on-rock.png";

interface Post {
  id: string;
  platform: "Instagram" | "Facebook" | "Twitter";
  image: string;
  carouselImages?: string[];
  status: "scheduled" | "published" | "draft";
  scheduledDate?: string;
  publishedDate?: string;
  caption: string;
  hashtags: string;
  likes?: number;
  likedBy?: string;
}

const posts: Post[] = [
  {
    id: "1",
    platform: "Instagram",
    image: greenGemRing,
    carouselImages: [greenGemRing, gemOnRock, diamondEarrings, silverBracelet, goldNecklace],
    status: "scheduled",
    scheduledDate: "Tuesday, 30 July 2025at 7:15PM",
    caption: "What do you think of the design? Drop a '🔥' in the comments if you'd wear this!",
    hashtags: "#FineJewelry #EmeraldElegance #StatementRing #LuxuryStyle",
  },
  {
    id: "2",
    platform: "Instagram",
    image: greenGemRing,
    carouselImages: [greenGemRing, gemOnRock, diamondEarrings, silverBracelet, goldNecklace],
    status: "published",
    publishedDate: "Tuesday, 30 July 2025at 7:15PM",
    caption: "What do you think of the design? Drop a '🔥' in the comments if you'd wear this!",
    hashtags: "#FineJewelry #EmeraldElegance #StatementRing #LuxuryStyle",
    likes: 4686,
    likedBy: "craig_love",
  },
  {
    id: "3",
    platform: "Facebook",
    image: greenGemRing,
    carouselImages: [greenGemRing, gemOnRock, diamondEarrings, silverBracelet, goldNecklace],
    status: "draft",
    caption: "What do you think of the design? Drop a '🔥' in the comments if you'd wear this!",
    hashtags: "#FineJewelry #EmeraldElegance #StatementRing #LuxuryStyle",
  },
  {
    id: "4",
    platform: "Facebook",
    image: diamondEarrings,
    status: "published",
    publishedDate: "Monday, 29 July 2025at 2:00PM",
    caption: "Elegance in every detail ✨",
    hashtags: "#DiamondEarrings #LuxuryJewelry",
    likes: 2341,
    likedBy: "jewelry_lovers",
  },
];

type FilterType = "all" | "scheduled" | "draft" | "published";
type ModalType = "analytics" | "edit" | "schedule" | null;

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "Instagram":
      return <Instagram className="w-4 h-4" />;
    case "Facebook":
      return <Facebook className="w-4 h-4" />;
    default:
      return null;
  }
};

export const OutputGallery = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  const filters: { id: FilterType; label: string }[] = [
    { id: "all", label: "All" },
    { id: "scheduled", label: "Scheduled" },
    { id: "draft", label: "Draft" },
    { id: "published", label: "Published" },
  ];

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "all") return true;
    return post.status === activeFilter;
  });

  const openModal = (post: Post, type: ModalType) => {
    setSelectedPost(post);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalType(null);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-light mb-2">Social Post</h1>
        <p className="text-muted-foreground">
          Organize your generations, uploads, and history.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Show me:</span>
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeFilter === filter.id
                    ? "bg-foreground text-background"
                    : "bg-card border hover:bg-muted"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sortby</span>
          <button className="flex items-center gap-1 px-3 py-2 border rounded-full text-sm hover:bg-muted transition-colors">
            Recent
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEditPost={() => openModal(post, "edit")}
            onEditSchedule={() => openModal(post, "schedule")}
            onViewAnalytics={() => openModal(post, "analytics")}
            onContinue={() => openModal(post, "edit")}
          />
        ))}
      </div>

      {/* Modals */}
      {selectedPost && modalType === "analytics" && (
        <AnalyticsModal post={selectedPost} onClose={closeModal} />
      )}
      {selectedPost && modalType === "edit" && (
        <EditPostModal post={selectedPost} onClose={closeModal} />
      )}
      {selectedPost && modalType === "schedule" && (
        <ScheduleModal post={selectedPost} onClose={closeModal} />
      )}
    </div>
  );
};

// Post Card Component
const PostCard = ({
  post,
  onEditPost,
  onEditSchedule,
  onViewAnalytics,
  onContinue,
}: {
  post: Post;
  onEditPost: () => void;
  onEditSchedule: () => void;
  onViewAnalytics: () => void;
  onContinue: () => void;
}) => {
  return (
    <div className="bg-card rounded-xl border overflow-hidden">
      {/* Image with platform badge */}
      <div className="relative aspect-[4/5]">
        <img src={post.image} alt="" className="w-full h-full object-cover" />
        
        {/* Platform badge */}
        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm font-medium">
            {getPlatformIcon(post.platform)}
            {post.platform}
          </span>
        </div>

        {/* Carousel dots */}
        {post.carouselImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {post.carouselImages.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Status badge */}
        {post.status === "scheduled" && (
          <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs rounded-full">
            Scheduled: {post.scheduledDate}
          </span>
        )}
        {post.status === "published" && (
          <span className="inline-block px-3 py-1 bg-foreground text-background text-xs rounded-full">
            Published: {post.publishedDate}
          </span>
        )}
        {post.status === "draft" && (
          <span className="inline-block px-3 py-1 border text-xs rounded-full">
            Draft
          </span>
        )}

        {/* Caption */}
        <div>
          <p className="text-sm">
            <span className="font-semibold">Desiree Gems</span> {post.caption}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{post.hashtags}</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          {post.status === "scheduled" && (
            <>
              <button
                onClick={onEditPost}
                className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm hover:bg-muted transition-colors"
              >
                <Settings className="w-4 h-4" />
                Edit Post
              </button>
              <button
                onClick={onEditSchedule}
                className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm hover:bg-muted transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Edit Schedule
              </button>
            </>
          )}
          {post.status === "published" && (
            <button
              onClick={onViewAnalytics}
              className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm hover:bg-muted transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              View Analytics
            </button>
          )}
          {post.status === "draft" && (
            <button
              onClick={onContinue}
              className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm hover:bg-muted transition-colors"
            >
              ↻ Continue
            </button>
          )}
        </div>
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
    { day: "M", impressions: 60, followers: 65 },
    { day: "T", impressions: 75, followers: 60 },
    { day: "W", impressions: 65, followers: 55 },
    { day: "T", impressions: 70, followers: 60 },
    { day: "F", impressions: 55, followers: 50 },
    { day: "S", impressions: 100, followers: 45 },
    { day: "S", impressions: 50, followers: 55 },
    { day: "M", impressions: 45, followers: 60 },
    { day: "T", impressions: 55, followers: 65 },
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
            <span className="inline-block px-3 py-1 bg-foreground text-background text-xs rounded-full">
              Published: {post.publishedDate}
            </span>

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
                <img src={post.image} alt="" className="w-full h-full object-cover" />
                {post.carouselImages && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                    {post.carouselImages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-white" : "bg-white/50"}`}
                      />
                    ))}
                  </div>
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
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-pink-500" />
                  <span>Liked by <strong>{post.likedBy}</strong> and <strong>{post.likes?.toLocaleString()} others</strong></span>
                </div>
                <p className="text-sm">
                  <strong>Desiree Gems</strong> {post.caption}
                </p>
                <p className="text-sm text-muted-foreground">{post.hashtags}</p>
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

// Edit Post Modal
const EditPostModal = ({ post, onClose }: { post: Post; onClose: () => void }) => {
  const [selectedPlatform, setSelectedPlatform] = useState(post.platform);
  const platforms = [
    { id: "Instagram", icon: Instagram, selected: true },
    { id: "Facebook", icon: Facebook, selected: false },
    { id: "Twitter", label: "X (TWITTER)", selected: false },
  ];

  const selectedImages = [greenGemRing, gemOnRock, diamondEarrings, silverBracelet, goldNecklace];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto p-8">
        <div className="flex justify-between items-start mb-6">
          <p className="font-mono text-sm tracking-widest">CREATE SOCIAL POST</p>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Left: Edit options */}
          <div className="space-y-6">
            {/* Platform selection */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Share to:</p>
              <div className="space-y-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                      selectedPlatform === platform.id ? "bg-foreground text-background" : "hover:bg-muted"
                    }`}
                  >
                    {platform.icon ? <platform.icon className="w-5 h-5" /> : <span className="font-bold">𝕏</span>}
                    <span className="font-mono text-sm tracking-wider">{platform.label || platform.id.toUpperCase()}</span>
                    {selectedPlatform === platform.id && <span className="ml-auto">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Media */}
            <div className="space-y-2">
              <p className="text-sm">Selected Media:</p>
              <div className="grid grid-cols-3 gap-2">
                {selectedImages.map((src, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <button className="w-full py-3 border rounded-xl text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Add Media
              </button>
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <p className="text-sm">Instructions prompt for caption:</p>
              <textarea
                className="w-full p-3 border rounded-xl text-sm resize-none bg-muted/50"
                rows={3}
                defaultValue={`help me write a caption with the taglines\n${post.hashtags}`}
              />
              <button className="flex items-center gap-2 px-4 py-2.5 bg-foreground text-background rounded-xl text-sm">
                <Sparkles className="w-4 h-4" />
                Generate Caption
              </button>
            </div>

            {/* AI Suggestion */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">AI Caption Suggest:</p>
              <div className="p-4 bg-muted/50 rounded-xl text-sm space-y-2">
                <p>{post.caption}</p>
                <p className="text-muted-foreground">{post.hashtags}</p>
              </div>
            </div>
          </div>

          {/* Right: Post Preview */}
          <div className="space-y-4">
            <p className="font-mono text-sm tracking-widest text-center text-muted-foreground">POST PREVIEW:</p>

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
                <img src={post.image} alt="" className="w-full h-full object-cover" />
                {post.carouselImages && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                    {post.carouselImages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-white" : "bg-white/50"}`}
                      />
                    ))}
                  </div>
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
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-pink-500" />
                  <span>Liked by <strong>craig_love</strong> and <strong>44,686 others</strong></span>
                </div>
                <p className="text-sm">
                  <strong>Desiree Gems</strong> {post.caption}
                </p>
                <p className="text-sm text-muted-foreground">{post.hashtags}</p>
              </div>
            </div>

            <button className="w-full py-3 bg-foreground text-background rounded-xl text-sm font-medium">
              Publish
            </button>
            <button className="w-full py-3 border rounded-xl text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Post
            </button>
            <button className="w-full py-3 border rounded-xl text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              Save as Draft
            </button>
            <button className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Schedule Modal
const ScheduleModal = ({ post, onClose }: { post: Post; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-lg w-full p-8">
        <div className="flex justify-between items-start mb-6">
          <p className="font-mono text-sm tracking-widest">CREATE SOCIAL POST <span className="text-muted-foreground">{">"} SCHEDULE POST</span></p>
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
              <span className="font-mono text-sm tracking-wider">INSTAGRAM</span>
            </div>
          </div>

          {/* Optional prompt */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Optional prompt"
              className="w-full p-3 border rounded-xl text-sm bg-transparent"
            />
            <button className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm hover:bg-muted transition-colors">
              <Sparkles className="w-4 h-4" />
              Get AI Recommendation
            </button>
          </div>

          {/* AI Recommendation */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">AI Recommendation:</p>
            <div className="p-4 bg-muted/50 rounded-xl text-sm space-y-2">
              <p>Based on your audience (working professionals), the best times are:</p>
              <p>📱 Instagram:</p>
              <p>Tuesday: 6PM–8PM</p>
              <p>Wednesday: 12PM–1PM</p>
              <p>Sunday: 7PM–9PM</p>
              <p className="text-amber-600 mt-2">👉 Recommended: Tuesday at 7:15PM</p>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-xl">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">Tuesday, 30 July 2025</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-xl">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">7 : 15 PM</span>
            </div>
          </div>

          {/* Actions */}
          <button className="w-full py-3 bg-foreground text-background rounded-xl text-sm font-medium">
            Schedule Post
          </button>
          <button onClick={onClose} className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};