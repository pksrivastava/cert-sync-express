import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  BookOpen, Code, Zap, Database, Lock, Webhook, 
  FileJson, Terminal, ArrowRight, Download 
} from "lucide-react";

export default function KnowledgeCentre() {
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