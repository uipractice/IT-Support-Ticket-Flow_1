import { useState } from "react";
import {
  TicketForm,
  Ticket,
} from "@/app/components/ticket-form";
import { TicketList } from "@/app/components/ticket-list";
import { TicketDetail } from "@/app/components/ticket-detail";
import { TicketStats } from "@/app/components/ticket-stats";
import { UserMenu } from "@/app/components/user-menu";
import {
  NotificationsMenu,
  Notification,
} from "@/app/components/notifications-menu";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Toaster } from "@/app/components/ui/sonner";
import { toast } from "sonner";
import { Headset, Plus } from "lucide-react";

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "TKT-1001",
      title: "Unable to access email on mobile device",
      description:
        "I've been trying to set up my work email on my iPhone but keep getting an authentication error. I've tried resetting my password but the issue persists.",
      priority: "high",
      status: "in-progress",
      assignedAgent: "Sarah Johnson",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      updatedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      requesterName: "Michael Brown",
      requesterEmail: "michael.brown@company.com",
    },
    {
      id: "TKT-1002",
      title: "VPN connection keeps dropping",
      description:
        "The VPN disconnects every 10-15 minutes when working from home. This is affecting my productivity as I need constant access to internal resources.",
      priority: "critical",
      status: "open",
      createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      updatedAt: new Date(Date.now() - 45 * 60 * 1000),
      requesterName: "Lisa Anderson",
      requesterEmail: "lisa.anderson@company.com",
    },
    {
      id: "TKT-1003",
      title:
        "Request for software installation - Adobe Creative Suite",
      description:
        "I need Adobe Creative Suite installed on my workstation for the upcoming marketing campaign. Please let me know what approvals are needed.",
      priority: "medium",
      status: "in-progress",
      assignedAgent: "Mike Chen",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      requesterName: "Rachel Green",
      requesterEmail: "rachel.green@company.com",
    },
    {
      id: "TKT-1004",
      title: "Printer not connecting to network",
      description:
        "The printer in conference room B is showing as offline. I've tried restarting it but it's still not connecting to the network.",
      priority: "low",
      status: "resolved",
      assignedAgent: "Emily Rodriguez",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      requesterName: "David Wilson",
      requesterEmail: "david.wilson@company.com",
    },
    {
      id: "TKT-1005",
      title: "Laptop running very slow",
      description:
        "My laptop has been extremely slow for the past week. It takes forever to open applications and frequently freezes. I've already restarted it multiple times.",
      priority: "medium",
      status: "open",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      requesterName: "Jennifer Martinez",
      requesterEmail: "jennifer.martinez@company.com",
    },
    {
      id: "TKT-1006",
      title: "Access to shared drive needed",
      description:
        "I need access to the Finance shared drive for Q4 reports. My manager has already approved this request.",
      priority: "medium",
      status: "closed",
      assignedAgent: "David Kim",
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      requesterName: "Tom Harris",
      requesterEmail: "tom.harris@company.com",
    },
    {
      id: "TKT-1007",
      title: "Password reset not working",
      description:
        "The password reset link I received via email is not working. When I click on it, I get a 'link expired' error even though I just received the email.",
      priority: "high",
      status: "open",
      createdAt: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
      updatedAt: new Date(Date.now() - 20 * 60 * 1000),
      requesterName: "Sarah Thompson",
      requesterEmail: "sarah.thompson@company.com",
    },
  ]);
  const [selectedTicket, setSelectedTicket] =
    useState<Ticket | null>(null);
  const [notifications, setNotifications] = useState<
    Notification[]
  >([
    {
      id: "1",
      title: "Welcome to IT Support",
      message:
        "Start by creating your first ticket or managing existing ones.",
      timestamp: new Date(),
      read: false,
      type: "general",
    },
  ]);
  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] =
    useState(false);

  // Mock user data - in a real app, this would come from authentication
  const currentUser = {
    name: "John Smith",
    email: "john.smith@company.com",
    role: "Support Agent",
  };

  // Mock agents - in a real app, this would come from a backend
  const availableAgents = [
    "Sarah Johnson",
    "Mike Chen",
    "Emily Rodriguez",
    "David Kim",
  ];

  const handleCreateTicket = (
    ticketData: Omit<
      Ticket,
      "id" | "status" | "createdAt" | "updatedAt"
    >,
  ) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: `TKT-${Date.now()}`,
      status: "open",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTickets([newTicket, ...tickets]);

    // Add notification
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      title: "New Ticket Created",
      message: `Ticket ${newTicket.id}: ${newTicket.title}`,
      timestamp: new Date(),
      read: false,
      type: "ticket",
    };
    setNotifications([newNotification, ...notifications]);

    // Close dialog
    setIsNewTicketDialogOpen(false);

    toast.success("Ticket created successfully!", {
      description: `Ticket ${newTicket.id} has been created and is awaiting assignment.`,
    });
  };

  const handleUpdateStatus = (
    ticketId: string,
    status: Ticket["status"],
  ) => {
    setTickets(
      tickets.map((ticket) => {
        if (ticket.id === ticketId) {
          const updated = {
            ...ticket,
            status,
            updatedAt: new Date(),
          };
          if (selectedTicket?.id === ticketId) {
            setSelectedTicket(updated);
          }

          // Add notification
          const newNotification: Notification = {
            id: `notif-${Date.now()}`,
            title: "Status Updated",
            message: `Ticket ${ticketId} status changed to ${status.replace("-", " ")}`,
            timestamp: new Date(),
            read: false,
            type: "status",
          };
          setNotifications([newNotification, ...notifications]);

          return updated;
        }
        return ticket;
      }),
    );
    toast.success("Status updated", {
      description: `Ticket status changed to ${status.replace("-", " ")}`,
    });
  };

  const handleAssignAgent = (
    ticketId: string,
    agent: string,
  ) => {
    setTickets(
      tickets.map((ticket) => {
        if (ticket.id === ticketId) {
          const updated = {
            ...ticket,
            assignedAgent: agent,
            updatedAt: new Date(),
          };
          if (selectedTicket?.id === ticketId) {
            setSelectedTicket(updated);
          }

          // Add notification
          const newNotification: Notification = {
            id: `notif-${Date.now()}`,
            title: "Agent Assigned",
            message: `${agent} has been assigned to ticket ${ticketId}`,
            timestamp: new Date(),
            read: false,
            type: "assignment",
          };
          setNotifications([newNotification, ...notifications]);

          return updated;
        }
        return ticket;
      }),
    );
    toast.success("Agent assigned", {
      description: `${agent} has been assigned to this ticket`,
    });
  };

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, read: true })),
    );
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />

      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Headset className="h-8 w-8 text-[#8C40F5]" />
              <div>
                <h1 className="text-2xl font-bold">
                  IT Support Ticket System
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage and track support requests
                </p>
              </div>
            </div>

            {/* User and Notifications */}
            <div className="flex items-center gap-2">
              <NotificationsMenu
                notifications={notifications}
                onMarkAsRead={handleMarkNotificationAsRead}
                onMarkAllAsRead={
                  handleMarkAllNotificationsAsRead
                }
                onDismiss={handleDismissNotification}
              />
              <UserMenu
                userName={currentUser.name}
                userRole={currentUser.role}
                userEmail={currentUser.email}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <Button
              onClick={() => setIsNewTicketDialogOpen(true)}
              className="bg-[#8C40F5] hover:bg-[#7a35d9]"
            >
              <Plus className="h-4 w-4" />
              New Ticket
            </Button>
          </div>

          <TicketStats tickets={tickets} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TicketList
              tickets={tickets}
              onSelectTicket={handleSelectTicket}
              selectedTicketId={selectedTicket?.id}
            />
            <TicketDetail
              ticket={selectedTicket}
              onUpdateStatus={handleUpdateStatus}
              onAssignAgent={handleAssignAgent}
              availableAgents={availableAgents}
            />
          </div>
        </div>

        {/* New Ticket Dialog */}
        <Dialog
          open={isNewTicketDialogOpen}
          onOpenChange={setIsNewTicketDialogOpen}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Ticket</DialogTitle>
            </DialogHeader>
            <TicketForm onSubmit={handleCreateTicket} />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}