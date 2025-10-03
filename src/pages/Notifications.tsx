import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  BellOff, 
  Check, 
  Droplet, 
  Heart, 
  MapPin, 
  MessageSquare, 
  Settings,
  Trash2,
  AlertCircle
} from "lucide-react";

export default function Notifications() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState<number | null>(null);

  const notifications = [
    {
      id: 1,
      type: "urgent",
      icon: AlertCircle,
      title: "Critical Blood Request",
      message: "O- blood urgently needed at City Hospital. You're a perfect match!",
      time: "5 minutes ago",
      read: false,
      action: "Respond Now"
    },
    {
      id: 2,
      type: "match",
      icon: Heart,
      title: "New Match Found",
      message: "You've been matched with a recipient 2.3 km away.",
      time: "1 hour ago",
      read: false,
      action: "View Details"
    },
    {
      id: 3,
      type: "reminder",
      icon: Droplet,
      title: "Donation Reminder",
      message: "You're eligible to donate again! Schedule your next donation.",
      time: "2 hours ago",
      read: true,
      action: "Schedule"
    },
    {
      id: 4,
      type: "message",
      icon: MessageSquare,
      title: "Thank You Message",
      message: "A recipient sent you a thank you message for your donation.",
      time: "1 day ago",
      read: true,
      action: "Read Message"
    },
    {
      id: 5,
      type: "location",
      icon: MapPin,
      title: "Nearby Blood Drive",
      message: "Blood donation camp happening this weekend at Community Center.",
      time: "2 days ago",
      read: true,
      action: "Get Directions"
    },
  ];

  const [notificationList, setNotificationList] = useState(notifications);

  const unreadCount = notificationList.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotificationList(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "border-medical-emergency/50 bg-medical-emergency/5";
      case "match":
        return "border-primary/50 bg-primary/5";
      case "reminder":
        return "border-medical-warning/50 bg-medical-warning/5";
      case "message":
        return "border-medical-trust/50 bg-medical-trust/5";
      default:
        return "border-border bg-card";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2 flex items-center gap-3">
              <Bell className="h-10 w-10 text-primary animate-bounce-gentle" />
              Notifications
            </h1>
            <p className="text-muted-foreground">
              Stay updated with important alerts and messages
            </p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-lg px-4 py-2 animate-pulse-urgent">
              {unreadCount} new
            </Badge>
          )}
        </div>

        {/* Settings Card */}
        <Card className="animate-scale-in border-border bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5 text-primary" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium text-foreground">Enable Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive alerts for urgent requests and matches
                </p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            <Separator />

            {notificationList.length > 0 && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="gap-2"
                >
                  <Check className="h-4 w-4" />
                  Mark All as Read
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-3">
          {notificationList.length === 0 ? (
            <Card className="border-border">
              <CardContent className="py-12 text-center">
                <BellOff className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No notifications yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  You'll receive notifications here when there's important news
                </p>
              </CardContent>
            </Card>
          ) : (
            notificationList.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <Card
                  key={notification.id}
                  className={`animate-slide-in-right stagger-${(index % 5) + 1} hover-lift transition-all duration-300 ${
                    getNotificationColor(notification.type)
                  } ${!notification.read ? "border-l-4 border-l-primary" : ""} ${
                    selectedNotification === notification.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${
                        notification.type === "urgent" ? "bg-medical-emergency/20" :
                        notification.type === "match" ? "bg-primary/20" :
                        notification.type === "reminder" ? "bg-medical-warning/20" :
                        "bg-medical-trust/20"
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          notification.type === "urgent" ? "text-medical-emergency animate-pulse-urgent" :
                          notification.type === "match" ? "text-primary" :
                          notification.type === "reminder" ? "text-medical-warning" :
                          "text-medical-trust"
                        }`} />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-foreground flex items-center gap-2">
                              {notification.title}
                              {!notification.read && (
                                <Badge variant="secondary" className="text-xs">New</Badge>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs gap-1"
                              >
                                <Check className="h-3 w-3" />
                                Mark as Read
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant={notification.type === "urgent" ? "destructive" : "default"}
                              onClick={() => setSelectedNotification(notification.id)}
                              className="text-xs"
                            >
                              {notification.action}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
