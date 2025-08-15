import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Building2, 
  Navigation,
  Star,
  Heart,
  Users,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const bloodBanks = [
  {
    id: 1,
    name: "Central Medical Blood Bank",
    address: "123 Healthcare Ave, Medical District",
    phone: "+1 (555) 123-4567",
    distance: "2.5 km",
    hours: "24/7 Emergency Service",
    rating: 4.8,
    inventory: {
      "A+": 45,
      "A-": 23,
      "B+": 38,
      "B-": 15,
      "AB+": 12,
      "AB-": 8,
      "O+": 67,
      "O-": 29
    },
    features: ["Emergency Service", "Mobile Collection", "Plasma Center"]
  },
  {
    id: 2,
    name: "City Hospital Blood Services",
    address: "456 Main Street, Downtown",
    phone: "+1 (555) 234-5678",
    distance: "3.2 km",
    hours: "6:00 AM - 10:00 PM",
    rating: 4.6,
    inventory: {
      "A+": 32,
      "A-": 18,
      "B+": 28,
      "B-": 12,
      "AB+": 15,
      "AB-": 6,
      "O+": 52,
      "O-": 22
    },
    features: ["Donor Rewards", "Online Booking", "Free Health Checkup"]
  },
  {
    id: 3,
    name: "Regional Blood Center",
    address: "789 University Blvd, University District",
    phone: "+1 (555) 345-6789",
    distance: "4.1 km",
    hours: "8:00 AM - 8:00 PM",
    rating: 4.7,
    inventory: {
      "A+": 41,
      "A-": 26,
      "B+": 35,
      "B-": 19,
      "AB+": 18,
      "AB-": 11,
      "O+": 59,
      "O-": 34
    },
    features: ["Research Center", "Student Programs", "Community Outreach"]
  }
];

const BloodBanks: React.FC = () => {
  const getInventoryStatus = (count: number) => {
    if (count > 40) return { status: "High", color: "bg-medical-success text-white" };
    if (count > 20) return { status: "Medium", color: "bg-medical-warning text-white" };
    return { status: "Low", color: "bg-medical-emergency text-white" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-red/5 via-background to-medical-trust/5 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text">Find Blood Banks Near You</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Locate nearby blood banks, check inventory levels, and find the help you need when every second counts.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="glass rounded-2xl p-6 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location, blood bank name..."
                className="pl-9 h-10"
              />
            </div>
            <Button className="bg-medical-red hover:bg-medical-red/90 min-w-[120px]">
              <Navigation className="h-4 w-4 mr-2" />
              Find Nearby
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Building2 className="h-8 w-8 text-medical-red mx-auto mb-2" />
              <div className="text-2xl font-bold">{bloodBanks.length}</div>
              <p className="text-sm text-muted-foreground">Blood Banks</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Heart className="h-8 w-8 text-medical-success mx-auto mb-2" />
              <div className="text-2xl font-bold">24/7</div>
              <p className="text-sm text-muted-foreground">Emergency Service</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-medical-trust mx-auto mb-2" />
              <div className="text-2xl font-bold">500+</div>
              <p className="text-sm text-muted-foreground">Units Available</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="h-8 w-8 text-medical-warning mx-auto mb-2" />
              <div className="text-2xl font-bold">4.7</div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Blood Banks List */}
        <div className="space-y-6">
          {bloodBanks.map((bank, index) => (
            <Card 
              key={bank.id} 
              className="overflow-hidden shadow-medical hover:shadow-urgent transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="bg-gradient-card">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-medical-red">{bank.name}</CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {bank.address}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-medical-warning fill-current" />
                      <span className="font-semibold">{bank.rating}</span>
                    </div>
                    <Badge variant="outline" className="mt-1">
                      {bank.distance}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-medical-trust" />
                    <span>{bank.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-medical-success" />
                    <span>{bank.hours}</span>
                  </div>
                </div>

                {/* Blood Inventory */}
                <div>
                  <h4 className="font-semibold mb-3 text-medical-red">Blood Inventory</h4>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {Object.entries(bank.inventory).map(([type, count]) => {
                      const { status, color } = getInventoryStatus(count);
                      return (
                        <div key={type} className="text-center">
                          <div className={`${color} rounded-lg p-2 mb-1`}>
                            <div className="font-bold text-sm">{type}</div>
                            <div className="text-xs">{count} units</div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              status === 'Low' ? 'border-medical-emergency text-medical-emergency' :
                              status === 'Medium' ? 'border-medical-warning text-medical-warning' :
                              'border-medical-success text-medical-success'
                            }`}
                          >
                            {status}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-3 text-medical-red">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {bank.features.map((feature) => (
                      <Badge key={feature} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <Button className="flex-1 bg-medical-red hover:bg-medical-red/90">
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BloodBanks;