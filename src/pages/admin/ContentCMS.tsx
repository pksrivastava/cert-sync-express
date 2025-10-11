import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Save, Eye, FileText, Image as ImageIcon, Palette } from "lucide-react";

export default function ContentCMS() {
  const [homeContent, setHomeContent] = useState({
    heroTitle: "Partner with iGOT Karmayogi Bharat",
    heroSubtitle: "Empowering government officials through quality continuing professional education",
    whyPartnerTitle: "Why Partner with Us",
    whyPartnerDesc: "Join India's premier platform for government official training and professional development",
    onboardingTitle: "Simple Onboarding Process",
    contactEmail: "partners@igot.gov.in",
    contactPhone: "+91-11-XXXX-XXXX"
  });

  const [marketplaceContent, setMarketplaceContent] = useState({
    title: "Government Training Marketplace",
    subtitle: "Discover certified courses for continuing professional education",
    featuredTitle: "Featured Training Programs"
  });

  const [knowledgeContent, setKnowledgeContent] = useState({
    title: "Knowledge Centre & Developer Resources",
    subtitle: "API documentation, integration guides, and best practices"
  });

  const handleSaveHome = () => {
    // Save to database/local storage
    toast.success("Home page content updated successfully");
  };

  const handleSaveMarketplace = () => {
    toast.success("Marketplace page content updated successfully");
  };

  const handleSaveKnowledge = () => {
    toast.success("Knowledge Centre content updated successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Content <span className="gradient-text">Management</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Customize page content and branding
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button asChild>
            <Link to="/admin/marketing-pages">
              <ExternalLink className="mr-2 h-4 w-4" />
              Marketing Pages
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="home" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="home">
            <FileText className="h-4 w-4 mr-2" />
            Home Page
          </TabsTrigger>
          <TabsTrigger value="marketplace">
            <ImageIcon className="h-4 w-4 mr-2" />
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="knowledge">
            <Palette className="h-4 w-4 mr-2" />
            Knowledge Centre
          </TabsTrigger>
          <TabsTrigger value="branding">
            <Palette className="h-4 w-4 mr-2" />
            Branding
          </TabsTrigger>
        </TabsList>

        {/* Home Page Content */}
        <TabsContent value="home" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Main banner content on the landing page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input
                  id="heroTitle"
                  value={homeContent.heroTitle}
                  onChange={(e) => setHomeContent({ ...homeContent, heroTitle: e.target.value })}
                  placeholder="Main hero title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                <Textarea
                  id="heroSubtitle"
                  value={homeContent.heroSubtitle}
                  onChange={(e) => setHomeContent({ ...homeContent, heroSubtitle: e.target.value })}
                  placeholder="Supporting text for hero section"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Partner Section</CardTitle>
              <CardDescription>Benefits and value proposition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whyTitle">Section Title</Label>
                <Input
                  id="whyTitle"
                  value={homeContent.whyPartnerTitle}
                  onChange={(e) => setHomeContent({ ...homeContent, whyPartnerTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whyDesc">Section Description</Label>
                <Textarea
                  id="whyDesc"
                  value={homeContent.whyPartnerDesc}
                  onChange={(e) => setHomeContent({ ...homeContent, whyPartnerDesc: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Partner support contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={homeContent.contactEmail}
                    onChange={(e) => setHomeContent({ ...homeContent, contactEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={homeContent.contactPhone}
                    onChange={(e) => setHomeContent({ ...homeContent, contactPhone: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveHome}>
              <Save className="h-4 w-4 mr-2" />
              Save Home Page Content
            </Button>
          </div>
        </TabsContent>

        {/* Marketplace Content */}
        <TabsContent value="marketplace" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Header</CardTitle>
              <CardDescription>Course marketplace page content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="marketplaceTitle">Page Title</Label>
                <Input
                  id="marketplaceTitle"
                  value={marketplaceContent.title}
                  onChange={(e) => setMarketplaceContent({ ...marketplaceContent, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marketplaceSubtitle">Page Subtitle</Label>
                <Textarea
                  id="marketplaceSubtitle"
                  value={marketplaceContent.subtitle}
                  onChange={(e) => setMarketplaceContent({ ...marketplaceContent, subtitle: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="featuredTitle">Featured Section Title</Label>
                <Input
                  id="featuredTitle"
                  value={marketplaceContent.featuredTitle}
                  onChange={(e) => setMarketplaceContent({ ...marketplaceContent, featuredTitle: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveMarketplace}>
              <Save className="h-4 w-4 mr-2" />
              Save Marketplace Content
            </Button>
          </div>
        </TabsContent>

        {/* Knowledge Centre Content */}
        <TabsContent value="knowledge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Centre Header</CardTitle>
              <CardDescription>Developer resources and documentation page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="knowledgeTitle">Page Title</Label>
                <Input
                  id="knowledgeTitle"
                  value={knowledgeContent.title}
                  onChange={(e) => setKnowledgeContent({ ...knowledgeContent, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="knowledgeSubtitle">Page Subtitle</Label>
                <Textarea
                  id="knowledgeSubtitle"
                  value={knowledgeContent.subtitle}
                  onChange={(e) => setKnowledgeContent({ ...knowledgeContent, subtitle: e.target.value })}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveKnowledge}>
              <Save className="h-4 w-4 mr-2" />
              Save Knowledge Centre Content
            </Button>
          </div>
        </TabsContent>

        {/* Branding */}
        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Branding</CardTitle>
              <CardDescription>Logo, colors, and visual identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Platform Logo</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Upload platform logo</p>
                  <Button variant="outline" size="sm">Choose File</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Favicon</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Upload favicon (32x32 or 64x64)</p>
                  <Button variant="outline" size="sm">Choose File</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Branding
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
