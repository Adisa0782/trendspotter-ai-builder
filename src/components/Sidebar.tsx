import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
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
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Settings,
  Crown,
  Zap
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar = ({ activeTab, onTabChange, collapsed, onToggleCollapse }: SidebarProps) => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const menuItems = [
    { id: 'scanner', label: 'Scanner', icon: Search, isPro: false },
    { id: 'favorites', label: 'Favorites', icon: Heart, isPro: false },
    { id: 'history', label: 'History', icon: BarChart3, isPro: false },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, isPro: true },
    { id: 'generator', label: 'Store Generator', icon: Zap, isPro: true },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, isPro: true },
  ];

  return (
    <div className={cn(
      "h-screen bg-card/50 backdrop-blur-md border-r border-border/50 flex flex-col transition-all duration-300 relative",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Target className="h-8 w-8 text-primary" />
                <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm" />
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">TrendSniper</h1>
                <div className="flex items-center gap-1">
                  <Crown className="h-3 w-3 text-primary" />
                  <span className="text-xs text-primary font-medium">ELITE</span>
                </div>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="hover:bg-primary/10"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b border-border/50">
          <div className="glass-card p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-purple-400 flex items-center justify-center text-white font-semibold">
                {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.user_metadata?.full_name || 'Elite User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start transition-all duration-200 hover:bg-primary/10",
                isActive && "bg-primary/10 text-primary border-r-2 border-primary",
                collapsed ? "px-2" : "px-3"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <div className="relative">
                <Icon className={cn("h-4 w-4", collapsed ? "" : "mr-3")} />
                {item.isPro && (
                  <Crown className="h-2 w-2 text-primary absolute -top-1 -right-1" />
                )}
              </div>
              {!collapsed && (
                <div className="flex items-center justify-between flex-1">
                  <span>{item.label}</span>
                  {item.isPro && (
                    <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                      PRO
                    </span>
                  )}
                </div>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className={cn(
            "w-full justify-start hover:bg-primary/10",
            collapsed ? "px-2" : "px-3"
          )}
        >
          {theme === 'dark' ? (
            <Sun className={cn("h-4 w-4", collapsed ? "" : "mr-3")} />
          ) : (
            <Moon className={cn("h-4 w-4", collapsed ? "" : "mr-3")} />
          )}
          {!collapsed && (theme === 'dark' ? 'Light Mode' : 'Dark Mode')}
        </Button>
        
        {!collapsed && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start hover:bg-primary/10 px-3"
          >
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className={cn(
            "w-full justify-start hover:bg-destructive/10 text-destructive",
            collapsed ? "px-2" : "px-3"
          )}
        >
          <LogOut className={cn("h-4 w-4", collapsed ? "" : "mr-3")} />
          {!collapsed && 'Sign Out'}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;