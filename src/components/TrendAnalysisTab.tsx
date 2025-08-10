import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  X, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Search,
  Loader2,
  Zap,
  BarChart3
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface TrendData {
  keyword: string;
  data: Array<{
    date: string;
    value: number;
  }>;
  growth: number;
  color: string;
}

interface ApiResponse {
  keywords: Array<{
    keyword: string;
    trend_data: Array<{
      date: string;
      search_volume: number;
    }>;
  }>;
}

const COLORS = [
  '#a855f7', // Purple
  '#3b82f6', // Blue  
  '#10b981', // Green
  '#f59e0b', // Orange
  '#ef4444'  // Red
];

export const TrendAnalysisTab = () => {
  const { toast } = useToast();
  const [keywords, setKeywords] = useState<string[]>(['shoes']);
  const [newKeyword, setNewKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (keywords.length > 0) {
      fetchTrendData();
    }
  }, [keywords]);

  const fetchTrendData = async () => {
    if (keywords.length === 0) return;
    
    setLoading(true);
    try {
      const keywordsParam = keywords.join(',');
      const response = await fetch(`https://trend-kyos.onrender.com?keywords=${keywordsParam}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch trend data');
      }
      
      const data: ApiResponse = await response.json();
      
      // Process the API data
      const processedData = data.keywords.map((item, index) => {
        const sortedData = item.trend_data.sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        // Calculate growth rate (last value vs first value)
        const firstValue = sortedData[0]?.search_volume || 0;
        const lastValue = sortedData[sortedData.length - 1]?.search_volume || 0;
        const growth = firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;
        
        return {
          keyword: item.keyword,
          data: sortedData.map(point => ({
            date: point.date,
            value: point.search_volume
          })),
          growth,
          color: COLORS[index % COLORS.length]
        };
      });
      
      setTrendData(processedData);
      
      // Prepare chart data
      if (processedData.length > 0) {
        const allDates = [...new Set(
          processedData.flatMap(trend => trend.data.map(point => point.date))
        )].sort();
        
        const chartPoints = allDates.map(date => {
          const point: any = { date };
          processedData.forEach(trend => {
            const dataPoint = trend.data.find(d => d.date === date);
            point[trend.keyword] = dataPoint?.value || 0;
          });
          return point;
        });
        
        setChartData(chartPoints);
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch trend data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    if (keywords.length >= 5) {
      toast({
        title: "Limit Reached",
        description: "You can compare up to 5 keywords at once.",
        variant: "destructive",
      });
      return;
    }
    if (keywords.includes(newKeyword.toLowerCase().trim())) {
      toast({
        title: "Duplicate Keyword",
        description: "This keyword is already being tracked.",
        variant: "destructive",
      });
      return;
    }
    
    setKeywords(prev => [...prev, newKeyword.toLowerCase().trim()]);
    setNewKeyword('');
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(prev => prev.filter(k => k !== keyword));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (growth < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-muted-foreground" />;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-500';
    if (growth < 0) return 'text-red-500';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header with keyword management */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Trend Analysis</h3>
          <Badge className="bg-primary/20 text-primary border-primary/30">
            <Zap className="h-3 w-3 mr-1" />
            Pro
          </Badge>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Enter keyword (e.g., fashion, tech, shoes)"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
            className="flex-1 h-10 sm:h-auto"
            maxLength={50}
          />
          <Button 
            onClick={addKeyword}
            disabled={!newKeyword.trim() || keywords.length >= 5}
            className="px-4 w-full sm:w-auto h-10 sm:h-auto"
          >
            <Plus className="h-4 w-4 mr-2 sm:mr-0" />
            <span className="sm:hidden">Add Keyword</span>
          </Button>
        </div>
        
        {/* Keywords display */}
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <Badge 
              key={keyword} 
              variant="outline" 
              className="flex items-center gap-2 py-1 px-3"
              style={{ borderColor: COLORS[index % COLORS.length] + '40' }}
            >
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              {keyword}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeKeyword(keyword)}
                className="h-auto p-0 ml-1 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground">
          Compare up to 5 keywords to analyze trending topics and market demand.
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <Card className="glass-card">
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-muted-foreground">Analyzing trends...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Growth indicators */}
      {!loading && trendData.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {trendData.map((trend) => (
            <Card key={trend.keyword} className="glass-card hover-lift">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: trend.color }}
                  />
                  {getGrowthIcon(trend.growth)}
                </div>
                <h4 className="font-medium capitalize mb-1 text-sm sm:text-base truncate">{trend.keyword}</h4>
                <p className={`text-xs sm:text-sm font-semibold ${getGrowthColor(trend.growth)}`}>
                  {trend.growth > 0 ? '+' : ''}{trend.growth.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {trend.growth > 0 ? 'Rising' : trend.growth < 0 ? 'Declining' : 'Stable'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Trend chart */}
      {!loading && chartData.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Search Volume Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="h-[300px] sm:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                      color: 'hsl(var(--card-foreground))',
                      fontSize: '14px'
                    }}
                    labelFormatter={(label) => `Date: ${formatDate(label)}`}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  {trendData.map((trend) => (
                    <Line
                      key={trend.keyword}
                      type="monotone"
                      dataKey={trend.keyword}
                      stroke={trend.color}
                      strokeWidth={2}
                      dot={{ fill: trend.color, strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, fill: trend.color }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {!loading && keywords.length === 0 && (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Start Your Trend Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Add keywords above to begin analyzing market trends and search volumes
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};