import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  BookOpen, Code, Zap, Database, Lock, Webhook, 
  FileJson, Terminal, ArrowRight, Download, Star, Users, Clock
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export default function KnowledgeCentre() {
  // Fetch featured courses
  const { data: courses = [] } = useQuery({
    queryKey: ['featured-courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*, partners(organization_name, logo_url), learning_platforms(name)')
        .eq('is_published', true)
        .order('rating', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch partners
  const { data: partners = [] } = useQuery({
    queryKey: ['active-partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('id, organization_name, logo_url, website')
        .eq('status', 'approved')
        .eq('is_active', true)
        .limit(8);
      
      if (error) throw error;
      return data || [];
    },
  });

  const apiDocs = [
    {
      icon: Webhook,
      title: "Course API",
      description: "Programmatically manage course content and metadata",
      endpoint: "POST /api/v1/courses"
    },
    {
      icon: Database,
      title: "Enrollment API",
      description: "Handle learner enrollments and track progress",
      endpoint: "GET /api/v1/enrollments"
    },
    {
      icon: Lock,
      title: "Authentication",
      description: "SSO integration and API key management",
      endpoint: "POST /api/v1/auth/token"
    },
    {
      icon: FileJson,
      title: "Certificate API",
      description: "Generate and retrieve completion certificates",
      endpoint: "GET /api/v1/certificates"
    }
  ];

  const guides = [
    {
      title: "Getting Started with SSO",
      description: "Step-by-step guide to integrate your LMS using SAML/OAuth",
      duration: "10 min read"
    },
    {
      title: "Bulk Course Upload",
      description: "Learn how to use CSV imports and API batch operations",
      duration: "8 min read"
    },
    {
      title: "Webhook Configuration",
      description: "Real-time notifications for enrollment and completion events",
      duration: "12 min read"
    },
    {
      title: "Revenue Sharing Setup",
      description: "Configure payment splits and payout schedules",
      duration: "7 min read"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Knowledge Centre & <span className="gradient-text">Developer Docs</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to integrate with iGOT Karmayogi Bharat marketplace. 
                API documentation, integration guides, and best practices.
              </p>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 max-w-3xl mx-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="api">API Reference</TabsTrigger>
                <TabsTrigger value="guides">Integration Guides</TabsTrigger>
                <TabsTrigger value="sdk">SDKs & Tools</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Featured Courses Section */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">Featured Courses</CardTitle>
                    <CardDescription className="text-base">
                      Top-rated courses from our partner platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      {courses.slice(0, 3).map((course) => (
                        <Link key={course.id} to="/marketplace">
                          <Card className="border hover:border-primary transition-all cursor-pointer h-full">
                            <CardHeader>
                              <div className="flex items-start justify-between mb-2">
                                <Badge variant="secondary">
                                  {course.learning_platforms?.name || 'Platform'}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span>{course.rating || 0}</span>
                                </div>
                              </div>
                              <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                              <CardDescription className="line-clamp-2">
                                {course.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{course.duration_hours}h</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  <span>{course.enrollment_count || 0}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                    <div className="text-center">
                      <Link to="/marketplace">
                        <Button>
                          View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Partner Platforms */}
                {partners.length > 0 && (
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-2xl">Partner Platforms</CardTitle>
                      <CardDescription className="text-base">
                        Trusted learning providers in our marketplace
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {partners.map((partner) => (
                          <a
                            key={partner.id}
                            href={partner.website || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-3 p-4 border rounded-lg hover:border-primary transition-all"
                          >
                            {partner.logo_url ? (
                              <img
                                src={partner.logo_url}
                                alt={partner.organization_name}
                                className="h-12 w-auto object-contain"
                              />
                            ) : (
                              <div className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center">
                                <BookOpen className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                            <span className="text-sm font-medium text-center line-clamp-2">
                              {partner.organization_name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">Integration Overview</CardTitle>
                    <CardDescription className="text-base">
                      Multiple ways to connect your content with our platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="border">
                        <CardHeader>
                          <Code className="h-10 w-10 text-primary mb-2" />
                          <CardTitle className="text-lg">RESTful API</CardTitle>
                          <CardDescription>
                            Full-featured REST API with JSON responses
                          </CardDescription>
                        </CardHeader>
                      </Card>

                      <Card className="border">
                        <CardHeader>
                          <Database className="h-10 w-10 text-primary mb-2" />
                          <CardTitle className="text-lg">CSV Bulk Upload</CardTitle>
                          <CardDescription>
                            Simple CSV import for batch course updates
                          </CardDescription>
                        </CardHeader>
                      </Card>

                      <Card className="border">
                        <CardHeader>
                          <Lock className="h-10 w-10 text-primary mb-2" />
                          <CardTitle className="text-lg">SSO Integration</CardTitle>
                          <CardDescription>
                            SAML 2.0 and OAuth 2.0 support for seamless auth
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="text-2xl">Quick Start</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-semibold mb-1">Get API Credentials</h4>
                        <p className="text-sm text-muted-foreground">Request API keys from the admin dashboard</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-semibold mb-1">Test Sandbox Environment</h4>
                        <p className="text-sm text-muted-foreground">Use sandbox.igot.gov.in for testing</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-semibold mb-1">Deploy to Production</h4>
                        <p className="text-sm text-muted-foreground">Move to production API after testing</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="api" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {apiDocs.map((api, index) => (
                    <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <api.icon className="h-10 w-10 text-primary mb-3" />
                        <CardTitle>{api.title}</CardTitle>
                        <CardDescription className="text-base">{api.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted rounded-lg p-3 font-mono text-sm mb-4">
                          {api.endpoint}
                        </div>
                        <Button variant="outline" className="w-full">
                          View Documentation <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Terminal className="h-5 w-5" />
                      Example API Request
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background rounded-lg p-4 font-mono text-sm overflow-x-auto border">
                      <pre>{`curl -X POST https://api.igot.gov.in/v1/courses \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Advanced Data Science",
    "description": "Learn advanced DS concepts",
    "partner_id": "your_partner_id",
    "category": "Technology",
    "duration": 40,
    "price": 999,
    "enrollment_limit": 500
  }'`}</pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="guides" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {guides.map((guide, index) => (
                    <Card key={index} className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <BookOpen className="h-8 w-8 text-primary" />
                          <span className="text-sm text-muted-foreground">{guide.duration}</span>
                        </div>
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <CardDescription className="text-base">{guide.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Webhook Configuration Guide */}
                <Card className="border-2 mt-6">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Webhook className="h-6 w-6 text-primary" />
                      Webhook Configuration - Course Completion
                    </CardTitle>
                    <CardDescription className="text-base">
                      Send course completion data to iGOT to automatically update learner progress and certificates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Webhook Endpoint</h3>
                      <div className="bg-muted rounded-lg p-3 font-mono text-sm break-all">
                        POST https://bupngjuqwrhdrqqooqbj.supabase.co/functions/v1/course-completion-webhook
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Required Payload</h3>
                      <div className="bg-background rounded-lg p-4 font-mono text-xs overflow-x-auto border">
                        <pre>{`{
  "user_id": "uuid-of-user",
  "course_id": "uuid-of-course-in-igot",
  "completion_status": "completed",
  "progress": 100,
  "score": 85,
  "certificate_url": "https://partner.com/cert/12345",
  "completed_at": "2024-11-18T10:30:00Z"
}`}</pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Field Descriptions</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex gap-2">
                          <Badge variant="outline">user_id</Badge>
                          <span className="text-muted-foreground">UUID of the learner in iGOT system (required)</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">course_id</Badge>
                          <span className="text-muted-foreground">UUID of the course in iGOT catalog (required)</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">completion_status</Badge>
                          <span className="text-muted-foreground">"completed", "failed", or "in_progress"</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">progress</Badge>
                          <span className="text-muted-foreground">Percentage (0-100)</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">certificate_url</Badge>
                          <span className="text-muted-foreground">Public URL to downloadable certificate (optional)</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Security (Recommended)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Include a signature header to verify webhook authenticity:
                      </p>
                      <div className="bg-background rounded-lg p-3 font-mono text-xs border">
                        X-Webhook-Signature: sha256_hash_of_secret+payload
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Example cURL Request</h3>
                      <div className="bg-background rounded-lg p-4 font-mono text-xs overflow-x-auto border">
                        <pre>{`curl -X POST \\
  https://bupngjuqwrhdrqqooqbj.supabase.co/functions/v1/course-completion-webhook \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "course_id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "completion_status": "completed",
    "progress": 100,
    "score": 92,
    "completed_at": "2024-11-18T10:30:00Z"
  }'`}</pre>
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        What Happens Automatically
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>✓ Learner's enrollment progress is updated</li>
                        <li>✓ Completion timestamp is recorded</li>
                        <li>✓ Course enrollment counter is incremented</li>
                        <li>✓ User's karma points increase by 10</li>
                        <li>✓ Annual enrollment count is tracked</li>
                        <li>✓ Certificate URL is stored (if provided)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sdk" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>Node.js SDK</CardTitle>
                      <CardDescription>Official JavaScript/TypeScript library</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-muted rounded p-2 font-mono text-sm">
                        npm install @igot/sdk
                      </div>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        View on npm
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>Python SDK</CardTitle>
                      <CardDescription>Official Python package</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-muted rounded p-2 font-mono text-sm">
                        pip install igot-sdk
                      </div>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        View on PyPI
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>Java SDK</CardTitle>
                      <CardDescription>Official Java library</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-muted rounded p-2 font-mono text-sm truncate">
                        com.igot:sdk:1.0.0
                      </div>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        View on Maven
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle>Postman Collection</CardTitle>
                    <CardDescription className="text-base">
                      Pre-configured API requests for quick testing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="shadow-glow">
                      <Download className="h-4 w-4 mr-2" />
                      Download Postman Collection
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}