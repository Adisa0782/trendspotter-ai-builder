import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  ExternalLink, 
  Star,
  Calendar,
  Loader2
} from 'lucide-react';

interface HistoryItem {
  id: string;
  product_url: string;
  platform: string;
  created_at: string;
  metadata: {
    title?: string;
    verdict?: string;
    confidence?: number;
    scanned_at: string;
  };
}

export const HistoryTab = () => {
  const { toast } = useToast();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockHistory: HistoryItem[] = [
    {
      id: '1',
      product_url: 'https://aliexpress.com/item/recent1',
      platform: 'AliExpress',
      created_at: new Date().toISOString(),
      metadata: {
        title: 'Wireless Gaming Mouse with RGB',
        verdict: 'winning',
        confidence: 82,
        scanned_at: new Date().toISOString()
      }
    },
    {
      id: '2',
      product_url: 'https://amazon.com/dp/recent2',
      platform: 'Amazon',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      metadata: {
        scanned_at: new Date(Date.now() - 3600000).toISOString()
      }
    }
  ];

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHistory(mockHistory);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
      <div className="grid gap-4">
        {history.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{item.metadata.title || 'Product Analysis'}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge>{item.platform}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => window.open(item.product_url, '_blank')}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};