import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Clock, ArrowRight, BookOpen } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";

const workshopTypes = [
  { id: 1, name: "Scilab", duration: 2, description: "Numerical computing with Scilab for engineering applications.", color: "from-orange-500/20 to-amber-500/5" },
  { id: 2, name: "Python", duration: 3, description: "Scientific computing with Python, NumPy, SciPy and Matplotlib.", color: "from-blue-500/20 to-cyan-500/5" },
  { id: 3, name: "OpenFOAM", duration: 2, description: "Computational Fluid Dynamics using OpenFOAM.", color: "from-emerald-500/20 to-green-500/5" },
  { id: 4, name: "DWSIM", duration: 1, description: "Chemical process simulation using DWSIM open-source software.", color: "from-purple-500/20 to-violet-500/5" },
  { id: 5, name: "R", duration: 2, description: "Statistical computing and data analysis with R.", color: "from-pink-500/20 to-rose-500/5" },
  { id: 6, name: "Osdag", duration: 2, description: "Steel structure design using Osdag open-source tool.", color: "from-teal-500/20 to-cyan-500/5" },
];

const AnimatedCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.05);
  return (
    <div ref={ref} className={cn("transition-all duration-500 ease-out", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}
      style={{ transitionDelay: `${delay}ms` }}>{children}</div>
  );
};

const Workshops = () => {
  const [search, setSearch] = useState("");
  const { user } = useUser();
  const isInstructor = user?.role === "instructor";

  const filtered = workshopTypes.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 max-w-3xl mx-auto py-6">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-foreground font-heading">Workshops</h1>
          {isInstructor && (
            <Button size="sm" className="rounded-xl text-xs font-medium" style={{
              background: 'linear-gradient(135deg, hsl(25 90% 55%), hsl(30 85% 50%))',
            }} asChild>
              <Link to="/create-workshop">+ Create</Link>
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          {isInstructor ? "Manage and create workshops" : "Browse and book FOSSEE workshops"}
        </p>

        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="search" className="input-field pl-10" placeholder="Search workshops..." value={search}
            onChange={(e) => setSearch(e.target.value)} aria-label="Search workshops" />
        </div>

        <p className="text-xs text-muted-foreground mb-3">{filtered.length} workshop{filtered.length !== 1 ? "s" : ""} available</p>

        <div className="space-y-3">
          {filtered.map((ws, i) => (
            <AnimatedCard key={ws.id} delay={i * 60}>
              <article className="card-elevated active:scale-[0.99]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br shrink-0", ws.color)}>
                      <BookOpen className="h-4 w-4 text-foreground/80" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-foreground">{ws.name} Workshop</h2>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />{ws.duration} Day{ws.duration > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{ws.description}</p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-xs h-8 text-primary hover:text-primary hover:bg-primary/10" asChild>
                    <Link to={`/workshops/${ws.id}`}>
                      {isInstructor ? "Manage" : "View Details"} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </article>
            </AnimatedCard>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-muted-foreground">No workshops match your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Workshops;
