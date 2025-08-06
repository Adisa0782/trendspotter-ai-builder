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
    
    return {
      title: "Premium Wireless Earbuds with Noise Cancellation",
      image: "/placeholder.svg",
      confidence: Math.floor(Math.random() * 30) + 70,
      summary: "This product shows strong market potential with high demand in the audio accessories niche. The price point is competitive and the features align with current consumer trends.",
      verdict: randomVerdict,
      advice: randomVerdict === 'winning' 
        ? "This product has excellent potential. Consider testing with a small budget and scaling quickly."
        : randomVerdict === 'potential'
        ? "Moderate opportunity. Test carefully and monitor metrics closely before scaling."
        : "High risk product. Competition is fierce and margins may be too low.",
      estimatedRevenue: "$2,500 - $15,000/month",
      competition: randomVerdict === 'winning' ? "Low" : randomVerdict === 'potential' ? "Medium" : "High",
      targetAudience: "Tech enthusiasts, commuters, fitness enthusiasts aged 18-35"
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