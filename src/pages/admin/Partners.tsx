import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Eye, Clock, Plus, Search, Filter, Upload, FileText, Edit, Trash2, Download, Building2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const partnerSchema = z.object({
  organization_name: z.string().min(1, "Organization name is required").max(70),
  partner_code: z.string().min(1).max(6).regex(/^[a-zA-Z0-9]+$/, "Only alphanumeric characters allowed"),
  contact_person: z.string().min(1).max(70),
  email: z.string().email("Invalid email format").max(255),
  phone: z.string().optional(),
  website: z.string().url("Invalid URL format").max(1024).optional().or(z.literal("")),
  description: z.string().max(500).optional(),
});

interface Partner {
  id: string;
  organization_name: string;
  partner_code: string | null;
  contact_person: string;
  email: string;
  phone: string | null;
  website: string | null;
  description: string | null;
  status: string;
  is_active: boolean;
  submitted_at: string;
  reviewed_at: string | null;
  logo_url: string | null;
  agreement_url: string | null;
  rejection_reason: string | null;
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState("submitted_at");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [agreementFile, setAgreementFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    organization_name: "",
    partner_code: "",
    contact_person: "",
    email: "",
    phone: "",
    website: "",
    description: "",
  });
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error("Error fetching partners:", error);
      toast.error("Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File, bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const validatedData = partnerSchema.parse(formData);
      
      let logoUrl = editingPartner?.logo_url;
      let agreementUrl = editingPartner?.agreement_url;

      if (logoFile) {
        const logoPath = `${validatedData.partner_code}/${Date.now()}_${logoFile.name}`;
        logoUrl = await uploadFile(logoFile, "partner-logos", logoPath);
      }

      if (agreementFile) {
        const agreementPath = `${validatedData.partner_code}/${Date.now()}_${agreementFile.name}`;
        agreementUrl = await uploadFile(agreementFile, "partner-agreements", agreementPath);
      }

      if (editingPartner) {
        const { error } = await supabase
          .from("partners")
          .update({
            ...validatedData,
            logo_url: logoUrl,
            agreement_url: agreementUrl,
          })
          .eq("id", editingPartner.id);

        if (error) throw error;
        toast.success("Partner updated successfully");
      } else {
        const { error } = await supabase
          .from("partners")
          .insert([{
            organization_name: validatedData.organization_name,
            partner_code: validatedData.partner_code,
            contact_person: validatedData.contact_person,
            email: validatedData.email,
            phone: validatedData.phone || null,
            website: validatedData.website || null,
            description: validatedData.description || null,
            logo_url: logoUrl || null,
            agreement_url: agreementUrl || null,
            status: "pending",
          }]);

        if (error) throw error;
        toast.success("Partner added successfully");
      }

      setIsDialogOpen(false);
      resetForm();
      fetchPartners();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else if (error.code === "23505") {
        toast.error("Partner code already exists");
      } else {
        toast.error("Failed to save partner");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApprove = async (partner: Partner) => {
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from("partners")
        .update({ 
          status: "approved", 
          is_active: true,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", partner.id);

      if (error) throw error;

      await supabase.from("partner_reviews").insert([{
        partner_id: partner.id,
        action: "approved",
        reviewed_by: (await supabase.auth.getUser()).data.user?.id || "",
      }]);

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: partner.email,
          type: "approval",
          partnerName: partner.organization_name
        })
      });

      if (response.ok) {
        toast.success(`${partner.organization_name} approved and notified via email`);
      } else {
        toast.success(`${partner.organization_name} approved (email notification failed)`);
      }
      
      fetchPartners();
    } catch (error) {
      toast.error("Failed to approve partner");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedPartner || !rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from("partners")
        .update({ 
          status: "rejected",
          rejection_reason: rejectionReason,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", selectedPartner.id);

      if (error) throw error;

      await supabase.from("partner_reviews").insert([{
        partner_id: selectedPartner.id,
        action: "rejected",
        comments: rejectionReason,
        reviewed_by: (await supabase.auth.getUser()).data.user?.id || "",
      }]);

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedPartner.email,
          type: "rejection",
          partnerName: selectedPartner.organization_name,
          reason: rejectionReason
        })
      });

      if (response.ok) {
        toast.success(`${selectedPartner.organization_name} rejected and notified via email`);
      } else {
        toast.success(`${selectedPartner.organization_name} rejected (email notification failed)`);
      }
      
      setRejectionDialogOpen(false);
      setRejectionReason("");
      setSelectedPartner(null);
      fetchPartners();
    } catch (error) {
      toast.error("Failed to reject partner");
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleActive = async (partner: Partner) => {
    try {
      const { error } = await supabase
        .from("partners")
        .update({ is_active: !partner.is_active })
        .eq("id", partner.id);

      if (error) throw error;
      toast.success(`Partner ${partner.is_active ? 'deactivated' : 'activated'}`);
      fetchPartners();
    } catch (error) {
      toast.error("Failed to update partner status");
    }
  };

  const handleDelete = async (partnerId: string) => {
    if (!confirm("Are you sure you want to delete this partner?")) return;

    try {
      const { error } = await supabase
        .from("partners")
        .delete()
        .eq("id", partnerId);

      if (error) throw error;
      toast.success("Partner deleted successfully");
      fetchPartners();
    } catch (error) {
      toast.error("Failed to delete partner");
    }
  };

  const resetForm = () => {
    setFormData({
      organization_name: "",
      partner_code: "",
      contact_person: "",
      email: "",
      phone: "",
      website: "",
      description: "",
    });
    setLogoFile(null);
    setAgreementFile(null);
    setEditingPartner(null);
  };

  const openEditDialog = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      organization_name: partner.organization_name,
      partner_code: partner.partner_code || "",
      contact_person: partner.contact_person,
      email: partner.email,
      phone: partner.phone || "",
      website: partner.website || "",
      description: partner.description || "",
    });
    setIsDialogOpen(true);
  };

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch = 
      partner.organization_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.partner_code?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || partner.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const pendingPartners = filteredPartners.filter(p => p.status === "pending");
  const approvedPartners = filteredPartners.filter(p => p.status === "approved");

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Partner <span className="gradient-text">Management</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Review and manage marketplace partners ({partners.length} total)
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-glow" onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Onboard Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPartner ? "Edit Partner" : "Onboard New Partner"}</DialogTitle>
              <DialogDescription>
                {editingPartner ? "Update partner information" : "Add a new content partner to the marketplace"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organization_name">Organization Name *</Label>
                  <Input
                    id="organization_name"
                    value={formData.organization_name}
                    onChange={(e) => setFormData({...formData, organization_name: e.target.value})}
                    maxLength={70}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partner_code">Partner Code * (6 chars)</Label>
                  <Input
                    id="partner_code"
                    value={formData.partner_code}
                    onChange={(e) => setFormData({...formData, partner_code: e.target.value.toUpperCase()})}
                    maxLength={6}
                    pattern="[A-Z0-9]+"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_person">Contact Person *</Label>
                  <Input
                    id="contact_person"
                    value={formData.contact_person}
                    onChange={(e) => setFormData({...formData, contact_person: e.target.value})}
                    maxLength={70}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    maxLength={1024}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  maxLength={500}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logo">Partner Logo (JPG, PNG, max 5MB)</Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                  />
                  {editingPartner?.logo_url && (
                    <p className="text-xs text-muted-foreground">Current logo uploaded</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agreement">Agreement (PDF, max 100MB)</Label>
                  <Input
                    id="agreement"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setAgreementFile(e.target.files?.[0] || null)}
                  />
                  {editingPartner?.agreement_url && (
                    <p className="text-xs text-muted-foreground">Current agreement uploaded</p>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isProcessing}>
                  {isProcessing ? "Saving..." : editingPartner ? "Update Partner" : "Add Partner"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pending Approvals */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Pending Approvals ({pendingPartners.length})
          </CardTitle>
          <CardDescription>Review and approve new partner applications</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingPartners.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending approvals
            </div>
          ) : (
            <div className="space-y-4">
              {pendingPartners.map((partner) => (
                <div key={partner.id} className="flex items-start justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors">
                  <div className="flex gap-4 flex-1">
                    {partner.logo_url && (
                      <img src={partner.logo_url} alt={partner.organization_name} className="w-16 h-16 object-contain rounded" />
                    )}
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-lg">{partner.organization_name}</h4>
                        {partner.partner_code && (
                          <Badge variant="outline">{partner.partner_code}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{partner.email}</p>
                      <p className="text-sm">{partner.contact_person}</p>
                      {partner.description && (
                        <p className="text-sm text-muted-foreground mt-2">{partner.description}</p>
                      )}
                      <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                        <span>Submitted: {new Date(partner.submitted_at).toLocaleDateString()}</span>
                        {partner.website && (
                          <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Visit Website
                          </a>
                        )}
                        {partner.agreement_url && (
                          <a href={partner.agreement_url} target="_blank" className="text-primary hover:underline flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            Agreement
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="shadow-glow"
                      onClick={() => handleApprove(partner)}
                      disabled={isProcessing}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => {
                        setSelectedPartner(partner);
                        setRejectionDialogOpen(true);
                      }}
                      disabled={isProcessing}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approved Partners */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-success" />
            Approved Partners ({approvedPartners.length})
          </CardTitle>
          <CardDescription>Currently approved marketplace partners</CardDescription>
        </CardHeader>
        <CardContent>
          {approvedPartners.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No approved partners yet
            </div>
          ) : (
            <div className="space-y-4">
              {approvedPartners.map((partner) => (
                <div key={partner.id} className="flex items-start justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors">
                  <div className="flex gap-4 flex-1">
                    {partner.logo_url && (
                      <img src={partner.logo_url} alt={partner.organization_name} className="w-16 h-16 object-contain rounded" />
                    )}
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-lg">{partner.organization_name}</h4>
                        {partner.partner_code && (
                          <Badge variant="outline">{partner.partner_code}</Badge>
                        )}
                        <Badge variant={partner.is_active ? "default" : "secondary"}>
                          {partner.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{partner.email}</p>
                      <p className="text-sm">{partner.contact_person}</p>
                      {partner.description && (
                        <p className="text-sm text-muted-foreground mt-2">{partner.description}</p>
                      )}
                      <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                        <span>Approved: {partner.reviewed_at ? new Date(partner.reviewed_at).toLocaleDateString() : "N/A"}</span>
                        {partner.website && (
                          <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Visit Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openEditDialog(partner)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant={partner.is_active ? "outline" : "default"}
                      onClick={() => toggleActive(partner)}
                    >
                      {partner.is_active ? "Deactivate" : "Activate"}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDelete(partner.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rejection Dialog */}
      <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Partner Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting {selectedPartner?.organization_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectionDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={isProcessing || !rejectionReason.trim()}
            >
              {isProcessing ? "Rejecting..." : "Reject Partner"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
