
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutDashboard, Monitor, Users, Clock, TrendingUp, TrendingDown } from "lucide-react";

const cards = [
  {
    title: "Active Workflows",
    value: 24,
    icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
    trend: "+17%",
    trendDir: "up" as const,
  },
  {
    title: "Total AI Agents",
    value: 58,
    icon: <Monitor className="w-6 h-6 text-secondary" />,
    trend: "+2%",
    trendDir: "up" as const,
  },
  {
    title: "Avg. Workflow Duration",
    value: "2m 45s",
    icon: <Clock className="w-6 h-6 text-tertiary" />,
    trend: "-8%",
    trendDir: "down" as const,
  },
  {
    title: "Human Approvals",
    value: 4,
    icon: <Users className="w-6 h-6 text-accent" />,
    trend: "Stable",
    trendDir: "none" as const,
  },
];

export default function DashboardOverviewSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, i) => (
          <Card key={i} className="relative">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-base font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className={`flex items-center text-xs mt-1 ${card.trendDir === 'up' ? 'text-green-600' : card.trendDir === 'down' ? 'text-red-600' : 'text-muted-foreground'}`}>
                {card.trendDir === "up" && <TrendingUp className="w-3 h-3 mr-1" />}
                {card.trendDir === "down" && <TrendingDown className="w-3 h-3 mr-1" />}
                {card.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
