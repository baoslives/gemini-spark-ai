import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", label: "HOME" },
  { id: "studio-mockup", label: "STUDIO" },
  { id: "studio", label: "ANALYTICS" },
  { id: "output-gallery", label: "SOCIAL DASHBOARD" },
  { id: "assets", label: "ASSETS" },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <aside className="w-44 bg-sidebar border-r border-sidebar-border flex flex-col h-screen fixed left-0 top-0">
      <nav className="flex-1 px-6 py-8">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "nav-link w-full text-left",
                  activeTab === item.id && "nav-link-active"
                )}
              >
                {item.label}
              </button>
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
