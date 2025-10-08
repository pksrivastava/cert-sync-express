import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Globe,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";

const Home = () => {
  const features = [
    {
      icon: Users,
      title: "Partner Onboarding",
      description: "Streamlined self-service registration with admin approval workflow"
    },
    {
      icon: Globe,
      title: "SSO Integration",
      description: "Seamless external LMS connectivity with low-code setup"
    },
    {
      icon: BookOpen,
      title: "Course Management",
      description: "Comprehensive metadata curation and content organization"
    },
    {
      icon: TrendingUp,
      title: "Monetization",
      description: "Flexible paid/free models with enrollment controls"
    },
    {
      icon: ShieldCheck,
      title: "Access Control",
      description: "Role-based permissions and marketplace visibility settings"
    },
    {
      icon: Zap,
      title: "Auto Sync",
      description: "Real-time certificate and progress synchronization"
    }
  ];

  const benefits = [
    "Automated partner approval workflow",
    "Organize external courses effortlessly",
    "Flexible content monetization",
    "Real-time progress tracking",
    "Scalable integration architecture"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
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
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              The Future of
              <span className="gradient-text"> Learning Marketplaces</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empower your platform with seamless partner onboarding, flexible content integration, 
              and automated certification sync. Built for scale, designed for simplicity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="shadow-glow text-lg h-12 px-8">
                <Link to="/marketplace">
                  Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg h-12 px-8">
                <Link to="/partner-register">
                  Become a Partner
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Modern Learning
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build and manage a thriving educational marketplace
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-glow">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Built for Scale, Designed for Simplicity
              </h2>
              <p className="text-lg text-muted-foreground">
                Our marketplace platform eliminates manual workflows and technical complexity, 
                allowing you to focus on delivering exceptional learning experiences.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="shadow-glow">
                <Link to="/admin">
                  Access Admin Portal <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <Card className="glass-card p-8 shadow-xl">
              <CardContent className="space-y-6 p-0">
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">99.9%</div>
                  <div className="text-muted-foreground">Uptime SLA</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">10k+</div>
                  <div className="text-muted-foreground">Active Learners</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">500+</div>
                  <div className="text-muted-foreground">Partner Organizations</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">50ms</div>
                  <div className="text-muted-foreground">Average API Response</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Transform Your Learning Platform?
            </h2>
            <p className="text-xl text-white/90">
              Join hundreds of organizations already leveraging our marketplace to deliver 
              exceptional learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg h-12 px-8">
                <Link to="/partner-register">
                  Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8 bg-white/10 hover:bg-white/20 text-white border-white/30">
                <Link to="/marketplace">
                  Browse Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
