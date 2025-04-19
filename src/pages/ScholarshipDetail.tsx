
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookmarkIcon, 
  CalendarIcon, 
  DollarSignIcon, 
  GraduationCapIcon,
  ClockIcon,
  BuildingIcon,
  FileTextIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  Share2Icon
} from "lucide-react";

const ScholarshipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isSaved, setIsSaved] = useState(false);
  
  // This would come from an API in a real application
  const scholarship = {
    id: parseInt(id || "1"),
    title: "Future Leaders Scholarship",
    provider: "Global Education Foundation",
    providerLogo: "https://via.placeholder.com/100",
    amount: "$10,000",
    deadline: "2025-08-15",
    category: "Leadership",
    description: "The Future Leaders Scholarship is designed to support outstanding students who have demonstrated leadership potential and a commitment to community service. Recipients will join a network of emerging leaders and gain access to mentorship opportunities.",
    eligibility: [
      "Currently enrolled or accepted to an accredited undergraduate institution",
      "Minimum 3.5 GPA on a 4.0 scale",
      "Demonstrated leadership experience",
      "Community service involvement",
      "U.S. citizen or permanent resident"
    ],
    requirements: [
      "Completed application form",
      "Official academic transcripts",
      "Two letters of recommendation",
      "Personal essay (500-750 words) on leadership philosophy",
      "Resume or CV highlighting leadership experiences"
    ],
    applicationSteps: [
      "Create an account on the provider's website",
      "Complete the online application form",
      "Upload required documents",
      "Submit by the deadline"
    ],
    faqs: [
      {
        question: "Can international students apply?",
        answer: "No, this scholarship is currently only available to U.S. citizens and permanent residents."
      },
      {
        question: "Is the scholarship renewable?",
        answer: "Yes, the scholarship is renewable for up to four years, provided the recipient maintains a 3.3 GPA and continues to demonstrate leadership qualities."
      },
      {
        question: "How will I be notified if I'm selected?",
        answer: "All applicants will be notified by email approximately 6-8 weeks after the application deadline. Finalists may be invited for a video interview."
      }
    ],
    matchPercentage: 95,
    applicationUrl: "https://example.com/apply",
    datePosted: "2025-03-01",
    lastUpdated: "2025-04-01",
    awards: "10 awards of $10,000 each",
    similarScholarships: [2, 5, 6]
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  // Calculate days until deadline
  const calculateDaysLeft = () => {
    const today = new Date();
    const deadlineDate = new Date(scholarship.deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysLeft = calculateDaysLeft();
  
  return (
    <div className="flex flex-col min-h-screen bg-scholarship-background text-scholarship-foreground">
      <Header />
      
      <main className="flex-grow py-6 md:py-8">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <div className="mb-6">
            <Link 
              to="/discover" 
              className="text-scholarship-foreground/70 hover:text-scholarship-accent flex items-center text-sm"
            >
              ← Back to search results
            </Link>
          </div>
          
          {/* Scholarship Header */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-scholarship-accent text-scholarship-background">
                    {scholarship.matchPercentage}% Match
                  </Badge>
                  <Badge variant="outline" className="border-white/10 bg-white/5">
                    {scholarship.category}
                  </Badge>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {scholarship.title}
                </h1>
                
                <div className="flex items-center text-scholarship-foreground/70">
                  <BuildingIcon className="h-4 w-4 mr-2" />
                  <span>{scholarship.provider}</span>
                </div>
              </div>
              
              <div className="flex flex-col md:items-end gap-4">
                <Button 
                  onClick={() => setIsSaved(!isSaved)}
                  variant="outline"
                  className={`border-white/10 ${isSaved ? 'text-scholarship-accent' : 'text-scholarship-foreground/70'}`}
                >
                  <BookmarkIcon className="h-4 w-4 mr-2" />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                
                <Button 
                  className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90"
                  onClick={() => window.open(scholarship.applicationUrl, '_blank')}
                >
                  Apply Now <ExternalLinkIcon className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="w-full bg-white/5 border-b border-white/10 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                  <TabsTrigger value="application">Application</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-0">
                  <Card className="bg-white/5 border-white/10 p-6">
                    <h2 className="text-xl font-semibold mb-4">About This Scholarship</h2>
                    <p className="mb-6 text-scholarship-foreground/80 leading-relaxed">
                      {scholarship.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="flex items-start">
                        <DollarSignIcon className="h-5 w-5 mr-3 text-scholarship-accent mt-1" />
                        <div>
                          <h3 className="font-semibold">Award Amount</h3>
                          <p className="text-scholarship-foreground/80">{scholarship.amount}</p>
                          <p className="text-sm text-scholarship-foreground/60">{scholarship.awards}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CalendarIcon className="h-5 w-5 mr-3 text-scholarship-accent mt-1" />
                        <div>
                          <h3 className="font-semibold">Deadline</h3>
                          <p className="text-scholarship-foreground/80">{formatDate(scholarship.deadline)}</p>
                          {daysLeft > 0 && (
                            <p className={`text-sm ${daysLeft <= 14 ? 'text-red-400' : 'text-scholarship-foreground/60'}`}>
                              {daysLeft} days remaining
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <GraduationCapIcon className="h-5 w-5 mr-3 text-scholarship-accent mt-1" />
                        <div>
                          <h3 className="font-semibold">Category</h3>
                          <p className="text-scholarship-foreground/80">{scholarship.category}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <ClockIcon className="h-5 w-5 mr-3 text-scholarship-accent mt-1" />
                        <div>
                          <h3 className="font-semibold">Last Updated</h3>
                          <p className="text-scholarship-foreground/80">{formatDate(scholarship.lastUpdated)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Button variant="outline" className="border-white/10 hover:bg-white/5">
                        <Share2Icon className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      
                      <Button 
                        className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90"
                        onClick={() => window.open(scholarship.applicationUrl, '_blank')}
                      >
                        Apply Now <ExternalLinkIcon className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="eligibility" className="mt-0">
                  <Card className="bg-white/5 border-white/10 p-6">
                    <h2 className="text-xl font-semibold mb-4">Eligibility Requirements</h2>
                    <p className="mb-6 text-scholarship-foreground/80">
                      To be eligible for this scholarship, applicants must meet the following criteria:
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      {scholarship.eligibility.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 mr-3 text-scholarship-accent flex-shrink-0 mt-0.5" />
                          <span className="text-scholarship-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 mt-8">
                      <p className="text-sm text-scholarship-foreground/80">
                        <strong className="text-scholarship-accent">Note:</strong> Meeting the eligibility requirements does not guarantee selection. 
                        All applications are reviewed holistically by the selection committee.
                      </p>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="application" className="mt-0">
                  <Card className="bg-white/5 border-white/10 p-6">
                    <h2 className="text-xl font-semibold mb-4">Application Process</h2>
                    
                    <div className="mb-8">
                      <h3 className="font-semibold mb-3">Required Documents</h3>
                      <ul className="space-y-3">
                        {scholarship.requirements.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <FileTextIcon className="h-5 w-5 mr-3 text-scholarship-accent flex-shrink-0 mt-0.5" />
                            <span className="text-scholarship-foreground/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="font-semibold mb-3">Application Steps</h3>
                      <ol className="space-y-4">
                        {scholarship.applicationSteps.map((step, index) => (
                          <li key={index} className="flex">
                            <div className="mr-4 h-8 w-8 bg-scholarship-accent text-scholarship-background rounded-full flex items-center justify-center flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="pt-1">
                              <span className="text-scholarship-foreground/80">{step}</span>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <Button 
                      className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90 w-full md:w-auto"
                      onClick={() => window.open(scholarship.applicationUrl, '_blank')}
                    >
                      Start Application <ExternalLinkIcon className="h-4 w-4 ml-2" />
                    </Button>
                  </Card>
                </TabsContent>
                
                <TabsContent value="faq" className="mt-0">
                  <Card className="bg-white/5 border-white/10 p-6">
                    <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                    
                    <div className="space-y-6">
                      {scholarship.faqs.map((faq, index) => (
                        <div key={index} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                          <h3 className="font-semibold text-scholarship-accent mb-2">{faq.question}</h3>
                          <p className="text-scholarship-foreground/80">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-sm text-scholarship-foreground/80">
                        Have more questions? Contact the scholarship provider directly at <a href="mailto:info@example.com" className="text-scholarship-accent hover:underline">info@example.com</a>
                      </p>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Column - Match Info & Actions */}
            <div>
              {/* Match Card */}
              <Card className="bg-white/5 border-white/10 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Your Match</h2>
                
                <div className="mb-2 flex justify-between items-center">
                  <span>Match Score</span>
                  <span className="font-bold text-scholarship-accent">{scholarship.matchPercentage}%</span>
                </div>
                <Progress value={scholarship.matchPercentage} className="h-2 mb-6" />
                
                <div className="text-sm text-scholarship-foreground/80">
                  <p className="mb-4">
                    This scholarship is highly compatible with your profile based on your academic background, 
                    interests, and demographic information.
                  </p>
                  <Link to="/profile" className="text-scholarship-accent hover:underline inline-block mb-4">
                    View/update your profile to improve matches
                  </Link>
                </div>
                
                <Button 
                  className="w-full bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90 mt-2"
                  onClick={() => window.open(scholarship.applicationUrl, '_blank')}
                >
                  Apply Now <ExternalLinkIcon className="h-4 w-4 ml-2" />
                </Button>
              </Card>
              
              {/* Important Dates */}
              <Card className="bg-white/5 border-white/10 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Important Dates</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-start">
                      <CalendarIcon className="h-4 w-4 mr-2 text-scholarship-accent mt-1" />
                      <div>
                        <span className="text-sm text-scholarship-foreground/70">Application Opens</span>
                        <p>{formatDate("2025-03-01")}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-start">
                      <CalendarIcon className="h-4 w-4 mr-2 text-scholarship-accent mt-1" />
                      <div>
                        <span className="text-sm text-scholarship-foreground/70">Application Deadline</span>
                        <p>{formatDate(scholarship.deadline)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-start">
                      <CalendarIcon className="h-4 w-4 mr-2 text-scholarship-accent mt-1" />
                      <div>
                        <span className="text-sm text-scholarship-foreground/70">Notification Date</span>
                        <p>{formatDate("2025-10-15")}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {daysLeft > 0 && daysLeft <= 14 && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-sm">
                    <p className="font-semibold">Application Deadline Approaching!</p>
                    <p>Only {daysLeft} days left to apply</p>
                  </div>
                )}
              </Card>
              
              {/* Provider Info */}
              <Card className="bg-white/5 border-white/10 p-6">
                <h2 className="text-lg font-semibold mb-4">About the Provider</h2>
                
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-white/10 rounded-full mr-3 flex items-center justify-center overflow-hidden">
                    <img 
                      src={scholarship.providerLogo} 
                      alt={scholarship.provider} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{scholarship.provider}</p>
                    <p className="text-sm text-scholarship-foreground/70">Education Foundation</p>
                  </div>
                </div>
                
                <p className="text-sm text-scholarship-foreground/80 mb-4">
                  The Global Education Foundation is dedicated to making education accessible to all students 
                  by providing financial support and mentorship opportunities.
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full border-white/10 hover:bg-white/5"
                  onClick={() => window.open("https://example.com", "_blank")}
                >
                  Visit Provider Website
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScholarshipDetail;
