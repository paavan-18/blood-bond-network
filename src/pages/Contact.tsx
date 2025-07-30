import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Heart, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'support@lifelink.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Office',
      content: '123 Health Street, Medical District',
      description: 'Visit our headquarters'
    },
    {
      icon: Clock,
      title: 'Response Time',
      content: 'Within 24 hours',
      description: 'We respond quickly'
    }
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
              <Link to="/about" className="text-gray-600 hover:text-medical-red transition-colors">
                About
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
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Have questions? Need support? We're here to help. Reach out to us and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="border-0 shadow-medical bg-white/80 backdrop-blur-sm text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-medical rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-medical-red">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-gray-900 mb-1">{info.content}</p>
                    <CardDescription>{info.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-medical-red mb-6">Send us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible. 
                Whether you need technical support, have feedback, or want to partner with us, we'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-medical rounded-full flex items-center justify-center mt-1">
                    <Heart className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">For Donors</h3>
                    <p className="text-gray-600 text-sm">Questions about the donation process, eligibility, or finding blood requests.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-medical rounded-full flex items-center justify-center mt-1">
                    <Heart className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">For Recipients</h3>
                    <p className="text-gray-600 text-sm">Help with creating requests, finding donors, or managing your account.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-medical rounded-full flex items-center justify-center mt-1">
                    <Heart className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Technical Support</h3>
                    <p className="text-gray-600 text-sm">Issues with the platform, bugs, or technical difficulties.</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-medical bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-medical-red">Get in Touch</CardTitle>
                <CardDescription>
                  We typically respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-medical hover:bg-gradient-medical-hover"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-medical bg-gradient-medical text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Emergency Blood Needs?</h3>
              <p className="mb-6 opacity-90">
                If you have an urgent blood requirement, please contact your local emergency services 
                or blood bank directly. For critical situations, don't wait - act immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-medical-red hover:bg-gray-100">
                  Emergency Hotline: 911
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-medical-red">
                  Local Blood Bank Directory
                </Button>
              </div>
            </CardContent>
          </Card>
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

export default Contact;