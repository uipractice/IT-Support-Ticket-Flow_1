import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { Ticket } from "./ticket-form";
import { Calendar, Mail, User, ArrowRight, CheckCircle } from "lucide-react";
import { format } from "date-fns";

interface TicketDetailProps {
  ticket: Ticket | null;
  onUpdateStatus: (ticketId: string, status: Ticket["status"]) => void;
  onAssignAgent: (ticketId: string, agent: string) => void;
  availableAgents: string[];
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

const statusColors = {
  open: "bg-gray-100 text-gray-800",
  "in-progress": "bg-purple-100 text-purple-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-slate-100 text-slate-800",
};

export function TicketDetail({ ticket, onUpdateStatus, onAssignAgent, availableAgents }: TicketDetailProps) {
  if (!ticket) {
    return (
      <Card className="flex flex-col h-[calc(100vh-350px)] max-h-[800px]">
        <CardContent className="flex items-center justify-center h-full min-h-[400px]">
          <div className="text-center text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Select a ticket to view details</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusFlow = ["open", "in-progress", "resolved", "closed"];
  const currentIndex = statusFlow.indexOf(ticket.status);
  const nextStatus = currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : null;

  return (
    <Card className="flex flex-col h-[calc(100vh-350px)] max-h-[800px]">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle>{ticket.title}</CardTitle>
            <CardDescription className="mt-1">Ticket ID: {ticket.id}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className={priorityColors[ticket.priority]} variant="secondary">
              {ticket.priority}
            </Badge>
            <Badge className={statusColors[ticket.status]} variant="secondary">
              {ticket.status.replace("-", " ")}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-6">
        {/* Requester Information */}
        <div className="space-y-3">
          <h4 className="font-medium">Requester Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Name:</span>
              <span>{ticket.requesterName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Email:</span>
              <span>{ticket.requesterEmail}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Description */}
        <div className="space-y-2">
          <h4 className="font-medium">Description</h4>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{ticket.description}</p>
        </div>

        <Separator />

        {/* Timeline */}
        <div className="space-y-3">
          <h4 className="font-medium">Timeline</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Created:</span>
              <span>{format(ticket.createdAt, "PPp")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Last Updated:</span>
              <span>{format(ticket.updatedAt, "PPp")}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Agent Assignment */}
        <div className="space-y-3">
          <Label>Assign Agent</Label>
          <Select
            value={ticket.assignedAgent || "unassigned"}
            onValueChange={(value) => {
              if (value !== "unassigned") {
                onAssignAgent(ticket.id, value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {availableAgents.map((agent) => (
                <SelectItem key={agent} value={agent}>
                  {agent}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Status Actions */}
        <div className="space-y-3">
          <Label>Update Status</Label>
          <div className="flex flex-wrap gap-2">
            {statusFlow.map((status) => (
              <Button
                key={status}
                variant={ticket.status === status ? "default" : "outline"}
                size="sm"
                onClick={() => onUpdateStatus(ticket.id, status as Ticket["status"])}
              >
                {status.replace("-", " ")}
              </Button>
            ))}
          </div>
          {nextStatus && (
            <Button
              onClick={() => onUpdateStatus(ticket.id, nextStatus as Ticket["status"])}
              className="w-full bg-[#8C40F5] hover:bg-[#7a35d9]"
            >
              Move to {nextStatus.replace("-", " ")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}