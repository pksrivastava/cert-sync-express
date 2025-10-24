import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
      setUser(session?.user ?? null);
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };
  const isActive = (path: string) => location.pathname === path;
  return <nav className="fixed top-0 w-full z-50 glass-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            
            <span className="text-xl font-bold gradient-text hidden sm:inline">iGOT Karmayogi
          </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/marketplace" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/marketplace") ? "text-primary" : "text-foreground"}`}>
              Browse Courses
            </Link>
            <Link to="/partner-register" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/partner-register") ? "text-primary" : "text-foreground"}`}>
              Become a Partner
            </Link>
            <Link to="/admin" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/admin") ? "text-primary" : "text-foreground"}`}>
              Admin
            </Link>
            {user ? <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button> : <Link to="/auth">
                <Button variant="default" size="sm" className="shadow-glow">
                  Sign In
                </Button>
              </Link>}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden py-4 space-y-3 border-t animate-in slide-in-from-top-5">
            <Link to="/marketplace" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
              Browse Courses
            </Link>
            <Link to="/partner-register" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
              Become a Partner
            </Link>
            <Link to="/admin" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
              Admin
            </Link>
            <div className="px-4">
              {user ? <Button variant="outline" size="sm" onClick={handleSignOut} className="w-full gap-2">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button> : <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="default" size="sm" className="w-full shadow-glow">
                    Sign In
                  </Button>
                </Link>}
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;