import { cn } from "@/lib/utils";
import { FileText, Palette, Film, CheckCircle2, TrendingUp, AlertTriangle, Play, Trash2 } from "lucide-react";
import trenchCoat from "@/assets/trench-coat-1.png";
import ringVideo from "@/assets/ring-video.mp4";

interface ChatMessageProps {
  role: "user" | "ai" | "system";
  content: string;
  type?: "text" | "file-upload" | "generating" | "content-preview" | "schedule-confirm" | "analytics" | "weekly-analytics" | "comment-insight" | "suggestions" | "system-prompt";
  metadata?: {
    fileName?: string;
    platforms?: string[];
    schedules?: { platform: string; time: string }[];
    analytics?: {
      platform: string;
      engagementRate: string;
      likes?: number;
      comments?: number;
      saves?: number;
      topComment?: string;
      sentiment?: string;
      brandSentiment?: string;
    }[];
    weeklyData?: {
      platform: string;
      posts: number;
      topPost: string;
      engagementRate: string;
      comments?: number;
      saves?: number;
      shares?: number;
      brandAffinity?: string;
    }[];
    negativeComments?: string[];
  };
}

export const ChatMessage = ({ role, content, type = "text", metadata }: ChatMessageProps) => {
  const renderContent = () => {
    switch (type) {
      case "system-prompt":
        return (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
            {metadata?.fileName && (
              <div className="flex items-center gap-3 p-3 bg-zinc-700 rounded-lg">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-400" />
                </div>
                <span className="text-sm font-medium flex-1">{metadata.fileName}</span>
                <button className="p-1 hover:bg-zinc-600 rounded transition-colors">
                  <Trash2 className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
            )}
          </div>
        );

      case "file-upload":
        return (
          <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="font-medium text-sm">{metadata?.fileName}</p>
              <p className="text-xs text-muted-foreground">PDF Document</p>
            </div>
          </div>
        );

      case "generating":
        return (
          <div className="space-y-2">
            <p className="mb-3">{content}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Palette className="w-4 h-4 text-amber-500 animate-pulse-soft" />
                <span>🎨 Generating image: model in beige trench coat, editorial setting</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Film className="w-4 h-4 text-amber-500 animate-pulse-soft" />
                <span>🎞 Creating a 5s lookbook video clip with cinematic styling</span>
              </div>
            </div>
          </div>
        );

      case "content-preview":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-medium">Done! Here's your preview:</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Image Preview</p>
                <img 
                  src={trenchCoat} 
                  alt="Model wearing beige trench coat" 
                  className="rounded-lg w-full aspect-[4/5] object-cover border"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Video Preview</p>
                <video 
                  src={ringVideo}
                  className="rounded-lg w-full aspect-[4/5] object-cover border"
                  controls
                  muted
                  loop
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">📄 Caption (EN):</p>
                <p className="text-sm">
                  Elegant. Timeless. Unapologetically you.<br />
                  The perfect trench — crafted for those who move with quiet confidence.<br />
                  <span className="text-muted-foreground">#QuietLuxury #TrenchCoat #EditorialStyle #MaisonRivière</span>
                </p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">📄 RedNote 中文文案：</p>
                <p className="text-sm">
                  「优雅，永恒，自信。」经典风衣，为从容自信的你而生。<br />
                  <span className="text-muted-foreground">#经典风衣 #轻奢风格 #法式穿搭 #高级时装</span>
                </p>
              </div>
            </div>

            <p className="text-sm font-medium">Would you like to post now or schedule?</p>
          </div>
        );

      case "schedule-confirm":
        return (
          <div className="space-y-4">
            <p>{content}</p>
            <div className="space-y-3">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">📱 Instagram:</p>
                <ul className="text-sm space-y-1">
                  <li>Tuesday: 6PM–8PM</li>
                  <li>Wednesday: 12PM–1PM</li>
                  <li>Sunday: 7PM–9PM</li>
                </ul>
                <p className="text-sm font-medium mt-2 text-emerald">👉 Recommended: Tuesday at 7:15PM</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">📱 RedNote (小红书):</p>
                <ul className="text-sm space-y-1">
                  <li>Weekdays: 12PM–1PM or 8PM–10PM</li>
                </ul>
                <p className="text-sm font-medium mt-2 text-emerald">👉 Recommended: Tuesday at 8:30PM</p>
              </div>
            </div>
            <p className="text-sm font-medium">Would you like me to schedule both posts accordingly?</p>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-4">
            <p className="font-medium">📊 Here's your 24-hour performance summary:</p>
            
            {metadata?.analytics?.map((data, idx) => (
              <div key={idx} className="analytics-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{data.platform}</h4>
                  {data.platform === "RedNote" && (
                    <span className="text-xs bg-emerald-light text-emerald px-2 py-1 rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Performing better
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="metric-value">{data.engagementRate}</p>
                    <p className="metric-label">Engagement</p>
                  </div>
                  {data.saves && (
                    <div>
                      <p className="metric-value">{data.saves}</p>
                      <p className="metric-label">Saves</p>
                    </div>
                  )}
                  {data.likes && (
                    <div>
                      <p className="metric-value">{data.likes}</p>
                      <p className="metric-label">Likes</p>
                    </div>
                  )}
                  <div>
                    <p className="metric-value">{data.comments}</p>
                    <p className="metric-label">Comments</p>
                  </div>
                </div>
                {data.topComment && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-muted-foreground">Top comment:</p>
                    <p className="text-sm italic">"{data.topComment}"</p>
                  </div>
                )}
                {data.sentiment && (
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span>👍 Sentiment: {data.sentiment} Positive</span>
                  </div>
                )}
                {data.brandSentiment && (
                  <div className="flex items-center gap-2 text-sm text-emerald">
                    <TrendingUp className="w-4 h-4" />
                    <span>Brand Sentiment increased by {data.brandSentiment}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "comment-insight":
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">🧠 Comment Insight Engine</span>
            </div>
            <p className="text-sm">Detected 4 negative comments under your latest Instagram post.</p>
            
            <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
              <p className="text-xs text-muted-foreground mb-2">🗨️ Examples:</p>
              <ul className="text-sm space-y-1">
                {metadata?.negativeComments?.map((comment, idx) => (
                  <li key={idx}>"{comment}"</li>
                ))}
              </ul>
            </div>
            
            <p className="text-sm text-muted-foreground">
              📉 Likely triggered by the KOL's recent public remarks + a product complaint.
            </p>
            
            <div className="p-3 bg-emerald-light rounded-lg">
              <p className="text-sm font-medium">✅ Action:</p>
              <p className="text-sm">Recommend posting a short, calm update to clarify and steer sentiment back toward the product.</p>
            </div>
            
            <p className="text-sm font-medium mt-2">Would you like me to draft a community response, or prep a soft-reset campaign post?</p>
          </div>
        );

      case "weekly-analytics":
        return (
          <div className="space-y-4">
            <p className="font-medium">📊 Weekly Social Performance Summary</p>
            
            {metadata?.weeklyData?.map((data, idx) => (
              <div key={idx} className="analytics-card">
                <h4 className="font-medium mb-3">{data.platform}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Posts:</span> {data.posts}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Engagement:</span> {data.engagementRate}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Top Post:</span> {data.topPost}
                  </div>
                  {data.saves && (
                    <div>
                      <span className="text-muted-foreground">Saves:</span> {data.saves}
                    </div>
                  )}
                  {data.shares && (
                    <div>
                      <span className="text-muted-foreground">Shares:</span> {data.shares}
                    </div>
                  )}
                  {data.comments && (
                    <div>
                      <span className="text-muted-foreground">Comments:</span> {data.comments}
                    </div>
                  )}
                </div>
                {data.brandAffinity && (
                  <div className="mt-3 pt-3 border-t flex items-center gap-2 text-emerald text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Brand Affinity {data.brandAffinity}</span>
                  </div>
                )}
              </div>
            ))}

            <div className="analytics-card">
              <h4 className="font-medium mb-2">📈 Engagement Trend</h4>
              <div className="h-16 flex items-end gap-1">
                {[40, 65, 80, 70, 45, 55, 60].map((height, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-primary/20 rounded-t transition-all hover:bg-primary/40"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            <div className="p-3 bg-secondary rounded-lg">
              <p className="text-sm font-medium mb-1">Sentiment Summary:</p>
              <p className="text-sm text-muted-foreground">
                <span className="text-emerald">Positive themes:</span> elegance, colour tone, styling ideas<br />
                <span className="text-destructive">Negative mentions:</span> KOL comments, 1 product quality remark
              </p>
            </div>
          </div>
        );

      case "suggestions":
        return (
          <div className="space-y-4">
            <p className="font-medium">🧠 Based on this week's insights and trending content:</p>
            <p className="font-medium">📅 Next Week Post Suggestions</p>
            
            <div className="space-y-3">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="font-medium text-sm">1. "Behind the Atelier" Story (Tue or Wed)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Showcase craftsmanship, fabric sourcing, and tailoring process. Softly reminds users of your heritage & quality.
                </p>
                <p className="text-xs text-emerald mt-2">🎯 Builds trust → good timing after recent KOL noise.</p>
              </div>
              
              <div className="p-3 bg-secondary rounded-lg">
                <p className="font-medium text-sm">2. User-Generated Content Push (Fri)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Curate reposts from actual customers styling your outerwear. Add "tag us to be featured" CTA.
                </p>
                <p className="text-xs text-emerald mt-2">🎯 Increases authenticity + engagement</p>
              </div>
              
              <div className="p-3 bg-secondary rounded-lg">
                <p className="font-medium text-sm">3. RedNote Mini-Campaign (Weekend)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Topic: "How to Style a Trench Coat for Work"<br />
                  Add carousel + captions in simplified Chinese
                </p>
                <p className="text-xs text-gold-light bg-amber-500/20 inline-block px-2 py-0.5 rounded mt-2">
                  💡 Trending right now among office fashion bloggers
                </p>
              </div>
            </div>
            
            <p className="text-sm font-medium">Would you like me to auto-generate visuals and copy for the Tuesday story post?</p>
          </div>
        );

      default:
        return <p className="whitespace-pre-wrap">{content}</p>;
    }
  };

  // System prompt styling (dark card, right-aligned)
  if (role === "system") {
    return (
      <div className="flex justify-end animate-slide-up">
        <div className="max-w-xl bg-zinc-800 text-zinc-100 rounded-2xl p-5">
          {renderContent()}
        </div>
      </div>
    );
  }

  // AI message with play button icon
  if (role === "ai") {
    return (
      <div className="flex gap-3 animate-slide-up justify-start">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center">
          <Play className="w-4 h-4 text-white fill-white" />
        </div>
        <div className="max-w-2xl bg-muted/50 rounded-2xl px-4 py-3">
          {renderContent()}
        </div>
      </div>
    );
  }

  // User message (simple, no avatar)
  return (
    <div className="flex gap-3 animate-slide-up justify-end">
      <div className="max-w-2xl chat-bubble-user">
        {renderContent()}
      </div>
    </div>
  );
};