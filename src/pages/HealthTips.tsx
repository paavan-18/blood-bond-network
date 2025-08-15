import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Droplets, 
  Apple, 
  Moon, 
  Dumbbell,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  Thermometer,
  Scale,
  Activity
} from 'lucide-react';

const healthTips = [
  {
    category: "Before Donation",
    icon: Clock,
    color: "medical-trust",
    tips: [
      {
        title: "Stay Hydrated",
        description: "Drink plenty of water 24-48 hours before donation. Aim for at least 16 oz of water in the 2 hours before donating.",
        importance: "high"
      },
      {
        title: "Eat Iron-Rich Foods",
        description: "Include lean meats, spinach, beans, and fortified cereals in your diet 2-3 days before donation.",
        importance: "high"
      },
      {
        title: "Get Good Sleep",
        description: "Ensure you get at least 7-8 hours of sleep the night before donating blood.",
        importance: "medium"
      },
      {
        title: "Avoid Alcohol",
        description: "Don't consume alcohol for 24 hours before donation as it can lead to dehydration.",
        importance: "high"
      }
    ]
  },
  {
    category: "During Donation",
    icon: Droplets,
    color: "medical-red",
    tips: [
      {
        title: "Relax and Breathe",
        description: "Take deep breaths and try to stay calm. Let the staff know if you feel dizzy or uncomfortable.",
        importance: "high"
      },
      {
        title: "Squeeze Your Hand",
        description: "Gently squeeze and release your fist every few seconds to help maintain blood flow.",
        importance: "medium"
      },
      {
        title: "Communicate with Staff",
        description: "Always inform the medical staff if you experience any discomfort or unusual sensations.",
        importance: "high"
      }
    ]
  },
  {
    category: "After Donation",
    icon: Heart,
    color: "medical-success",
    tips: [
      {
        title: "Rest and Rehydrate",
        description: "Sit for at least 15 minutes and drink plenty of fluids. Avoid alcohol for 24 hours.",
        importance: "high"
      },
      {
        title: "Eat Something",
        description: "Have a snack or light meal within an hour of donation to help maintain blood sugar levels.",
        importance: "medium"
      },
      {
        title: "Avoid Heavy Exercise",
        description: "Don't do strenuous exercise or heavy lifting for 4-5 hours after donation.",
        importance: "high"
      },
      {
        title: "Monitor Your Arm",
        description: "Keep the bandage on for 4-5 hours and watch for any unusual swelling or bleeding.",
        importance: "medium"
      }
    ]
  }
];

const eligibilityGuidelines = [
  {
    title: "Age Requirements",
    icon: Clock,
    content: "Must be at least 18 years old (16-17 with parental consent in some areas). No upper age limit for regular donors in good health."
  },
  {
    title: "Weight Requirements",
    icon: Scale,
    content: "Must weigh at least 110 pounds (50 kg). This ensures you have enough blood volume for safe donation."
  },
  {
    title: "Health Status",
    icon: Activity,
    content: "Must be in good health, feeling well on donation day, and have normal vital signs (blood pressure, pulse, temperature)."
  },
  {
    title: "Recent Illness",
    icon: Thermometer,
    content: "Wait at least 48 hours after symptoms of cold/flu resolve. Some medications may require waiting periods."
  }
];

const nutritionGuidelines = [
  {
    nutrient: "Iron",
    foods: ["Red meat", "Spinach", "Lentils", "Fortified cereals"],
    purpose: "Helps maintain healthy red blood cell production",
    icon: "🥩"
  },
  {
    nutrient: "Vitamin C",
    foods: ["Citrus fruits", "Bell peppers", "Strawberries", "Broccoli"],
    purpose: "Enhances iron absorption",
    icon: "🍊"
  },
  {
    nutrient: "Folate",
    foods: ["Leafy greens", "Beans", "Fortified grains", "Avocado"],
    purpose: "Essential for red blood cell formation",
    icon: "🥬"
  },
  {
    nutrient: "Protein",
    foods: ["Lean meats", "Fish", "Eggs", "Nuts"],
    purpose: "Helps replace plasma proteins",
    icon: "🥚"
  }
];

