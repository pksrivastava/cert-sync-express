import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, Filter, TrendingUp, Users, BookOpen, Award } from "lucide-react";
import { toast } from "sonner";

// Sample data - would come from backend in production
const partnerData = [
  { name: "TechLearn Academy", courses: 45, enrollments: 2340, revenue: 45000, completion: 78 },
  { name: "SkillBridge Institute", courses: 32, enrollments: 1890, revenue: 38000, completion: 82 },
  { name: "ProDev Training", courses: 28, enrollments: 1560, revenue: 31000, completion: 75 },
  { name: "GovSkill Platform", courses: 38, enrollments: 2100, revenue: 42000, completion: 80 },
  { name: "Career Advance", courses: 25, enrollments: 1320, revenue: 26000, completion: 73 },
];

const learnerData = [
  { month: "Jan", enrolled: 3200, completed: 2400, active: 2800 },
  { month: "Feb", enrolled: 3800, completed: 2900, active: 3200 },
  { month: "Mar", enrolled: 4200, completed: 3200, active: 3600 },
  { month: "Apr", enrolled: 4800, completed: 3700, active: 4100 },
  { month: "May", enrolled: 5400, completed: 4200, active: 4800 },
  { month: "Jun", enrolled: 6200, completed: 4800, active: 5500 },
];

const categoryData = [
  { name: "Digital Governance", value: 2400, color: "hsl(var(--primary))" },
  { name: "Public Policy", value: 1800, color: "hsl(var(--secondary))" },
  { name: "Leadership", value: 1600, color: "hsl(var(--accent))" },
  { name: "Technology", value: 2200, color: "hsl(221 83% 65%)" },
  { name: "Administration", value: 1900, color: "hsl(189 94% 60%)" },
];

const revenueData = [
  { month: "Jan", revenue: 125000, split: 87500 },
  { month: "Feb", revenue: 145000, split: 101500 },
  { month: "Mar", revenue: 168000, split: 117600 },
  { month: "Apr", revenue: 192000, split: 134400 },
  { month: "May", revenue: 215000, split: 150500 },
  { month: "Jun", revenue: 248000, split: 173600 },
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState("6months");
  const [selectedPartner, setSelectedPartner] = useState("all");
  const [customMetric, setCustomMetric] = useState("");

  const handleExport = (format: string) => {
    toast.success(`Exporting analytics report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Analytics</span> & Reporting
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive insights into platform performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport("csv")}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Custom Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Partner Filter</Label>
              <Select value={selectedPartner} onValueChange={setSelectedPartner}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Partners</SelectItem>
                  {partnerData.map((partner) => (
                    <SelectItem key={partner.name} value={partner.name}>
                      {partner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Custom Metric</Label>
              <Input
                placeholder="Enter custom metric..."
                value={customMetric}
                onChange={(e) => setCustomMetric(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="learners">Learners</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>Total Partners</CardDescription>
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">145</div>
                <p className="text-xs text-muted-foreground mt-1">+12% from last period</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>Active Courses</CardDescription>
                  <BookOpen className="h-5 w-5 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">892</div>
                <p className="text-xs text-muted-foreground mt-1">+23% from last period</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>Total Enrollments</CardDescription>
                  <Award className="h-5 w-5 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">45.2K</div>
                <p className="text-xs text-muted-foreground mt-1">+18% from last period</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>Completion Rate</CardDescription>
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground mt-1">+5% from last period</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Learner Trends</CardTitle>
                <CardDescription>Enrollment and completion over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={learnerData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="enrolled" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="completed" stroke="hsl(var(--secondary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="active" stroke="hsl(var(--accent))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Course Categories</CardTitle>
                <CardDescription>Distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Partners Tab */}
        <TabsContent value="partners" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Partner Performance</CardTitle>
              <CardDescription>Metrics by content partner</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={partnerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-15} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="courses" fill="hsl(var(--primary))" />
                  <Bar dataKey="enrollments" fill="hsl(var(--secondary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Detailed Partner Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Partner Name</th>
                      <th className="text-right p-3">Courses</th>
                      <th className="text-right p-3">Enrollments</th>
                      <th className="text-right p-3">Revenue</th>
                      <th className="text-right p-3">Completion %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partnerData.map((partner) => (
                      <tr key={partner.name} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{partner.name}</td>
                        <td className="p-3 text-right">{partner.courses}</td>
                        <td className="p-3 text-right">{partner.enrollments.toLocaleString()}</td>
                        <td className="p-3 text-right">${partner.revenue.toLocaleString()}</td>
                        <td className="p-3 text-right">{partner.completion}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learners Tab */}
        <TabsContent value="learners" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Learner Engagement Trends</CardTitle>
              <CardDescription>Government officials' learning activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={learnerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="enrolled" stroke="hsl(var(--primary))" strokeWidth={3} name="New Enrollments" />
                  <Line type="monotone" dataKey="completed" stroke="hsl(var(--secondary))" strokeWidth={3} name="Completed Courses" />
                  <Line type="monotone" dataKey="active" stroke="hsl(var(--accent))" strokeWidth={3} name="Active Learners" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Avg. Time to Complete</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold gradient-text">28 days</div>
                <p className="text-sm text-muted-foreground mt-2">Average completion time per course</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Active Learners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold gradient-text">5,500</div>
                <p className="text-sm text-muted-foreground mt-2">Currently engaged in learning</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Certificate Issued</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold gradient-text">18,200</div>
                <p className="text-sm text-muted-foreground mt-2">Total certificates awarded</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Revenue & Partner Splits</CardTitle>
              <CardDescription>Total revenue and automated payment distributions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Total Revenue" />
                  <Bar dataKey="split" fill="hsl(var(--secondary))" name="Partner Split (70%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Revenue Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Total Revenue (6 months)</span>
                  <span className="text-2xl font-bold">$1,093,000</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Platform Share (30%)</span>
                  <span className="text-2xl font-bold text-primary">$327,900</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Partner Share (70%)</span>
                  <span className="text-2xl font-bold text-secondary">$765,100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Avg. Monthly Growth</span>
                  <span className="text-2xl font-bold text-green-600">+18.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Payment Processing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Automated Splits</span>
                  <span className="text-xl font-bold text-green-600">Active</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Pending Payouts</span>
                  <span className="text-xl font-bold">$45,200</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Processed This Month</span>
                  <span className="text-xl font-bold">$248,000</span>
                </div>
                <div className="pt-2">
                  <Button className="w-full">Process Pending Payouts</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
