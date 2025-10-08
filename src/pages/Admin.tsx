import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  XCircle,
  Eye,
  Edit,
  Trash2,
  Link2
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const pendingPartners = [
  {
    id: 1,
    name: "TechLearn Academy",
    email: "contact@techlearn.com",
    submittedDate: "2025-01-05",
    courses: 12
  },
  {
    id: 2,
    name: "Business Pro Institute",
    email: "hello@businesspro.com",
    submittedDate: "2025-01-06",
    courses: 8
  }
];

const activeCourses = [
  {
    id: 1,
    title: "Advanced Cloud Architecture",
    partner: "TechLearn Academy",
    enrolled: 1234,
    revenue: 369666,
    status: "active"
  },
  {
    id: 2,
    title: "Data Science with Python",
    partner: "DataMasters",
    enrolled: 3421,
    revenue: 1365279,
    status: "active"
  }
];

const stats = [
  {
    title: "Total Partners",
    value: "145",
    change: "+12%",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Active Courses",
    value: "892",
    change: "+23%",
    icon: BookOpen,
    color: "text-purple-600"
  },
  {
    title: "Total Revenue",
    value: "$1.2M",
    change: "+34%",
    icon: TrendingUp,
    color: "text-cyan-600"
  },
  {
    title: "Enrollments",
    value: "45.2K",
    change: "+18%",
    icon: CheckCircle,
    color: "text-green-600"
  }
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage partners, courses, and marketplace settings
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="partners">Partners</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardDescription>{stat.title}</CardDescription>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <Badge variant="secondary" className="text-xs">
                        {stat.change} vs last month
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <Users className="h-6 w-6" />
                    <span>Review Partners</span>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <Link to="/admin/course/1">
                      <BookOpen className="h-6 w-6" />
                      <span>Edit Course</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <Link to="/admin/sso-integration">
                      <Link2 className="h-6 w-6" />
                      <span>SSO Setup</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 pb-3 border-b">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">New partner approved</p>
                        <p className="text-sm text-muted-foreground">TechLearn Academy joined the marketplace</p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pb-3 border-b">
                      <div className="p-2 rounded-lg bg-secondary/10">
                        <BookOpen className="h-4 w-4 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Course published</p>
                        <p className="text-sm text-muted-foreground">Advanced Cloud Architecture is now live</p>
                        <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <TrendingUp className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Milestone reached</p>
                        <p className="text-sm text-muted-foreground">45,000 total enrollments achieved</p>
                        <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Partners Tab */}
            <TabsContent value="partners" className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Pending Approvals ({pendingPartners.length})
                  </CardTitle>
                  <CardDescription>Review and approve new partner applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingPartners.map((partner) => (
                      <div key={partner.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <h4 className="font-semibold">{partner.name}</h4>
                          <p className="text-sm text-muted-foreground">{partner.email}</p>
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>Submitted: {partner.submittedDate}</span>
                            <span>{partner.courses} courses ready</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                          <Button size="sm" className="shadow-glow">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Active Courses</CardTitle>
                  <CardDescription>Manage course listings and metadata</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeCourses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <h4 className="font-semibold">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">{course.partner}</p>
                          <div className="flex gap-4 text-xs">
                            <span className="text-muted-foreground">
                              {course.enrolled.toLocaleString()} enrolled
                            </span>
                            <span className="text-primary font-medium">
                              ${course.revenue.toLocaleString()} revenue
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button asChild size="sm" variant="outline">
                            <Link to={`/admin/course/${course.id}`}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
