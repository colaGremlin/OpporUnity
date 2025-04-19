
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-scholarship-background text-scholarship-foreground/80 border-t border-white/10 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-scholarship-accent font-semibold text-lg mb-4">ScholarMatch</h3>
            <p className="text-sm">
              Connecting underserved students with educational opportunities around the world.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-scholarship-accent transition-colors">Home</Link></li>
              <li><Link to="/discover" className="hover:text-scholarship-accent transition-colors">Discover</Link></li>
              <li><Link to="/community" className="hover:text-scholarship-accent transition-colors">Community</Link></li>
              <li><Link to="/about" className="hover:text-scholarship-accent transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="hover:text-scholarship-accent transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-scholarship-accent transition-colors">FAQ</Link></li>
              <li><Link to="/how-it-works" className="hover:text-scholarship-accent transition-colors">How It Works</Link></li>
              <li><Link to="/success-stories" className="hover:text-scholarship-accent transition-colors">Success Stories</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-scholarship-accent transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-scholarship-accent transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-scholarship-accent transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-scholarship-accent transition-colors">Email Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-sm text-scholarship-foreground/60 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 ScholarMatch. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="hover:text-scholarship-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-scholarship-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
