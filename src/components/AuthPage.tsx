import { useState } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Droplet, Heart, Users, UserCheck } from 'lucide-react'

interface AuthPageProps {
  isSignUp?: boolean
}

const AuthPage = ({ isSignUp = false }: AuthPageProps) => {
  const [showRoleSelection, setShowRoleSelection] = useState(false)
  const [selectedRole, setSelectedRole] = useState<'donor' | 'recipient' | 'admin' | null>(null)

  const roles = [
    {
      id: 'donor' as const,
      title: 'Blood Donor',
      description: 'I want to donate blood and help save lives',
      icon: Heart,
      color: 'bg-medical-red/10 border-medical-red/20'
    },
    {
      id: 'recipient' as const,
      title: 'Blood Recipient',
      description: 'I need blood or am seeking donors',
      icon: Users,
      color: 'bg-medical-trust/10 border-medical-trust/20'
    },
    {
      id: 'admin' as const,
      title: 'Healthcare Admin',
      description: 'I manage blood donation programs',
      icon: UserCheck,
      color: 'bg-medical-success/10 border-medical-success/20'
    }
  ]

  if (isSignUp && !showRoleSelection) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Droplet className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Join LifeLink</h1>
            <p className="text-muted-foreground">Choose your role to get started</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <Card 
                key={role.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-medical hover:scale-105 border-2 ${
                  selectedRole === role.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/30'
                } ${role.color}`}
                onClick={() => {
                  setSelectedRole(role.id)
                  setShowRoleSelection(true)
                }}
              >
                <CardHeader className="text-center">
                  <div className="bg-background rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-soft">
                    <role.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {role.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <a href="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Droplet className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          {selectedRole && (
            <p className="text-muted-foreground">
              {isSignUp ? 'Complete your' : 'Sign in to your'} {
                roles.find(r => r.id === selectedRole)?.title.toLowerCase()
              } account
            </p>
          )}
        </div>

        <Card className="shadow-medical border-0">
          <CardContent className="p-6">
            {isSignUp ? (
              <SignUp 
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-primary hover:bg-primary/90',
                    card: 'shadow-none border-0',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden'
                  }
                }}
                afterSignUpUrl={`/profile-setup?role=${selectedRole}`}
                fallbackRedirectUrl={`/profile-setup?role=${selectedRole}`}
              />
            ) : (
              <SignIn 
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-primary hover:bg-primary/90',
                    card: 'shadow-none border-0',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden'
                  }
                }}
                fallbackRedirectUrl="/dashboard"
              />
            )}
          </CardContent>
        </Card>

        {showRoleSelection && isSignUp && (
          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => {
                setShowRoleSelection(false)
                setSelectedRole(null)
              }}
            >
              ← Change Role
            </Button>
          </div>
        )}

        <div className="text-center mt-6">
          <p className="text-muted-foreground">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <a 
              href={isSignUp ? '/login' : '/register'} 
              className="text-primary hover:underline font-medium"
            >
              {isSignUp ? 'Sign in' : 'Create one'}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthPage