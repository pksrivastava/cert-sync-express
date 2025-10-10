import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Eye, Edit, Trash2, Plus, Upload, FileDown, Code, BarChart3, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const activeCourses = [
  {
    id: 1,
    title: "Advanced Cloud Architecture",
    partner: "TechLearn Academy",
    enrolled: 1234,
    revenue: 369666,
    completionRate: 78,
    avgRating: 4.5,
    status: "active"
  },
  {
    id: 2,
    title: "Data Science with Python",
    partner: "DataMasters",
    enrolled: 3421,
    revenue: 1365279,
    completionRate: 82,
    avgRating: 4.7,
    status: "active"
  },
  {
    id: 3,
    title: "Full Stack Web Development",
    partner: "Code Academy Pro",
    enrolled: 2156,
    revenue: 646800,
    completionRate: 71,
    avgRating: 4.6,
    status: "active"
  }
];

export default function Courses() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleCSVUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Courses Imported Successfully",
      description: `Processed ${selectedFile.name} - 45 courses added to marketplace`,
    });
    setSelectedFile(null);
  };

  const handleAPISetup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "API Integration Configured",
      description: "Your API endpoint has been validated and saved",
    });
  };

  const downloadCSVTemplate = () => {
    const csvContent = `course_id,title,description,partner_name,category,duration,price,enrollment_limit,tags
COURSE001,Sample Course Title,Detailed course description here,Partner Organization,Technology,30,499,1000,"react,javascript,web"`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'course_upload_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const sendPartnerEmail = (partnerId: number) => {
    toast({
      title: "Email Sent",
      description: "Partner has been notified about course statistics",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Course <span className="gradient-text">Management</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage course listings, bulk uploads, and learning analytics
          </p>
        </div>
        <Button className="shadow-glow">
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl">
          <TabsTrigger value="courses">Active Courses</TabsTrigger>
          <TabsTrigger value="bulk-upload">Bulk Upload</TabsTrigger>
          <TabsTrigger value="api">API Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Active Courses ({activeCourses.length})</CardTitle>
              <CardDescription>Currently published courses with learning statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCourses.map((course) => (
                  <Card key={course.id} className="border hover:border-primary/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <div>
                            <h4 className="font-semibold text-lg">{course.title}</h4>
                            <p className="text-sm text-muted-foreground">{course.partner}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Enrolled:</span>
                              <p className="font-medium">{course.enrolled.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Revenue:</span>
                              <p className="font-medium text-primary">₹{course.revenue.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Completion:</span>
                              <p className="font-medium">{course.completionRate}%</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Rating:</span>
                              <p className="font-medium">{course.avgRating} ⭐</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Stats
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => sendPartnerEmail(course.id)}
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </Button>
                          <Button asChild size="sm" variant="outline">
                            <Link to={`/admin/course/${course.id}`}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk-upload">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  CSV Bulk Upload
                </CardTitle>
                <CardDescription>
                  Upload multiple courses at once using CSV format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCSVUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="csv-file">Select CSV File</Label>
                    <Input
                      id="csv-file"
                      type="file"
                      accept=".csv"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                    <p className="text-xs text-muted-foreground">
                      CSV file should include: course_id, title, description, partner, category, duration, price, enrollment_limit
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Courses
                  </Button>

                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={downloadCSVTemplate}
                  >
                    <FileDown className="h-4 w-4 mr-2" />
                    Download CSV Template
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-2 bg-muted/30">
              <CardHeader>
                <CardTitle>CSV Format Guidelines</CardTitle>
                <CardDescription>Required and optional fields</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Required Fields:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• course_id (unique identifier)</li>
                    <li>• title (course name)</li>
                    <li>• description (detailed info)</li>
                    <li>• partner_name (organization)</li>
                    <li>• category (subject area)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Optional Fields:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• duration (in hours)</li>
                    <li>• price (0 for free courses)</li>
                    <li>• enrollment_limit (max learners)</li>
                    <li>• tags (comma-separated)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  API Integration Setup
                </CardTitle>
                <CardDescription>
                  Configure automated course content sync via API
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAPISetup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-endpoint">API Endpoint URL</Label>
                    <Input
                      id="api-endpoint"
                      type="url"
                      value={apiEndpoint}
                      onChange={(e) => setApiEndpoint(e.target.value)}
                      placeholder="https://api.partner.com/courses"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your API key"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sync-frequency">Sync Frequency</Label>
                    <select 
                      id="sync-frequency"
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="hourly">Every Hour</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="manual">Manual Only</option>
                    </select>
                  </div>

                  <Button type="submit" className="w-full">
                    Save API Configuration
                  </Button>

                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                  >
                    Test Connection
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-2 bg-muted/30">
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Expected JSON format for course data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-background rounded-lg p-4 font-mono text-xs overflow-x-auto">
                  <pre>{`{
  "courses": [
    {
      "id": "COURSE001",
      "title": "Course Title",
      "description": "Full description",
      "partner": "Organization Name",
      "category": "Technology",
      "duration": 30,
      "price": 499,
      "currency": "INR",
      "enrollment_limit": 1000,
      "tags": ["tag1", "tag2"],
      "metadata": {
        "level": "intermediate",
        "language": "en"
      }
    }
  ]
}`}</pre>
                </div>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/knowledge-centre">
                      View Full API Docs
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}