import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Heart, MapPin, Phone, Droplets } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfileSetup: React.FC = () => {
  const { user, profile, updateProfile } = useAuth();
  const [phone, setPhone] = useState(profile?.phone || '');
  const [bloodGroup, setBloodGroup] = useState(profile?.blood_group || '');
  const [location, setLocation] = useState(profile?.location || '');
  const [isAvailable, setIsAvailable] = useState(profile?.is_available || false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setIsLoading(true);

    try {
      await updateProfile({
        phone,
        blood_group: bloodGroup,
        location,
        is_available: profile.role === 'donor' ? isAvailable : false,
      });

      toast({
        title: "Profile updated successfully!",
        description: "Your profile has been set up and you can now access the platform.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-red"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-red/5 via-background to-medical-red/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-medical bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-medical rounded-full flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-medical-red">
              Complete Your Profile
            </CardTitle>
            <CardDescription>
              Help us set up your account for the best experience
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone Number</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodGroup" className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4" />
                  <span>Blood Group</span>
                </Label>
                <Select value={bloodGroup} onValueChange={setBloodGroup} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your blood group" />
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
                <Label htmlFor="location" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter your city/area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              {profile.role === 'donor' && (
                <div className="flex items-center justify-between p-4 bg-medical-red/5 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Available for Donation</Label>
                    <p className="text-xs text-muted-foreground">
                      Mark yourself as available to receive blood requests
                    </p>
                  </div>
                  <Switch
                    checked={isAvailable}
                    onCheckedChange={setIsAvailable}
                  />
                </div>
              )}
            </CardContent>

            <div className="px-6 pb-6">
              <Button
                type="submit"
                className="w-full bg-gradient-medical hover:bg-gradient-medical-hover"
                disabled={isLoading}
              >
                {isLoading ? 'Setting up...' : 'Complete Setup'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;