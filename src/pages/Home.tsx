import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { 
  BookOpen, Users, ShieldCheck, Zap, TrendingUp, Globe,
  ArrowRight, CheckCircle2, Building2, Mail, Phone, 
  FileText, Award, Rocket, HeadphonesIcon, DollarSign,
  Clock, Target
} from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";

const Home = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Registration Submitted!",
        description: "Your partner application is pending approval. We'll contact you within 2-3 business days.",
      });
      setIsSubmitting(false);
      setFormData({
        organizationName: "",
        contactName: "",
        email: "",
        phone: "",
        description: ""
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const partners = [
    "TechLearn Academy", "DataMasters", "Code Academy Pro", "CloudSkills Institute",
    "AI Learning Hub", "DevOps University", "CyberSec Academy", "Design Masters"
  ];

  const onboardingSteps = [
    { icon: FileText, title: "Submit Application", desc: "Fill out the partner registration form" },
    { icon: CheckCircle2, title: "Admin Review", desc: "Our team reviews within 2-3 days" },
    { icon: Globe, title: "SSO Setup", desc: "Connect your LMS via SSO integration" },
    { icon: Rocket, title: "Go Live", desc: "Start reaching thousands of learners" }
  ];

  const benefits = [
    { icon: Users, title: "10,000+ Active Learners", desc: "Access to engaged learning community" },
    { icon: Award, title: "Co-branded Certificates", desc: "Custom certificate templates with your branding" },
    { icon: DollarSign, title: "Revenue Sharing", desc: "Automated payment splits and global payment support" },
    { icon: TrendingUp, title: "Analytics Dashboard", desc: "Comprehensive learning statistics and insights" },
    { icon: Zap, title: "API Integration", desc: "Bulk content upload via CSV or API" },
    { icon: HeadphonesIcon, title: "Dedicated Support", desc: "Priority partner support team" }
  ];

  const whyPartner = [
    { icon: Target, title: "Expand Your Reach", desc: "Connect with thousands of eager learners across India through the iGOT Karmayogi Bharat platform" },
    { icon: ShieldCheck, title: "Trusted Platform", desc: "Part of Government of India's capacity building initiative for public servants" },
    { icon: Globe, title: "Seamless Integration", desc: "Easy SSO integration with your existing LMS infrastructure" },
    { icon: TrendingUp, title: "Growth Partnership", desc: "Grow together with transparent revenue sharing and automated payments" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with Inline Registration */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
            {/* Hero Content */}
            <div className="space-y-6 lg:pt-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Partner with
                <span className="gradient-text"> iGOT Karmayogi Bharat</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Join India's premier learning marketplace for government capacity building. 
                Reach thousands of public servants and contribute to nation-building.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="shadow-glow">
                  <Link to="/marketplace">
                    Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/knowledge-centre">
                    Developer Docs
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sticky Registration Form */}
            <Card className="border-2 shadow-xl glass-card lg:sticky lg:top-24">
              <CardHeader>
                <CardTitle className="text-2xl">Quick Partner Registration</CardTitle>
                <CardDescription>Start your partnership journey today</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@org.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Brief Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Tell us about your organization..."
                      rows={3}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full shadow-glow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Partner with iGOT Karmayogi Bharat?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join a transformative initiative empowering India's public service workforce
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyPartner.map((item, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-glow">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple Onboarding Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in 4 easy steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {onboardingSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border-2 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 text-white font-bold text-lg shadow-glow">
                      {index + 1}
                    </div>
                    <step.icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <CardDescription>{step.desc}</CardDescription>
                  </CardHeader>
                </Card>
                {index < onboardingSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2 text-primary h-6 w-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners Strip */}
      <section className="py-12 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Trusted by Leading Organizations</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="px-6 py-3 bg-background rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <span className="font-semibold text-muted-foreground">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You Get as a Partner
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and support for your success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <benefit.icon className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>{benefit.title}</CardTitle>
                  <CardDescription className="text-base">{benefit.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Onboarding Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How Will You Be Onboarded?
            </h2>
            
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <CardTitle>Application & Approval</CardTitle>
                      <CardDescription className="text-base mt-2">
                        Submit your registration form. Our admin team reviews applications within 2-3 business days. 
                        You'll receive email notification once approved.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <CardTitle>SSO Integration Setup</CardTitle>
                      <CardDescription className="text-base mt-2">
                        Connect your Learning Management System using our no-code SSO integration tool. 
                        Our technical team provides full support during setup.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <CardTitle>Content Upload</CardTitle>
                      <CardDescription className="text-base mt-2">
                        Upload your courses via CSV bulk upload or API integration. Set pricing, 
                        access controls, and enrollment limits as per your requirements.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                    <div>
                      <CardTitle>Certificate & Revenue Setup</CardTitle>
                      <CardDescription className="text-base mt-2">
                        Customize your co-branded certificate templates and configure revenue sharing models. 
                        Automated payment splits with support for multiple payment providers.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Get in Touch</CardTitle>
                <CardDescription className="text-lg">
                  Have questions? Our partnership team is here to help
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-primary to-secondary text-white border-0">
                    <CardHeader className="text-center">
                      <Mail className="h-8 w-8 mx-auto mb-2" />
                      <CardTitle className="text-lg">Email Us</CardTitle>
                      <CardDescription className="text-white/90 text-sm">
                        partners@igot.gov.in
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="bg-gradient-to-br from-primary to-secondary text-white border-0">
                    <CardHeader className="text-center">
                      <Phone className="h-8 w-8 mx-auto mb-2" />
                      <CardTitle className="text-lg">Call Us</CardTitle>
                      <CardDescription className="text-white/90 text-sm">
                        +91 11 2345 6789
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="bg-gradient-to-br from-primary to-secondary text-white border-0">
                    <CardHeader className="text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2" />
                      <CardTitle className="text-lg">Support Hours</CardTitle>
                      <CardDescription className="text-white/90 text-sm">
                        Mon-Fri: 9 AM - 6 PM IST
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;