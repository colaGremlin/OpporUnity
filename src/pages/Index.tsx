
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, BookOpen, Users, Zap, Target } from "lucide-react";
import { Input } from "@/components/ui/input";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Example featured scholarships data
  const featuredScholarships = [
    {
      id: 1,
      title: "Future Leaders Scholarship",
      provider: "Global Education Foundation",
      amount: "$10,000",
      deadline: "2025-08-15",
      category: "Leadership",
      eligibility: ["Undergraduate", "3.5+ GPA", "Community Service"],
      matchPercentage: 95,
    },
    {
      id: 2,
      title: "STEM Innovation Grant",
      provider: "TechForward Initiative",
      amount: "$5,000",
      deadline: "2025-07-01",
      category: "STEM",
      eligibility: ["Graduate", "Research", "Engineering"],
      matchPercentage: 88,
    },
    {
      id: 3,
      title: "Rural Education Access Program",
      provider: "Community Foundation",
      amount: "$7,500",
      deadline: "2025-06-30",
      category: "Need-Based",
      eligibility: ["Rural Communities", "First Generation", "Any Major"],
      matchPercentage: 92,
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/discover?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-scholarship-background text-scholarship-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1587&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Your Path to Educational 
              <span className="text-scholarship-accent"> Opportunity</span>
            </h1>
            <p className="text-xl mb-8 text-scholarship-foreground/80">
              Connecting underserved students and non-traditional learners with scholarships 
              tailored to their unique journey.
            </p>
            
            <form onSubmit={handleSearch} className="relative max-w-xl mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search scholarships by name, provider, or keyword..."
                className="pl-12 pr-32 py-6 bg-white/5 border-white/10 rounded-full text-scholarship-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90 rounded-full"
              >
                Search
              </Button>
            </form>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90"
              >
                <Link to="/discover">
                  Browse Scholarships <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                asChild
                className="border-white/20 hover:bg-white/5"
              >
                <Link to="/profile/create">Create Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="py-16 bg-scholarship-background/80">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            <span className="text-scholarship-accent">How</span> ScholarMatch Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg text-center hover:transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-scholarship-accent/20">
                <Target className="h-8 w-8 text-scholarship-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Matching</h3>
              <p className="text-scholarship-foreground/70">
                Our algorithm connects you with scholarships that match your unique profile and eligibility criteria.
              </p>
            </div>
            
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg text-center hover:transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-scholarship-accent/20">
                <BookOpen className="h-8 w-8 text-scholarship-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Extensive Database</h3>
              <p className="text-scholarship-foreground/70">
                Access thousands of scholarships from universities, organizations, and government programs.
              </p>
            </div>
            
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg text-center hover:transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-scholarship-accent/20">
                <Zap className="h-8 w-8 text-scholarship-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Application Tracking</h3>
              <p className="text-scholarship-foreground/70">
                Manage your scholarship applications, deadlines, and required documents all in one place.
              </p>
            </div>
            
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg text-center hover:transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-scholarship-accent/20">
                <Users className="h-8 w-8 text-scholarship-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Support</h3>
              <p className="text-scholarship-foreground/70">
                Connect with peers, share resources, and get advice from successful applicants.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Scholarships */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-scholarship-accent">Featured</span> Opportunities
            </h2>
            <Link 
              to="/discover" 
              className="text-scholarship-accent hover:underline flex items-center"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredScholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship.id}
                title={scholarship.title}
                provider={scholarship.provider}
                amount={scholarship.amount}
                deadline={scholarship.deadline}
                category={scholarship.category}
                eligibility={scholarship.eligibility}
                matchPercentage={scholarship.matchPercentage}
                saved={false}
                onSave={() => {/* Save scholarship functionality */}}
                onViewDetails={() => navigate(`/scholarship/${scholarship.id}`)}
              />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button 
              asChild
              className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90"
            >
              <Link to="/discover">
                Explore All Scholarships <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-scholarship-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to Find Scholarships Tailored to <span className="text-scholarship-accent">You</span>?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-scholarship-foreground/80">
            Create your profile now to get matched with scholarships based on your unique qualifications and interests.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90"
              size="lg"
            >
              <Link to="/profile/create">
                Create Your Profile
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-white/20 hover:bg-white/5"
              size="lg"
            >
              <Link to="/how-it-works">
                Learn How It Works
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
