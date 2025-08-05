import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Target, 
  LogOut, 
  Search, 
  Heart, 
  Trophy, 
  Moon, 
  Sun,
  Scan,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { ScannerPanel } from '@/components/ScannerPanel';
import { FavoritesTab } from '@/components/FavoritesTab';
import { LeaderboardTab } from '@/components/LeaderboardTab';
import { HistoryTab } from '@/components/HistoryTab';
import { useTheme } from 'next-themes';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('scanner');

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  TrendSniper
                </h1>
                <p className="text-xs text-muted-foreground">AI Product Analysis</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {user.user_metadata?.full_name || user.email}
          </h2>
          <p className="text-muted-foreground">
            Analyze products from AliExpress, Amazon, Shopify, and TikTok with AI-powered insights
          </p>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4 mb-6">
            <TabsTrigger value="scanner" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Scanner
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-6">
            <Card className="bg-gradient-to-br from-card via-card to-card/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="h-5 w-5 text-primary" />
                  Product Scanner
                </CardTitle>
                <CardDescription>
                  Paste any product URL from AliExpress, Amazon, Shopify, or TikTok to get AI-powered analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScannerPanel />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Favorite Products
                </CardTitle>
                <CardDescription>
                  Products you've saved for later analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FavoritesTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Scan History
                </CardTitle>
                <CardDescription>
                  View all your previous product analyses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HistoryTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Top Products
                </CardTitle>
                <CardDescription>
                  See the highest-rated products from our community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTab />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;