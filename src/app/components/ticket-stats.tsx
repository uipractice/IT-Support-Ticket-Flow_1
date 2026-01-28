import { Card, CardContent } from "@/app/components/ui/card";
import { Ticket } from "./ticket-form";
import { AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";

interface TicketStatsProps {
  tickets: Ticket[];
}

export function TicketStats({ tickets }: TicketStatsProps) {
  const stats = {
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in-progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  };

  const statItems = [
    { 
      label: "Open", 
      value: stats.open, 
      icon: AlertCircle, 
      color: "text-red-700",
      bgColor: "bg-red-100 border-red-200",
    },
    { 
      label: "In Progress", 
      value: stats.inProgress, 
      icon: Clock, 
      color: "text-purple-700",
      bgColor: "bg-purple-100 border-purple-200",
    },
    { 
      label: "Resolved", 
      value: stats.resolved, 
      icon: CheckCircle, 
      color: "text-green-700",
      bgColor: "bg-green-100 border-green-200",
    },
    { 
      label: "Closed", 
      value: stats.closed, 
      icon: XCircle, 
      color: "text-slate-700",
      bgColor: "bg-slate-100 border-slate-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat) => (
        <Card key={stat.label} className={`${stat.bgColor} border`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}