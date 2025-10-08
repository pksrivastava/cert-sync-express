import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Save, 
  Eye, 
  Lock, 
  Unlock, 
  DollarSign, 
  Users, 
  Shield,
  Calendar,
  Tag,
  BookOpen,
  AlertCircle
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const CourseEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // Course metadata state
  const [courseData, setCourseData] = useState({
    title: "Advanced Cloud Architecture",
    shortDescription: "Master cloud infrastructure design patterns",
    fullDescription: "Comprehensive course covering cloud architecture, scalability, security, and best practices for building enterprise-grade applications.",
    category: "Technology",
    level: "Advanced",
    duration: "8 weeks",
    provider: "TechLearn Academy",
    tags: ["cloud", "architecture", "aws", "azure"],
  });

  // Access management state
  const [accessSettings, setAccessSettings] = useState({
    isPaid: true,
    price: 299,
    enrollmentLimit: 500,
    hasEnrollmentLimit: true,
    isPublic: true,
    allowedRoles: ["all"],
    requiresApproval: false,
    startDate: "2025-02-01",
    endDate: "",
  });

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Course Updated",
        description: "All changes have been saved successfully.",
      });
      setIsSaving(false);
    }, 1500);
  };

  const handlePublish = () => {
    toast({
      title: "Course Published",
      description: "The course is now live on the marketplace.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Edit <span className="gradient-text">Course Metadata</span>
              </h1>
              <p className="text-muted-foreground">
                Manage course details, pricing, and access controls
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate("/admin")}>
                Cancel
              </Button>
              <Button variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="shadow-glow gap-2">
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Course Details</TabsTrigger>
                  <TabsTrigger value="access">Access Control</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                </TabsList>

                {/* Course Details Tab */}
                <TabsContent value="details" className="space-y-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Basic Information
                      </CardTitle>
                      <CardDescription>
                        Core course metadata visible to learners
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Course Title *</Label>
                        <Input
                          id="title"
                          value={courseData.title}
                          onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                          placeholder="Enter course title"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shortDesc">Short Description *</Label>
                        <Input
                          id="shortDesc"
                          value={courseData.shortDescription}
                          onChange={(e) => setCourseData({...courseData, shortDescription: e.target.value})}
                          placeholder="Brief one-line description"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fullDesc">Full Description *</Label>
                        <Textarea
                          id="fullDesc"
                          value={courseData.fullDescription}
                          onChange={(e) => setCourseData({...courseData, fullDescription: e.target.value})}
                          placeholder="Detailed course description"
                          rows={5}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select value={courseData.category} onValueChange={(value) => setCourseData({...courseData, category: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Technology">Technology</SelectItem>
                              <SelectItem value="Business">Business</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                              <SelectItem value="Design">Design</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="level">Difficulty Level</Label>
                          <Select value={courseData.level} onValueChange={(value) => setCourseData({...courseData, level: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={courseData.duration}
                          onChange={(e) => setCourseData({...courseData, duration: e.target.value})}
                          placeholder="e.g., 8 weeks, 20 hours"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tags" className="flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          Tags (comma-separated)
                        </Label>
                        <Input
                          id="tags"
                          value={courseData.tags.join(", ")}
                          onChange={(e) => setCourseData({...courseData, tags: e.target.value.split(",").map(t => t.trim())})}
                          placeholder="cloud, architecture, aws"
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                          {courseData.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Access Control Tab */}
                <TabsContent value="access" className="space-y-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Visibility Settings
                      </CardTitle>
                      <CardDescription>
                        Control who can discover and enroll in this course
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Public Visibility</Label>
                          <p className="text-sm text-muted-foreground">
                            Make course discoverable in marketplace
                          </p>
                        </div>
                        <Switch
                          checked={accessSettings.isPublic}
                          onCheckedChange={(checked) => setAccessSettings({...accessSettings, isPublic: checked})}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Require Approval</Label>
                          <p className="text-sm text-muted-foreground">
                            Admin must approve enrollment requests
                          </p>
                        </div>
                        <Switch
                          checked={accessSettings.requiresApproval}
                          onCheckedChange={(checked) => setAccessSettings({...accessSettings, requiresApproval: checked})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Role-Based Access</Label>
                        <Select 
                          value={accessSettings.allowedRoles[0]} 
                          onValueChange={(value) => setAccessSettings({...accessSettings, allowedRoles: [value]})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="verified">Verified Users Only</SelectItem>
                            <SelectItem value="premium">Premium Members</SelectItem>
                            <SelectItem value="enterprise">Enterprise Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Enrollment Limits
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Enable Enrollment Limit</Label>
                          <p className="text-sm text-muted-foreground">
                            Set maximum number of learners
                          </p>
                        </div>
                        <Switch
                          checked={accessSettings.hasEnrollmentLimit}
                          onCheckedChange={(checked) => setAccessSettings({...accessSettings, hasEnrollmentLimit: checked})}
                        />
                      </div>

                      {accessSettings.hasEnrollmentLimit && (
                        <div className="space-y-2">
                          <Label htmlFor="enrollmentLimit">Maximum Enrollments</Label>
                          <Input
                            id="enrollmentLimit"
                            type="number"
                            value={accessSettings.enrollmentLimit}
                            onChange={(e) => setAccessSettings({...accessSettings, enrollmentLimit: parseInt(e.target.value)})}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Availability Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={accessSettings.startDate}
                            onChange={(e) => setAccessSettings({...accessSettings, startDate: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">End Date (Optional)</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={accessSettings.endDate}
                            onChange={(e) => setAccessSettings({...accessSettings, endDate: e.target.value})}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Pricing Tab */}
                <TabsContent value="pricing" className="space-y-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Monetization Settings
                      </CardTitle>
                      <CardDescription>
                        Configure course pricing and payment options
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <Label className="text-base font-semibold">Paid Course</Label>
                          <p className="text-sm text-muted-foreground">
                            Require payment for enrollment
                          </p>
                        </div>
                        <Switch
                          checked={accessSettings.isPaid}
                          onCheckedChange={(checked) => setAccessSettings({...accessSettings, isPaid: checked})}
                        />
                      </div>

                      {accessSettings.isPaid ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="price">Course Price (USD)</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="price"
                                type="number"
                                className="pl-10"
                                value={accessSettings.price}
                                onChange={(e) => setAccessSettings({...accessSettings, price: parseFloat(e.target.value)})}
                              />
                            </div>
                          </div>

                          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                <p className="font-medium text-sm">Revenue Split</p>
                                <p className="text-sm text-muted-foreground">
                                  Platform fee: 15% | Partner revenue: ${(accessSettings.price * 0.85).toFixed(2)} per enrollment
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="p-6 bg-muted/50 border rounded-lg text-center">
                          <Unlock className="h-12 w-12 mx-auto mb-3 text-primary" />
                          <p className="font-medium mb-1">Free Course</p>
                          <p className="text-sm text-muted-foreground">
                            This course will be available to all users at no cost
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Publishing Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge variant="secondary">Draft</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Last Updated</span>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                  <Button onClick={handlePublish} className="w-full shadow-glow">
                    Publish Course
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Course Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Enrollments</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion Rate</span>
                    <span className="font-semibold">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Rating</span>
                    <span className="font-semibold">4.8/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-semibold text-primary">$369,666</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary to-secondary text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Access Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    {accessSettings.isPublic ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    {accessSettings.isPublic ? "Public" : "Private"}
                  </p>
                  <p className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    {accessSettings.isPaid ? `$${accessSettings.price}` : "Free"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {accessSettings.hasEnrollmentLimit ? `Max ${accessSettings.enrollmentLimit} learners` : "Unlimited"}
                  </p>
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

export default CourseEditor;
