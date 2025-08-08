import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Scan,
  Heart,
  BarChart3,
  Trophy,
  Zap,
  TrendingUp,
  Crown,
  Lock,
  Star
} from 'lucide-react';
import { ScannerPanel } from '@/components/ScannerPanel';
import { FavoritesTab } from '@/components/FavoritesTab';
import { LeaderboardTab } from '@/components/LeaderboardTab';
import { HistoryTab } from '@/components/HistoryTab';
import { TrendAnalysisTab } from '@/components/TrendAnalysisTab';
import StoreGeneratorTab from '@/components/StoreGeneratorTab';
import Sidebar from '@/components/Sidebar';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('scanner');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const isPremiumFeature = (tabId: string) => {
    return ['trends', 'leaderboard', 'generator', 'analytics'].includes(tabId);
  };

  const renderTabContent = () => {
    if (isPremiumFeature(activeTab)) {
      return (
        <Card className="glass-card border-2 border-primary/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-primary/10 border-2 border-primary/20">
                <Crown className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl gradient-text">Premium Feature</CardTitle>
            <CardDescription>
              This feature is available for TrendSniper Elite Pro subscribers
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Unlock advanced analytics, store generation, and premium insights
              </p>
              <div className="flex items-center justify-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Pro Only</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="glass-card p-4">
                <TrendingUp className="h-6 w-6 text-primary mb-2 mx-auto" />
                <h3 className="font-semibold text-sm">Real-time Analytics</h3>
                <p className="text-xs text-muted-foreground">Advanced market insights</p>
              </div>
              <div className="glass-card p-4">
                <Zap className="h-6 w-6 text-primary mb-2 mx-auto" />
                <h3 className="font-semibold text-sm">Store Generator</h3>
                <p className="text-xs text-muted-foreground">AI-powered store creation</p>
              </div>
              <div className="glass-card p-4">
                <Trophy className="h-6 w-6 text-primary mb-2 mx-auto" />
                <h3 className="font-semibold text-sm">Elite Leaderboard</h3>
                <p className="text-xs text-muted-foreground">Top performer insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    switch (activeTab) {
      case 'scanner':
        return (
          <Card className="glass-card hover-lift border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5 text-primary" />
                Elite Product Scanner
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  AI-Powered
                </Badge>
              </CardTitle>
              <CardDescription>
                Advanced AI analysis for AliExpress, Amazon, Shopify, and TikTok products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScannerPanel />
            </CardContent>
          </Card>
        );
      
      case 'favorites':
        return (
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Saved Products
              </CardTitle>
              <CardDescription>
                Your curated collection of high-potential products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FavoritesTab />
            </CardContent>
          </Card>
        );
      
      case 'history':
        return (
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Analysis History
              </CardTitle>
              <CardDescription>
                Complete history of your product scans and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HistoryTab />
            </CardContent>
          </Card>
        );
      
      case 'trends':
        return (
          <Card className="glass-card hover-lift border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Trend Analysis
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  <Crown className="h-3 w-3 mr-1" />
                  Pro
                </Badge>
              </CardTitle>
              <CardDescription>
                Advanced keyword trend analysis and market insights powered by Google Trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrendAnalysisTab />
            </CardContent>
          </Card>
        );
      
      case 'generator':
        return (
          <Card className="glass-card hover-lift border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Store Generator
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  <Crown className="h-3 w-3 mr-1" />
                  Pro
                </Badge>
              </CardTitle>
              <CardDescription>
                AI-powered Shopify store creation with team collaboration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StoreGeneratorTab />
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border/40 bg-card/30 backdrop-blur-md sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Elite Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user.user_metadata?.full_name || 'Elite User'}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-primary to-purple-400 text-white border-0">
                  <Star className="h-3 w-3 mr-1" />
                  Elite Member
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className={cn(
          "flex-1 p-6 transition-all duration-300",
          sidebarCollapsed ? "ml-0" : "ml-0"
        )}>
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="glass-card hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Products Scanned</p>
                      <p className="text-2xl font-bold text-primary">127</p>
                    </div>
                    <Scan className="h-8 w-8 text-primary/60" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Favorites</p>
                      <p className="text-2xl font-bold text-primary">23</p>
                    </div>
                    <Heart className="h-8 w-8 text-primary/60" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Win Rate</p>
                      <p className="text-2xl font-bold text-primary">84%</p>
                    </div>
                    <Trophy className="h-8 w-8 text-primary/60" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Trend Score</p>
                      <p className="text-2xl font-bold text-primary">9.2</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary/60" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="animate-slide-up">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;