import { Sparkles, Image, Video, FileText, Clock } from "lucide-react";
import greenGemRing from "@/assets/green-gem-ring.png";

const recentItems = [
  {
    id: "1",
    title: "Green Gem Ring Campaign",
    type: "image",
    platform: "Instagram",
    status: "Scheduled",
    date: "Tue, 7:15 PM",
    thumbnail: greenGemRing,
  },
  {
    id: "2",
    title: "绿宝石戒指 美图",
    type: "image",
    platform: "RedNote",
    status: "Scheduled",
    date: "Tue, 8:30 PM",
    thumbnail: greenGemRing,
  },
  {
    id: "3",
    title: "Ring Showcase Video",
    type: "video",
    platform: "Instagram",
    status: "Draft",
    date: "Wed, 12:00 PM",
    thumbnail: greenGemRing,
  },
  {
    id: "4",
    title: "Behind the Ring Story",
    type: "image",
    platform: "Instagram",
    status: "Suggested",
    date: "Next Week",
    thumbnail: greenGemRing,
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "image":
      return <Image className="w-4 h-4" />;
    case "video":
      return <Video className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Scheduled":
      return "bg-emerald-light text-emerald";
    case "Draft":
      return "bg-muted text-muted-foreground";
    case "Suggested":
      return "bg-accent text-accent-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const Home = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Welcome back, Johnsi</h1>
        <p className="text-muted-foreground">Here's an overview of your recent creations and scheduled posts.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-xl border p-4">
          <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">SCHEDULED</p>
          <p className="text-2xl font-semibold">4</p>
        </div>
        <div className="bg-card rounded-xl border p-4">
          <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">DRAFTS</p>
          <p className="text-2xl font-semibold">2</p>
        </div>
        <div className="bg-card rounded-xl border p-4">
          <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">POSTED THIS WEEK</p>
          <p className="text-2xl font-semibold">5</p>
        </div>
        <div className="bg-card rounded-xl border p-4">
          <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">AVG ENGAGEMENT</p>
          <p className="text-2xl font-semibold">4.8%</p>
        </div>
      </div>

      {/* Recent Creations */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Creations</h2>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {recentItems.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-xl border overflow-hidden hover:border-foreground/20 transition-colors cursor-pointer"
            >
              <div className="aspect-square relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <p className="font-medium text-sm truncate mb-1">{item.title}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    {getTypeIcon(item.type)}
                    <span>{item.platform}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <Sparkles className="w-4 h-4" />
            Create New Post
          </button>
          <button className="flex items-center gap-2 bg-card border px-4 py-2 rounded-lg hover:bg-muted transition-colors">
            <Image className="w-4 h-4" />
            Generate Image
          </button>
          <button className="flex items-center gap-2 bg-card border px-4 py-2 rounded-lg hover:bg-muted transition-colors">
            <Video className="w-4 h-4" />
            Create Video
          </button>
        </div>
      </div>
    </div>
  );
};
