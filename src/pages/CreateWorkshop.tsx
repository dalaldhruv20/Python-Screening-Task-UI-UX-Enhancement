import { Button } from "@/components/ui/button";
import { Calendar, Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

const CreateWorkshop = () => {
  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 max-w-lg mx-auto py-6">
        <Button variant="ghost" size="sm" className="mb-4 -ml-2" asChild>
          <Link to="/home"><ArrowLeft className="h-4 w-4" /> Back</Link>
        </Button>

        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
            <Calendar className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Create a Workshop</h1>
          <p className="text-sm text-muted-foreground mt-1">Set up a new workshop for coordinators to book</p>
        </div>

        <form className="bg-card rounded-xl border border-border p-4 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="ws-type" className="block text-xs font-medium text-foreground mb-1.5">Workshop Type</label>
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
              <label htmlFor="ws-date" className="block text-xs font-medium text-foreground mb-1.5">Date</label>
              <input id="ws-date" type="date" className="input-field" required />
            </div>
            <div>
              <label htmlFor="ws-duration" className="block text-xs font-medium text-foreground mb-1.5">Duration (days)</label>
              <input id="ws-duration" type="number" className="input-field" placeholder="e.g. 2" min={1} required />
            </div>
          </div>

          <div>
            <label htmlFor="ws-desc" className="block text-xs font-medium text-foreground mb-1.5">Description</label>
            <textarea id="ws-desc" className="input-field min-h-[80px] resize-y" placeholder="Workshop details, topics covered, etc." />
          </div>

          <div>
            <label htmlFor="ws-terms" className="block text-xs font-medium text-foreground mb-1.5">Terms & Conditions</label>
            <textarea id="ws-terms" className="input-field min-h-[60px] resize-y" placeholder="Requirements, prerequisites, etc." />
          </div>

          <Button type="submit" className="w-full rounded-xl" size="lg">
            <Send className="h-4 w-4" /> Create Workshop
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateWorkshop;
