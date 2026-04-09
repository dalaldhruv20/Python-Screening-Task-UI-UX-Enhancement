import { useState } from "react";
import { ClipboardList, Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";

interface ProposedWorkshop {
  id: number;
  workshopType: string;
  coordinator: string;
  institution: string;
  date: string;
  department: string;
  participants: number;
  status: "pending" | "accepted" | "rejected";
  notes?: string;
}

const sampleProposals: ProposedWorkshop[] = [];

const ProposedWorkshops = () => {
  const { user } = useUser();
  const isInstructor = user?.role === "instructor";
  const [proposals, setProposals] = useState<ProposedWorkshop[]>(sampleProposals);

  const handleAccept = (id: number) => {
    setProposals(prev => prev.map(p => p.id === id ? { ...p, status: "accepted" } : p));
  };

  const handleReject = (id: number) => {
    setProposals(prev => prev.map(p => p.id === id ? { ...p, status: "rejected" } : p));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted": return "badge-status badge-approved";
      case "rejected": return "badge-status badge-rejected";
      default: return "badge-status badge-pending";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted": return <Check className="h-3 w-3" />;
      case "rejected": return <X className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const filtered = isInstructor
    ? proposals.filter(p => p.department.toLowerCase() === (user?.department || "").toLowerCase())
    : proposals;

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 max-w-3xl mx-auto py-6">
        <h1 className="text-xl font-bold text-foreground mb-1 font-heading">
          {isInstructor ? "Workshop Requests" : "My Proposed Workshops"}
        </h1>
        <p className="text-sm text-muted-foreground mb-5">
          {isInstructor
            ? "Review and accept/reject proposed workshops matching your department"
            : "Track the status of your workshop proposals"}
        </p>

        {filtered.length === 0 ? (
          <div className="card-elevated p-8 text-center">
            <div className="h-12 w-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'hsl(25 6% 12%)' }}>
              <ClipboardList className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">No proposals yet</p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              {isInstructor
                ? "Workshop proposals matching your department will appear here"
                : "Your proposed workshops and their status will appear here"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((proposal) => (
              <div key={proposal.id} className="card-elevated">
                <div className="flex items-start justify-between mb-2">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" style={{
                    background: 'hsl(25 90% 55% / 0.1)',
                    color: 'hsl(25 90% 60%)',
                  }}>
                    {proposal.workshopType}
                  </span>
                  <span className={cn(getStatusBadge(proposal.status), "flex items-center gap-1")}>
                    {getStatusIcon(proposal.status)}
                    <span className="capitalize">{proposal.status}</span>
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {proposal.workshopType} Workshop
                </h3>
                <p className="text-xs text-muted-foreground mb-1">
                  {isInstructor ? `By ${proposal.coordinator}` : `At ${proposal.institution}`}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span>{proposal.date}</span>
                  <span>·</span>
                  <span>{proposal.participants} participants</span>
                </div>
                {proposal.notes && (
                  <p className="text-xs text-muted-foreground/80 bg-secondary/50 rounded-lg p-2 mb-3">
                    {proposal.notes}
                  </p>
                )}

                {isInstructor && proposal.status === "pending" && (
                  <div className="flex gap-2 pt-3 border-t border-border">
                    <Button size="sm" className="flex-1 h-8 text-xs rounded-xl font-medium" style={{
                      background: 'hsl(155 55% 42% / 0.15)',
                      color: 'hsl(155 55% 55%)',
                    }}
                      onClick={() => handleAccept(proposal.id)}>
                      <Check className="h-3 w-3 mr-1" /> Accept
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 h-8 text-xs rounded-xl text-destructive border-destructive/20 hover:bg-destructive/10"
                      onClick={() => handleReject(proposal.id)}>
                      <X className="h-3 w-3 mr-1" /> Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProposedWorkshops;
