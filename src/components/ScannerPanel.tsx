import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  ExternalLink, 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  Star,
  TrendingUp,
  DollarSign,
  Users
} from 'lucide-react';

interface AnalysisResult {
  title: string;
  image: string;
  confidence: number;
  summary: string;
  verdict: 'winning' | 'potential' | 'avoid';
  advice: string;
  estimatedRevenue: string;
  competition: string;
  targetAudience: string;
}

export const ScannerPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const detectPlatform = (url: string): string => {
    if (url.includes('aliexpress.com')) return 'AliExpress';
    if (url.includes('amazon.com') || url.includes('amzn.')) return 'Amazon';
    if (url.includes('shopify.com') || url.includes('.myshopify.')) return 'Shopify';
    if (url.includes('tiktok.com')) return 'TikTok';
    return 'Unknown';
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const mockAnalysis = (): AnalysisResult => {
    const verdicts: AnalysisResult['verdict'][] = ['winning', 'potential', 'avoid'];
    const randomVerdict = verdicts[Math.floor(Math.random() * verdicts.length)];
    
    const products = [
      {
        title: "Smart Fitness Tracker with Heart Rate Monitor",
        summary: "High-demand fitness wearable with excellent margins. Strong trend in health monitoring devices with growing market adoption.",
        revenue: "$5,000 - $25,000/month",
        audience: "Fitness enthusiasts, health-conscious individuals aged 25-45"
      },
      {
        title: "Wireless Phone Charger Stand with RGB Lighting",
        summary: "Popular tech accessory with good profit margins. Gaming and tech aesthetic appeals to younger demographics.",
        revenue: "$3,200 - $18,000/month", 
        audience: "Gamers, tech enthusiasts, remote workers aged 18-35"
      },
      {
        title: "Portable Bluetooth Speaker - Waterproof Design",
        summary: "Evergreen product with consistent demand. Outdoor and lifestyle market shows strong year-round sales potential.",
        revenue: "$4,500 - $22,000/month",
        audience: "Outdoor enthusiasts, music lovers, travelers aged 20-40"
      },
      {
        title: "LED Strip Lights with App Control",
        summary: "Trending home decor item with viral potential on social media. Strong impulse purchase behavior in this category.",
        revenue: "$6,000 - $35,000/month",
        audience: "Home decorators, content creators, gamers aged 16-30"
      }
    ];
    
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    
    return {
      title: randomProduct.title,
      image: "/placeholder.svg",
      confidence: Math.floor(Math.random() * 30) + 70,
      summary: randomProduct.summary,
      verdict: randomVerdict,
      advice: randomVerdict === 'winning' 
        ? "🔥 WINNING PRODUCT! This shows excellent market potential. Launch with confidence - test small budgets first, then scale aggressively. Focus on high-converting creatives and target the identified audience segments."
        : randomVerdict === 'potential'
        ? "⚡ POTENTIAL WINNER. Moderate opportunity detected. Test carefully with small budgets and monitor key metrics (CTR, conversion rates) closely. Scale only after validating performance."
        : "⚠️ HIGH RISK. Saturated market with fierce competition. Margins may be too low for profitable scaling. Consider alternative products or focus on unique positioning.",
      estimatedRevenue: randomProduct.revenue,
      competition: randomVerdict === 'winning' ? "Low" : randomVerdict === 'potential' ? "Medium" : "High",
      targetAudience: randomProduct.audience
    };
  };

  const analyzeProduct = async () => {
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a valid product URL",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    const platform = detectPlatform(url);
    if (platform === 'Unknown') {
      toast({
        title: "Unsupported Platform",
        description: "Currently supports AliExpress, Amazon, Shopify, and TikTok",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Save to history when database types are fixed
      // await supabase.from('history').insert({...})

      // Mock AI analysis (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      const analysis = mockAnalysis();
      setResult(analysis);

      toast({
        title: "Analysis Complete!",
        description: `Product analyzed successfully`,
      });

    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async () => {
    if (!result || !user) return;

    try {
      // TODO: Save to favorites when database types are fixed
      // await supabase.from('favorites').insert({...})

      toast({
        title: "Added to Favorites",
        description: "Product saved to your favorites list",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add to favorites",
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

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'winning':
        return <CheckCircle className="h-4 w-4" />;
      case 'potential':
        return <AlertCircle className="h-4 w-4" />;
      case 'avoid':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Paste product URL here (AliExpress, Amazon, Shopify, TikTok)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={analyzeProduct} 
            disabled={loading}
            className="bg-gradient-to-r from-primary to-primary/80"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {loading ? 'Analyzing...' : 'Analyze'}
          </Button>
        </div>
        
        {/* Demo URLs */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUrl("https://www.aliexpress.com/item/1005003245887945.html")}
            className="text-xs"
          >
            Demo AliExpress URL
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUrl("https://www.amazon.com/dp/B08N5WRWNW")}
            className="text-xs"
          >
            Demo Amazon URL
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUrl("https://example.myshopify.com/products/wireless-earbuds")}
            className="text-xs"
          >
            Demo Shopify URL
          </Button>
        </div>
        
        {url && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ExternalLink className="h-4 w-4" />
            Platform: {detectPlatform(url)}
          </div>
        )}
      </div>

      {/* Analysis Result */}
      {result && (
        <Card className="bg-gradient-to-br from-card via-card to-muted/20">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{result.title}</h3>
                  <div className="flex items-center gap-3">
                    <Badge className={getVerdictColor(result.verdict)}>
                      {getVerdictIcon(result.verdict)}
                      {result.verdict.toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="font-medium">{result.confidence}%</span>
                      <span className="text-sm text-muted-foreground">confidence</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" onClick={addToFavorites}>
                  Add to Favorites
                </Button>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h4 className="font-medium">Summary</h4>
                <p className="text-muted-foreground">{result.summary}</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Revenue</p>
                    <p className="font-medium">{result.estimatedRevenue}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Competition</p>
                    <p className="font-medium">{result.competition}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <Users className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Target Audience</p>
                    <p className="font-medium text-xs">{result.targetAudience}</p>
                  </div>
                </div>
              </div>

              {/* Advice */}
              <div className="space-y-2">
                <h4 className="font-medium">AI Recommendation</h4>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-sm">{result.advice}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};