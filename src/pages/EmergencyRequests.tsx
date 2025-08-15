import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertTriangle, 
  Phone, 
  Clock, 
  MapPin, 
  Heart,
  Siren,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const emergencyRequests = [
  {
    id: 1,
    patient: "Emergency Case #2024-001",
    bloodGroup: "O-",
    unitsNeeded: 4,
    hospital: "Central Emergency Hospital",
    location: "Emergency Ward, Block A",
    urgency: "CRITICAL",
    timePosted: "5 minutes ago",
    contact: "+1 (555) 911-0001",
    description: "Severe trauma case requiring immediate blood transfusion. Patient is stable but needs O- blood urgently.",
    matchingDonors: 12
  },
  {
    id: 2,
    patient: "Emergency Case #2024-002",
    bloodGroup: "A+",
    unitsNeeded: 2,
    hospital: "City Medical Center",
    location: "ICU Level 3",
    urgency: "HIGH",
    timePosted: "12 minutes ago",
    contact: "+1 (555) 911-0002",
    description: "Post-surgical complications. Patient requires A+ blood for continued treatment.",
    matchingDonors: 28
  },
  {
    id: 3,
    patient: "Emergency Case #2024-003",
    bloodGroup: "B-",
    unitsNeeded: 3,
    hospital: "Regional Medical Hospital",
    location: "Emergency Department",
    urgency: "HIGH",
    timePosted: "18 minutes ago",
    contact: "+1 (555) 911-0003",
    description: "Accident victim requiring B- blood. Family members not compatible donors.",
    matchingDonors: 8
  }
];

const EmergencyRequests: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();

  const getUrgencyStyle = (urgency: string) => {
    switch (urgency) {
      case 'CRITICAL':
        return {
          bg: 'bg-medical-emergency',
          text: 'text-white',
          border: 'border-medical-emergency',
          icon: '🚨'
        };
      case 'HIGH':
        return {
          bg: 'bg-medical-warning',
          text: 'text-white',
          border: 'border-medical-warning',
          icon: '⚠️'
        };
      default:
        return {
          bg: 'bg-medical-trust',
          text: 'text-white',
          border: 'border-medical-trust',
          icon: 'ℹ️'
        };
    }
  };

  const handleEmergencyResponse = (requestId: number) => {
    toast({
      title: "Emergency Response Initiated",
      description: "Hospital has been notified of your availability. Please proceed to the location immediately.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-emergency/5 via-background to-medical-red/5 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Emergency Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center space-x-3">
            <Siren className="h-10 w-10 text-medical-emergency animate-pulse-urgent" />
            <h1 className="text-4xl font-bold gradient-text">Emergency Blood Requests</h1>
            <Siren className="h-10 w-10 text-medical-emergency animate-pulse-urgent" />
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Critical blood requests that need immediate attention. Your quick response can save lives.
          </p>
        </div>

        {/* Alert Banner */}
        <div className="bg-medical-emergency text-white rounded-xl p-4 animate-pulse-urgent">
          <div className="flex items-center justify-center space-x-2 text-center">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">
              URGENT: {emergencyRequests.filter(r => r.urgency === 'CRITICAL').length} Critical Cases Need Immediate Attention
            </span>
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col md:flex-row gap-4 animate-slide-up">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by blood group, hospital..."
              className="pl-9 h-10"
            />
          </div>
          <Button variant="outline" className="min-w-[120px]">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          {profile?.role === 'recipient' && (
            <Button 
              className="bg-medical-emergency hover:bg-medical-emergency/90 min-w-[160px]"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Emergency Request
            </Button>
          )}
        </div>

        {/* Create Emergency Form */}
        {showCreateForm && (
          <Card className="border-medical-emergency shadow-urgent animate-slide-up">
            <CardHeader className="bg-medical-emergency/10">
              <CardTitle className="text-medical-emergency">Create Emergency Blood Request</CardTitle>
              <CardDescription>Fill out this form to create an urgent blood request</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Blood Group (e.g., O-, A+)" />
                <Input placeholder="Units Needed" type="number" />
                <Input placeholder="Hospital Name" />
                <Input placeholder="Location/Ward" />
                <Input placeholder="Contact Phone" />
                <select className="w-full p-2 border rounded-md">
                  <option>Select Urgency Level</option>
                  <option value="CRITICAL">🚨 CRITICAL</option>
                  <option value="HIGH">⚠️ HIGH</option>
                  <option value="MEDIUM">📋 MEDIUM</option>
                </select>
              </div>
              <Textarea placeholder="Additional details about the emergency..." rows={3} />
              <div className="flex space-x-3">
                <Button className="bg-medical-emergency hover:bg-medical-emergency/90">
                  Submit Emergency Request
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Emergency Requests List */}
        <div className="space-y-4">
          {emergencyRequests.map((request, index) => {
            const urgencyStyle = getUrgencyStyle(request.urgency);
            
            return (
              <Card 
                key={request.id}
                className={`overflow-hidden shadow-medical hover:shadow-urgent transition-all duration-300 animate-slide-up border-l-4 ${urgencyStyle.border}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="bg-gradient-card">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <CardTitle className="text-xl text-medical-red">{request.patient}</CardTitle>
                        <Badge className={`${urgencyStyle.bg} ${urgencyStyle.text} animate-pulse-urgent`}>
                          {urgencyStyle.icon} {request.urgency}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{request.timePosted}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4 text-medical-red" />
                          <span>{request.matchingDonors} matching donors nearby</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-medical-red">{request.bloodGroup}</div>
                      <div className="text-sm text-muted-foreground">{request.unitsNeeded} units needed</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-medical-trust" />
                        <div>
                          <div className="font-semibold">{request.hospital}</div>
                          <div className="text-sm text-muted-foreground">{request.location}</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-medical-success" />
                        <div>
                          <div className="font-semibold">Emergency Contact</div>
                          <div className="text-sm text-muted-foreground">{request.contact}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-medical-red">Emergency Details</h4>
                    <p className="text-muted-foreground">{request.description}</p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button 
                      className="flex-1 bg-medical-emergency hover:bg-medical-emergency/90"
                      onClick={() => handleEmergencyResponse(request.id)}
                    >
                      <Siren className="h-4 w-4 mr-2" />
                      Respond to Emergency
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Hospital
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Emergency Guidelines */}
        <Card className="bg-medical-trust/10 border-medical-trust">
          <CardHeader>
            <CardTitle className="text-medical-trust">Emergency Response Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-medical-trust">•</span>
                <span>Critical cases require immediate response within 15 minutes</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-medical-trust">•</span>
                <span>High priority cases should be responded to within 30 minutes</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-medical-trust">•</span>
                <span>Always call the hospital before responding to confirm availability</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-medical-trust">•</span>
                <span>Bring valid ID and be prepared for rapid testing if required</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyRequests;