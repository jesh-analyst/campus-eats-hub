import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ChefHat, GraduationCap, Utensils, Clock, CreditCard, Bell } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'student') {
        navigate('/student/menu');
      } else {
        navigate('/canteen/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const features = [
    {
      icon: Utensils,
      title: 'Real-time Menu',
      description: 'Browse updated menu with availability status',
    },
    {
      icon: Clock,
      title: 'Quick Ordering',
      description: 'Place orders in seconds, skip the queue',
    },
    {
      icon: CreditCard,
      title: 'Easy Payments',
      description: 'Pay online or cash at pickup',
    },
    {
      icon: Bell,
      title: 'Live Updates',
      description: 'Get notified when your order is ready',
    },
  ];

  return (
    <div className="min-h-screen gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="text-center max-w-3xl mx-auto space-y-6 animate-slide-up">
          {/* Logo */}
          <div className="w-20 h-20 rounded-2xl gradient-primary mx-auto flex items-center justify-center shadow-glow animate-float">
            <span className="text-4xl">🍽️</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
            Welcome to{' '}
            <span className="text-primary">CampusBite</span>
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto">
            Your college canteen, now smarter. Order food, skip the queue, and enjoy your meal without the wait.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="xl"
              variant="hero"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto"
            >
              <GraduationCap className="w-5 h-5" />
              Order as Student
            </Button>
            <Button
              size="xl"
              variant="outline"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto"
            >
              <ChefHat className="w-5 h-5" />
              Canteen Login
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-16 lg:mt-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl border border-border p-6 text-center space-y-3 hover:shadow-lg hover:border-primary/20 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 mx-auto flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 mt-16 py-8 border-y border-border">
          <div className="text-center">
            <p className="text-3xl lg:text-4xl font-bold text-primary">500+</p>
            <p className="text-sm text-muted-foreground">Daily Orders</p>
          </div>
          <div className="text-center">
            <p className="text-3xl lg:text-4xl font-bold text-primary">50+</p>
            <p className="text-sm text-muted-foreground">Menu Items</p>
          </div>
          <div className="text-center">
            <p className="text-3xl lg:text-4xl font-bold text-primary">5 min</p>
            <p className="text-sm text-muted-foreground">Avg Wait Time</p>
          </div>
          <div className="text-center">
            <p className="text-3xl lg:text-4xl font-bold text-primary">4.8★</p>
            <p className="text-sm text-muted-foreground">User Rating</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
        <p>© 2024 CampusBite. Made for college canteens everywhere.</p>
      </footer>
    </div>
  );
};

export default Index;
