import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Layout, Save } from "lucide-react";
import { toast } from "sonner";

interface MarketingPage {
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft";
  template: string;
  lastEdited: string;
}

const templates = [
  { id: "hero-cta", name: "Hero + CTA", description: "Large hero section with call-to-action" },
  { id: "features", name: "Features Grid", description: "Feature cards with icons" },
  { id: "testimonials", name: "Testimonials", description: "Partner testimonials and reviews" },
  { id: "stats", name: "Statistics", description: "Key metrics and achievements" },
  { id: "custom", name: "Custom", description: "Build from scratch" },
];

export default function MarketingPages() {
  const [pages, setPages] = useState<MarketingPage[]>([
    {
      id: "1",
      title: "Partner Success Stories",
      slug: "success-stories",
      status: "published",
      template: "testimonials",
      lastEdited: "2024-01-15",
    },
    {
      id: "2",
      title: "Platform Benefits",
      slug: "benefits",
      status: "published",
      template: "features",
      lastEdited: "2024-01-12",
    },
    {
      id: "3",
      title: "Training Impact",
      slug: "impact",
      status: "draft",
      template: "stats",
      lastEdited: "2024-01-10",
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    template: "hero-cta",
    metaTitle: "",
    metaDescription: "",
    heroTitle: "",
    heroSubtitle: "",
    heroImage: "",
    ctaText: "",
    ctaLink: "",
    sections: [] as Array<{ type: string; content: string }>,
  });

  const handleCreatePage = () => {
    toast.success("Marketing page created successfully!");
    setIsCreating(false);
    setFormData({
      title: "",
      slug: "",
      template: "hero-cta",
      metaTitle: "",
      metaDescription: "",
      heroTitle: "",
      heroSubtitle: "",
      heroImage: "",
      ctaText: "",
      ctaLink: "",
      sections: [],
    });
  };

  const handleDeletePage = (id: string) => {
    setPages(pages.filter((p) => p.id !== id));
    toast.success("Page deleted successfully");
  };

  const handlePublish = (id: string) => {
    setPages(pages.map((p) => (p.id === id ? { ...p, status: "published" as const } : p)));
    toast.success("Page published successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Marketing</span> Pages
          </h1>
          <p className="text-lg text-muted-foreground">
            Create and manage custom marketing pages for your platform
          </p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Marketing Page</DialogTitle>
              <DialogDescription>
                Design a custom marketing page with drag-and-drop sections
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Page Title</Label>
                  <Input
                    placeholder="e.g., Why Partner With Us"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>URL Slug</Label>
                  <Input
                    placeholder="e.g., why-partner"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Page Template</Label>
                <Select value={formData.template} onValueChange={(value) => setFormData({ ...formData, template: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs text-muted-foreground">{template.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">SEO Settings</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Meta Title</Label>
                    <Input
                      placeholder="Page title for search engines (max 60 chars)"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      maxLength={60}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{formData.metaTitle.length}/60 characters</p>
                  </div>
                  <div>
                    <Label>Meta Description</Label>
                    <Textarea
                      placeholder="Brief description for search results (max 160 chars)"
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      maxLength={160}
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{formData.metaDescription.length}/160 characters</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Hero Section</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Hero Title</Label>
                    <Input
                      placeholder="Main headline"
                      value={formData.heroTitle}
                      onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Hero Subtitle</Label>
                    <Textarea
                      placeholder="Supporting text"
                      value={formData.heroSubtitle}
                      onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Hero Image URL</Label>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={formData.heroImage}
                      onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <Label>CTA Button Text</Label>
                      <Input
                        placeholder="Get Started"
                        value={formData.ctaText}
                        onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>CTA Link</Label>
                      <Input
                        placeholder="/partner-register"
                        value={formData.ctaLink}
                        onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Content Sections</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add custom sections like features, testimonials, stats, or rich text content
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreatePage} className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  Create & Publish
                </Button>
                <Button variant="outline" onClick={handleCreatePage} className="flex-1">
                  Save as Draft
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Existing Pages */}
      <div className="grid gap-4">
        {pages.map((page) => (
          <Card key={page.id} className="border-2">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle>{page.title}</CardTitle>
                    <Badge variant={page.status === "published" ? "default" : "secondary"}>
                      {page.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    /{page.slug} • {page.template} template • Last edited {page.lastEdited}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setEditingPage(page.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  {page.status === "draft" && (
                    <Button variant="default" size="sm" onClick={() => handlePublish(page.id)}>
                      Publish
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePage(page.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Page Builder Info */}
      <Card className="border-2 bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Page Builder Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Available Components:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Hero sections with customizable CTAs</li>
                <li>• Feature grids and icon cards</li>
                <li>• Testimonial carousels</li>
                <li>• Statistics and metrics displays</li>
                <li>• Rich text content blocks</li>
                <li>• Image galleries and media</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">SEO Optimized:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Automatic meta tag generation</li>
                <li>• Structured data markup</li>
                <li>• Mobile-responsive design</li>
                <li>• Fast loading and optimized images</li>
                <li>• Clean semantic HTML structure</li>
                <li>• Canonical URL management</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
