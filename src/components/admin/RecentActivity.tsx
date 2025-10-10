import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BookOpen, TrendingUp } from "lucide-react";

const activities = [
  {
    icon: CheckCircle,
    title: "New partner approved",
    description: "TechLearn Academy joined the marketplace",
    time: "2 hours ago",
    color: "primary"
  },
  {
    icon: BookOpen,
    title: "Course published",
    description: "Advanced Cloud Architecture is now live",
    time: "5 hours ago",
    color: "secondary"
  },
  {
    icon: TrendingUp,
    title: "Milestone reached",
    description: "45,000 total enrollments achieved",
    time: "1 day ago",
    color: "accent"
  }
];

export function RecentActivity() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest platform updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${index < activities.length - 1 ? 'pb-3 border-b' : ''}`}
            >
              <div className={`p-2 rounded-lg bg-${activity.color}/10`}>
                <activity.icon className={`h-4 w-4 text-${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
