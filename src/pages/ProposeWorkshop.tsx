import { Button } from "@/components/ui/button";
import { Calendar, Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

const ProposeWorkshop = () => {
  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 max-w-lg mx-auto py-6">
        <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground hover:text-foreground" asChild>
          <Link to="/home">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>

        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary mb-3">
            <Calendar className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-foreground font-heading">Propose a Workshop</h1>
          <p className="text-sm text-muted-foreground mt-1">Submit preferred dates for instructor review</p>
        </div>

        <form className="bg-card rounded-xl border border-border p-4 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="ws-type" className="block text-xs font-medium text-foreground mb-1.5">
              Workshop Type
            </label>
            <select id="ws-type" className="input-field" required>
              <option value="">Select type</option>
              <option value="scilab">Scilab</option>
              <option value="python">Python</option>
              <option value="openfoam">OpenFOAM</option>
              <option value="dwsim">DWSIM</option>
              <option value="r">R</option>
              <option value="osdag">Osdag</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="ws-date" className="block text-xs font-medium text-foreground mb-1.5">
                Preferred Date
              </label>
              <input id="ws-date" type="date" className="input-field" required />
            </div>
            <div>
              <label htmlFor="ws-participants" className="block text-xs font-medium text-foreground mb-1.5">
                Participants
              </label>
              <input id="ws-participants" type="number" className="input-field" placeholder="e.g. 50" min={10} required />
            </div>
          </div>

          <div>
            <label htmlFor="ws-institution" className="block text-xs font-medium text-foreground mb-1.5">
              Institution
            </label>
            <input id="ws-institution" type="text" className="input-field" placeholder="Your college or university" required />
          </div>

          <div>
            <label htmlFor="ws-notes" className="block text-xs font-medium text-foreground mb-1.5">
              Notes
            </label>
            <textarea
              id="ws-notes"
              className="input-field min-h-[80px] resize-y"
              placeholder="Special requirements, lab availability, etc."
            />
          </div>

          <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Your request will be reviewed by an instructor. You'll receive email notification on approval.
          </div>

          <Button type="submit" className="w-full rounded-xl" size="lg">
            <Send className="h-4 w-4" />
            Submit Proposal
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ProposeWorkshop;
