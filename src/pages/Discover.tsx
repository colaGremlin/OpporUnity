
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { FilterSidebar, FilterOptions } from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";

const Discover = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("relevance");
  const [savedScholarships, setSavedScholarships] = useState<number[]>([]);
  
  // Mock data - would come from API in a real app
  const scholarships = [
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
    {
      id: 4,
      title: "Arts & Humanities Fellowship",
      provider: "Creative Minds Foundation",
      amount: "$3,000",
      deadline: "2025-09-15",
      category: "Arts",
      eligibility: ["Undergraduate", "Arts Major", "Portfolio Required"],
      matchPercentage: 78,
    },
    {
      id: 5,
      title: "First Generation Student Scholarship",
      provider: "Pathway to College",
      amount: "$8,000",
      deadline: "2025-07-30",
      category: "Need-Based",
      eligibility: ["First Generation", "3.0+ GPA", "Financial Need"],
      matchPercentage: 90,
    },
    {
      id: 6,
      title: "Community Change Makers Grant",
      provider: "Social Impact Alliance",
      amount: "$6,000",
      deadline: "2025-08-05",
      category: "Social Impact",
      eligibility: ["Any Level", "Community Project", "Leadership"],
      matchPercentage: 85,
    },
    {
      id: 7,
      title: "Women in Technology Scholarship",
      provider: "Tech Diversity Initiative",
      amount: "$12,000",
      deadline: "2025-06-15",
      category: "STEM",
      eligibility: ["Women", "Computer Science", "Undergraduate/Graduate"],
      matchPercentage: 87,
    },
    {
      id: 8,
      title: "Global Citizens Fellowship",
      provider: "International Education Council",
      amount: "$15,000",
      deadline: "2025-10-01",
      category: "International",
      eligibility: ["Study Abroad", "Language Skills", "Any Major"],
      matchPercentage: 76,
    },
    {
      id: 9,
      title: "Environmental Leadership Award",
      provider: "Green Future Foundation",
      amount: "$4,500",
      deadline: "2025-05-30",
      category: "Environment",
      eligibility: ["Environmental Studies", "Research", "Activism"],
      matchPercentage: 82,
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call with the search query
    console.log("Searching for:", searchQuery);
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    console.log("Applied filters:", filters);
    // In a real app, this would trigger an API call with the filters
  };

  const toggleSaveScholarship = (id: number) => {
    setSavedScholarships(prev => 
      prev.includes(id) 
        ? prev.filter(scholarshipId => scholarshipId !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-scholarship-background text-scholarship-foreground">
      <Header />
      
      <main className="flex-grow">
        {/* Search Bar */}
        <div className="bg-scholarship-background/90 border-b border-white/10 sticky top-[73px] z-30 py-4">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search scholarships..."
                  className="pl-10 bg-white/5 border-white/10 text-scholarship-foreground w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-white/10 hover:bg-white/5 md:hidden"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <Select
                  value={sortOption}
                  onValueChange={setSortOption}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 w-[180px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Best Match</SelectItem>
                    <SelectItem value="deadline">Deadline (Soonest)</SelectItem>
                    <SelectItem value="amount-high">Amount (Highest)</SelectItem>
                    <SelectItem value="amount-low">Amount (Lowest)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  type="submit" 
                  className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="flex flex-grow">
          {/* Filter Sidebar */}
          <FilterSidebar 
            isOpen={filterOpen} 
            onClose={() => setFilterOpen(false)} 
            onApplyFilters={handleApplyFilters}
          />
          
          {/* Scholarship Results */}
          <div className="flex-grow p-4 md:p-6 md:ml-80">
            <div className="container mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Discover <span className="text-scholarship-accent">Scholarships</span>
                </h1>
                <p className="text-scholarship-foreground/70">
                  {scholarships.length} opportunities found {searchQuery ? `for "${searchQuery}"` : ''}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scholarships.map((scholarship) => (
                  <ScholarshipCard
                    key={scholarship.id}
                    title={scholarship.title}
                    provider={scholarship.provider}
                    amount={scholarship.amount}
                    deadline={scholarship.deadline}
                    category={scholarship.category}
                    eligibility={scholarship.eligibility}
                    matchPercentage={scholarship.matchPercentage}
                    saved={savedScholarships.includes(scholarship.id)}
                    onSave={() => toggleSaveScholarship(scholarship.id)}
                    onViewDetails={() => navigate(`/scholarship/${scholarship.id}`)}
                  />
                ))}
              </div>
              
              {/* Pagination would go here in a real app */}
              <div className="mt-10 flex justify-center">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 mr-2">
                  Previous
                </Button>
                <Button className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Discover;
