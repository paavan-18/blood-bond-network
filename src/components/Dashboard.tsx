import { useUser } from '@clerk/clerk-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  MapPin, 
  Clock, 
  User, 
  Bell, 
  Plus,
  Activity,
  Users,
  TrendingUp,
  AlertCircle
} from 'lucide-react'

const Dashboard = () => {
  const { user } = useUser()
  const userRole = user?.publicMetadata?.role as string || 'donor'

  const donorStats = [
    { label: 'Total Donations', value: '12', icon: Heart, color: 'text-medical-red' },
    { label: 'Lives Saved', value: '36', icon: Users, color: 'text-medical-success' },
    { label: 'Next Eligible', value: '45 days', icon: Clock, color: 'text-medical-trust' },
    { label: 'Donation Points', value: '1,240', icon: TrendingUp, color: 'text-medical-warning' }
  ]

  const recipientStats = [
    { label: 'Active Requests', value: '2', icon: AlertCircle, color: 'text-medical-emergency' },
    { label: 'Matched Donors', value: '8', icon: Users, color: 'text-medical-success' },
    { label: 'Requests Fulfilled', value: '3', icon: Heart, color: 'text-medical-red' },
    { label: 'Response Time', value: '2.3 hrs', icon: Clock, color: 'text-medical-trust' }
  ]

  const urgentRequests = [
    {
      id: 1,
      bloodType: 'O-',
      location: 'Downtown Medical Center',
      distance: '2.1 km',
      urgency: 'Critical',
      patient: 'Emergency Surgery',
      time: '30 min ago'
    },
    {
      id: 2,
      bloodType: 'A+',
      location: 'City General Hospital',
      distance: '4.8 km',
      urgency: 'Urgent',
      patient: 'Cancer Treatment',
      time: '1 hr ago'
    },
    {
      id: 3,
      bloodType: 'B+',
      location: 'St. Mary\'s Hospital',
      distance: '6.2 km',
      urgency: 'High',
      patient: 'Accident Victim',
      time: '2 hrs ago'
    }
  ]

  const myRequests = [
    {
      id: 1,
      bloodType: 'AB-',
      status: 'Active',
      donors: 3,
      created: '2 hrs ago',
      hospital: 'Regional Medical Center'
    },
    {
      id: 2,
      bloodType: 'AB-',
      status: 'Fulfilled',
      donors: 1,
      created: '1 week ago',
      hospital: 'Regional Medical Center'
    }
  ]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-medical-emergency text-white'
      case 'Urgent': return 'bg-medical-warning text-white'
      case 'High': return 'bg-medical-trust text-white'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-medical-trust text-white'
      case 'Fulfilled': return 'bg-medical-success text-white'
      case 'Expired': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  if (userRole === 'donor') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Donor Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.firstName}!</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {donorStats.map((stat, index) => (
              <Card key={index} className="bg-gradient-card shadow-soft hover:shadow-medical transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Urgent Requests */}
            <div className="lg:col-span-2">
              <Card className="shadow-medical">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-medical-emergency mr-2" />
                    Urgent Blood Requests Near You
                  </CardTitle>
                  <CardDescription>
                    Help save lives by responding to these critical requests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {urgentRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                            {request.bloodType}
                          </div>
                          <div>
                            <h3 className="font-semibold">{request.patient}</h3>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {request.location} · {request.distance}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getUrgencyColor(request.urgency)}>
                            {request.urgency}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{request.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="medical" size="sm" className="flex-1">
                          <Heart className="h-4 w-4 mr-2" />
                          Respond to Request
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="medical" className="w-full">
                    <Activity className="h-4 w-4 mr-2" />
                    Update Availability
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Update Location
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Donation History
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Find Blood Drives
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-accent/50 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-sm">Next Donation Eligibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">45 Days</div>
                    <p className="text-sm text-muted-foreground">
                      You'll be eligible to donate again on March 15, 2024
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (userRole === 'recipient') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Recipient Dashboard</h1>
              <p className="text-muted-foreground">Manage your blood requests, {user?.firstName}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="medical">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
              <Button variant="outline">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {recipientStats.map((stat, index) => (
              <Card key={index} className="bg-gradient-card shadow-soft hover:shadow-medical transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* My Requests */}
          <Card className="shadow-medical">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 text-primary mr-2" />
                My Blood Requests
              </CardTitle>
              <CardDescription>
                Track the status of your blood donation requests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {myRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                        {request.bloodType}
                      </div>
                      <div>
                        <h3 className="font-semibold">{request.hospital}</h3>
                        <p className="text-sm text-muted-foreground">
                          Created {request.created} · {request.donors} donors matched
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact Donors
                    </Button>
                    {request.status === 'Active' && (
                      <Button variant="destructive" size="sm">
                        Cancel Request
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Admin Dashboard (simplified version)
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground">Admin features coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard