import { Users, BookOpen, TrendingUp, CheckCircle } from "lucide-react";
import { StatsCards } from "@/components/admin/StatsCards";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Admin <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Overview of your marketplace performance
        </p>
      </div>

      <StatsCards stats={stats} />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button asChild variant="outline" className="h-auto py-6 flex flex-col gap-2">
              <Link to="/admin/partners">
                <Users className="h-6 w-6" />
                <span>Manage Partners</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-6 flex flex-col gap-2">
              <Link to="/admin/courses">
                <BookOpen className="h-6 w-6" />
                <span>Manage Courses</span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        <RecentActivity />
      </div>
    </div>
  );
}
