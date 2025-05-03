import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserMenu } from "@/components/auth/UserMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Add scroll event listener
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Benefits", href: "#benefits" },
    { label: "Pricing", href: "#pricing" },
    { label: "Dashboard Demo", href: "/dashboard-demo" },
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
  };

  const handleDemoRequest = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <a 
          href="#" 
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="bg-gradient-to-r from-venturly-600 to-accent-purple w-8 h-8 rounded-md flex items-center justify-center text-white font-bold">
            V
          </div>
          <span className="text-xl font-bold text-venturly-900">
            Venturly
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-medium text-slate-700 hover:text-venturly-600 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {user ? (
            <div className="flex items-center gap-4">
              <Button 
                variant="default"
                onClick={() => navigate('/dashboard')}
                className="bg-venturly-600 hover:bg-venturly-700"
              >
                Dashboard
              </Button>
              <UserMenu />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button 
                variant="outline"
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
          <Button 
            className="bg-venturly-600 hover:bg-venturly-700"
            onClick={handleDemoRequest}
          >
            Request Demo
          </Button>
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="py-2 px-4 text-lg font-medium hover:bg-muted rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                ))}
                {user ? (
                  <>
                    <a
                      href="/dashboard"
                      className="py-2 px-4 text-lg font-medium hover:bg-muted rounded-md"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/dashboard');
                      }}
                    >
                      Dashboard
                    </a>
                    <Button 
                      variant="destructive"
                      className="mt-4 w-full"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline"
                      className="mt-4 w-full"
                      onClick={() => navigate('/auth')}
                    >
                      Sign In
                    </Button>
                <Button 
                      className="w-full bg-venturly-600 hover:bg-venturly-700"
                  onClick={handleDemoRequest}
                >
                  Request Demo
                </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
