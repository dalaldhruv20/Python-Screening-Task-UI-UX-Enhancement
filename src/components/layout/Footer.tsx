import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card mt-auto" role="contentinfo">
    <div className="container-page py-8 sm:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">FOSSEE</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Free/Libre and Open Source Software for Education. IIT Bombay initiative funded by MoE, Govt. of India.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-3 text-sm">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/workshops" className="text-muted-foreground hover:text-primary transition-colors">Workshops</Link></li>
            <li><Link to="/propose" className="text-muted-foreground hover:text-primary transition-colors">Propose Workshop</Link></li>
            <li><Link to="/statistics" className="text-muted-foreground hover:text-primary transition-colors">Statistics</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-3 text-sm">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">Login</Link></li>
            <li><Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">Register</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-3 text-sm">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://fossee.in" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">FOSSEE Website</a></li>
            <li><a href="https://spoken-tutorial.org" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Spoken Tutorials</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} FOSSEE, IIT Bombay. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Built with React • Open Source
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
