
import { CalendarIcon, BookmarkIcon, DollarSignIcon, GraduationCapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScholarshipCardProps {
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  category: string;
  eligibility: string[];
  matchPercentage?: number;
  saved?: boolean;
  onSave?: () => void;
  onViewDetails: () => void;
}

export function ScholarshipCard({
  title,
  provider,
  amount,
  deadline,
  category,
  eligibility,
  matchPercentage,
  saved = false,
  onSave,
  onViewDetails,
}: ScholarshipCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Calculate days until deadline
  const daysUntil = () => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = daysUntil();
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 bg-scholarship-background border border-white/10 text-scholarship-foreground overflow-hidden">
      {matchPercentage && (
        <div className="bg-scholarship-accent/90 text-scholarship-background py-1 px-3 text-xs font-semibold absolute top-0 right-0">
          {matchPercentage}% Match
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold text-xl mb-1 text-scholarship-foreground">{title}</h3>
            <p className="text-scholarship-foreground/70 text-sm mb-4">{provider}</p>
          </div>
          {onSave && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onSave}
              className={saved ? "text-scholarship-accent" : "text-scholarship-foreground/50"}
            >
              <BookmarkIcon className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <DollarSignIcon className="h-4 w-4 mr-2 text-scholarship-accent" />
            <span className="text-sm">{amount}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 text-scholarship-accent" />
            <span className="text-sm">
              {formatDate(deadline)}
              {daysLeft > 0 && daysLeft <= 14 && (
                <Badge variant="destructive" className="ml-2 text-xs py-0">
                  {daysLeft} days left
                </Badge>
              )}
            </span>
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <GraduationCapIcon className="h-4 w-4 mr-2 text-scholarship-accent" />
          <Badge className="bg-white/10 hover:bg-white/20 text-xs">{category}</Badge>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-medium text-scholarship-foreground/70">Eligibility:</p>
          <div className="flex flex-wrap gap-2">
            {eligibility.map((item, index) => (
              <Badge key={index} variant="outline" className="bg-white/5 text-xs border-white/10">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 px-6 pb-6">
        <Button 
          onClick={onViewDetails} 
          className="w-full bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
