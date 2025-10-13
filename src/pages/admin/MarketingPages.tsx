import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Layout, Save, Search, Filter, GripVertical, ExternalLink, Copy, MoreVertical, SortAsc } from "lucide-react";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortBy, setSortBy] = useState<"recent" | "title">("recent");
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
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

  const handleDuplicate = (page: MarketingPage) => {
    const newPage = {
      ...page,
      id: Date.now().toString(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: "draft" as const,
      lastEdited: new Date().toISOString().split("T")[0],
    };
    setPages([...pages, newPage]);
    toast.success("Page duplicated successfully");
  };

  const handleBulkDelete = () => {
    setPages(pages.filter((p) => !selectedPages.includes(p.id)));
    setSelectedPages([]);
    toast.success(`${selectedPages.length} pages deleted`);
  };

  const handleBulkPublish = () => {
    setPages(pages.map((p) => selectedPages.includes(p.id) ? { ...p, status: "published" as const } : p));
    setSelectedPages([]);
    toast.success(`${selectedPages.length} pages published`);
  };

  const togglePageSelection = (id: string) => {
    setSelectedPages(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const filteredPages = pages
    .filter((page) => {
      const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || page.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime();
      }
      return a.title.localeCompare(b.title);
    });

  const getSEOScore = () => {
    let score = 0;
    if (formData.metaTitle.length >= 30 && formData.metaTitle.length <= 60) score += 25;
    if (formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160) score += 25;
    if (formData.heroTitle) score += 25;
    if (formData.slug) score += 25;
    return score;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Marketing</span> Pages
          </h1>
          <p className="text-lg text-muted-foreground">
            Create and manage custom marketing pages • {pages.length} total pages
          </p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button size="lg" className="shadow-lg">
              <Plus className="mr-2 h-4 w-4" />
              Create Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Create Marketing Page</DialogTitle>
              <DialogDescription>
                Build SEO-optimized landing pages with professional templates
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO & Metadata</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6 py-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Page Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Why Partner With Us"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Internal reference name</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      placeholder="e.g., why-partner"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    />
                    <p className="text-xs text-muted-foreground">Will appear in URL: /{formData.slug || 'your-slug'}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Choose Template</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {templates.map((template) => (
                      <Card
                        key={template.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          formData.template === template.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setFormData({ ...formData, template: template.id })}
                      >
                        <CardContent className="p-4">
                          <Layout className="h-8 w-8 mb-2 text-primary" />
                          <h4 className="font-medium mb-1">{template.name}</h4>
                          <p className="text-xs text-muted-foreground">{template.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3 flex items-center justify-between">
                    <span>Hero Section</span>
                    <Badge variant="outline">Visible above fold</Badge>
                  </h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="hero-title">Hero Title *</Label>
                      <Input
                        id="hero-title"
                        placeholder="Compelling main headline"
                        value={formData.heroTitle}
                        onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                      <Textarea
                        id="hero-subtitle"
                        placeholder="Supporting text that explains the value proposition"
                        value={formData.heroSubtitle}
                        onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-image">Hero Image URL</Label>
                      <Input
                        id="hero-image"
                        placeholder="https://example.com/image.jpg"
                        value={formData.heroImage}
                        onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="cta-text">CTA Button Text</Label>
                        <Input
                          id="cta-text"
                          placeholder="Get Started"
                          value={formData.ctaText}
                          onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cta-link">CTA Link</Label>
                        <Input
                          id="cta-link"
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
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <GripVertical className="h-4 w-4" />
                        <span>Drag and drop sections to reorder • Add features, testimonials, stats, or custom content</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6 py-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="meta-title">Meta Title *</Label>
                      <span className={`text-xs ${formData.metaTitle.length >= 30 && formData.metaTitle.length <= 60 ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {formData.metaTitle.length}/60
                      </span>
                    </div>
                    <Input
                      id="meta-title"
                      placeholder="SEO-optimized title for search engines"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      maxLength={60}
                    />
                    <Progress 
                      value={(formData.metaTitle.length / 60) * 100} 
                      className="h-1 mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.metaTitle.length < 30 ? 'Too short - aim for 30-60 characters' : 
                       formData.metaTitle.length <= 60 ? 'Perfect length!' : 
                       'Too long - will be truncated in search results'}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="meta-description">Meta Description *</Label>
                      <span className={`text-xs ${formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160 ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {formData.metaDescription.length}/160
                      </span>
                    </div>
                    <Textarea
                      id="meta-description"
                      placeholder="Compelling description that will appear in search results"
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      maxLength={160}
                      rows={3}
                    />
                    <Progress 
                      value={(formData.metaDescription.length / 160) * 100} 
                      className="h-1 mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.metaDescription.length < 120 ? 'Add more detail - aim for 120-160 characters' : 
                       formData.metaDescription.length <= 160 ? 'Excellent length!' : 
                       'Too long - will be cut off in search results'}
                    </p>
                  </div>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-base">SEO Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Overall SEO Optimization</span>
                          <span className="font-bold text-lg">{getSEOScore()}%</span>
                        </div>
                        <Progress value={getSEOScore()} className="h-2" />
                        <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                          <div className={formData.metaTitle.length >= 30 && formData.metaTitle.length <= 60 ? 'text-green-600' : 'text-muted-foreground'}>
                            ✓ Meta title optimized
                          </div>
                          <div className={formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160 ? 'text-green-600' : 'text-muted-foreground'}>
                            ✓ Meta description optimized
                          </div>
                          <div className={formData.heroTitle ? 'text-green-600' : 'text-muted-foreground'}>
                            ✓ H1 heading present
                          </div>
                          <div className={formData.slug ? 'text-green-600' : 'text-muted-foreground'}>
                            ✓ Clean URL structure
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="py-4">
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Search Result Preview</h3>
                        <div className="bg-background border rounded-lg p-4 space-y-1">
                          <div className="text-sm text-blue-600">
                            yoursite.com/{formData.slug || 'your-slug'}
                          </div>
                          <div className="text-lg text-blue-700 font-medium">
                            {formData.metaTitle || 'Your page title will appear here'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formData.metaDescription || 'Your meta description will appear here in search results. Make it compelling to improve click-through rates.'}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Page Preview</h3>
                        <div className="border-2 rounded-lg p-8 bg-gradient-to-b from-background to-muted/20">
                          {formData.heroImage && (
                            <div className="w-full h-48 bg-muted rounded-lg mb-6 flex items-center justify-center">
                              <img src={formData.heroImage} alt="Hero" className="max-h-full object-cover rounded-lg" onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerHTML = '<div class="text-muted-foreground">Hero Image</div>';
                              }} />
                            </div>
                          )}
                          <h1 className="text-4xl font-bold mb-4">
                            {formData.heroTitle || 'Your hero title will appear here'}
                          </h1>
                          <p className="text-lg text-muted-foreground mb-6">
                            {formData.heroSubtitle || 'Your hero subtitle will appear here'}
                          </p>
                          {formData.ctaText && (
                            <Button size="lg">
                              {formData.ctaText}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={handleCreatePage} className="flex-1" size="lg">
                <Save className="mr-2 h-4 w-4" />
                Create & Publish
              </Button>
              <Button variant="outline" onClick={handleCreatePage} className="flex-1" size="lg">
                Save as Draft
              </Button>
            </div>

          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pages by title or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="title">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedPages.length > 0 && (
        <Card className="border-2 border-primary">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{selectedPages.length} page{selectedPages.length > 1 ? 's' : ''} selected</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleBulkPublish}>
                  Publish All
                </Button>
                <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete All
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedPages([])}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pages List */}
      <div className="space-y-3">
        {filteredPages.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="py-12 text-center">
              <Layout className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold text-lg mb-2">No pages found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || statusFilter !== "all" 
                  ? "Try adjusting your search or filters" 
                  : "Create your first marketing page to get started"}
              </p>
              {(!searchQuery && statusFilter === "all") && (
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Page
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredPages.map((page) => (
            <Card 
              key={page.id} 
              className={`border-2 transition-all hover:shadow-lg ${
                selectedPages.includes(page.id) ? 'ring-2 ring-primary' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex items-center pt-1">
                    <input
                      type="checkbox"
                      checked={selectedPages.includes(page.id)}
                      onChange={() => togglePageSelection(page.id)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <CardTitle className="text-xl">{page.title}</CardTitle>
                      <Badge 
                        variant={page.status === "published" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {page.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2 flex-wrap text-sm">
                      <span className="inline-flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        /{page.slug}
                      </span>
                      <span>•</span>
                      <span>{templates.find(t => t.id === page.template)?.name || page.template}</span>
                      <span>•</span>
                      <span>Updated {new Date(page.lastEdited).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hidden md:flex"
                    >
                      <Eye className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Preview</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditingPage(page.id)}
                      className="hidden md:flex"
                    >
                      <Edit className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Edit</span>
                    </Button>
                    {page.status === "draft" && (
                      <Button 
                        variant="default" 
                        size="sm" 
                        onClick={() => handlePublish(page.id)}
                        className="hidden md:flex"
                      >
                        Publish
                      </Button>
                    )}

                    {/* Mobile dropdown menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="md:hidden">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem className="md:hidden" onClick={() => setEditingPage(page.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        {page.status === "draft" && (
                          <DropdownMenuItem className="md:hidden" onClick={() => handlePublish(page.id)}>
                            <Save className="h-4 w-4 mr-2" />
                            Publish
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator className="md:hidden" />
                        <DropdownMenuItem onClick={() => handleDuplicate(page)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/${page.slug}`);
                          toast.success("Link copied to clipboard");
                        }}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeletePage(page.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>

      {/* Features & Tips */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Layout className="h-5 w-5 text-primary" />
              Template Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Choose from professional templates optimized for conversions
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>✓ Hero sections & CTAs</li>
              <li>✓ Feature showcases</li>
              <li>✓ Testimonials & reviews</li>
              <li>✓ Statistics displays</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 bg-gradient-to-br from-green-500/5 to-green-500/10">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Search className="h-5 w-5 text-green-600" />
              SEO Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Built-in SEO tools to rank higher in search results
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>✓ Meta tag optimization</li>
              <li>✓ Real-time SEO scoring</li>
              <li>✓ Mobile-responsive</li>
              <li>✓ Clean URL structure</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              Preview & Publish
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Preview changes before publishing to production
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>✓ Live preview mode</li>
              <li>✓ Search result preview</li>
              <li>✓ Draft management</li>
              <li>✓ One-click publishing</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
