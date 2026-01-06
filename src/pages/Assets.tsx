import { useState } from "react";
import { Image, Video, Download, Trash2, Search, Grid, List, Play } from "lucide-react";
import greenGemRing from "@/assets/green-gem-ring.png";
import goldNecklace from "@/assets/gold-necklace.png";
import diamondEarrings from "@/assets/diamond-earrings.png";
import silverBracelet from "@/assets/silver-bracelet.png";
import gemOnRock from "@/assets/gem-on-rock.png";
import ringVideo from "@/assets/ring-video.mp4";
import ringVideoLaunch from "@/assets/ring-video-launch.mp4";

interface Asset {
  id: string;
  name: string;
  type: "image" | "video";
  src: string;
  createdAt: string;
  size: string;
  usedIn?: string[];
}

const assets: Asset[] = [
  {
    id: "1",
    name: "green-gem-ring.png",
    type: "image",
    src: greenGemRing,
    createdAt: "2026-01-05",
    size: "1.2 MB",
    usedIn: ["Green Gem Ring Launch", "绿宝石戒指 美图"],
  },
  {
    id: "2",
    name: "gold-necklace.png",
    type: "image",
    src: goldNecklace,
    createdAt: "2025-12-20",
    size: "980 KB",
    usedIn: ["Holiday Collection Launch", "情人节系列预告"],
  },
  {
    id: "3",
    name: "diamond-earrings.png",
    type: "image",
    src: diamondEarrings,
    createdAt: "2025-12-22",
    size: "1.1 MB",
    usedIn: ["Diamond Studs Feature", "User Generated Content"],
  },
  {
    id: "4",
    name: "silver-bracelet.png",
    type: "image",
    src: silverBracelet,
    createdAt: "2025-12-28",
    size: "1.3 MB",
    usedIn: ["节日系列首发", "Valentine's Preview"],
  },
  {
    id: "5",
    name: "gem-on-rock.png",
    type: "image",
    src: gemOnRock,
    createdAt: "2026-01-06",
    size: "890 KB",
    usedIn: ["Behind the Ring Story"],
  },
  {
    id: "6",
    name: "ring-video.mp4",
    type: "video",
    src: ringVideo,
    createdAt: "2026-01-05",
    size: "4.2 MB",
    usedIn: ["Green Gem Ring Launch (Studio)"],
  },
  {
    id: "7",
    name: "ring-video-launch.mp4",
    type: "video",
    src: ringVideoLaunch,
    createdAt: "2026-01-06",
    size: "3.8 MB",
    usedIn: ["Green Gem Ring Launch", "绿宝石戒指 美图"],
  },
];

export const Assets = () => {
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const filteredAssets = assets.filter((asset) => {
    const matchesFilter = filter === "all" || asset.type === filter;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const imageCount = assets.filter((a) => a.type === "image").length;
  const videoCount = assets.filter((a) => a.type === "video").length;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Assets</h1>
          <p className="text-muted-foreground">
            Your generated images and videos • {imageCount} images, {videoCount} videos
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-card border hover:bg-muted"
            }`}
          >
            All ({assets.length})
          </button>
          <button
            onClick={() => setFilter("image")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
              filter === "image"
                ? "bg-primary text-primary-foreground"
                : "bg-card border hover:bg-muted"
            }`}
          >
            <Image className="w-4 h-4" />
            Images ({imageCount})
          </button>
          <button
            onClick={() => setFilter("video")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
              filter === "video"
                ? "bg-primary text-primary-foreground"
                : "bg-card border hover:bg-muted"
            }`}
          >
            <Video className="w-4 h-4" />
            Videos ({videoCount})
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-card border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary w-64"
            />
          </div>
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-muted" : "bg-card hover:bg-muted"}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-muted" : "bg-card hover:bg-muted"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Assets Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="bg-card rounded-xl border overflow-hidden hover:border-foreground/20 transition-all cursor-pointer group"
            >
              <div className="aspect-square relative">
                {asset.type === "image" ? (
                  <img
                    src={asset.src}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      src={asset.src}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-5 h-5 text-foreground ml-0.5" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
                    {asset.type === "image" ? "IMG" : "VID"}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="font-medium text-sm truncate">{asset.name}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                  <span>{asset.size}</span>
                  <span>{formatDate(asset.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="bg-card rounded-xl border p-4 flex items-center gap-4 hover:border-foreground/20 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                {asset.type === "image" ? (
                  <img
                    src={asset.src}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video src={asset.src} className="w-full h-full object-cover" muted />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{asset.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {asset.usedIn?.join(", ") || "Not used"}
                </p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p>{asset.size}</p>
                <p>{formatDate(asset.createdAt)}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Asset Preview Modal */}
      {selectedAsset && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="bg-background rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video relative">
              {selectedAsset.type === "image" ? (
                <img
                  src={selectedAsset.src}
                  alt={selectedAsset.name}
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <video
                  src={selectedAsset.src}
                  className="w-full h-full object-contain bg-black"
                  controls
                  autoPlay
                />
              )}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedAsset.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedAsset.size} • {formatDate(selectedAsset.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-card border rounded-lg hover:bg-muted transition-colors text-red-500">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
              {selectedAsset.usedIn && selectedAsset.usedIn.length > 0 && (
                <div>
                  <p className="text-xs font-mono tracking-widest text-muted-foreground mb-2">
                    USED IN
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAsset.usedIn.map((post, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 bg-muted rounded-full"
                      >
                        {post}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};