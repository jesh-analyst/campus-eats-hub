import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, ChefHat, Eye, EyeOff, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'student' | 'canteen'>('student');
  
  const [studentForm, setStudentForm] = useState({ email: '', password: '' });
  const [canteenForm, setCanteenForm] = useState({ 
    email: '', 
    password: '',
    role: 'staff' as 'staff' | 'owner'
  });

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentForm.email || !studentForm.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await login(studentForm.email, studentForm.password, 'student');
      toast.success('Welcome back!');
      navigate('/student/menu');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const handleCanteenLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canteenForm.email || !canteenForm.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await login(canteenForm.email, canteenForm.password, canteenForm.role);
      toast.success('Welcome back!');
      navigate('/canteen/dashboard');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-slide-up">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto flex items-center justify-center shadow-glow">
            <span className="text-3xl">🍽️</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">CampusBite</h1>
          <p className="text-muted-foreground">College Canteen Ordering System</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'student' | 'canteen')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student" className="gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="canteen" className="gap-2">
                  <ChefHat className="w-4 h-4" />
                  Canteen
                </TabsTrigger>
              </TabsList>

              {/* Student Login */}
              <TabsContent value="student">
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="your.email@campus.edu"
                      value={studentForm.email}
                      onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="student-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={studentForm.password}
                        onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      Location access required for ordering
                    </span>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In as Student'}
                  </Button>
                </form>
              </TabsContent>

              {/* Canteen Login */}
              <TabsContent value="canteen">
                <form onSubmit={handleCanteenLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="canteen-email">Email</Label>
                    <Input
                      id="canteen-email"
                      type="email"
                      placeholder="staff@canteen.edu"
                      value={canteenForm.email}
                      onChange={(e) => setCanteenForm({ ...canteenForm, email: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="canteen-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="canteen-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={canteenForm.password}
                        onChange={(e) => setCanteenForm({ ...canteenForm, password: e.target.value })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Role</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={canteenForm.role === 'staff' ? 'default' : 'outline'}
                        onClick={() => setCanteenForm({ ...canteenForm, role: 'staff' })}
                        className="w-full"
                      >
                        Staff
                      </Button>
                      <Button
                        type="button"
                        variant={canteenForm.role === 'owner' ? 'default' : 'outline'}
                        onClick={() => setCanteenForm({ ...canteenForm, role: 'owner' })}
                        className="w-full"
                      >
                        Owner
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In to Dashboard'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Demo credentials */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Demo: Use any email/password to test</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
