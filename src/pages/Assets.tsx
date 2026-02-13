import { useState } from "react";
import { Search, MoreHorizontal, ChevronDown } from "lucide-react";
import leatherHandbag from "@/assets/leather-handbag.png";
import silkScarf from "@/assets/silk-scarf.png";
import leatherBelt from "@/assets/leather-belt.png";
import leatherLoafers from "@/assets/leather-loafers.png";
import cashmereCoat from "@/assets/cashmere-coat.png";

interface UploadItem {
  id: string;
  src: string;
  lastUpdate: string;
}

interface DownloadCollection {
  id: string;
  name: string;
  icon: string;
  assets: string[];
  history: { date: string; action: string; link?: string }[];
}

interface RecentCollection {
  id: string;
  name: string;
  description: string;
  icon: string;
  lastUpdate: string;
  assets: string[];
}

const uploadItems: UploadItem[] = [
  { id: "1", src: leatherHandbag, lastUpdate: "Latest update 13:58, 12 Oct 2025" },
  { id: "2", src: silkScarf, lastUpdate: "Latest update 13:58, 12 Oct 2025" },
  { id: "3", src: leatherBelt, lastUpdate: "Latest update 13:58, 12 Oct 2025" },
  { id: "4", src: leatherLoafers, lastUpdate: "Latest update 13:58, 12 Oct 2025" },
];

const downloadCollections: DownloadCollection[] = [
  {
    id: "1",
    name: "LEATHER TOTE CAMPAIGN",
    icon: "👜",
    assets: [leatherHandbag, silkScarf, cashmereCoat, leatherBelt],
    history: [
      { date: "Oct 12, 13:58", action: "File downloaded to device." },
      { date: "Oct 12, 14:05", action: "Shared to Instagram:", link: "View Post" },
    ],
  },
  {
    id: "2",
    name: "AUTUMN ACCESSORIES EDIT",
    icon: "🧣",
    assets: [silkScarf, leatherBelt, leatherLoafers, cashmereCoat, leatherHandbag],
    history: [
      { date: "Oct 12, 13:58", action: "File downloaded to device." },
      { date: "Oct 12, 14:05", action: "Shared to Instagram:", link: "View Post" },
    ],
  },
];

const recentCollections: RecentCollection[] = [
  {
    id: "1",
    name: "LEATHER TOTE CAMPAIGN",
    description: "Editorial shots of the signature leather tote styled against warm autumn backdrops with natural lighting...",
    icon: "👜",
    lastUpdate: "Latest update 13:58, 12 Oct 2025",
    assets: [leatherHandbag, silkScarf, cashmereCoat, leatherBelt],
  },
  {
    id: "2",
    name: "AUTUMN ACCESSORIES EDIT",
    description: "A curated lookbook featuring silk scarves, belts, and loafers in warm earthy tones for the fall season...",
    icon: "🧣",
    lastUpdate: "Latest update 13:58, 12 Oct 2025",
    assets: [silkScarf, leatherBelt, leatherLoafers, cashmereCoat],
  },
];

type FilterType = "recent" | "uploads" | "downloads";

export const Assets = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredUpload, setHoveredUpload] = useState<string | null>(null);

  const filters: { id: FilterType; label: string }[] = [
    { id: "recent", label: "Recent Creations" },
    { id: "uploads", label: "Your Upload" },
    { id: "downloads", label: "Download History" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Asset Management</h1>
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

      {/* Content based on active filter */}
      {activeFilter === "uploads" && (
        <div className="grid grid-cols-4 gap-4">
          {uploadItems.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => setHoveredUpload(item.id)}
              onMouseLeave={() => setHoveredUpload(null)}
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-card border">
                <img
                  src={item.src}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              
              {/* Hover state with button */}
              {hoveredUpload === item.id && (
                <div className="mt-2 space-y-2">
                  <p className="text-xs text-muted-foreground">{item.lastUpdate}</p>
                  <button className="w-full py-2.5 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-1">
                    + Create with Studio
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeFilter === "downloads" && (
        <div className="space-y-8">
          {downloadCollections.map((collection) => (
            <div key={collection.id} className="space-y-3">
              {/* Collection Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
                    {collection.icon}
                  </div>
                  <h3 className="font-mono text-sm tracking-widest">{collection.name}</h3>
                </div>
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Assets Row */}
              <div className="flex gap-3">
                {collection.assets.map((src, index) => (
                  <div
                    key={index}
                    className="w-32 h-40 rounded-xl overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* History Log */}
              <div className="text-sm text-muted-foreground space-y-0.5">
                {collection.history.map((entry, idx) => (
                  <p key={idx}>
                    {entry.date} – {entry.action}
                    {entry.link && (
                      <a href="#" className="text-primary hover:underline ml-1">
                        {entry.link}
                      </a>
                    )}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeFilter === "recent" && (
        <div className="space-y-8">
          {recentCollections.map((collection) => (
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
                    ↗ Open in Studio
                  </button>
                  <button className="p-2 hover:bg-muted rounded-full transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Assets Grid */}
              <div className="grid grid-cols-4 gap-3">
                {collection.assets.map((src, index) => (
                  <div
                    key={index}
                    className="relative aspect-[4/5] rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Timestamp */}
              <p className="text-xs text-muted-foreground">{collection.lastUpdate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};