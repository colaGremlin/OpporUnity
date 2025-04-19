import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { FilterSidebar, FilterOptions } from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Search, SlidersHorizontal, X, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const Discover = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("relevance");
  const [savedScholarships, setSavedScholarships] = useState<number[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    minAmount: 0,
    maxAmount: 50000,
    deadlineBefore: null,
    scholarshipTypes: [],
    eligibility: [],
    educationLevels: [],
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  const scholarships = [
    {
      id: 1,
      title: "HEC Overseas Scholarship",
      provider: "Higher Education Commission Pakistan",
      amount: "Full Funding",
      deadline: "2025-08-15",
      category: "Scholarship",
      eligibility: ["Pakistani Nationals", "MS/PhD", "16 Years Education"],
      matchPercentage: 95,
      type: "Scholarship",
      keywords: ["hec", "overseas", "higher education", "phd", "ms", "masters", "doctoral"]
    },
    {
      id: 2,
      title: "STEM Research Grant",
      provider: "Pakistan Science Foundation",
      amount: "PKR 1,000,000",
      deadline: "2025-07-01",
      category: "Research Grant",
      eligibility: ["STEM Fields", "Research Proposal", "Pakistani University"],
      matchPercentage: 88,
      type: "Grant",
      keywords: ["science", "technology", "engineering", "mathematics", "research", "grant", "stem"]
    },
    {
      id: 3,
      title: "Balochistan Education Endowment Fund",
      provider: "Government of Balochistan",
      amount: "PKR 150,000/year",
      deadline: "2025-06-30",
      category: "Need-Based",
      eligibility: ["Balochistan Residents", "Underprivileged", "Merit"],
      matchPercentage: 92,
      type: "Scholarship",
      keywords: ["balochistan", "need-based", "underprivileged", "province", "government"]
    },
    {
      id: 4,
      title: "Arts & Cultural Fellowship",
      provider: "Pakistan National Council of the Arts",
      amount: "PKR 500,000",
      deadline: "2025-09-15",
      category: "Arts",
      eligibility: ["Pakistani Artists", "Portfolio Required", "Cultural Studies"],
      matchPercentage: 78,
      type: "Fellowship",
      keywords: ["arts", "culture", "fellowship", "artist", "creative"]
    },
    {
      id: 5,
      title: "USAID Merit & Need-Based Scholarship",
      provider: "USAID Pakistan",
      amount: "Full Tuition",
      deadline: "2025-07-30",
      category: "Need-Based",
      eligibility: ["Underprivileged", "3.0+ GPA", "Financial Need"],
      matchPercentage: 90,
      type: "Scholarship",
      keywords: ["usaid", "need-based", "merit", "financial need", "international"]
    },
    {
      id: 6,
      title: "Social Innovation Challenge",
      provider: "Akhuwat Foundation",
      amount: "PKR 750,000",
      deadline: "2025-08-05",
      category: "Social Impact",
      eligibility: ["Social Entrepreneurs", "Community Project", "Sustainable Development"],
      matchPercentage: 85,
      type: "Grant",
      keywords: ["social", "innovation", "impact", "entrepreneur", "challenge", "development"]
    },
    {
      id: 7,
      title: "Women in Technology Scholarship",
      provider: "Pakistan Software Houses Association",
      amount: "PKR 600,000",
      deadline: "2025-06-15",
      category: "STEM",
      eligibility: ["Women", "Computer Science", "IT Fields"],
      matchPercentage: 87,
      type: "Scholarship",
      keywords: ["women", "technology", "IT", "tech", "computer science", "female", "diversity"]
    },
    {
      id: 8,
      title: "Fulbright Pakistan Program",
      provider: "USEFP",
      amount: "Full Funding",
      deadline: "2025-05-11",
      category: "International",
      eligibility: ["Pakistani Citizens", "Masters/PhD", "English Proficiency"],
      matchPercentage: 94,
      type: "Scholarship",
      keywords: ["fulbright", "international", "us", "america", "exchange", "masters", "phd"]
    },
    {
      id: 9,
      title: "Ehsaas Undergraduate Scholarship",
      provider: "Government of Pakistan",
      amount: "Full Tuition",
      deadline: "2025-09-30",
      category: "Need-Based",
      eligibility: ["Low Income", "Undergraduate", "Public University"],
      matchPercentage: 89,
      type: "Scholarship",
      keywords: ["ehsaas", "undergraduate", "need-based", "government", "low income"]
    },
    {
      id: 10,
      title: "Pakistan Agricultural Research Grant",
      provider: "Pakistan Agricultural Research Council",
      amount: "PKR 1,500,000",
      deadline: "2025-10-15",
      category: "Agriculture",
      eligibility: ["Agriculture Research", "Food Security", "Climate Adaptation"],
      matchPercentage: 82,
      type: "Research Grant",
      keywords: ["agriculture", "research", "food", "climate", "farming", "grant"]
    },
    {
      id: 11,
      title: "Minority Education Scholarship",
      provider: "Ministry of Religious Affairs",
      amount: "PKR 120,000/year",
      deadline: "2025-07-22",
      category: "Minority Support",
      eligibility: ["Religious Minorities", "Pakistani Citizens", "Academic Merit"],
      matchPercentage: 88,
      type: "Scholarship",
      keywords: ["minority", "christian", "hindu", "sikh", "religious", "diversity"]
    },
    {
      id: 12,
      title: "Prime Minister's Youth Skills Development Program",
      provider: "Government of Pakistan",
      amount: "Free Training + Stipend",
      deadline: "2025-06-05",
      category: "Vocational",
      eligibility: ["18-35 Age", "Pakistani Nationals", "Unemployed Youth"],
      matchPercentage: 80,
      type: "Training Program",
      keywords: ["youth", "skills", "vocational", "training", "development", "employment"]
    },
    {
      id: 13,
      title: "DAAD Pakistani-German Research Collaboration",
      provider: "DAAD Pakistan",
      amount: "EUR 25,000",
      deadline: "2025-08-30",
      category: "Research",
      eligibility: ["Pakistani Researchers", "German Partnership", "Joint Project"],
      matchPercentage: 75,
      type: "Research Collaboration",
      keywords: ["german", "international", "research", "collaboration", "europe", "partnership"]
    },
    {
      id: 14,
      title: "KPK Tribal Areas Education Support",
      provider: "Government of KPK",
      amount: "PKR 80,000/year",
      deadline: "2025-09-10",
      category: "Regional",
      eligibility: ["KPK Tribal Areas Residents", "Financial Need", "Any Field"],
      matchPercentage: 91,
      type: "Scholarship",
      keywords: ["tribal", "kpk", "khyber pakhtunkhwa", "region", "rural", "support"]
    },
    {
      id: 15,
      title: "Commonwealth PhD Scholarships for Pakistan",
      provider: "Commonwealth Scholarship Commission",
      amount: "Full Funding",
      deadline: "2025-10-20",
      category: "International",
      eligibility: ["Pakistani Nationals", "PhD Studies", "UK Universities"],
      matchPercentage: 86,
      type: "Scholarship",
      keywords: ["commonwealth", "uk", "britain", "phd", "international", "doctoral"]
    }
  ];

  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    } else {
      setFilteredScholarships(scholarships);
    }
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    let filtered = [...scholarships];
    
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(scholarship => {
        return (
          scholarship.title.toLowerCase().includes(query) ||
          scholarship.provider.toLowerCase().includes(query) ||
          scholarship.category.toLowerCase().includes(query) ||
          scholarship.type.toLowerCase().includes(query) ||
          scholarship.keywords.some((keyword: string) => keyword.includes(query)) ||
          scholarship.eligibility.some((item: string) => item.toLowerCase().includes(query))
        );
      });
    }
    
    filtered = filtered.filter(scholarship => {
      if (scholarship.amount.toLowerCase().includes('full')) return true;
      
      const amountStr = scholarship.amount.replace(/[^0-9]/g, '');
      const amount = amountStr ? parseInt(amountStr) : 0;
      return amount >= activeFilters.minAmount && amount <= activeFilters.maxAmount;
    });
    
    if (activeFilters.deadlineBefore) {
      const deadlineDate = new Date(activeFilters.deadlineBefore);
      filtered = filtered.filter(scholarship => {
        const scholarshipDeadline = new Date(scholarship.deadline);
        return scholarshipDeadline <= deadlineDate;
      });
    }
    
    if (activeFilters.scholarshipTypes.length > 0) {
      filtered = filtered.filter(scholarship => 
        activeFilters.scholarshipTypes.includes(scholarship.category) ||
        activeFilters.scholarshipTypes.includes(scholarship.type)
      );
    }
    
    if (activeFilters.eligibility.length > 0) {
      filtered = filtered.filter(scholarship => 
        scholarship.eligibility.some(item => 
          activeFilters.eligibility.some(filter => 
            item.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    }
    
    if (activeFilters.educationLevels.length > 0) {
      filtered = filtered.filter(scholarship => 
        scholarship.eligibility.some(item => 
          activeFilters.educationLevels.some(level => 
            item.toLowerCase().includes(level.toLowerCase())
          )
        )
      );
    }
    
    switch (sortOption) {
      case "deadline":
        filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        break;
      case "amount-high":
        filtered.sort((a, b) => {
          if (a.amount.toLowerCase().includes('full')) return -1;
          if (b.amount.toLowerCase().includes('full')) return 1;
          
          const aAmount = parseInt(a.amount.replace(/[^0-9]/g, '') || '0');
          const bAmount = parseInt(b.amount.replace(/[^0-9]/g, '') || '0');
          return bAmount - aAmount;
        });
        break;
      case "amount-low":
        filtered.sort((a, b) => {
          if (a.amount.toLowerCase().includes('full')) return 1;
          if (b.amount.toLowerCase().includes('full')) return -1;
          
          const aAmount = parseInt(a.amount.replace(/[^0-9]/g, '') || '0');
          const bAmount = parseInt(b.amount.replace(/[^0-9]/g, '') || '0');
          return aAmount - bAmount;
        });
        break;
      default: // relevance - sort by match percentage
        filtered.sort((a, b) => b.matchPercentage - a.matchPercentage);
    }
    
    setFilteredScholarships(filtered);
    
    toast.success(`Found ${filtered.length} scholarships`);
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
    toast.info("Filters applied");
    
    setTimeout(() => handleSearch(), 100);
  };

  const toggleSaveScholarship = (id: number) => {
    setSavedScholarships(prev => {
      const newSaved = prev.includes(id) 
        ? prev.filter(scholarshipId => scholarshipId !== id) 
        : [...prev, id];
      
      if (prev.includes(id)) {
        toast.info("Removed from saved opportunities");
      } else {
        toast.success("Added to saved opportunities");
      }
      
      return newSaved;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-scholarship-background text-scholarship-foreground">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-scholarship-background/90 border-b border-white/10 sticky top-[73px] z-30 py-4">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search scholarships, grants, fellowships..."
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
                    onClick={() => {
                      setSearchQuery("");
                      setTimeout(() => handleSearch(), 100);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-white/10 hover:bg-white/5"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  {filterOpen ? (
                    <>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Hide Filters
                    </>
                  ) : (
                    <>
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Show Filters
                    </>
                  )}
                </Button>
                
                <Select
                  value={sortOption}
                  onValueChange={(value) => {
                    setSortOption(value);
                    setTimeout(() => handleSearch(), 100);
                  }}
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
          <div className={`transition-all duration-300 fixed md:static top-[136px] bottom-0 left-0 z-20 bg-scholarship-background border-r border-white/10 w-80 overflow-auto 
            ${filterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:opacity-0 md:invisible'}`}>
            <FilterSidebar 
              isOpen={filterOpen} 
              onClose={() => setFilterOpen(false)} 
              onApplyFilters={handleApplyFilters}
            />
          </div>
          
          <div ref={contentRef} className={`flex-grow p-4 md:p-6 transition-all duration-300 ${filterOpen ? 'md:ml-80' : 'ml-0'}`}>
            <div className="container mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Discover <span className="text-scholarship-accent">Opportunities</span> in Pakistan
                </h1>
                <p className="text-scholarship-foreground/70">
                  {filteredScholarships.length} opportunities found {searchQuery ? `for "${searchQuery}"` : ''}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScholarships.length > 0 ? (
                  filteredScholarships.map((scholarship) => (
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
                  ))
                ) : (
                  <div className="col-span-3 py-16 text-center">
                    <p className="text-lg text-scholarship-foreground/70 mb-4">No opportunities found matching your criteria</p>
                    <Button 
                      onClick={() => {
                        setSearchQuery('');
                        setActiveFilters({
                          minAmount: 0,
                          maxAmount: 50000,
                          deadlineBefore: null,
                          scholarshipTypes: [],
                          eligibility: [],
                          educationLevels: [],
                        });
                        setFilteredScholarships(scholarships);
                      }}
                      className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90"
                    >
                      Reset Search
                    </Button>
                  </div>
                )}
              </div>
              
              {filteredScholarships.length > 0 && (
                <div className="mt-10 flex justify-center">
                  <Button variant="outline" className="border-white/10 hover:bg-white/5 mr-2">
                    Previous
                  </Button>
                  <Button className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90">
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Discover;
