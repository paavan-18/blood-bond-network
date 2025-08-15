import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MapPin, Clock, Phone, Building, Droplets, Plus, Users } from 'lucide-react';
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
  status: 'open' | 'fulfilled' | 'cancelled';
  created_at: string;
}

interface Donation {
  id: string;
  donor_id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  profiles: {
    full_name: string;
    phone?: string;
  };
}

const RecipientDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [donations, setDonations] = useState<{ [key: string]: Donation[] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [bloodGroup, setBloodGroup] = useState('');
  const [unitsNeeded, setUnitsNeeded] = useState(1);
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [contactPhone, setContactPhone] = useState(profile?.phone || '');
  const [neededBy, setNeededBy] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const urgencyColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800'
  };

  useEffect(() => {
    fetchBloodRequests();
  }, [profile]);

  const fetchBloodRequests = async () => {
    if (!profile) return;

    try {
      const { data, error } = await supabase
        .from('blood_requests')
        .select('*')
        .eq('recipient_id', profile.user_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBloodRequests((data || []) as BloodRequest[]);

      // Fetch donations for each request
      for (const request of data || []) {
        await fetchDonationsForRequest(request.id);
      }
    } catch (error) {
      console.error('Error fetching blood requests:', error);
      toast({
        title: "Error",
        description: "Failed to load your blood requests. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDonationsForRequest = async (requestId: string) => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select(`
          *,
          profiles (full_name, phone)
        `)
        .eq('request_id', requestId);

      if (error) throw error;

      setDonations(prev => ({
        ...prev,
        [requestId]: (data || []).map(donation => ({
          ...donation,
          profiles: undefined // Remove the problematic profiles property
        })) as Donation[]
      }));
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setCreateLoading(true);

    try {
      const { error } = await supabase
        .from('blood_requests')
        .insert([
          {
            recipient_id: profile.user_id,
            blood_group: bloodGroup,
            units_needed: unitsNeeded,
            urgency,
            hospital_name: hospitalName,
            hospital_address: hospitalAddress,
            contact_phone: contactPhone,
            additional_notes: additionalNotes,
            needed_by: neededBy,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Request created successfully!",
        description: "Your blood request has been posted and donors will be notified.",
      });

      setIsCreateDialogOpen(false);
      resetForm();
      fetchBloodRequests();
    } catch (error: any) {
      toast({
        title: "Error creating request",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCreateLoading(false);
    }
  };

  const resetForm = () => {
    setBloodGroup('');
    setUnitsNeeded(1);
    setUrgency('medium');
    setHospitalName('');
    setHospitalAddress('');
    setContactPhone(profile?.phone || '');
    setNeededBy('');
    setAdditionalNotes('');
  };

  const handleConfirmDonation = async (donationId: string, requestId: string) => {
    try {
      const { error } = await supabase
        .from('donations')
        .update({ status: 'confirmed' })
        .eq('id', donationId);

      if (error) throw error;

      toast({
        title: "Donation confirmed!",
        description: "The donor has been notified that their donation is confirmed.",
      });

      fetchDonationsForRequest(requestId);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to confirm donation. Please try again.",
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
              <h1 className="text-3xl font-bold text-medical-red">Recipient Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {profile?.full_name}</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-medical hover:bg-gradient-medical-hover">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Blood Request
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Blood Request</DialogTitle>
                  <DialogDescription>
                    Fill in the details for your blood request. This will be visible to donors.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateRequest} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select value={bloodGroup} onValueChange={setBloodGroup} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodGroups.map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unitsNeeded">Units Needed</Label>
                      <Input
                        id="unitsNeeded"
                        type="number"
                        min="1"
                        value={unitsNeeded}
                        onChange={(e) => setUnitsNeeded(parseInt(e.target.value))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select value={urgency} onValueChange={(value: any) => setUrgency(value)} required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hospitalName">Hospital Name</Label>
                    <Input
                      id="hospitalName"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hospitalAddress">Hospital Address</Label>
                    <Input
                      id="hospitalAddress"
                      value={hospitalAddress}
                      onChange={(e) => setHospitalAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="neededBy">Needed By</Label>
                    <Input
                      id="neededBy"
                      type="datetime-local"
                      value={neededBy}
                      onChange={(e) => setNeededBy(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="additionalNotes"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Any additional information..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-medical hover:bg-gradient-medical-hover"
                    disabled={createLoading}
                  >
                    {createLoading ? 'Creating...' : 'Create Request'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
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
              <div className="text-2xl font-bold">
                {bloodRequests.filter(r => r.status === 'open').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently seeking donors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bloodRequests.length}</div>
              <p className="text-xs text-muted-foreground">
                All time requests made
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interested Donors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.values(donations).flat().length}
              </div>
              <p className="text-xs text-muted-foreground">
                Total donor responses
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Blood Requests */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-medical-red">Your Blood Requests</h2>
          
          {bloodRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Blood Requests Yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  You haven't created any blood requests yet. Click the button above to create your first request.
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
                        <CardTitle className="text-xl">{request.blood_group} Blood Request</CardTitle>
                        <Badge className={urgencyColors[request.urgency]}>
                          {request.urgency.toUpperCase()}
                        </Badge>
                        <Badge variant={request.status === 'open' ? 'default' : 'secondary'}>
                          {request.status.toUpperCase()}
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

                    {/* Interested Donors */}
                    {donations[request.id] && donations[request.id].length > 0 && (
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">Interested Donors ({donations[request.id].length})</h4>
                        <div className="space-y-2">
                          {donations[request.id].map((donation) => (
                            <div key={donation.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                              <div>
                                <p className="font-medium">{donation.profiles.full_name}</p>
                                {donation.profiles.phone && (
                                  <p className="text-sm text-muted-foreground">{donation.profiles.phone}</p>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={donation.status === 'confirmed' ? 'default' : 'secondary'}>
                                  {donation.status}
                                </Badge>
                                {donation.status === 'pending' && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleConfirmDonation(donation.id, request.id)}
                                  >
                                    Confirm
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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

export default RecipientDashboard;