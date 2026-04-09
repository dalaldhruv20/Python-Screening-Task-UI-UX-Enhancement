import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MapPin, User, Calendar, MessageSquare } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const workshopData: Record<string, {
  name: string; duration: number; description: string;
  instructor: string; date: string; coordinator: string;
  status: string; institution: string;
}> = {
  "1": {
    name: "Scilab", duration: 2, description: "Comprehensive hands-on workshop on Scilab covering matrix operations, plotting, signal processing, and control systems simulation.",
    instructor: "—", date: "—", coordinator: "—", status: "Pending", institution: "—",
  },
  "2": {
    name: "Python", duration: 3, description: "Workshop covering Python fundamentals, NumPy, SciPy, Matplotlib, and Pandas for scientific computing.",
    instructor: "—", date: "—", coordinator: "—", status: "Pending", institution: "—",
  },
};

const WorkshopDetails = () => {
  const { id } = useParams();
  const ws = workshopData[id || "1"] || workshopData["1"];
  const statusClass = ws.status === "Approved" ? "bg-accent/10 text-accent" : "bg-[hsl(30,90%,55%)]/10 text-[hsl(30,90%,55%)]";

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 max-w-3xl mx-auto py-6">
        <Button variant="ghost" size="sm" className="mb-4 -ml-2" asChild>
          <Link to="/workshops"><ArrowLeft className="h-4 w-4" /> Back</Link>
        </Button>

        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <h1 className="text-lg font-bold text-foreground">{ws.name} Workshop</h1>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusClass}`}>{ws.status}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{ws.description}</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-4">
            <h2 className="text-sm font-semibold text-foreground mb-3">Details</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Calendar, label: "Date", value: ws.date },
                { icon: Clock, label: "Duration", value: `${ws.duration} Day${ws.duration > 1 ? "s" : ""}` },
                { icon: User, label: "Instructor", value: ws.instructor },
                { icon: MapPin, label: "Institution", value: ws.institution },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <item.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">{item.label}</p>
                    <p className="text-xs font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-4">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <MessageSquare className="h-4 w-4 text-primary" /> Comments
            </h2>
            <p className="text-xs text-muted-foreground">No comments yet.</p>
            <form className="mt-3 pt-3 border-t border-border" onSubmit={(e) => e.preventDefault()}>
              <textarea className="input-field min-h-[60px] resize-y text-xs" placeholder="Write a comment..." />
              <div className="flex justify-end mt-2">
                <Button size="sm" className="h-8 text-xs">Post</Button>
              </div>
            </form>
          </div>

          <Button className="w-full rounded-xl" size="lg" asChild>
            <Link to="/propose">Book This Workshop</Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkshopDetails;
