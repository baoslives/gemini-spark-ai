import { Settings, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", label: "HOME" },
  { id: "studio-mockup", label: "STUDIO" },
  {
    id: "ai-agent",
    label: "AI AGENT",
    children: [{ id: "ai-agent-history", label: "History" }],
  },
  { id: "output-gallery", label: "SOCIAL POST" },
  { id: "assets", label: "ASSET" },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(["ai-agent"]);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-44 bg-sidebar border-r border-sidebar-border flex flex-col h-screen fixed left-0 top-0">
      <nav className="flex-1 px-6 py-8">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              {"children" in item && item.children ? (
                <>
                  <button
                    onClick={() => {
                      onTabChange(item.id);
                      if (!expandedItems.includes(item.id)) toggleExpand(item.id);
                    }}
                    className={cn(
                      "nav-link w-full text-left flex items-center justify-between",
                      activeTab === item.id && "nav-link-active"
                    )}
                  >
                    <span>{item.label}</span>
                    <span
                      onClick={(e) => { e.stopPropagation(); toggleExpand(item.id); }}
                      className="p-0.5"
                    >
                      {expandedItems.includes(item.id) ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>
                  {expandedItems.includes(item.id) && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <button
                            onClick={() => onTabChange(child.id)}
                            className={cn(
                              "nav-link w-full text-left text-xs",
                              activeTab === child.id && "nav-link-active"
                            )}
                          >
                            {child.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "nav-link w-full text-left",
                    activeTab === item.id && "nav-link-active"
                  )}
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-6 py-6 border-t border-sidebar-border">
        <p className="font-mono text-xs tracking-widest text-sidebar-foreground mb-2">
          HI! JOHNSI,
        </p>
        <button className="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-sidebar-primary transition-colors">
          <Settings className="w-4 h-4" />
          <span>Setting</span>
        </button>
      </div>
    </aside>
  );
};
