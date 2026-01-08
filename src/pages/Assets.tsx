import { useState } from "react";
import { Download, Trash2, Search, Crop, MoreHorizontal, ArrowUpRight, ChevronDown } from "lucide-react";
import greenGemRing from "@/assets/green-gem-ring.png";
import goldNecklace from "@/assets/gold-necklace.png";
import diamondEarrings from "@/assets/diamond-earrings.png";
import silverBracelet from "@/assets/silver-bracelet.png";
import gemOnRock from "@/assets/gem-on-rock.png";

interface AssetItem {
  id: string;
  src: string;
  type: "image" | "video";
}

interface AssetCollection {
  id: string;
  name: string;
  description: string;
  icon: string;
  lastUpdate: string;
  assets: AssetItem[];
}

const collections: AssetCollection[] = [
  {
    id: "1",
    name: "EMERALD PENDANT NECKLACE",
    description: "A first-person perspective of a hand wearing the ring held against a soft-focus background of a sunlit...",
    icon: "💎",
    lastUpdate: "Latest update 13:58, 12 Oct 2025",
    assets: [
      { id: "1a", src: greenGemRing, type: "image" },
      { id: "1b", src: gemOnRock, type: "image" },
      { id: "1c", src: diamondEarrings, type: "image" },
      { id: "1d", src: silverBracelet, type: "image" },
    ],
  },
  {
    id: "2",
    name: "GREEN GEM RING COLLECTION",
    description: "A first-person perspective of a hand wearing the ring held against a soft-focus background of a sunlit...",
    icon: "💍",
    lastUpdate: "Latest update 13:58, 12 Oct 2025",
    assets: [
      { id: "2a", src: greenGemRing, type: "image" },
      { id: "2b", src: gemOnRock, type: "image" },
      { id: "2c", src: diamondEarrings, type: "image" },
      { id: "2d", src: goldNecklace, type: "image" },
    ],
  },
];

type FilterType = "recent" | "uploads" | "downloads";

export const Assets = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);

  const filters: { id: FilterType; label: string }[] = [
    { id: "recent", label: "Recent Creations" },
    { id: "uploads", label: "Your Upload" },
    { id: "downloads", label: "Download History" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-light mb-2">Asset Management</h1>
        <p className="text-muted-foreground">
          Organize your generations, uploads, and history.
        </p>
      </div>

      {/* Filters and Search */}
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

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-card border rounded-full text-sm outline-none focus:ring-2 focus:ring-primary w-48"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sortby</span>
            <button className="flex items-center gap-1 px-3 py-2 border rounded-full text-sm hover:bg-muted transition-colors">
              Recent
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Asset Collections */}
      <div className="space-y-8">
        {collections.map((collection) => (
          <div key={collection.id} className="space-y-3">
            {/* Collection Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
                  {collection.icon}
                </div>
                <div>
                  <h3 className="font-mono text-sm tracking-widest">{collection.name}</h3>
                  <p className="text-sm text-muted-foreground max-w-xl truncate">
                    {collection.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full text-sm hover:bg-foreground/90 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                  Open in Studio
                </button>
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Assets Grid */}
            <div className="grid grid-cols-4 gap-3">
              {collection.assets.map((asset, index) => (
                <div
                  key={asset.id}
                  className="relative aspect-[4/5] rounded-xl overflow-hidden group cursor-pointer"
                  onMouseEnter={() => setHoveredAsset(asset.id)}
                  onMouseLeave={() => setHoveredAsset(null)}
                >
                  <img
                    src={asset.src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Hover overlay - only show on first item or hovered */}
                  {(hoveredAsset === asset.id || (index === 0 && hoveredAsset === null)) && index === 0 && (
                    <div className="absolute inset-0 bg-black/30 flex flex-col">
                      {/* Top action buttons */}
                      <div className="flex justify-between p-2">
                        <div className="flex flex-col gap-1">
                          <button className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-colors">
                            <Crop className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Spacer */}
                      <div className="flex-1" />
                      
                      {/* Bottom action buttons */}
                      <div className="p-2 space-y-1">
                        <button className="w-full py-2 bg-white/20 text-white text-sm rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center gap-1">
                          + Create post
                        </button>
                        <button className="w-full py-2 bg-white/20 text-white text-sm rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center gap-1">
                          ⊙ Select
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Timestamp */}
            <p className="text-xs text-muted-foreground">{collection.lastUpdate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};