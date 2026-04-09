import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, BookOpen, ArrowRight, CheckCircle, TrendingUp, Clock, Star, Sparkles } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";

const AnimatedSection = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700 ease-out", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const CoordinatorHome = () => {
  const features = [
    { icon: Calendar, title: "Easy Scheduling", description: "Browse dates or propose your own schedule." },
    { icon: Users, title: "Expert Instructors", description: "Learn from FOSSEE IIT Bombay instructors." },
    { icon: CheckCircle, title: "Quick Approval", description: "Submit and track requests in real-time." },
    { icon: BookOpen, title: "Multiple FOSSEE Tools", description: "Scilab, Python, OpenFOAM, DWSIM & more." },
  ];

  const workshopTypes = [
    { name: "Scilab", description: "Numerical computing for engineering", color: "from-orange-500/20 to-amber-500/5" },
    { name: "Python", description: "Scientific computing & data analysis", color: "from-blue-500/20 to-cyan-500/5" },
    { name: "OpenFOAM", description: "Computational Fluid Dynamics", color: "from-emerald-500/20 to-green-500/5" },
    { name: "DWSIM", description: "Chemical process simulation", color: "from-purple-500/20 to-violet-500/5" },
  ];

  return (
    <div className="px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Hero Section */}
      <section className="py-8 sm:py-10">
        <AnimatedSection>
          <div className="rounded-2xl p-6 sm:p-8 relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, hsl(20 8% 7%) 0%, hsl(20 10% 5%) 100%)',
            border: '1px solid hsl(25 6% 14%)',
          }}>
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none" style={{ background: 'hsl(25 90% 55% / 0.12)' }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none" style={{ background: 'hsl(35 80% 50% / 0.06)' }} />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium mb-4" style={{
                background: 'hsl(25 90% 55% / 0.1)',
                color: 'hsl(25 90% 60%)',
                border: '1px solid hsl(25 90% 55% / 0.15)',
              }}>
                <Sparkles className="h-3 w-3" /> Free Workshops by IIT Bombay
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight mb-3 font-heading text-foreground">
                Book FOSSEE Workshops for Your Institution
              </h1>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-md">
                FOSSEE (IIT Bombay) offers free workshops on open-source scientific tools for students and faculty.
              </p>
              <div className="flex gap-3">
                <Button size="default" className="rounded-xl shadow-lg text-sm font-semibold" style={{
                  background: 'linear-gradient(135deg, hsl(25 90% 55%), hsl(30 85% 50%))',
                  boxShadow: '0 4px 20px -4px hsl(25 90% 55% / 0.35)',
                }} asChild>
                  <Link to="/workshops">Browse Workshops <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="default" className="border-border text-foreground hover:bg-secondary rounded-xl" asChild>
                  <Link to="/propose">Propose</Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* How It Works */}
      <section className="pb-8">
        <AnimatedSection>
          <h2 className="text-lg font-semibold text-foreground mb-4 font-heading">How It Works</h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 gap-3">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 80}>
              <div className="card-elevated group cursor-default">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center mb-3 transition-all duration-300" style={{
                  background: 'hsl(25 90% 55% / 0.1)',
                  color: 'hsl(25 90% 60%)',
                }}>
                  <f.icon className="h-4 w-4 transition-transform group-hover:scale-110 duration-300" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Workshop Types */}
      <section className="pb-8">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground font-heading">Workshop Types</h2>
            <Link to="/workshops" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </AnimatedSection>
        <div className="space-y-2.5">
          {workshopTypes.map((ws, i) => (
            <AnimatedSection key={ws.name} delay={i * 80}>
              <Link to="/workshops" className="flex items-center gap-4 card-elevated active:scale-[0.99]">
                <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br", ws.color)}>
                  <BookOpen className="h-5 w-5 text-foreground/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">{ws.name}</h3>
                  <p className="text-xs text-muted-foreground">{ws.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
};

const InstructorHome = () => {
  const stats = [
    { icon: BookOpen, label: "Total Workshops", value: "0", accent: "from-orange-500/15 to-amber-500/5" },
    { icon: Users, label: "Total Attendees", value: "0", accent: "from-blue-500/15 to-cyan-500/5" },
    { icon: Clock, label: "Upcoming", value: "0", accent: "from-emerald-500/15 to-green-500/5" },
    { icon: TrendingUp, label: "This Month", value: "0", accent: "from-purple-500/15 to-violet-500/5" },
  ];

  return (
    <div className="px-4 sm:px-6 max-w-3xl mx-auto">
      <section className="py-8">
        <AnimatedSection>
          <h1 className="text-xl font-bold text-foreground mb-1 font-heading">Your Dashboard</h1>
          <p className="text-sm text-muted-foreground mb-6">Manage workshops and track performance</p>
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 80}>
              <div className="stat-card">
                <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br", s.accent)}>
                  <s.icon className="h-4 w-4 text-foreground/80" />
                </div>
                <p className="text-2xl font-bold text-foreground tracking-tight">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200}>
          <div className="card-elevated mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground font-heading">Upcoming Workshops</h2>
              <Link to="/workshops" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            <div className="text-center py-8">
              <div className="h-12 w-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{
                background: 'hsl(25 6% 12%)',
              }}>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">No upcoming workshops</p>
              <p className="text-xs text-muted-foreground/60 mb-4">Create one to get started</p>
              <Button size="sm" className="rounded-xl text-sm font-medium" style={{
                background: 'linear-gradient(135deg, hsl(25 90% 55%), hsl(30 85% 50%))',
              }} asChild>
                <Link to="/create-workshop">Create Workshop</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="card-elevated">
            <h2 className="text-sm font-semibold text-foreground mb-3 font-heading">Recent Activity</h2>
            <div className="text-center py-6">
              <div className="h-12 w-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{
                background: 'hsl(25 6% 12%)',
              }}>
                <Star className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">No activity yet</p>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

const Index = () => {
  const { user } = useUser();
  return (
    <DashboardLayout>
      {user?.role === "instructor" ? <InstructorHome /> : <CoordinatorHome />}
    </DashboardLayout>
  );
};

export default Index;
