import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Trophy, 
  ExternalLink, 
  Star,
  TrendingUp,
  Medal,
  Award,
  Loader2
} from 'lucide-react';

interface LeaderboardItem {
  id: string;
  product_url: string;
  platform: string;
  score: number;
  created_at: string;
  metadata: {
    title: string;
    verdict: string;
    confidence: number;
    votes: number;
    revenue_estimate: string;
  };
}

export const LeaderboardTab = () => {
  const { toast } = useToast();
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockLeaderboard: LeaderboardItem[] = [
    {
      id: '1',
      product_url: 'https://aliexpress.com/item/winner1',
      platform: 'AliExpress',
      score: 95,
      created_at: new Date().toISOString(),
      metadata: {
        title: 'Smart Bluetooth Sleep Mask with Built-in Speakers',
        verdict: 'winning',
        confidence: 95,
        votes: 247,
        revenue_estimate: '$25,000/month'
      }
    },
    {
      id: '2',
      product_url: 'https://amazon.com/dp/winner2',
      platform: 'Amazon',
      score: 92,
      created_at: new Date().toISOString(),
      metadata: {
        title: 'Portable Car Jump Starter Power Bank',
        verdict: 'winning',
        confidence: 92,
        votes: 189,
        revenue_estimate: '$18,500/month'
      }
    },
    {
      id: '3',
      product_url: 'https://example.myshopify.com/products/winner3',
      platform: 'Shopify',
      score: 89,
      created_at: new Date().toISOString(),
      metadata: {
        title: 'Wireless Phone Charger with LED Light',
        verdict: 'winning',
        confidence: 89,
        votes: 156,
        revenue_estimate: '$15,200/month'
      }
    },
    {
      id: '4',
      product_url: 'https://tiktok.com/@shop/winner4',
      platform: 'TikTok',
      score: 86,
      created_at: new Date().toISOString(),
      metadata: {
        title: 'Magnetic Cable Organizer for Desk Setup',
        verdict: 'winning',
        confidence: 86,
        votes: 134,
        revenue_estimate: '$12,800/month'
      }
    },
    {
      id: '5',
      product_url: 'https://aliexpress.com/item/winner5',
      platform: 'AliExpress',
      score: 84,
      created_at: new Date().toISOString(),
      metadata: {
        title: 'LED Strip Lights with Music Sync',
        verdict: 'winning',
        confidence: 84,
        votes: 98,
        revenue_estimate: '$10,500/month'
      }
    }
  ];

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLeaderboard(mockLeaderboard);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load leaderboard",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'AliExpress':
        return 'bg-orange-500/10 text-orange-500';
      case 'Amazon':
        return 'bg-blue-500/10 text-blue-500';
      case 'Shopify':
        return 'bg-green-500/10 text-green-500';
      case 'TikTok':
        return 'bg-pink-500/10 text-pink-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="h-5 w-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{index + 1}</span>;
    }
  };

  const getRankBg = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/20';
      case 1:
        return 'bg-gradient-to-r from-gray-400/10 to-gray-500/10 border-gray-400/20';
      case 2:
        return 'bg-gradient-to-r from-amber-600/10 to-amber-700/10 border-amber-600/20';
      default:
        return 'bg-card';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium">Top Products</h3>
          <p className="text-sm text-muted-foreground">
            Highest scoring products from our community
          </p>
        </div>
        <Button variant="outline" onClick={loadLeaderboard}>
          <TrendingUp className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-3">
        {leaderboard.map((item, index) => (
          <Card key={item.id} className={`hover:shadow-md transition-all ${getRankBg(index)}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/30">
                  {getRankIcon(index)}
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium line-clamp-2">
                      {item.metadata.title}
                    </h4>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getPlatformColor(item.platform)}>
                        {item.platform}
                      </Badge>
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                        WINNING
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Score</p>
                      <div className="flex items-center gap-1 font-medium">
                        <Star className="h-3 w-3 text-primary" />
                        {item.score}%
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Votes</p>
                      <p className="font-medium">{item.metadata.votes}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Est. Revenue</p>
                      <p className="font-medium text-green-500">{item.metadata.revenue_estimate}</p>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(item.product_url, '_blank')}
                        className="w-full"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-6">
        <p className="text-sm text-muted-foreground">
          Rankings updated daily based on community votes and AI analysis
        </p>
      </div>
    </div>
  );
};