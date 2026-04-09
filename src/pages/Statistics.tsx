import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BarChart3, PieChart as PieIcon, TrendingUp, Calendar } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const COLORS = [
  "hsl(25, 90%, 55%)", "hsl(200, 70%, 50%)", "hsl(155, 55%, 50%)",
  "hsl(280, 60%, 55%)", "hsl(340, 65%, 50%)", "hsl(45, 80%, 50%)",
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.05);
  return (
    <div
      ref={ref}
      className={cn("transition-all duration-600 ease-out", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}
      style={{ transitionDelay: `${delay}ms` }}
    >{children}</div>
  );
};

const Statistics = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const monthlyData = months.map((m) => ({ month: m.slice(0, 3), workshops: 0 }));
  const typeData: { name: string; value: number }[] = [];

  const statCards = [
    { icon: BarChart3, label: "Total Booked", value: "0", accent: "from-orange-500/15 to-amber-500/5" },
    { icon: TrendingUp, label: "This Month", value: "0", accent: "from-blue-500/15 to-cyan-500/5" },
    { icon: PieIcon, label: "Types", value: "0", accent: "from-emerald-500/15 to-green-500/5" },
  ];

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 max-w-3xl mx-auto py-6">
        <h1 className="text-xl font-bold text-foreground mb-1 font-heading">My Statistics</h1>
        <p className="text-sm text-muted-foreground mb-5">Your workshop booking history</p>

        <div className="mb-5">
          <label className="block text-xs font-medium text-foreground mb-1.5">Filter by Month</label>
          <select
            className="input-field"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {months.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {statCards.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 100}>
              <div className="stat-card text-center">
                <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center mx-auto mb-2 bg-gradient-to-br", s.accent)}>
                  <s.icon className="h-3.5 w-3.5 text-foreground/80" />
                </div>
                <p className="text-lg font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="space-y-4">
          <AnimatedSection delay={200}>
            <div className="card-elevated">
              <h2 className="text-sm font-semibold text-foreground mb-3 font-heading">Monthly Bookings</h2>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(25 6% 14%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(25 5% 45%)" }} />
                    <YAxis tick={{ fontSize: 10, fill: "hsl(25 5% 45%)" }} />
                    <Tooltip contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(25 6% 14%)",
                      fontSize: "12px",
                      backgroundColor: "hsl(20 8% 7%)",
                      color: "hsl(30 10% 92%)",
                      boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.4)",
                    }} />
                    <Bar dataKey="workshops" fill="hsl(25 90% 55%)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="card-elevated">
              <h2 className="text-sm font-semibold text-foreground mb-3 font-heading">By Workshop Type</h2>
              {typeData.length === 0 ? (
                <div className="text-center py-8">
                  <div className="h-12 w-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'hsl(25 6% 12%)' }}>
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">No workshop data yet</p>
                </div>
              ) : (
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={typeData} cx="50%" cy="50%" outerRadius={70} dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                        {typeData.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Statistics;
