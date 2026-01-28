import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Ticket } from "./ticket-form";
import { Clock, User, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TicketListProps {
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
  selectedTicketId?: string;
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  high: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  critical: "bg-red-100 text-red-800 hover:bg-red-200",
};

const statusColors = {
  open: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  "in-progress": "bg-purple-100 text-purple-800 hover:bg-purple-200",
  resolved: "bg-green-100 text-green-800 hover:bg-green-200",
  closed: "bg-slate-100 text-slate-800 hover:bg-slate-200",
};

export function TicketList({ tickets, onSelectTicket, selectedTicketId }: TicketListProps) {
  return (
    <Card className="flex flex-col h-[calc(100vh-350px)] max-h-[800px]">
      <CardHeader>
        <CardTitle>Support Tickets</CardTitle>
        <CardDescription>View and manage all support tickets</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-6 pb-6">
          <div className="space-y-2">
            {tickets.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No tickets yet. Create your first ticket to get started.</p>
              </div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => onSelectTicket(ticket)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                    selectedTicketId === ticket.id ? "bg-accent border-primary" : "bg-background"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-medium">{ticket.title}</h3>
                    <div className="flex gap-2 flex-shrink-0">
                      <Badge className={priorityColors[ticket.priority]} variant="secondary">
                        {ticket.priority}
                      </Badge>
                      <Badge className={statusColors[ticket.status]} variant="secondary">
                        {ticket.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {ticket.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{ticket.requesterName}</span>
                    </div>
                    {ticket.assignedAgent && (
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>Agent: {ticket.assignedAgent}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDistanceToNow(ticket.createdAt, { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}