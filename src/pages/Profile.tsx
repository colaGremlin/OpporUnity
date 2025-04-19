
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  UserIcon, 
  BookIcon, 
  TrophyIcon, 
  DollarSignIcon,
  SaveIcon,
  CheckCircleIcon,
  PlusIcon,
  XIcon
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profileComplete, setProfileComplete] = useState(55);
  const [interests, setInterests] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  
  // State for form fields (simplified for demo)
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Alex",
    lastName: "Taylor",
    email: "alex.taylor@example.com",
    phone: "(555) 123-4567",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    dob: "2000-05-15",
    gender: "",
    ethnicity: [],
    firstGeneration: false
  });
  
  const [academicInfo, setAcademicInfo] = useState({
    educationLevel: "Undergraduate",
    school: "State University",
    major: "Computer Science",
    minor: "",
    gpa: "3.7",
    graduationDate: "2026-05",
    testScores: {
      sat: "1380",
      act: "",
      gre: ""
    }
  });
  
  // Lists for selection options
  const ethnicityOptions = [
    "African American/Black",
    "Asian/Pacific Islander",
    "Hispanic/Latino",
    "Native American/Alaska Native",
    "White/Caucasian",
    "Multi-racial",
    "Other",
    "Prefer not to say"
  ];
  
  const interestOptions = [
    "STEM", 
    "Humanities", 
    "Arts", 
    "Business", 
    "Healthcare", 
    "Social Sciences", 
    "Education", 
    "Environmental Studies",
    "International Relations",
    "Public Policy",
    "Computer Science",
    "Engineering"
  ];
  
  const activityOptions = [
    "Student Government",
    "Athletics",
    "Music",
    "Theater/Drama",
    "Academic Clubs",
    "Volunteer/Community Service",
    "Research",
    "Internships",
    "Part-time Job",
    "Leadership Positions",
    "Cultural Organizations",
    "Religious Groups"
  ];
  
  const handleAddInterest = (interest: string) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest]);
    }
  };
  
  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };
  
  const handleAddActivity = (activity: string) => {
    if (!activities.includes(activity)) {
      setActivities([...activities, activity]);
    }
  };
  
  const handleRemoveActivity = (activity: string) => {
    setActivities(activities.filter(a => a !== activity));
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would save to a backend
    console.log("Profile saved:", {
      personal: personalInfo,
      academic: academicInfo,
      interests,
      activities
    });
    
    // Update profile completion percentage (simplified logic)
    let completed = 0;
    const totalFields = 20; // total number of important fields
    
    // Count filled personal fields
    if (personalInfo.firstName) completed++;
    if (personalInfo.lastName) completed++;
    if (personalInfo.email) completed++;
    if (personalInfo.phone) completed++;
    if (personalInfo.country) completed++;
    if (personalInfo.dob) completed++;
    if (personalInfo.gender) completed++;
    if (personalInfo.ethnicity.length > 0) completed++;
    
    // Count filled academic fields
    if (academicInfo.educationLevel) completed++;
    if (academicInfo.school) completed++;
    if (academicInfo.major) completed++;
    if (academicInfo.gpa) completed++;
    if (academicInfo.graduationDate) completed++;
    
    // Count activities and interests
    if (interests.length > 0) completed++;
    if (activities.length > 0) completed++;
    
    const percentage = Math.round((completed / totalFields) * 100);
    setProfileComplete(percentage);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-scholarship-background text-scholarship-foreground">
      <Header />
      
      <main className="flex-grow py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">
              Your <span className="text-scholarship-accent">Profile</span>
            </h1>
            <div className="text-scholarship-foreground/70">
              Profile Completion: <span className="font-semibold text-scholarship-accent">{profileComplete}%</span>
            </div>
          </div>
          
          <Progress value={profileComplete} className="h-2 mb-6" />
          
          <div className="p-4 mb-6 bg-scholarship-accent/10 rounded-lg border border-scholarship-accent/20">
            <div className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-scholarship-accent mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Complete Your Profile</h3>
                <p className="text-sm text-scholarship-foreground/80">
                  The more details you provide, the better we can match you with relevant scholarships.
                  Your information is kept secure and only used for scholarship matching purposes.
                </p>
              </div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-white/5 border-white/10">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="academic" className="flex items-center gap-2">
                <BookIcon className="h-4 w-4" />
                Academic
              </TabsTrigger>
              <TabsTrigger value="activities" className="flex items-center gap-2">
                <TrophyIcon className="h-4 w-4" />
                Activities & Interests
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <DollarSignIcon className="h-4 w-4" />
                Financial
              </TabsTrigger>
            </TabsList>
            
            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserIcon className="h-5 w-5 mr-2 text-scholarship-accent" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={personalInfo.firstName}
                        onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={personalInfo.lastName}
                        onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input 
                        id="dob" 
                        type="date"
                        value={personalInfo.dob}
                        onChange={(e) => setPersonalInfo({...personalInfo, dob: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select 
                        value={personalInfo.gender} 
                        onValueChange={(value) => setPersonalInfo({...personalInfo, gender: value})}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="non-binary">Non-binary</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input 
                      id="address" 
                      value={personalInfo.address}
                      onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        value={personalInfo.city}
                        onChange={(e) => setPersonalInfo({...personalInfo, city: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input 
                        id="state" 
                        value={personalInfo.state}
                        onChange={(e) => setPersonalInfo({...personalInfo, state: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input 
                        id="zipCode" 
                        value={personalInfo.zipCode}
                        onChange={(e) => setPersonalInfo({...personalInfo, zipCode: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select 
                      value={personalInfo.country} 
                      onValueChange={(value) => setPersonalInfo({...personalInfo, country: value})}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        {/* More countries would be added here */}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Ethnicity (Optional)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {ethnicityOptions.map((ethnicity) => (
                        <div key={ethnicity} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`ethnicity-${ethnicity}`} 
                            checked={personalInfo.ethnicity.includes(ethnicity)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setPersonalInfo({
                                  ...personalInfo, 
                                  ethnicity: [...personalInfo.ethnicity, ethnicity]
                                });
                              } else {
                                setPersonalInfo({
                                  ...personalInfo, 
                                  ethnicity: personalInfo.ethnicity.filter(e => e !== ethnicity)
                                });
                              }
                            }}
                            className="border-white/30 data-[state=checked]:bg-scholarship-accent data-[state=checked]:text-scholarship-background"
                          />
                          <Label htmlFor={`ethnicity-${ethnicity}`} className="text-sm font-normal">
                            {ethnicity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="firstGeneration" 
                      checked={personalInfo.firstGeneration}
                      onCheckedChange={(checked) => 
                        setPersonalInfo({...personalInfo, firstGeneration: !!checked})
                      }
                      className="border-white/30 data-[state=checked]:bg-scholarship-accent data-[state=checked]:text-scholarship-background"
                    />
                    <Label htmlFor="firstGeneration">
                      I am a first-generation college student (neither parent has a four-year college degree)
                    </Label>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      variant="outline" 
                      className="border-white/10 hover:bg-white/5"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveProfile}
                      className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90"
                    >
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Academic Information Tab */}
            <TabsContent value="academic">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookIcon className="h-5 w-5 mr-2 text-scholarship-accent" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="educationLevel">Current Education Level</Label>
                      <Select 
                        value={academicInfo.educationLevel} 
                        onValueChange={(value) => setAcademicInfo({...academicInfo, educationLevel: value})}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High School">High School</SelectItem>
                          <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                          <SelectItem value="Graduate">Graduate</SelectItem>
                          <SelectItem value="Doctoral">Doctoral</SelectItem>
                          <SelectItem value="Trade/Vocational">Trade/Vocational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="school">School/University</Label>
                      <Input 
                        id="school" 
                        value={academicInfo.school}
                        onChange={(e) => setAcademicInfo({...academicInfo, school: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="major">Major/Field of Study</Label>
                      <Input 
                        id="major" 
                        value={academicInfo.major}
                        onChange={(e) => setAcademicInfo({...academicInfo, major: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="minor">Minor (if applicable)</Label>
                      <Input 
                        id="minor" 
                        value={academicInfo.minor}
                        onChange={(e) => setAcademicInfo({...academicInfo, minor: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gpa">GPA</Label>
                      <Input 
                        id="gpa" 
                        value={academicInfo.gpa}
                        onChange={(e) => setAcademicInfo({...academicInfo, gpa: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="graduationDate">Expected Graduation Date</Label>
                      <Input 
                        id="graduationDate" 
                        type="month"
                        value={academicInfo.graduationDate}
                        onChange={(e) => setAcademicInfo({...academicInfo, graduationDate: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Test Scores (if applicable)</Label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="sat">SAT Score</Label>
                        <Input 
                          id="sat" 
                          value={academicInfo.testScores.sat}
                          onChange={(e) => setAcademicInfo({
                            ...academicInfo, 
                            testScores: {...academicInfo.testScores, sat: e.target.value}
                          })}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="act">ACT Score</Label>
                        <Input 
                          id="act" 
                          value={academicInfo.testScores.act}
                          onChange={(e) => setAcademicInfo({
                            ...academicInfo, 
                            testScores: {...academicInfo.testScores, act: e.target.value}
                          })}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gre">GRE Score (if graduate student)</Label>
                        <Input 
                          id="gre" 
                          value={academicInfo.testScores.gre}
                          onChange={(e) => setAcademicInfo({
                            ...academicInfo, 
                            testScores: {...academicInfo.testScores, gre: e.target.value}
                          })}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      variant="outline" 
                      className="border-white/10 hover:bg-white/5"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveProfile}
                      className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90"
                    >
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Activities & Interests Tab */}
            <TabsContent value="activities">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrophyIcon className="h-5 w-5 mr-2 text-scholarship-accent" />
                    Activities & Interests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Interests Section */}
                  <div className="space-y-4">
                    <Label>Academic Interests</Label>
                    <p className="text-sm text-scholarship-foreground/70">
                      Select academic fields that interest you. This helps us match you with relevant scholarships.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {interests.map((interest) => (
                        <div key={interest} className="flex items-center bg-white/10 rounded-full pl-3 pr-2 py-1">
                          <span className="text-sm mr-2">{interest}</span>
                          <button 
                            onClick={() => handleRemoveInterest(interest)}
                            className="h-5 w-5 rounded-full flex items-center justify-center hover:bg-white/10"
                          >
                            <XIcon className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Select onValueChange={handleAddInterest}>
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue placeholder="Add interest" />
                        </SelectTrigger>
                        <SelectContent>
                          {interestOptions.filter(option => !interests.includes(option)).map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {/* Custom interest input could be added here */}
                    </div>
                  </div>
                  
                  {/* Activities Section */}
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <Label>Extracurricular Activities</Label>
                    <p className="text-sm text-scholarship-foreground/70">
                      Select activities you're involved in. Many scholarships consider extracurricular participation.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activities.map((activity) => (
                        <div key={activity} className="flex items-center bg-white/10 rounded-full pl-3 pr-2 py-1">
                          <span className="text-sm mr-2">{activity}</span>
                          <button 
                            onClick={() => handleRemoveActivity(activity)}
                            className="h-5 w-5 rounded-full flex items-center justify-center hover:bg-white/10"
                          >
                            <XIcon className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Select onValueChange={handleAddActivity}>
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue placeholder="Add activity" />
                        </SelectTrigger>
                        <SelectContent>
                          {activityOptions.filter(option => !activities.includes(option)).map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {/* Custom activity input could be added here */}
                    </div>
                  </div>
                  
                  {/* Awards Section */}
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <Label>Honors & Awards</Label>
                      <Button size="sm" variant="outline" className="h-8 border-white/10 hover:bg-white/5">
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add Award
                      </Button>
                    </div>
                    <p className="text-sm text-scholarship-foreground/70">
                      List any honors, awards, or recognitions you've received.
                    </p>
                    
                    <div className="rounded-lg border border-white/10 overflow-hidden">
                      <div className="p-4 text-center text-scholarship-foreground/60">
                        No awards added yet. Click "Add Award" to get started.
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      variant="outline" 
                      className="border-white/10 hover:bg-white/5"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveProfile}
                      className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90"
                    >
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Financial Information Tab */}
            <TabsContent value="financial">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSignIcon className="h-5 w-5 mr-2 text-scholarship-accent" />
                    Financial Information (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-scholarship-foreground/80">
                    This information helps us match you with need-based scholarships.
                    All financial information is kept secure and confidential.
                  </p>
                  
                  <div className="space-y-4">
                    <Label>Are you interested in need-based scholarships?</Label>
                    <RadioGroup defaultValue="yes">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="yes" 
                          id="need-based-yes"
                          className="border-white/30 text-scholarship-accent"
                        />
                        <Label htmlFor="need-based-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="no" 
                          id="need-based-no"
                          className="border-white/30 text-scholarship-accent"
                        />
                        <Label htmlFor="need-based-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Have you completed the FAFSA? (U.S. students only)</Label>
                    <RadioGroup defaultValue="yes">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="yes" 
                          id="fafsa-yes"
                          className="border-white/30 text-scholarship-accent"
                        />
                        <Label htmlFor="fafsa-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="no" 
                          id="fafsa-no"
                          className="border-white/30 text-scholarship-accent"
                        />
                        <Label htmlFor="fafsa-no">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="not-applicable" 
                          id="fafsa-na"
                          className="border-white/30 text-scholarship-accent"
                        />
                        <Label htmlFor="fafsa-na">Not applicable</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="household-income">Estimated Annual Household Income (Optional)</Label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-25k">Under $25,000</SelectItem>
                        <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                        <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                        <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
                        <SelectItem value="over-100k">Over $100,000</SelectItem>
                        <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additional-info">Additional Financial Information (Optional)</Label>
                    <Textarea 
                      id="additional-info"
                      placeholder="Add any other relevant financial information that might help match you with scholarships."
                      className="bg-white/5 border-white/10 h-24"
                    />
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      variant="outline" 
                      className="border-white/10 hover:bg-white/5"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveProfile}
                      className="bg-scholarship-accent text-scholarship-background hover:bg-scholarship-accent/90"
                    >
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Save Changes
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

export default Profile;
