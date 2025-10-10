import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, CheckCircle, XCircle } from "lucide-react";

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

const activePartners = [
  { id: 1, name: "TechLearn Academy", courses: 12, enrolled: 5234, status: "active" },
  { id: 2, name: "DataMasters", courses: 8, enrolled: 4521, status: "active" },
  { id: 3, name: "Code Academy Pro", courses: 15, enrolled: 8932, status: "active" },
];

export default function Partners() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Partner <span className="gradient-text">Management</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Review and manage marketplace partners
        </p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Pending Approvals ({pendingPartners.length})
          </CardTitle>
          <CardDescription>Review and approve new partner applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingPartners.map((partner) => (
              <div key={partner.id} className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors">
                <div className="space-y-1">
                  <h4 className="font-semibold text-lg">{partner.name}</h4>
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

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Active Partners ({activePartners.length})</CardTitle>
          <CardDescription>Currently active marketplace partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activePartners.map((partner) => (
              <div key={partner.id} className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors">
                <div className="space-y-1">
                  <h4 className="font-semibold text-lg">{partner.name}</h4>
                  <div className="flex gap-4 text-sm">
                    <span className="text-muted-foreground">{partner.courses} courses</span>
                    <span className="text-primary font-medium">{partner.enrolled.toLocaleString()} enrolled</span>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Badge variant="secondary">{partner.status}</Badge>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
