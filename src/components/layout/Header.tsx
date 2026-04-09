import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/workshops", label: "Workshops" },
  { to: "/propose", label: "Propose Workshop" },
  { to: "/statistics", label: "Statistics" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg" role="banner">
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5" aria-label="FOSSEE Workshop Booking - Home">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold leading-tight text-foreground">FOSSEE</span>
              <span className="text-[11px] leading-tight text-muted-foreground">Workshop Booking</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">
                <User className="h-4 w-4" />
                Register
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav
            id="mobile-nav"
            className="md:hidden border-t border-border bg-card animate-fade-in"
            aria-label="Mobile navigation"
          >
            <div className="container-page py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === link.to
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2 border-t border-border mt-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <Link to="/register" onClick={() => setMobileOpen(false)}>Register</Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
