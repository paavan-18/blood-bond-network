import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Star, 
  Share2, 
  ThumbsUp,
  Quote,
  Calendar,
  MapPin,
  Trophy,
  Users
} from 'lucide-react';

const successStories = [
  {
    id: 1,
    title: "Sarah's Life-Saving Donation",
    donor: "Michael Chen",
    recipient: "Sarah Williams, Age 8",
    story: "When 8-year-old Sarah was diagnosed with leukemia, her family was devastated. After months of treatment, she needed an urgent blood transfusion. Michael, a regular donor, received the emergency alert and rushed to the hospital. His O- blood was exactly what Sarah needed. Today, Sarah is cancer-free and thriving in school.",
    image: "/api/placeholder/400/300",
    date: "December 15, 2023",
    location: "Central Children's Hospital",
    bloodType: "O-",
    impact: "Life Saved",
    likes: 234,
    shares: 45,
    category: "Pediatric Care"
  },
  {
    id: 2,
    title: "Community Rally Saves Local Teacher",
    donor: "Community Group of 12",
    recipient: "James Rodriguez, Age 45",
    story: "Mr. Rodriguez, a beloved high school teacher, was in a serious car accident. He needed multiple blood transfusions during surgery. The LifeLink community rallied together, with 12 donors contributing over 3 days. The teacher made a full recovery and returned to teaching.",
    image: "/api/placeholder/400/300",
    date: "November 28, 2023",
    location: "Metro General Hospital",
    bloodType: "A+",
    impact: "Full Recovery",
    likes: 456,
    shares: 89,
    category: "Trauma Care"
  },
  {
    id: 3,
    title: "Marathon Runner's Second Chance",
    donor: "Emma Thompson",
    recipient: "David Park, Age 32",
    story: "David collapsed during a marathon due to severe anemia. Emma, who was running the same marathon, saw the emergency alert and immediately went to the hospital after the race. Her donation helped David receive the treatment he needed.",
    image: "/api/placeholder/400/300",
    date: "October 10, 2023",
    location: "Sports Medicine Center",
    bloodType: "B+",
    impact: "Life Saved",
    likes: 189,
    shares: 32,
    category: "Sports Medicine"
  },
  {
    id: 4,
    title: "Mother's Day Miracle",
    donor: "Dr. Lisa Park",
    recipient: "Maria Santos, Age 29",
    story: "Maria was experiencing complications during childbirth on Mother's Day. Dr. Lisa Park, who was off duty, responded to the emergency alert. Her blood donation helped ensure both mother and baby were safe. Baby Sofia was born healthy that evening.",
    image: "/api/placeholder/400/300",
    date: "May 14, 2023",
    location: "Women's Medical Center",
    bloodType: "AB-",
    impact: "Two Lives Saved",
    likes: 567,
    shares: 123,
    category: "Maternal Care"
  }
];

const testimonials = [
  {
    name: "Michael Chen",
    role: "Regular Donor",
    quote: "Being able to help Sarah recover was the most rewarding experience of my life. Knowing that a simple act of donating blood can save a child's life motivates me to keep donating.",
    avatar: "/api/placeholder/60/60"
  },
  {
    name: "Dr. Amanda Foster",
    role: "Emergency Physician",
    quote: "LifeLink has revolutionized how we handle blood emergencies. The quick response from donors has saved countless lives in our emergency department.",
    avatar: "/api/placeholder/60/60"
  },
  {
    name: "Sarah Williams",
    role: "Survivor",
    quote: "I'm here today because someone cared enough to donate blood. Now I want to pay it forward by encouraging others to become donors when I'm old enough.",
    avatar: "/api/placeholder/60/60"
  }
];

const SuccessStories: React.FC = () => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Life Saved':
        return 'bg-medical-emergency text-white';
      case 'Full Recovery':
        return 'bg-medical-success text-white';
      case 'Two Lives Saved':
        return 'bg-medical-red text-white';
      default:
        return 'bg-medical-trust text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-success/5 via-background to-medical-trust/5 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center space-x-3">
            <Heart className="h-10 w-10 text-medical-red animate-float" />
            <h1 className="text-4xl font-bold gradient-text">Success Stories</h1>
            <Heart className="h-10 w-10 text-medical-red animate-float" />
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Real stories of hope, courage, and the life-saving impact of blood donation. 
            Every donation matters, and every story inspires others to give.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Heart className="h-8 w-8 text-medical-red mx-auto mb-2" />
              <div className="text-2xl font-bold">847</div>
              <p className="text-sm text-muted-foreground">Lives Saved</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-medical-success mx-auto mb-2" />
              <div className="text-2xl font-bold">1,200+</div>
              <p className="text-sm text-muted-foreground">Active Donors</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Trophy className="h-8 w-8 text-medical-warning mx-auto mb-2" />
              <div className="text-2xl font-bold">15 min</div>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="h-8 w-8 text-medical-trust mx-auto mb-2" />
              <div className="text-2xl font-bold">98%</div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Stories */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-medical-red">Featured Stories</h2>
          
          {successStories.map((story, index) => (
            <Card 
              key={story.id}
              className="overflow-hidden shadow-medical hover:shadow-urgent transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="bg-gradient-card">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-medical-red">{story.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{story.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{story.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={getImpactColor(story.impact)}>
                      {story.impact}
                    </Badge>
                    <div className="text-2xl font-bold text-medical-red">{story.bloodType}</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h4 className="font-semibold text-medical-red mb-2">The Story</h4>
                      <p className="text-muted-foreground leading-relaxed">{story.story}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-medical-success mb-1">Donor</h5>
                        <p className="text-sm text-muted-foreground">{story.donor}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-medical-trust mb-1">Recipient</h5>
                        <p className="text-sm text-muted-foreground">{story.recipient}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-medical-red/5 rounded-lg p-4 text-center">
                      <Quote className="h-6 w-6 text-medical-red mx-auto mb-2" />
                      <Badge variant="secondary">{story.category}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-medical-red">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {story.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-medical-trust">
                      <Share2 className="h-4 w-4 mr-1" />
                      {story.shares}
                    </Button>
                  </div>
                  <Button className="bg-medical-red hover:bg-medical-red/90">
                    Share This Story
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-medical-red text-center">What Our Community Says</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="text-center shadow-medical animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <Quote className="h-8 w-8 text-medical-red mx-auto" />
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="space-y-1">
                    <div className="font-semibold text-medical-red">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-primary text-white text-center">
          <CardContent className="p-8 space-y-4">
            <Heart className="h-12 w-12 mx-auto animate-float" />
            <h3 className="text-2xl font-bold">Become Part of Our Success Stories</h3>
            <p className="text-white/90 max-w-2xl mx-auto">
              Every donation has the potential to be someone's miracle. Join our community of lifesavers and help us create more success stories.
            </p>
            <Button variant="secondary" size="lg" className="bg-white text-medical-red hover:bg-white/90">
              Start Your Journey as a Donor
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessStories;