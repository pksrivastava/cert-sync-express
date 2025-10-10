import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export function StatsCards({ stats }: { stats: StatCardProps[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-2 hover:shadow-glow transition-shadow">
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
  );
}
