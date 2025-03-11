
import { useState } from "react";
import { Bell, Calendar, MenuIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const AppHeader = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Upcoming Appointment",
      message: "You have an appointment with Dr. Smith tomorrow at 2:00 PM.",
      isRead: false,
    },
    {
      id: 2,
      title: "Prescription Refill",
      message: "Your prescription for Ibuprofen is ready for refill.",
      isRead: false,
    },
    {
      id: 3,
      title: "Test Results Available",
      message: "Your recent test results are now available in your patient portal.",
      isRead: true,
    },
  ]);

  const { toast } = useToast();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been marked as read.",
    });
  };

  const scheduleAppointment = () => {
    toast({
      title: "Appointment Scheduler",
      description: "Opening appointment scheduler.",
    });
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden mr-2"
              aria-label="Menu"
            >
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="px-2 py-6">
              <div className="mb-4 flex items-center">
                <div className="mr-2 rounded-md bg-primary/20 p-1">
                  <div className="h-6 w-6 text-primary">🏥</div>
                </div>
                <h2 className="text-lg font-semibold">HealthCare App</h2>
              </div>
              <nav className="grid gap-2">
                <Button variant="ghost" className="justify-start">
                  Dashboard
                </Button>
                <Button variant="ghost" className="justify-start">
                  Appointments
                </Button>
                <Button variant="ghost" className="justify-start">
                  Medical Records
                </Button>
                <Button variant="ghost" className="justify-start">
                  Messages
                </Button>
                <Button variant="ghost" className="justify-start">
                  Prescriptions
                </Button>
                <Button variant="ghost" className="justify-start">
                  Settings
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center">
          <div className="hidden md:flex mr-2 rounded-md bg-primary/20 p-1">
            <div className="h-6 w-6 text-primary">🏥</div>
          </div>
          <h1 className="font-semibold">Patient Dashboard</h1>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex"
            onClick={scheduleAppointment}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
                    variant="destructive"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  Mark all as read
                </Button>
              </div>
              <div className="space-y-3">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${
                        !notification.isRead ? "bg-accent" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No notifications
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