const HealthTips: React.FC = () => {
  const getImportanceStyle = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'bg-medical-emergency text-white';
      case 'medium':
        return 'bg-medical-warning text-white';
      case 'low':
        return 'bg-medical-trust text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'high':
        return <AlertTriangle className="h-3 w-3" />;
      case 'medium':
        return <Info className="h-3 w-3" />;
      case 'low':
        return <CheckCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-success/5 via-background to-medical-trust/5 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center space-x-3">
            <Apple className="h-10 w-10 text-medical-success animate-float" />
            <h1 className="text-4xl font-bold gradient-text">Health Tips for Donors</h1>
            <Apple className="h-10 w-10 text-medical-success animate-float" />
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Stay healthy and safe while making a difference. Follow these guidelines to ensure 
            successful donations and maintain your well-being.
          </p>
        </div>

        {/* Quick Health Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Droplets className="h-8 w-8 text-medical-red mx-auto mb-2" />
              <div className="text-2xl font-bold">8 weeks</div>
              <p className="text-sm text-muted-foreground">Between donations</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 text-medical-trust mx-auto mb-2" />
              <div className="text-2xl font-bold">10-15 min</div>
              <p className="text-sm text-muted-foreground">Donation time</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Heart className="h-8 w-8 text-medical-success mx-auto mb-2" />
              <div className="text-2xl font-bold">24-48 hrs</div>
              <p className="text-sm text-muted-foreground">Recovery time</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Activity className="h-8 w-8 text-medical-warning mx-auto mb-2" />
              <div className="text-2xl font-bold">6 times</div>
              <p className="text-sm text-muted-foreground">Max donations/year</p>
            </CardContent>
          </Card>
        </div>

        {/* Health Tips by Category */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-medical-red">Donation Guidelines</h2>
          
          {healthTips.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.category}
                className="shadow-medical animate-slide-up"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <CardHeader className={`bg-${category.color}/10`}>
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`h-6 w-6 text-${category.color}`} />
                    <CardTitle className={`text-${category.color}`}>{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.tips.map((tip, tipIndex) => (
                      <div 
                        key={tipIndex}
                        className="border rounded-lg p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-medical-red">{tip.title}</h4>
                          <Badge className={`${getImportanceStyle(tip.importance)} text-xs`}>
                            {getImportanceIcon(tip.importance)}
                            <span className="ml-1 capitalize">{tip.importance}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Eligibility Guidelines */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-medical-red">Eligibility Guidelines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eligibilityGuidelines.map((guideline, index) => (
              <Card 
                key={index}
                className="shadow-medical animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="bg-medical-trust/10 p-2 rounded-lg">
                      <guideline.icon className="h-5 w-5 text-medical-trust" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-medical-red">{guideline.title}</h4>
                      <p className="text-sm text-muted-foreground">{guideline.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nutrition Guidelines */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-medical-red">Nutrition for Healthy Donations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nutritionGuidelines.map((nutrition, index) => (
              <Card 
                key={index}
                className="text-center shadow-medical animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="text-4xl">{nutrition.icon}</div>
                  <div>
                    <h4 className="font-semibold text-medical-red mb-2">{nutrition.nutrient}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{nutrition.purpose}</p>
                  </div>
                  <div className="space-y-1">
                    {nutrition.foods.map((food, foodIndex) => (
                      <Badge key={foodIndex} variant="secondary" className="text-xs mr-1 mb-1">
                        {food}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Signs */}
        <Card className="bg-medical-emergency/10 border-medical-emergency">
          <CardHeader>
            <CardTitle className="text-medical-emergency flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>When to Seek Medical Attention</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm mb-4">Contact medical staff immediately if you experience:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-medical-emergency">•</span>
                  <span>Persistent dizziness or fainting</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-medical-emergency">•</span>
                  <span>Severe or worsening arm pain</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-medical-emergency">•</span>
                  <span>Signs of infection at the needle site</span>
                </li>
              </ul>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-medical-emergency">•</span>
                  <span>Unusual swelling or bruising</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-medical-emergency">•</span>
                  <span>Prolonged fatigue or weakness</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-medical-emergency">•</span>
                  <span>Any concerning symptoms</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-primary text-white text-center">
          <CardContent className="p-8 space-y-4">
            <Heart className="h-12 w-12 mx-auto animate-float" />
            <h3 className="text-2xl font-bold">Ready to Make a Difference?</h3>
            <p className="text-white/90 max-w-2xl mx-auto">
              Now that you know how to donate safely, take the next step and schedule your donation appointment.
            </p>
            <Button variant="secondary" size="lg" className="bg-white text-medical-red hover:bg-white/90">
              Schedule Your Donation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthTips;