
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { Link, useNavigate } from "react-router-dom";
import { 
  CalendarIcon, 
  ClockIcon, 
  FileCheckIcon, 
  FileIcon, 
  PlusIcon,
  BookmarkIcon,
  BellIcon,
  ChevronRightIcon,
  UserIcon
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data - in a real app this would come from an API/backend
  const savedScholarships = [
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
  
  const applications = [
    {
      id: 1,
      scholarshipId: 5,
      title: "First Generation Student Scholarship",
      provider: "Pathway to College",
      submittedDate: "2025-04-10",
      deadline: "2025-07-30",
      status: "In Progress", // In Progress, Submitted, Under Review, Interview, Awarded, Declined
      progress: 45, // percentage complete
      steps: [
        { name: "Application Form", completed: true },
        { name: "Official Transcripts", completed: false },
        { name: "Letters of Recommendation", completed: false },
        { name: "Personal Essay", completed: true },
        { name: "Financial Documents", completed: false },
      ]
    },
    {
      id: 2,
      scholarshipId: 7,
      title: "Women in Technology Scholarship",
      provider: "Tech Diversity Initiative",
      submittedDate: "2025-04-05",
      deadline: "2025-06-15",
      status: "Submitted",
      progress: 100,
      steps: [
        { name: "Application Form", completed: true },
        { name: "Official Transcripts", completed: true },
        { name: "Letters of Recommendation", completed: true },
        { name: "Personal Essay", completed: true },
        { name: "Portfolio", completed: true },
      ]
    },
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const calculateDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "In Progress": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      case "Submitted": return "bg-green-500/20 text-green-500 border-green-500/30";
      case "Under Review": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "Interview": return "bg-purple-500/20 text-purple-500 border-purple-500/30";
      case "Awarded": return "bg-scholarship-accent/20 text-scholarship-accent border-scholarship-accent/30";
      case "Declined": return "bg-red-500/20 text-red-500 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-500 border-gray-500/30";
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-scholarship-background text-scholarship-foreground">
      <Header />
      
      <main className="flex-grow py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">
              My <span className="text-scholarship-accent">Dashboard</span>
            </h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                <BellIcon className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Profile">
                <UserIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-white/5 border-white/10">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="applications">My Applications</TabsTrigger>
              <TabsTrigger value="saved">Saved Scholarships</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Profile Completion */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    Complete Your Profile
                    <Badge className="ml-3 bg-blue-500/20 text-blue-500 border border-blue-500/30">75% Complete</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={75} className="h-2 mb-4" />
                  <p className="text-scholarship-foreground/70 mb-4">
                    Complete your profile to improve your scholarship matches.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center">
                      <UserIcon className="h-5 w-5 text-scholarship-accent mr-2" />
                      <div>
                        <div className="font-medium">Basic Info</div>
                        <div className="text-xs text-scholarship-foreground/60">Complete</div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center">
                      <FileIcon className="h-5 w-5 text-scholarship-accent mr-2" />
                      <div>
                        <div className="font-medium">Academic Details</div>
                        <div className="text-xs text-scholarship-foreground/60">Complete</div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center">
                      <CalendarIcon className="h-5 w-5 text-scholarship-foreground/50 mr-2" />
                      <div>
                        <div className="font-medium">Activities & Awards</div>
                        <div className="text-xs text-scholarship-foreground/60">Pending</div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center">
                      <FileIcon className="h-5 w-5 text-scholarship-foreground/50 mr-2" />
                      <div>
                        <div className="font-medium">Financial Info</div>
                        <div className="text-xs text-scholarship-foreground/60">Pending</div>
                      </div>
                    </div>
                  </div>
                  <Button asChild>
                    <Link to="/profile" className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90">
                      Complete Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Application Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <FileIcon className="h-6 w-6 text-blue-500" />
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-500 border border-blue-500/30">2</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mt-4">Applications</h3>
                    <p className="text-scholarship-foreground/70 text-sm">In progress</p>
                    <Button variant="ghost" size="sm" className="mt-4 px-0 text-scholarship-accent" asChild>
                      <Link to="/dashboard?tab=applications" onClick={() => setActiveTab("applications")}>
                        View All <ChevronRightIcon className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                        <FileCheckIcon className="h-6 w-6 text-green-500" />
                      </div>
                      <Badge className="bg-green-500/20 text-green-500 border border-green-500/30">1</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mt-4">Submitted</h3>
                    <p className="text-scholarship-foreground/70 text-sm">Waiting for reviews</p>
                    <Button variant="ghost" size="sm" className="mt-4 px-0 text-scholarship-accent" asChild>
                      <Link to="/dashboard?tab=applications" onClick={() => setActiveTab("applications")}>
                        View All <ChevronRightIcon className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="w-12 h-12 rounded-full bg-scholarship-accent/20 flex items-center justify-center">
                        <BookmarkIcon className="h-6 w-6 text-scholarship-accent" />
                      </div>
                      <Badge className="bg-scholarship-accent/20 text-scholarship-accent border border-scholarship-accent/30">2</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mt-4">Saved</h3>
                    <p className="text-scholarship-foreground/70 text-sm">Scholarships</p>
                    <Button variant="ghost" size="sm" className="mt-4 px-0 text-scholarship-accent" asChild>
                      <Link to="/dashboard?tab=saved" onClick={() => setActiveTab("saved")}>
                        View All <ChevronRightIcon className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <ClockIcon className="h-6 w-6 text-yellow-500" />
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">1</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mt-4">Upcoming</h3>
                    <p className="text-scholarship-foreground/70 text-sm">Deadlines (7 days)</p>
                    <Button variant="ghost" size="sm" className="mt-4 px-0 text-scholarship-accent" asChild>
                      <Link to="/dashboard?tab=applications" onClick={() => setActiveTab("applications")}>
                        View All <ChevronRightIcon className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              {/* Recent Applications */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">My Recent Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  {applications.length > 0 ? (
                    <div className="space-y-4">
                      {applications.map(application => (
                        <div key={application.id} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                              <Link 
                                to={`/scholarship/${application.scholarshipId}`}
                                className="text-lg font-semibold hover:text-scholarship-accent transition-colors"
                              >
                                {application.title}
                              </Link>
                              <p className="text-scholarship-foreground/70">{application.provider}</p>
                            </div>
                            <Badge className={`${getStatusColor(application.status)} border`}>
                              {application.status}
                            </Badge>
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Application Progress</span>
                              <span>{application.progress}%</span>
                            </div>
                            <Progress value={application.progress} className="h-2" />
                          </div>
                          
                          <div className="flex flex-wrap gap-2 text-sm text-scholarship-foreground/70">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1 text-scholarship-accent" />
                              <span>Deadline: {formatDate(application.deadline)}</span>
                            </div>
                            {application.status === "In Progress" && (
                              <div className="flex items-center">
                                <ClockIcon className="h-4 w-4 mr-1 text-yellow-500" />
                                <span>
                                  {calculateDaysLeft(application.deadline)} days left
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-scholarship-foreground/70 mb-4">You haven't started any applications yet.</p>
                      <Button asChild className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90">
                        <Link to="/discover">Find Scholarships</Link>
                      </Button>
                    </div>
                  )}
                  
                  {applications.length > 0 && (
                    <Button 
                      variant="outline" 
                      className="mt-4 w-full border-white/10 hover:bg-white/5"
                      onClick={() => setActiveTab("applications")}
                    >
                      View All Applications
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              {/* Saved Scholarships Preview */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Saved Scholarships</CardTitle>
                </CardHeader>
                <CardContent>
                  {savedScholarships.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedScholarships.map(scholarship => (
                        <ScholarshipCard
                          key={scholarship.id}
                          title={scholarship.title}
                          provider={scholarship.provider}
                          amount={scholarship.amount}
                          deadline={scholarship.deadline}
                          category={scholarship.category}
                          eligibility={scholarship.eligibility}
                          matchPercentage={scholarship.matchPercentage}
                          saved={true}
                          onSave={() => {/* Toggle save */}}
                          onViewDetails={() => navigate(`/scholarship/${scholarship.id}`)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-scholarship-foreground/70 mb-4">You haven't saved any scholarships yet.</p>
                      <Button asChild className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90">
                        <Link to="/discover">Browse Scholarships</Link>
                      </Button>
                    </div>
                  )}
                  
                  {savedScholarships.length > 0 && (
                    <Button 
                      variant="outline" 
                      className="mt-6 w-full border-white/10 hover:bg-white/5"
                      onClick={() => setActiveTab("saved")}
                    >
                      View All Saved Scholarships
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Applications Tab */}
            <TabsContent value="applications" className="space-y-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl flex justify-between items-center">
                    My Applications
                    <Button className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Start New Application
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {applications.length > 0 ? (
                    <div className="space-y-6">
                      {applications.map(application => (
                        <div key={application.id} className="p-6 bg-white/5 border border-white/10 rounded-lg">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                              <Link 
                                to={`/scholarship/${application.scholarshipId}`}
                                className="text-xl font-semibold hover:text-scholarship-accent transition-colors"
                              >
                                {application.title}
                              </Link>
                              <p className="text-scholarship-foreground/70">{application.provider}</p>
                            </div>
                            <Badge className={`${getStatusColor(application.status)} border`}>
                              {application.status}
                            </Badge>
                          </div>
                          
                          <div className="mb-6">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Application Progress</span>
                              <span>{application.progress}%</span>
                            </div>
                            <Progress value={application.progress} className="h-2" />
                          </div>
                          
                          <div className="flex flex-wrap gap-4 mb-6 text-sm">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1 text-scholarship-accent" />
                              <span>Deadline: {formatDate(application.deadline)}</span>
                            </div>
                            {application.status === "Submitted" && (
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1 text-green-500" />
                                <span>Submitted: {formatDate(application.submittedDate)}</span>
                              </div>
                            )}
                            {application.status === "In Progress" && (
                              <div className="flex items-center">
                                <ClockIcon className="h-4 w-4 mr-1 text-yellow-500" />
                                <span>
                                  {calculateDaysLeft(application.deadline)} days left
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <h4 className="font-semibold mb-3">Application Checklist</h4>
                          <div className="space-y-3">
                            {application.steps.map((step, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                                  step.completed 
                                    ? 'bg-green-500 text-white' 
                                    : 'border border-white/30'
                                }`}>
                                  {step.completed && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                  )}
                                </div>
                                <span className={step.completed ? 'text-scholarship-foreground' : 'text-scholarship-foreground/70'}>
                                  {step.name}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-6 flex gap-3 justify-end">
                            <Button 
                              variant="outline" 
                              className="border-white/10 hover:bg-white/5"
                              onClick={() => navigate(`/scholarship/${application.scholarshipId}`)}
                            >
                              View Scholarship
                            </Button>
                            {application.status === "In Progress" && (
                              <Button className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90">
                                Continue Application
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-scholarship-foreground/70 mb-4">You haven't started any applications yet.</p>
                      <Button asChild className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90">
                        <Link to="/discover">Find Scholarships</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Saved Scholarships Tab */}
            <TabsContent value="saved" className="space-y-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl">Saved Scholarships</CardTitle>
                </CardHeader>
                <CardContent>
                  {savedScholarships.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedScholarships.map(scholarship => (
                        <ScholarshipCard
                          key={scholarship.id}
                          title={scholarship.title}
                          provider={scholarship.provider}
                          amount={scholarship.amount}
                          deadline={scholarship.deadline}
                          category={scholarship.category}
                          eligibility={scholarship.eligibility}
                          matchPercentage={scholarship.matchPercentage}
                          saved={true}
                          onSave={() => {/* Toggle save */}}
                          onViewDetails={() => navigate(`/scholarship/${scholarship.id}`)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-scholarship-foreground/70 mb-4">You haven't saved any scholarships yet.</p>
                      <Button asChild className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90">
                        <Link to="/discover">Browse Scholarships</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl">Your Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-scholarship-foreground/70 mb-4">Your profile details will appear here.</p>
                    <Button asChild className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90">
                      <Link to="/profile">Edit Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
