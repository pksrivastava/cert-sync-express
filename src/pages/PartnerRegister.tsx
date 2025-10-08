import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Mail, Phone, Globe, FileText, CheckCircle2 } from "lucide-react";

const PartnerRegister = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Registration Submitted!",
        description: "Your partner application is pending admin approval. We'll contact you within 2-3 business days.",
      });
      setIsSubmitting(false);
      setFormData({
        organizationName: "",
        contactName: "",
        email: "",
        phone: "",
        website: "",
        description: ""
      });
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const benefits = [
    "Access to 10,000+ active learners",
    "Automated certificate synchronization",
    "Flexible monetization options",
    "Comprehensive analytics dashboard",
    "Dedicated partner support team",
    "SSO integration assistance"
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
                Become a <span className="gradient-text">Learning Partner</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join our marketplace and reach thousands of eager learners. Simple onboarding, 
                powerful features, and dedicated support.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Registration Form */}
              <Card className="lg:col-span-2 border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Partner Registration</CardTitle>
                  <CardDescription>
                    Complete the form below to start your partnership journey. 
                    Applications are typically reviewed within 2-3 business days.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="organizationName" className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Organization Name *
                      </Label>
                      <Input
                        id="organizationName"
                        value={formData.organizationName}
                        onChange={handleChange}
                        placeholder="Your Organization"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactName">Primary Contact Name *</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="contact@organization.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Website URL
                      </Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Organization Description *
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Tell us about your organization, the courses you offer, and why you'd like to partner with us..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full shadow-glow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Benefits Sidebar */}
              <div className="space-y-6">
                <Card className="glass-card border-2">
                  <CardHeader>
                    <CardTitle>Partner Benefits</CardTitle>
                    <CardDescription>
                      What you get as a marketplace partner
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-primary to-secondary text-white border-0">
                  <CardHeader>
                    <CardTitle>Questions?</CardTitle>
                    <CardDescription className="text-white/90">
                      Our team is here to help
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      partners@mspmarketplace.com
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      +1 (555) 123-4567
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PartnerRegister;
