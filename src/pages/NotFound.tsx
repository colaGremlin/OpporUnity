
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-scholarship-background text-scholarship-foreground">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="text-center max-w-lg px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-scholarship-accent">404</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
          <p className="text-scholarship-foreground/70 mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90">
              <Link to="/">Go to Homepage</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/10 hover:bg-white/5">
              <Link to="/discover">Browse Scholarships</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
