import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, Users, Droplet, Clock, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function Analytics() {
  const stats = [
    { label: "Active Donors", value: "1,284", change: "+12%", icon: Users, trend: "up" },
    { label: "Blood Units", value: "456", change: "+8%", icon: Droplet, trend: "up" },
    { label: "Pending Requests", value: "23", change: "-5%", icon: Clock, trend: "down" },
    { label: "Success Rate", value: "94%", change: "+2%", icon: TrendingUp, trend: "up" },
  ];

  const bloodTypeData = [
    { type: "A+", available: 85, needed: 120, percentage: 71 },
    { type: "O+", available: 120, needed: 150, percentage: 80 },
    { type: "B+", available: 65, needed: 90, percentage: 72 },
    { type: "AB+", available: 45, needed: 60, percentage: 75 },
    { type: "A-", available: 30, needed: 50, percentage: 60 },
    { type: "O-", available: 25, needed: 70, percentage: 36 },
    { type: "B-", available: 20, needed: 40, percentage: 50 },
    { type: "AB-", available: 15, needed: 30, percentage: 50 },
  ];

  const recentActivity = [
    { action: "New donation", donor: "John Doe", type: "O+", time: "5 mins ago" },
    { action: "Request fulfilled", recipient: "Jane Smith", type: "A+", time: "15 mins ago" },
    { action: "Urgent request", recipient: "Mike Johnson", type: "O-", time: "30 mins ago" },
    { action: "New registration", donor: "Sarah Williams", type: "B+", time: "1 hour ago" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time insights and performance metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label}
              className={`hover-lift animate-scale-in stagger-${index + 1} border-border bg-gradient-card`}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary animate-bounce-gentle" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <Badge 
                  variant={stat.trend === "up" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {stat.change} from last month
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Blood Type Inventory */}
        <Card className="animate-slide-in-left hover-glow border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-primary" />
              Blood Type Inventory
            </CardTitle>
            <CardDescription>Current availability vs demand</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {bloodTypeData.map((blood, index) => (
                <div 
                  key={blood.type}
                  className={`animate-fade-in stagger-${(index % 5) + 1}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="w-12 justify-center font-bold">
                        {blood.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {blood.available} / {blood.needed} units
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${
                      blood.percentage >= 70 ? 'text-medical-success' :
                      blood.percentage >= 50 ? 'text-medical-warning' :
                      'text-medical-emergency'
                    }`}>
                      {blood.percentage}%
                    </span>
                  </div>
                  <Progress 
                    value={blood.percentage} 
                    className="h-3"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="animate-slide-in-right border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary animate-pulse-urgent" />
              Recent Activity
            </CardTitle>
            <CardDescription>Live updates from the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-lg bg-secondary/50 border border-border hover-lift animate-scale-in stagger-${index + 1}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{activity.action}</span>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.donor || activity.recipient}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="border-medical-emergency/50 bg-gradient-card animate-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-medical-emergency">
              <AlertCircle className="h-5 w-5 animate-pulse-urgent" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm">O- blood type critically low (36% capacity)</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-medical-warning/10 border border-medical-warning/30">
                <AlertCircle className="h-4 w-4 text-medical-warning" />
                <span className="text-sm">A- blood type below optimal level (60% capacity)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
