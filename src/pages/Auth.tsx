import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';
import { Eye, EyeOff, Target, TrendingUp, Sparkles, Zap, Star } from 'lucide-react';

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });
  
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn(signInData.email, signInData.password);
      
      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to TrendSniper Elite.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signUp(signUpData.email, signUpData.password, signUpData.fullName);
      
      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-purple-500/10" />
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-purple-400/20 backdrop-blur-sm" />
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400/20 to-primary/20 backdrop-blur-sm" />
      </div>
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '4s' }}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/30 to-purple-400/30 backdrop-blur-sm" />
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Hero content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8 animate-slide-up order-2 lg:order-1">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start mb-6 gap-3 sm:gap-4">
                <div className="relative">
                  <Target className="h-10 w-10 sm:h-12 sm:w-12 text-primary animate-glow" />
                  <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg animate-pulse" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text">
                    TrendSniper
                  </h1>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                    <span className="text-sm font-medium text-primary">ELITE</span>
                    <Star className="h-4 w-4 text-primary fill-current" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Elite Product Intelligence
                <br />
                <span className="gradient-text">for Winning Dropshippers</span>
              </h2>
              
              <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Advanced AI-powered product analysis, real-time market intelligence, and premium insights trusted by elite entrepreneurs worldwide.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 lg:mt-8">
              <div className="glass-card p-3 sm:p-4 hover-lift">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-2 mx-auto sm:mx-0" />
                <h3 className="font-semibold text-xs sm:text-sm text-center sm:text-left">Real-time Scanning</h3>
                <p className="text-xs text-muted-foreground text-center sm:text-left">Instant product analysis</p>
              </div>
              <div className="glass-card p-3 sm:p-4 hover-lift">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-2 mx-auto sm:mx-0" />
                <h3 className="font-semibold text-xs sm:text-sm text-center sm:text-left">Market Intelligence</h3>
                <p className="text-xs text-muted-foreground text-center sm:text-left">Advanced trend analytics</p>
              </div>
              <div className="glass-card p-3 sm:p-4 hover-lift">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-2 mx-auto sm:mx-0" />
                <h3 className="font-semibold text-xs sm:text-sm text-center sm:text-left">AI Insights</h3>
                <p className="text-xs text-muted-foreground text-center sm:text-left">Premium analysis tools</p>
              </div>
            </div>
          </div>

          {/* Right side - Auth form */}
          <div className="w-full max-w-md mx-auto animate-slide-up order-1 lg:order-2" style={{ animationDelay: '0.2s' }}>
            <Card className="glass-card hover-glow border-2">
              <CardHeader className="space-y-1 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">Welcome to Elite</CardTitle>
                <CardDescription>
                  Access your premium dashboard and advanced analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 glass">
                    <TabsTrigger value="signin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Join Elite
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Input
                          type="email"
                          placeholder="Email address"
                          value={signInData.email}
                          onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                          className="glass-card border-border/50 focus:border-primary transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-2 relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          value={signInData.password}
                          onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                          className="glass-card border-border/50 focus:border-primary transition-colors"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-primary/10"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-purple-400 hover:from-primary/90 hover:to-purple-400/90 text-white font-semibold py-3 hover-glow transition-all duration-300 h-12" 
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Signing In...
                          </div>
                        ) : (
                          'Access Dashboard'
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Input
                          type="text"
                          placeholder="Full name"
                          value={signUpData.fullName}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, fullName: e.target.value }))}
                          className="glass-card border-border/50 focus:border-primary transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="email"
                          placeholder="Email address"
                          value={signUpData.email}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                          className="glass-card border-border/50 focus:border-primary transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-2 relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                          className="glass-card border-border/50 focus:border-primary transition-colors"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-primary/10"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-purple-400 hover:from-primary/90 hover:to-purple-400/90 text-white font-semibold py-3 hover-glow transition-all duration-300 h-12" 
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Creating Account...
                          </div>
                        ) : (
                          'Join TrendSniper Elite'
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground">
                    Trusted by 10,000+ elite dropshippers worldwide
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;