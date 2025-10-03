import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, Search, Filter, Award, Heart } from "lucide-react";

export default function DonationHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const donations = [
    {
      id: 1,
      date: "2025-01-15",
      type: "Whole Blood",
      bloodType: "O+",
      quantity: "450ml",
      location: "City Hospital",
      status: "completed",
      recipient: "Emergency Ward",
      impact: "Helped 3 patients"
    },
    {
      id: 2,
      date: "2024-12-20",
      type: "Platelets",
      bloodType: "O+",
      quantity: "1 unit",
      location: "Central Blood Bank",
      status: "completed",
      recipient: "Cancer Patient",
      impact: "Life-saving donation"
    },
    {
      id: 3,
      date: "2024-11-10",
      type: "Whole Blood",
      bloodType: "O+",
      quantity: "450ml",
      location: "Medical Center",
      status: "completed",
      recipient: "Accident Victim",
      impact: "Critical care support"
    },
    {
      id: 4,
      date: "2024-10-05",
      type: "Plasma",
      bloodType: "O+",
      quantity: "600ml",
      location: "City Hospital",
      status: "completed",
      recipient: "COVID-19 Patient",
      impact: "Recovery support"
    },
  ];

  const stats = {
    totalDonations: 24,
    totalVolume: "10.8L",
    livesImpacted: 72,
    badges: ["Hero", "Champion", "Lifesaver"]
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || donation.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text mb-2">Donation History</h1>
          <p className="text-muted-foreground">Track your life-saving contributions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover-lift animate-scale-in stagger-1 bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Total Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.totalDonations}</div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-scale-in stagger-2 bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Blood Donated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.totalVolume}</div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-scale-in stagger-3 bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Lives Impacted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-medical-success flex items-center gap-2">
                {stats.livesImpacted}
                <Heart className="h-6 w-6 text-medical-emergency animate-pulse-urgent" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-scale-in stagger-4 bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <Award className="h-4 w-4 text-medical-warning" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {stats.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="animate-slide-in-left border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by location or recipient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Donation Timeline */}
        <div className="space-y-4">
          {filteredDonations.map((donation, index) => (
            <Card 
              key={donation.id}
              className={`hover-lift animate-slide-in-right stagger-${(index % 5) + 1} border-border relative overflow-hidden`}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      {donation.type}
                      <Badge variant="outline">{donation.bloodType}</Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      {new Date(donation.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={donation.status === "completed" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {donation.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Quantity</span>
                    <p className="font-medium text-foreground">{donation.quantity}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location</span>
                    <p className="font-medium text-foreground">{donation.location}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Recipient</span>
                    <p className="font-medium text-foreground">{donation.recipient}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Impact</span>
                    <p className="font-medium text-medical-success">{donation.impact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDonations.length === 0 && (
          <Card className="border-border">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No donations found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
