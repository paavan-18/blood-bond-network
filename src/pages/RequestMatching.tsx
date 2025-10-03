import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, MapPin, Clock, Zap, Phone, Mail, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RequestMatching() {
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);

  const matches = [
    {
      id: 1,
      recipient: "John Doe",
      bloodType: "O+",
      location: "City Hospital, 2.3 km away",
      urgency: "critical",
      matchScore: 98,
      compatibility: "Perfect Match",
      timeWindow: "Next 6 hours",
      units: 2,
      reason: "Emergency Surgery",
      contact: {
        phone: "+1 234-567-8900",
        email: "cityhospital@medical.com"
      }
    },
    {
      id: 2,
      recipient: "Jane Smith",
      bloodType: "O+",
      location: "Medical Center, 5.7 km away",
      urgency: "urgent",
      matchScore: 95,
      compatibility: "Excellent Match",
      timeWindow: "Next 24 hours",
      units: 1,
      reason: "Accident Victim",
      contact: {
        phone: "+1 234-567-8901",
        email: "medcenter@medical.com"
      }
    },
    {
      id: 3,
      recipient: "Mike Johnson",
      bloodType: "O+",
      location: "Community Hospital, 8.2 km away",
      urgency: "scheduled",
      matchScore: 87,
      compatibility: "Good Match",
      timeWindow: "Next 48 hours",
      units: 1,
      reason: "Planned Surgery",
      contact: {
        phone: "+1 234-567-8902",
        email: "community@medical.com"
      }
    },
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "text-medical-emergency bg-medical-emergency/10 border-medical-emergency/30";
      case "urgent":
        return "text-medical-warning bg-medical-warning/10 border-medical-warning/30";
      default:
        return "text-medical-trust bg-medical-trust/10 border-medical-trust/30";
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 95) return "bg-medical-success";
    if (score >= 85) return "bg-medical-warning";
    return "bg-medical-trust";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text mb-2">Smart Matching System</h1>
          <p className="text-muted-foreground">AI-powered donor-recipient matching</p>
        </div>

        {/* Alert for new matches */}
        <Alert className="border-primary/50 bg-primary/5 animate-glow">
          <Zap className="h-4 w-4 text-primary animate-pulse-urgent" />
          <AlertDescription className="text-foreground">
            <strong>3 new matches</strong> found based on your profile and location. Review and respond quickly!
          </AlertDescription>
        </Alert>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover-lift animate-scale-in stagger-1 bg-gradient-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Matches</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <Users className="h-8 w-8 text-primary animate-bounce-gentle" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-scale-in stagger-2 bg-gradient-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Distance</p>
                  <p className="text-2xl font-bold text-foreground">5.4 km</p>
                </div>
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-scale-in stagger-3 bg-gradient-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical Cases</p>
                  <p className="text-2xl font-bold text-medical-emergency">1</p>
                </div>
                <Zap className="h-8 w-8 text-medical-emergency animate-pulse-urgent" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-scale-in stagger-4 bg-gradient-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="text-2xl font-bold text-medical-success">24 hrs</p>
                </div>
                <Clock className="h-8 w-8 text-medical-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Match Cards */}
        <div className="space-y-4">
          {matches.map((match, index) => (
            <Card 
              key={match.id}
              className={`hover-lift animate-slide-in-left stagger-${index + 1} border-border transition-all duration-300 ${
                selectedMatch === match.id ? "ring-2 ring-primary shadow-medical" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl flex items-center gap-2">
                      {match.recipient}
                      <Badge variant="outline" className="font-bold">
                        {match.bloodType}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {match.location}
                    </CardDescription>
                  </div>
                  <Badge 
                    className={`${getUrgencyColor(match.urgency)} capitalize font-semibold`}
                  >
                    {match.urgency === "critical" && "🚨 "}
                    {match.urgency}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Match Score */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Match Score</span>
                    <span className="font-bold text-foreground">{match.matchScore}%</span>
                  </div>
                  <Progress 
                    value={match.matchScore} 
                    className={`h-3 ${getProgressColor(match.matchScore)}`}
                  />
                  <p className="text-xs text-muted-foreground">{match.compatibility}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-secondary/30 rounded-lg border border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Time Window</p>
                    <p className="font-medium text-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {match.timeWindow}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Units Needed</p>
                    <p className="font-medium text-foreground">{match.units} unit(s)</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Reason</p>
                    <p className="font-medium text-foreground">{match.reason}</p>
                  </div>
                </div>

                {/* Contact Info (shown when selected) */}
                {selectedMatch === match.id && (
                  <div className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20 animate-scale-in">
                    <p className="text-sm font-semibold text-foreground">Contact Information</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-primary" />
                        <a href={`tel:${match.contact.phone}`} className="text-foreground hover:text-primary">
                          {match.contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-primary" />
                        <a href={`mailto:${match.contact.email}`} className="text-foreground hover:text-primary">
                          {match.contact.email}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 gap-2"
                    onClick={() => setSelectedMatch(selectedMatch === match.id ? null : match.id)}
                    variant={selectedMatch === match.id ? "secondary" : "default"}
                  >
                    {selectedMatch === match.id ? "Hide Details" : "View Details"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  {match.urgency === "critical" && (
                    <Button variant="destructive" className="gap-2 animate-pulse-urgent">
                      <Zap className="h-4 w-4" />
                      Respond Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
