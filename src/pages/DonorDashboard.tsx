import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Heart, MapPin, Clock, Phone, Building, Droplets, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BloodRequest {
  id: string;
  blood_group: string;
  units_needed: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  hospital_name: string;
  hospital_address: string;
  contact_phone: string;
  additional_notes?: string;
  needed_by: string;
  created_at: string;
  recipient_id: string;
}

const DonorDashboard: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const urgencyColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800'
  };

  const urgencyIcons = {
    low: '🟢',
    medium: '🟡',
    high: '🟠',
    critical: '🔴'
  };

  useEffect(() => {
    fetchBloodRequests();
  }, [profile]);

  const fetchBloodRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('blood_requests')
        .select('*')
        .eq('status', 'open')
        .eq('blood_group', profile?.blood_group)
        .order('urgency', { ascending: false })
        .order('created_at', { ascending: true });

      if (error) throw error;
      setBloodRequests((data || []) as BloodRequest[]);
    } catch (error) {
      console.error('Error fetching blood requests:', error);
      toast({
        title: "Error",
        description: "Failed to load blood requests. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvailabilityToggle = async (checked: boolean) => {
    try {
      await updateProfile({ is_available: checked });
      toast({
        title: checked ? "You're now available!" : "Availability updated",
        description: checked 
          ? "You will receive notifications for blood requests." 
          : "You won't receive new blood request notifications.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update availability. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleContactDonor = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('donations')
        .insert([
          {
            donor_id: profile?.user_id,
            request_id: requestId,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Interest recorded!",
        description: "The recipient has been notified of your interest to donate.",
      });

      fetchBloodRequests();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record your interest. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-red"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-red/5 via-background to-medical-red/10 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-medical p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-medical-red">Donor Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {profile?.full_name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Your Blood Group</p>
                <div className="flex items-center space-x-2">
                  <Droplets className="h-5 w-5 text-medical-red" />
                  <span className="text-xl font-bold text-medical-red">{profile?.blood_group}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Available for Donation</span>
                <Switch
                  checked={profile?.is_available || false}
                  onCheckedChange={handleAvailabilityToggle}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bloodRequests.length}</div>
              <p className="text-xs text-muted-foreground">
                For {profile?.blood_group} blood type
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Cases</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {bloodRequests.filter(r => r.urgency === 'critical').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Need immediate attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Status</CardTitle>
              <div className={`h-3 w-3 rounded-full ${profile?.is_available ? 'bg-green-500' : 'bg-gray-300'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {profile?.is_available ? 'Available' : 'Unavailable'}
              </div>
              <p className="text-xs text-muted-foreground">
                Current donation status
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Blood Requests */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-medical-red">Blood Requests for {profile?.blood_group}</h2>
          
          {bloodRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Requests</h3>
                <p className="text-muted-foreground text-center">
                  There are currently no blood requests for your blood type ({profile?.blood_group}).
                  We'll notify you when someone needs your help!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {bloodRequests.map((request) => (
                <Card key={request.id} className="border-l-4 border-l-medical-red">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-5 w-5 text-medical-red" />
                        <CardTitle className="text-xl">{request.blood_group} Blood Needed</CardTitle>
                        <Badge className={urgencyColors[request.urgency]}>
                          {urgencyIcons[request.urgency]} {request.urgency.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Units needed</p>
                        <p className="text-2xl font-bold text-medical-red">{request.units_needed}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{request.hospital_name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{request.hospital_address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{request.contact_phone}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Needed by: {new Date(request.needed_by).toLocaleDateString()}
                          </span>
                        </div>
                        {request.additional_notes && (
                          <div>
                            <p className="text-sm font-medium">Additional Notes:</p>
                            <p className="text-sm text-muted-foreground">{request.additional_notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleContactDonor(request.id)}
                        className="bg-gradient-medical hover:bg-gradient-medical-hover"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        I Want to Help
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;