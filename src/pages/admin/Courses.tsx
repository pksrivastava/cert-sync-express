import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";

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
  },
  {
    id: 3,
    title: "Full Stack Web Development",
    partner: "Code Academy Pro",
    enrolled: 2156,
    revenue: 646800,
    status: "active"
  }
];

export default function Courses() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Course <span className="gradient-text">Management</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage course listings and metadata
          </p>
        </div>
        <Button className="shadow-glow">
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Active Courses ({activeCourses.length})</CardTitle>
          <CardDescription>Currently published courses on the marketplace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors">
                <div className="space-y-1 flex-1">
                  <h4 className="font-semibold text-lg">{course.title}</h4>
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
                  <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
