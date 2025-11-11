import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Globe, Search, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Platform {
  id: string;
  name: string;
  description: string | null;
  website_url: string | null;
  is_active: boolean;
  created_at: string;
}

export default function Platforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website_url: "",
  });

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    try {
      const { data, error } = await supabase
        .from("learning_platforms")
        .select("*")
        .order("name");

      if (error) throw error;
      setPlatforms(data || []);
    } catch (error) {
      console.error("Error fetching platforms:", error);
      toast.error("Failed to load platforms");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (editingPlatform) {
        const { error } = await supabase
          .from("learning_platforms")
          .update({
            name: formData.name,
            description: formData.description || null,
            website_url: formData.website_url || null,
          })
          .eq("id", editingPlatform.id);

        if (error) throw error;
        toast.success("Platform updated successfully");
      } else {
        const { error } = await supabase
          .from("learning_platforms")
          .insert([{
            name: formData.name,
            description: formData.description || null,
            website_url: formData.website_url || null,
          }]);

        if (error) throw error;
        toast.success("Platform created successfully");
      }

      setIsDialogOpen(false);
      resetForm();
      fetchPlatforms();
    } catch (error: any) {
      if (error.code === "23505") {
        toast.error("Platform name already exists");
      } else {
        toast.error("Failed to save platform");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleActive = async (platform: Platform) => {
    try {
      const { error } = await supabase
        .from("learning_platforms")
        .update({ is_active: !platform.is_active })
        .eq("id", platform.id);

      if (error) throw error;
      toast.success(`Platform ${platform.is_active ? 'deactivated' : 'activated'}`);
      fetchPlatforms();
    } catch (error) {
      toast.error("Failed to update platform");
    }
  };

  const handleDelete = async (platformId: string) => {
    if (!confirm("Are you sure? This will affect all courses on this platform.")) return;

    try {
      const { error } = await supabase
        .from("learning_platforms")
        .delete()
        .eq("id", platformId);

      if (error) throw error;
      toast.success("Platform deleted successfully");
      fetchPlatforms();
    } catch (error) {
      toast.error("Failed to delete platform");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      website_url: "",
    });
    setEditingPlatform(null);
  };

  const openEditDialog = (platform: Platform) => {
    setEditingPlatform(platform);
    setFormData({
      name: platform.name,
      description: platform.description || "",
      website_url: platform.website_url || "",
    });
    setIsDialogOpen(true);
  };

  const filteredPlatforms = platforms.filter((platform) =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Learning <span className="gradient-text">Platforms</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage external learning platforms ({platforms.length} total)
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-glow" onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Platform
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPlatform ? "Edit Platform" : "Add New Platform"}</DialogTitle>
              <DialogDescription>
                {editingPlatform ? "Update platform information" : "Add a new external learning platform"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Platform Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website_url">Website URL</Label>
                <Input
                  id="website_url"
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isProcessing}>
                  {isProcessing ? "Saving..." : editingPlatform ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search platforms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Platforms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlatforms.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="text-center py-8 text-muted-foreground">
              No platforms found
            </CardContent>
          </Card>
        ) : (
          filteredPlatforms.map((platform) => (
            <Card key={platform.id} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <CardTitle>{platform.name}</CardTitle>
                  </div>
                  <Badge variant={platform.is_active ? "default" : "secondary"}>
                    {platform.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                {platform.website_url && (
                  <CardDescription>
                    <a 
                      href={platform.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Visit Website <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {platform.description && (
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                )}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEditDialog(platform)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant={platform.is_active ? "outline" : "default"}
                    onClick={() => toggleActive(platform)}
                  >
                    {platform.is_active ? "Deactivate" : "Activate"}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(platform.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
