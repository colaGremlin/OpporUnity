
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, FilterIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOptions {
  minAmount: number;
  maxAmount: number;
  deadlineBefore: string | null;
  scholarshipTypes: string[];
  eligibility: string[];
  educationLevels: string[];
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  className?: string;
}

export function FilterSidebar({ 
  isOpen, 
  onClose, 
  onApplyFilters,
  className
}: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    minAmount: 0,
    maxAmount: 2000000,
    deadlineBefore: null,
    scholarshipTypes: [],
    eligibility: [],
    educationLevels: [],
  });

  // Pakistan-specific scholarship types
  const scholarshipTypes = [
    "Merit-Based", 
    "Need-Based", 
    "Research Grant", 
    "Fellowship", 
    "Training Program", 
    "Scholarship",
    "Research Collaboration",
    "Vocational",
    "International",
    "Regional"
  ];

  // Pakistan-specific eligibility options
  const eligibilityOptions = [
    "Pakistani Nationals",
    "Pakistani Citizens",
    "International Students",
    "First Generation",
    "Women",
    "Religious Minorities",
    "Balochistan Residents",
    "KPK Residents",
    "Rural Communities",
    "Underprivileged",
    "Low Income",
    "Military/Veterans",
    "People with Disabilities"
  ];

  const educationLevels = [
    "High School",
    "Intermediate",
    "Undergraduate",
    "Bachelors",
    "Masters",
    "MS/PhD",
    "PhD",
    "Doctoral",
    "Post-Doctoral",
    "Trade/Vocational",
    "Professional Certification"
  ];

  const handleCheckboxChange = (category: 'scholarshipTypes' | 'eligibility' | 'educationLevels', value: string) => {
    setFilters(prev => {
      if (prev[category].includes(value)) {
        return {
          ...prev,
          [category]: prev[category].filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...prev[category], value]
        };
      }
    });
  };

  const resetFilters = () => {
    setFilters({
      minAmount: 0,
      maxAmount: 2000000,
      deadlineBefore: null,
      scholarshipTypes: [],
      eligibility: [],
      educationLevels: [],
    });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-full md:w-80 bg-scholarship-background border-r border-white/10 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold flex items-center">
          <FilterIcon className="h-5 w-5 mr-2 text-scholarship-accent" />
          Filter Opportunities
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-60px)] p-4">
        <div className="space-y-6">
          {/* Amount Range (Pakistan-specific in PKR or other currencies) */}
          <div>
            <h3 className="text-scholarship-accent font-medium mb-3">Award Amount</h3>
            <div className="space-y-4">
              <Slider
                defaultValue={[filters.minAmount, filters.maxAmount]}
                max={2000000}
                step={10000}
                onValueChange={(value) => setFilters({
                  ...filters, 
                  minAmount: value[0], 
                  maxAmount: value[1]
                })}
              />
              <div className="flex justify-between items-center">
                <div>
                  <Label htmlFor="min-amount">Min</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-scholarship-foreground/50">PKR</span>
                    <Input
                      id="min-amount"
                      type="number"
                      value={filters.minAmount}
                      onChange={(e) => setFilters({...filters, minAmount: parseInt(e.target.value) || 0})}
                      className="pl-12 bg-white/5 border-white/10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="max-amount">Max</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-scholarship-foreground/50">PKR</span>
                    <Input
                      id="max-amount"
                      type="number"
                      value={filters.maxAmount}
                      onChange={(e) => setFilters({...filters, maxAmount: parseInt(e.target.value) || 0})}
                      className="pl-12 bg-white/5 border-white/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Deadline */}
          <div>
            <h3 className="text-scholarship-accent font-medium mb-3">Application Deadline</h3>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-scholarship-foreground/50" />
              <Input
                type="date"
                value={filters.deadlineBefore || ''}
                onChange={(e) => setFilters({...filters, deadlineBefore: e.target.value})}
                className="pl-10 bg-white/5 border-white/10"
                placeholder="Filter by deadline"
              />
            </div>
          </div>
          
          {/* Scholarship Types */}
          <div>
            <h3 className="text-scholarship-accent font-medium mb-3">Opportunity Type</h3>
            <div className="space-y-2">
              {scholarshipTypes.map((type) => (
                <div key={type} className="flex items-center">
                  <Checkbox 
                    id={`type-${type}`}
                    checked={filters.scholarshipTypes.includes(type)}
                    onCheckedChange={() => handleCheckboxChange('scholarshipTypes', type)}
                    className="border-white/30 data-[state=checked]:bg-scholarship-accent data-[state=checked]:text-scholarship-background"
                  />
                  <Label 
                    htmlFor={`type-${type}`}
                    className="ml-2 text-sm font-normal"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Education Levels */}
          <div>
            <h3 className="text-scholarship-accent font-medium mb-3">Education Level</h3>
            <div className="space-y-2">
              {educationLevels.map((level) => (
                <div key={level} className="flex items-center">
                  <Checkbox 
                    id={`level-${level}`}
                    checked={filters.educationLevels.includes(level)}
                    onCheckedChange={() => handleCheckboxChange('educationLevels', level)}
                    className="border-white/30 data-[state=checked]:bg-scholarship-accent data-[state=checked]:text-scholarship-background"
                  />
                  <Label 
                    htmlFor={`level-${level}`}
                    className="ml-2 text-sm font-normal"
                  >
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Eligibility - Pakistan Specific */}
          <div>
            <h3 className="text-scholarship-accent font-medium mb-3">Special Eligibility</h3>
            <div className="space-y-2">
              {eligibilityOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <Checkbox 
                    id={`eligibility-${option}`}
                    checked={filters.eligibility.includes(option)}
                    onCheckedChange={() => handleCheckboxChange('eligibility', option)}
                    className="border-white/30 data-[state=checked]:bg-scholarship-accent data-[state=checked]:text-scholarship-background"
                  />
                  <Label 
                    htmlFor={`eligibility-${option}`}
                    className="ml-2 text-sm font-normal"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 space-y-3 pb-6">
          <Button 
            onClick={applyFilters} 
            className="w-full bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90"
          >
            Apply Filters
          </Button>
          <Button 
            onClick={resetFilters}
            variant="outline" 
            className="w-full border-white/10 hover:bg-white/5"
          >
            Reset Filters
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}
