import { useState } from "react";
import { Calendar, Download, Info } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Legend,
} from "recharts";

const timeRanges = ["7D", "2W", "4W", "3M", "1Y"];

const mainChartData = [
  { date: "Dec 26", impressions: 120, follows: 2 },
  { date: "Dec 28", impressions: 380, follows: 5 },
  { date: "Dec 30", impressions: 450, follows: 8 },
  { date: "Jan 1", impressions: 200, follows: 3 },
  { date: "Jan 2", impressions: 150, follows: 4 },
  { date: "Jan 3", impressions: 100, follows: 2 },
  { date: "Jan 4", impressions: 2800, follows: 45 },
  { date: "Jan 5", impressions: 5200, follows: 95 },
  { date: "Jan 6", impressions: 4500, follows: 65 },
  { date: "Jan 7", impressions: 5000, follows: 50 },
  { date: "Jan 8", impressions: 1200, follows: 25 },
];

const followsData = [
  { date: "Dec 26", follows: 5, unfollows: -2 },
  { date: "Dec 29", follows: 8, unfollows: -3 },
  { date: "Jan 1", follows: 12, unfollows: -5 },
  { date: "Jan 4", follows: 86, unfollows: -8 },
  { date: "Jan 7", follows: 25, unfollows: -4 },
];

const postsData = [
  { date: "Dec 26", posts: 0, replies: 0 },
  { date: "Dec 29", posts: 0.7, replies: 0 },
  { date: "Jan 1", posts: 2.1, replies: 0 },
  { date: "Jan 4", posts: 1.4, replies: 0.7 },
  { date: "Jan 7", posts: 0.7, replies: 1.4 },
];

const stats = [
  { label: "Verified followers", value: "1.6K", subValue: "/ 33.1K", verified: true },
  { label: "Impressions", value: "16.9K", change: "+282%", positive: true },
  { label: "Engagement rate", value: "13.6%", change: "+21%", positive: true },
  { label: "Engagements", value: "2.3K", change: "+363%", positive: true },
  { label: "Profile visits", value: "157", change: "+190%", positive: true },
];

const stats2 = [
  { label: "Replies", value: "320", change: "+4K%", positive: true },
  { label: "Likes", value: "589", change: "+483%", positive: true },
  { label: "Reposts", value: "391", change: "+768%", positive: true },
  { label: "Bookmarks", value: "27", change: "+1K%", positive: true },
  { label: "Shares", value: "37", change: "+1K%", positive: true },
];

export const AnalyticsDashboard = () => {
  const [activeRange, setActiveRange] = useState("2W");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Account overview</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 border rounded-lg hover:bg-muted transition-colors">
            <Calendar className="w-4 h-4" />
          </button>
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                activeRange === range
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-muted"
              }`}
            >
              {range}
            </button>
          ))}
          <button className="p-2 border rounded-lg hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="analytics-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded" />
              <span className="text-sm">Impressions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-emerald-500 rounded" />
              <span className="text-sm">New follows</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm bg-secondary rounded-lg">Daily</button>
            <button className="px-3 py-1.5 text-sm bg-secondary rounded-lg flex items-center gap-1">
              <span>Bar</span>
            </button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={mainChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => value >= 1000 ? `${value / 1000}K` : value}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Bar yAxisId="left" dataKey="impressions" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              <Bar yAxisId="right" dataKey="follows" fill="#10b981" radius={[2, 2, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-2 gap-4">
        {/* Follows over time */}
        <div className="analytics-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Follows over time</span>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={followsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar dataKey="follows" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="unfollows" fill="#ef4444" radius={[0, 0, 2, 2]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Posts & Replies */}
        <div className="analytics-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-3 bg-blue-500 rounded" />
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-3 bg-emerald-500 rounded" />
                <span className="text-sm">Replies</span>
              </div>
            </div>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={postsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar dataKey="posts" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="replies" fill="#10b981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Stats Grid - Row 1 */}
      <div className="grid grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="analytics-card">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              {stat.verified && (
                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              {stat.subValue && (
                <span className="text-sm text-muted-foreground">{stat.subValue}</span>
              )}
              {stat.change && (
                <span className={`text-sm ${stat.positive ? "text-emerald-500" : "text-red-500"}`}>
                  ↑{stat.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stats Grid - Row 2 */}
      <div className="grid grid-cols-5 gap-4">
        {stats2.map((stat) => (
          <div key={stat.label} className="analytics-card">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className={`text-sm ${stat.positive ? "text-emerald-500" : "text-red-500"}`}>
                ↑{stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
