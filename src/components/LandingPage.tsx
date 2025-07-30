import { Heart, Users, MapPin, Shield, ArrowRight, Droplet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Heart,
      title: "Save Lives",
      description: "Your blood donation can save up to 3 lives. Make a difference today."
    },
    {
      icon: MapPin,
      title: "Location-Based Matching",
      description: "Find nearby donors or recipients using smart location-based matching."
    },
    {
      icon: Users,
      title: "Trusted Community",
      description: "Join a verified community of donors and recipients with secure profiles."
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "HIPAA-compliant platform ensuring your privacy and data security."
    }
  ]

  const stats = [
    { number: "10,000+", label: "Lives Saved" },
    { number: "5,000+", label: "Active Donors" },
    { number: "50+", label: "Partner Hospitals" },
    { number: "24/7", label: "Emergency Support" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <Droplet className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Connecting Hearts,
              <br />
              <span className="text-primary-glow">Saving Lives</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              LifeLink bridges the gap between blood donors and recipients, creating a lifeline when every second counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                onClick={() => navigate('/register')}
                className="group"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose LifeLink?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with compassionate care to create the most efficient blood donation network.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card shadow-soft hover:shadow-medical transition-all duration-300 hover:scale-105 border-0">
                <CardHeader className="text-center">
                  <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of donors and recipients who trust LifeLink to save lives. Your blood donation could be someone's second chance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="medical" 
              size="lg"
              onClick={() => navigate('/register')}
              className="group"
            >
              <Heart className="mr-2 h-5 w-5" />
              Become a Donor
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/register')}
            >
              Find Blood Donors
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Droplet className="h-8 w-8 text-primary mr-2" />
                <span className="text-2xl font-bold text-primary">LifeLink</span>
              </div>
              <p className="text-muted-foreground">
                Connecting blood donors with recipients to save lives, one donation at a time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Donors</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/eligibility" className="hover:text-primary transition-colors">Eligibility</a></li>
                <li><a href="/process" className="hover:text-primary transition-colors">Donation Process</a></li>
                <li><a href="/benefits" className="hover:text-primary transition-colors">Benefits</a></li>
                <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Emergency</h3>
              <p className="text-muted-foreground mb-2">24/7 Emergency Hotline</p>
              <p className="text-2xl font-bold text-medical-emergency">1-800-LIFE-LINK</p>
            </div>
          </div>
          <div className="border-t pt-8 mt-8 text-center text-muted-foreground">
            <p>&copy; 2024 LifeLink. All rights reserved. Saving lives through technology.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage