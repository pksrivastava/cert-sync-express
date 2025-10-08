import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary shadow-glow transition-transform group-hover:scale-110">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">
              MSP Marketplace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/marketplace"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/marketplace") ? "text-primary" : "text-foreground"
              }`}
            >
              Browse Courses
            </Link>
            <Link
              to="/partner-register"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/partner-register") ? "text-primary" : "text-foreground"
              }`}
            >
              Become a Partner
            </Link>
            <Link
              to="/admin"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/admin") ? "text-primary" : "text-foreground"
              }`}
            >
              Admin
            </Link>
            <Button variant="default" size="sm" className="shadow-glow">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t animate-in slide-in-from-top-5">
            <Link
              to="/marketplace"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Courses
            </Link>
            <Link
              to="/partner-register"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Become a Partner
            </Link>
            <Link
              to="/admin"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
            <div className="px-4">
              <Button variant="default" size="sm" className="w-full shadow-glow">
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
