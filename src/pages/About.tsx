import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Shield, Globe, ArrowRight, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: 'Save Lives',
      description: 'Connect blood donors with recipients in need, creating a network that saves lives every day.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by the community, for the community. Every donation counts and every life matters.'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your privacy and security are our top priority. All data is encrypted and protected.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Making blood donation accessible worldwide, breaking geographical barriers.'
    }
  ];

  const values = [
    'Transparency in all operations',
    'Privacy and data security',
    'Equal access for everyone',
    'Community-first approach',
    'Innovation in healthcare',
    'Reliability and trust'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-red/5 via-background to-medical-red/10">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-medical-red/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-medical rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-medical-red">LifeLink</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/contact" className="text-gray-600 hover:text-medical-red transition-colors">
                Contact
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-medical-red text-medical-red hover:bg-medical-red hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-medical hover:bg-gradient-medical-hover">
                  Join LifeLink
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-medical-red mb-6">
              About LifeLink
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're on a mission to make blood donation more accessible, efficient, and impactful. 
              LifeLink connects donors and recipients, creating a network that saves lives.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-medical bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-medical rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-medical-red mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  To revolutionize blood donation by creating a seamless platform that connects those who can give 
                  with those who need. We believe that every person deserves access to life-saving blood when they 
                  need it most, and every donor should know the impact of their generosity.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-red mb-4">Why Choose LifeLink?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're more than just a platform - we're a community dedicated to saving lives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-medical bg-white/80 backdrop-blur-sm hover:shadow-medical-hover transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-medical rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-medical-red">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-medical-red mb-6">Our Values</h2>
              <p className="text-gray-600 mb-8">
                These core values guide everything we do at LifeLink. They shape our decisions, 
                our technology, and our community.
              </p>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="border-0 shadow-medical bg-gradient-medical text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
                <p className="mb-6 opacity-90">
                  Whether you're a donor ready to save lives or someone in need of blood, 
                  LifeLink is here to connect you with the right people at the right time.
                </p>
                <Link to="/register">
                  <Button className="bg-white text-medical-red hover:bg-gray-100 w-full">
                    Get Started Today
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-medical-red mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of donors and recipients who are already part of the LifeLink community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-medical hover:bg-gradient-medical-hover">
                <Heart className="h-5 w-5 mr-2" />
                Become a Donor
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-medical-red text-medical-red hover:bg-medical-red hover:text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-medical-red text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-medical-red" />
              </div>
              <span className="text-xl font-bold">LifeLink</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="hover:text-medical-red-light transition-colors">Home</Link>
              <Link to="/about" className="hover:text-medical-red-light transition-colors">About</Link>
              <Link to="/contact" className="hover:text-medical-red-light transition-colors">Contact</Link>
              <Link to="/login" className="hover:text-medical-red-light transition-colors">Sign In</Link>
            </div>
          </div>
          <div className="border-t border-medical-red-light mt-8 pt-8 text-center">
            <p className="opacity-80">© 2024 LifeLink. Saving lives, one donation at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;