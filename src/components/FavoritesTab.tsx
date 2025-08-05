import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Heart, 
  ExternalLink, 
  Trash2, 
  Star,
  Calendar,
  Loader2
} from 'lucide-react';

interface Favorite {
  id: string;
  product_url: string;
  platform: string;
  created_at: string;
  metadata: {
    title: string;
    verdict: string;
    confidence: number;
    saved_at: string;
  };
}

export const FavoritesTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockFavorites: Favorite[] = [
    {
      id: '1',
      product_url: 'https://aliexpress.com/item/example1',
      platform: 'AliExpress',
      created_at: new Date().toISOString(),
      metadata: {
        title: 'Premium Wireless Earbuds with Noise Cancellation',
        verdict: 'winning',
        confidence: 87,
        saved_at: new Date().toISOString()
      }
    },
    {
      id: '2',
      product_url: 'https://amazon.com/dp/example2',
      platform: 'Amazon',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      metadata: {
        title: 'Smart Fitness Tracker with Heart Rate Monitor',
        verdict: 'potential',
        confidence: 73,
        saved_at: new Date(Date.now() - 86400000).toISOString()
      }
    },
    {
      id: '3',
      product_url: 'https://example.myshopify.com/products/example3',
      platform: 'Shopify',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      metadata: {
        title: 'Portable LED Ring Light for Photography',
        verdict: 'avoid',
        confidence: 45,
        saved_at: new Date(Date.now() - 172800000).toISOString()
      }
    }
  ];

  useEffect(() => {
    loadFavorites();
  }, [user]);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFavorites(mockFavorites);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load favorites",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      setFavorites(prev => prev.filter(fav => fav.id !== id));
      toast({
        title: "Removed",
        description: "Product removed from favorites",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove favorite",
        variant: "destructive",
      });
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'winning':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'potential':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'avoid':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
        <p className="text-muted-foreground mb-4">
          Save products from the scanner to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium">Your Favorites</h3>
          <p className="text-sm text-muted-foreground">
            {favorites.length} saved product{favorites.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {favorites.map((favorite) => (
          <Card key={favorite.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium line-clamp-2">
                      {favorite.metadata.title}
                    </h4>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getPlatformColor(favorite.platform)}>
                        {favorite.platform}
                      </Badge>
                      <Badge className={getVerdictColor(favorite.metadata.verdict)}>
                        {favorite.metadata.verdict.toUpperCase()}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3" />
                        {favorite.metadata.confidence}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(favorite.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(favorite.product_url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeFavorite(favorite.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};