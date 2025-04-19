
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { 
  MessageSquareIcon, 
  SearchIcon, 
  ThumbsUpIcon, 
  PlusIcon, 
  MessageCircleIcon,
  InfoIcon,
  UsersIcon,
  ArrowRightIcon,
  PencilIcon
} from "lucide-react";

const Community = () => {
  const [activeTab, setActiveTab] = useState("discussions");
  const [newPostContent, setNewPostContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data - in a real app, this would come from an API
  const discussions = [
    {
      id: 1,
      author: {
        name: "Alex Johnson",
        avatar: "https://i.pravatar.cc/150?img=1",
        role: "Community Mentor"
      },
      title: "Tips for writing a compelling scholarship essay",
      content: "I've been reviewing scholarship applications for over 5 years, and I wanted to share some insights on what makes a scholarship essay stand out from the crowd. Here are my top tips...",
      timestamp: "2025-04-12T14:30:00",
      tags: ["Essays", "Writing Tips", "Application Advice"],
      likes: 42,
      comments: 18,
      pinned: true
    },
    {
      id: 2,
      author: {
        name: "Jamie Smith",
        avatar: "https://i.pravatar.cc/150?img=5",
        role: "Scholarship Recipient"
      },
      title: "My experience applying for the Global Leaders Program",
      content: "I recently received the Global Leaders Scholarship and wanted to share my experience with the application process. The most challenging part was...",
      timestamp: "2025-04-10T09:15:00",
      tags: ["Success Story", "Global Leaders", "Experience"],
      likes: 36,
      comments: 14,
      pinned: false
    },
    {
      id: 3,
      author: {
        name: "Taylor Wu",
        avatar: "https://i.pravatar.cc/150?img=9",
        role: "Student"
      },
      title: "Are there any scholarships specifically for computer science students?",
      content: "I'm a second-year computer science student looking for scholarships in my field. Does anyone have recommendations for tech or CS-specific scholarships that I might have missed?",
      timestamp: "2025-04-09T16:45:00",
      tags: ["Computer Science", "STEM", "Question"],
      likes: 28,
      comments: 22,
      pinned: false
    },
    {
      id: 4,
      author: {
        name: "Jordan Reyes",
        avatar: "https://i.pravatar.cc/150?img=12",
        role: "Financial Aid Advisor"
      },
      title: "Understanding need-based vs. merit-based scholarships",
      content: "I've noticed some confusion about the differences between need-based and merit-based scholarships. Here's a quick explainer to help you understand which type might be best for your situation...",
      timestamp: "2025-04-08T11:20:00",
      tags: ["Financial Aid", "Educational", "Scholarships 101"],
      likes: 53,
      comments: 7,
      pinned: false
    }
  ];
  
  const opportunityShares = [
    {
      id: 1,
      author: {
        name: "Morgan Chen",
        avatar: "https://i.pravatar.cc/150?img=11",
        role: "Graduate Student"
      },
      title: "New Research Fellowship for Environmental Studies",
      content: "I just discovered this amazing research fellowship opportunity for students interested in environmental science and sustainability. The deadline is June 15th, and it includes a $12,000 stipend plus research funding.",
      link: "https://example.com/fellowship",
      timestamp: "2025-04-11T10:05:00",
      tags: ["Research", "Environmental Science", "Fellowship"],
      status: "Pending Verification",
      likes: 19,
      comments: 5
    },
    {
      id: 2,
      author: {
        name: "Sam Rodriguez",
        avatar: "https://i.pravatar.cc/150?img=3",
        role: "Scholarship Admin"
      },
      title: "Women in Engineering Scholarship Program",
      content: "Applications are now open for the Women in Engineering Scholarship Program. This program offers five $20,000 scholarships to women pursuing degrees in any engineering discipline. Special consideration for first-generation college students.",
      link: "https://example.com/women-engineering",
      timestamp: "2025-04-07T15:40:00",
      tags: ["Engineering", "Women in STEM", "Verified"],
      status: "Verified",
      likes: 65,
      comments: 12
    }
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const getTimeSince = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffMs = now.getTime() - postDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} day ago`;
    return formatDate(dateString);
  };
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the post to the backend
    console.log("New post:", newPostContent);
    setNewPostContent("");
    // Would add the new post to the discussions array
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-scholarship-background text-scholarship-foreground">
      <Header />
      
      <main className="flex-grow py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="text-scholarship-accent">Community</span> Hub
            </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-white/5 border-white/10">
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  <TabsTrigger value="opportunities">Shared Opportunities</TabsTrigger>
                </TabsList>
                
                {/* Discussions Tab */}
                <TabsContent value="discussions" className="space-y-6">
                  {/* New Post Form */}
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="pt-6">
                      <form onSubmit={handlePostSubmit}>
                        <Textarea
                          placeholder="Share a question, advice, or experience with the community..."
                          className="bg-white/5 border-white/10 mb-4 h-24"
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                        />
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-scholarship-foreground/60">
                            Be respectful and follow our <Link to="/community-guidelines" className="text-scholarship-accent hover:underline">community guidelines</Link>
                          </div>
                          <Button 
                            type="submit" 
                            className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90"
                          >
                            Post
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                  
                  {/* Search */}
                  <div className="relative mb-6">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-scholarship-foreground/50" />
                    <Input
                      type="text"
                      placeholder="Search discussions..."
                      className="pl-10 bg-white/5 border-white/10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {/* Discussions List */}
                  <div className="space-y-6">
                    {discussions.map((discussion) => (
                      <Card key={discussion.id} className={`bg-white/5 border-white/10 ${discussion.pinned ? 'border-l-4 border-l-scholarship-accent' : ''}`}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                                <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{discussion.author.name}</div>
                                <div className="text-xs text-scholarship-foreground/60 flex items-center">
                                  {discussion.author.role} • {getTimeSince(discussion.timestamp)}
                                  {discussion.pinned && (
                                    <Badge className="ml-2 bg-scholarship-accent/20 text-scholarship-accent text-xs">Pinned</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <Link to={`/community/discussion/${discussion.id}`} className="block group">
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-scholarship-accent transition-colors">
                              {discussion.title}
                            </h3>
                            <p className="text-scholarship-foreground/80 mb-4 line-clamp-3">
                              {discussion.content}
                            </p>
                          </Link>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {discussion.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="bg-white/5 border-white/10">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-scholarship-foreground/60">
                            <button className="flex items-center gap-1 hover:text-scholarship-accent transition-colors">
                              <ThumbsUpIcon className="h-4 w-4" />
                              <span>{discussion.likes}</span>
                            </button>
                            <Link to={`/community/discussion/${discussion.id}`} className="flex items-center gap-1 hover:text-scholarship-accent transition-colors">
                              <MessageCircleIcon className="h-4 w-4" />
                              <span>{discussion.comments}</span>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Shared Opportunities Tab */}
                <TabsContent value="opportunities" className="space-y-6">
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="pt-6">
                      <div className="bg-scholarship-accent/10 p-4 rounded-lg mb-4">
                        <div className="flex items-start">
                          <InfoIcon className="h-5 w-5 text-scholarship-accent mr-3 mt-0.5" />
                          <div>
                            <h3 className="font-semibold mb-1">Share New Opportunities</h3>
                            <p className="text-sm text-scholarship-foreground/80">
                              Know of a scholarship or opportunity not in our database? Share it here to help others.
                              All submissions are reviewed before being added to the main database.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90 w-full">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Share New Opportunity
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* Shared Opportunities List */}
                  <div className="space-y-6">
                    {opportunityShares.map((opportunity) => (
                      <Card key={opportunity.id} className="bg-white/5 border-white/10">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={opportunity.author.avatar} alt={opportunity.author.name} />
                                <AvatarFallback>{opportunity.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{opportunity.author.name}</div>
                                <div className="text-xs text-scholarship-foreground/60">
                                  {opportunity.author.role} • {getTimeSince(opportunity.timestamp)}
                                </div>
                              </div>
                            </div>
                            <Badge 
                              className={opportunity.status === "Verified" 
                                ? "bg-green-500/20 text-green-500 border border-green-500/30" 
                                : "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                              }
                            >
                              {opportunity.status}
                            </Badge>
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-2">{opportunity.title}</h3>
                          <p className="text-scholarship-foreground/80 mb-4">
                            {opportunity.content}
                          </p>
                          
                          <a 
                            href={opportunity.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block text-scholarship-accent hover:underline mb-4"
                          >
                            View Opportunity →
                          </a>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {opportunity.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="bg-white/5 border-white/10">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-scholarship-foreground/60">
                            <button className="flex items-center gap-1 hover:text-scholarship-accent transition-colors">
                              <ThumbsUpIcon className="h-4 w-4" />
                              <span>{opportunity.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 hover:text-scholarship-accent transition-colors">
                              <MessageCircleIcon className="h-4 w-4" />
                              <span>{opportunity.comments}</span>
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Community Stats */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <UsersIcon className="h-5 w-5 mr-2 text-scholarship-accent" />
                        <span>Members</span>
                      </div>
                      <span>2,543</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquareIcon className="h-5 w-5 mr-2 text-scholarship-accent" />
                        <span>Discussions</span>
                      </div>
                      <span>384</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <PencilIcon className="h-5 w-5 mr-2 text-scholarship-accent" />
                        <span>Posts Today</span>
                      </div>
                      <span>18</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Popular Tags */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
                      Essay Tips
                    </Badge>
                    <Badge variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
                      Financial Aid
                    </Badge>
                    <Badge variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
                      STEM
                    </Badge>
                    <Badge variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
                      International
                    </Badge>
                    <Badge variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
                      Graduate
                    </Badge>
                    <Badge variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
                      Success Stories
                    </Badge>
                    <Badge variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
                      First Generation
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              {/* Community Mentors */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Community Mentors</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-56">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Alex Johnson" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Alex Johnson</div>
                          <div className="text-xs text-scholarship-foreground/60">Scholarship Reviewer</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src="https://i.pravatar.cc/150?img=4" alt="Dana Lee" />
                          <AvatarFallback>DL</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Dana Lee</div>
                          <div className="text-xs text-scholarship-foreground/60">Financial Aid Officer</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Jordan Reyes" />
                          <AvatarFallback>JR</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Jordan Reyes</div>
                          <div className="text-xs text-scholarship-foreground/60">Financial Aid Advisor</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="Sam Rodriguez" />
                          <AvatarFallback>SR</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Sam Rodriguez</div>
                          <div className="text-xs text-scholarship-foreground/60">Scholarship Admin</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src="https://i.pravatar.cc/150?img=7" alt="Morgan Taylor" />
                          <AvatarFallback>MT</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Morgan Taylor</div>
                          <div className="text-xs text-scholarship-foreground/60">Education Counselor</div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              {/* Community Guidelines */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-scholarship-foreground/80 mb-4">
                    Our community thrives on respect, inclusivity, and helpful information sharing.
                    Please review our guidelines to ensure a positive experience for all members.
                  </p>
                  <Button asChild variant="outline" className="w-full border-white/10 hover:bg-white/5">
                    <Link to="/community-guidelines">
                      Read Guidelines <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
