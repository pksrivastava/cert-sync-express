import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Award, Upload, Eye, Download, Palette } from "lucide-react";

export default function CertificateTemplates() {
  const { toast } = useToast();
  const [selectedPartner, setSelectedPartner] = useState("all");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [template, setTemplate] = useState({
    headerText: "Certificate of Completion",
    bodyText: "This is to certify that",
    footerText: "has successfully completed",
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    fontFamily: "Inter"
  });

  const partners = [
    { id: "all", name: "Default Template" },
    { id: "1", name: "TechLearn Academy" },
    { id: "2", name: "DataMasters" },
    { id: "3", name: "Code Academy Pro" }
  ];

  const handleSave = () => {
    toast({
      title: "Template Saved",
      description: "Certificate template has been updated successfully",
    });
  };

  const handlePreview = () => {
    toast({
      title: "Opening Preview",
      description: "Certificate preview will open in new window",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Certificate <span className="gradient-text">Templates</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Customize co-branded certificate templates for partners
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Template Editor */}
        <Card className="lg:col-span-2 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Template Customization
            </CardTitle>
            <CardDescription>
              Design certificate layout and branding elements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="partner-select">Select Partner</Label>
              <select 
                id="partner-select"
                value={selectedPartner}
                onChange={(e) => setSelectedPartner(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {partners.map(partner => (
                  <option key={partner.id} value={partner.id}>{partner.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo-upload">Partner Logo</Label>
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
              />
              <p className="text-xs text-muted-foreground">
                Recommended: PNG or SVG, max 2MB, 300x100px
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primary-color"
                    type="color"
                    value={template.primaryColor}
                    onChange={(e) => setTemplate({...template, primaryColor: e.target.value})}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={template.primaryColor}
                    onChange={(e) => setTemplate({...template, primaryColor: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="secondary-color"
                    type="color"
                    value={template.secondaryColor}
                    onChange={(e) => setTemplate({...template, secondaryColor: e.target.value})}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={template.secondaryColor}
                    onChange={(e) => setTemplate({...template, secondaryColor: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <select 
                id="font-family"
                value={template.fontFamily}
                onChange={(e) => setTemplate({...template, fontFamily: e.target.value})}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="Playfair Display">Playfair Display</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="header-text">Header Text</Label>
              <Input
                id="header-text"
                value={template.headerText}
                onChange={(e) => setTemplate({...template, headerText: e.target.value})}
                placeholder="Certificate of Completion"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body-text">Body Text</Label>
              <Textarea
                id="body-text"
                value={template.bodyText}
                onChange={(e) => setTemplate({...template, bodyText: e.target.value})}
                placeholder="This is to certify that"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="footer-text">Footer Text</Label>
              <Input
                id="footer-text"
                value={template.footerText}
                onChange={(e) => setTemplate({...template, footerText: e.target.value})}
                placeholder="has successfully completed"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave} className="flex-1">
                Save Template
              </Button>
              <Button onClick={handlePreview} variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview & Options */}
        <div className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="aspect-[1.4/1] border-2 rounded-lg p-6 flex flex-col items-center justify-center text-center"
                style={{
                  background: `linear-gradient(135deg, ${template.primaryColor}15, ${template.secondaryColor}15)`,
                  borderColor: template.primaryColor
                }}
              >
                <div className="w-16 h-16 bg-muted rounded-full mb-4 flex items-center justify-center">
                  {logoFile ? (
                    <Award className="h-8 w-8" style={{ color: template.primaryColor }} />
                  ) : (
                    <Award className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <h3 
                  className="text-lg font-bold mb-2"
                  style={{ 
                    color: template.primaryColor,
                    fontFamily: template.fontFamily 
                  }}
                >
                  {template.headerText}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {template.bodyText}
                </p>
                <p className="text-xl font-bold mb-2">John Doe</p>
                <p className="text-xs text-muted-foreground">
                  {template.footerText}
                </p>
                <p className="text-sm font-semibold mt-2">Sample Course Title</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export as PDF
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Upload className="h-4 w-4 mr-2" />
                Import Template
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="h-4 w-4 mr-2" />
                Use Default
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Template Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Format:</span>
                <span className="font-medium">A4 Landscape</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resolution:</span>
                <span className="font-medium">300 DPI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Modified:</span>
                <span className="font-medium">Today</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}