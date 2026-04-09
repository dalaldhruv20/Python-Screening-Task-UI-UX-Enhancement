import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, LogOut, ChevronRight } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useUser } from "@/contexts/UserContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser, logout } = useUser();
  const [name, setName] = useState(user ? `${user.firstName} ${user.lastName}` : "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 max-w-lg mx-auto py-6 space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <div className="h-24 w-24 rounded-full flex items-center justify-center text-2xl font-bold" style={{
              background: 'linear-gradient(135deg, hsl(25 90% 55% / 0.2), hsl(35 80% 50% / 0.1))',
              border: '2px solid hsl(25 90% 55% / 0.25)',
              color: 'hsl(25 90% 60%)',
            }}>
              {user?.firstName?.charAt(0) || "U"}
            </div>
            <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full flex items-center justify-center shadow-md transition-colors" style={{
              background: 'linear-gradient(135deg, hsl(25 90% 55%), hsl(30 85% 50%))',
              color: 'white',
            }} aria-label="Change profile photo">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <h2 className="text-lg font-semibold text-foreground font-heading">{name || "User"}</h2>
          <p className="text-sm text-muted-foreground capitalize">{user?.role || "coordinator"}</p>
        </div>

        <div className="space-y-4">
          <div className="card-elevated space-y-4">
            <h3 className="text-sm font-semibold text-foreground font-heading">Personal Information</h3>
            <div>
              <label htmlFor="profile-name" className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name</label>
              <input id="profile-name" type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="profile-phone" className="block text-xs font-medium text-muted-foreground mb-1.5">Phone Number</label>
              <input id="profile-phone" type="tel" className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9876543210" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Role</label>
              <div className="input-field bg-muted/50 cursor-not-allowed capitalize">{user?.role || "coordinator"}</div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Institution</label>
              <div className="input-field bg-muted/50 cursor-not-allowed">{user?.institution || "—"}</div>
            </div>
            <Button className="w-full rounded-xl font-medium" size="default" style={{
              background: 'linear-gradient(135deg, hsl(25 90% 55%), hsl(30 85% 50%))',
            }}>Save Changes</Button>
          </div>

          <div className="card-elevated !p-0 divide-y divide-border overflow-hidden">
            {[
              { label: "My Workshops", path: "/workshops" },
              ...(user?.role === "coordinator" ? [{ label: "Propose Workshop", path: "/propose" }] : [{ label: "Create Workshop", path: "/create-workshop" }]),
              { label: user?.role === "instructor" ? "Workshop Requests" : "Proposed Workshops", path: "/proposed" },
            ].map((item) => (
              <button key={item.label} onClick={() => navigate(item.path)}
                className="flex items-center justify-between w-full px-5 py-3.5 text-sm text-foreground hover:bg-muted/50 transition-colors">
                {item.label}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>

          <Button variant="outline" className="w-full rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
