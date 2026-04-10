import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, BarChart3, User, MessageSquare, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext";

const coordinatorTabs = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/workshops", icon: BookOpen, label: "Workshops" },
  { to: "/proposed", icon: ClipboardList, label: "Proposed" },
  { to: "/statistics", icon: BarChart3, label: "Stats" },
];

const instructorTabs = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/workshops", icon: BookOpen, label: "Workshops" },
  { to: "/proposed", icon: ClipboardList, label: "Requests" },
  { to: "/comments", icon: MessageSquare, label: "Comments" },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const { user } = useUser();
  const role = user?.role || "coordinator";

  const tabs = role === "instructor" ? instructorTabs : coordinatorTabs;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60" style={{ background: 'hsl(20 10% 4% / 0.92)', backdropFilter: 'blur(20px) saturate(1.8)' }}>
        <div className="flex h-14 items-center justify-between px-4 sm:px-6 max-w-3xl mx-auto w-full">
          <div className="flex items-center">
            <img src="/fossee-logo-full.png" alt="FOSSEE" className="h-7 w-auto object-contain" loading="eager" fetchPriority="high" decoding="async" />
          </div>
          <Link
            to="/profile"
            className="h-9 w-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, hsl(25 90% 55% / 0.2), hsl(35 80% 50% / 0.1))',
              border: '1px solid hsl(25 90% 55% / 0.25)',
            }}
            aria-label="Profile"
          >
            <span className="text-xs font-bold text-primary">
              {user?.firstName?.charAt(0) || "U"}
            </span>
          </Link>
        </div>
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 safe-area-bottom"
        style={{ background: 'hsl(20 10% 4% / 0.95)', backdropFilter: 'blur(20px) saturate(1.8)' }}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-around max-w-md mx-auto h-16">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.to;
            return (
              <Link
                key={tab.to}
                to={tab.to}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 min-w-[60px] relative",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <tab.icon className={cn("h-5 w-5 transition-transform duration-200", isActive && "scale-110")} />
                <span className={cn("text-[10px] font-medium", isActive && "font-semibold")}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute -top-0.5 h-0.5 w-8 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default DashboardLayout;
