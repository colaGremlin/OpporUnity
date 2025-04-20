import { Link, useNavigate } from "react-router-dom";
import { Search, User, Bell, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(profileMenuRef, () => setIsProfileMenuOpen(false));

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      navigate('/login');
    } catch (error: any) {
      console.error("Error signing out:", error.message);
    } finally {
      setIsProfileMenuOpen(false);
    }
  };

  return (
    <header className="bg-scholarship-background text-scholarship-foreground border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-scholarship-accent font-bold text-2xl">OpporUnity</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/discover" className="hover:text-scholarship-accent transition-colors">
            Discover
          </Link>
          <Link to="/community" className="hover:text-scholarship-accent transition-colors">
            Community
          </Link>
          <button
            onClick={() => navigate('/dashboard')}
            className="hover:text-scholarship-accent transition-colors"
          >
            My Dashboard
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search scholarships..."
              className="pl-10 bg-white/5 border-white/10 text-white w-60 focus:border-scholarship-accent"
            />
          </div>
          <Button variant="ghost" className="p-2" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              className="p-2"
              aria-label="Profile"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <User className="h-5 w-5" />
            </Button>
            {isProfileMenuOpen && (
              <div ref={profileMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10">
                <Button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  variant="ghost"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-scholarship-background border-t border-white/10 py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link
              to="/discover"
              className="hover:text-scholarship-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Discover
            </Link>
            <Link
              to="/community"
              className="hover:text-scholarship-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              to="/dashboard"
              className="hover:text-scholarship-accent transition-colors py-2"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/dashboard');
              }}
            >
              My Dashboard
            </Link>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search scholarships..."
                className="pl-10 bg-white/5 border-white/10 text-white w-full focus:border-scholarship-accent"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}