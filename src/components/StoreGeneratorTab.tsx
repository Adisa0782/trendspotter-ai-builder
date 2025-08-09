import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import {
  Store,
  Users,
  Palette,
  Package,
  ExternalLink,
  Share2,
  Crown,
  Settings,
  ChevronDown,
  Plus,
  X,
  Zap,
  CheckCircle,
  Loader2,
  Eye,
  ShoppingCart,
  Star,
  Globe,
  Code,
  Smartphone
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

// Validation schema
const storeSchema = z.object({
  collaborationCode: z.string().min(1, "Collaboration code is required"),
  storeUrl: z.string()
    .min(3, "Store URL must be at least 3 characters")
    .max(30, "Store URL must be less than 30 characters")
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens allowed")
    .refine((val) => !val.startsWith('-') && !val.endsWith('-'), "Cannot start or end with hyphen"),
  name: z.string()
    .min(2, "Store name must be at least 2 characters")
    .max(50, "Store name must be less than 50 characters"),
  theme: z.string().min(1, "Please select a theme"),
  productSource: z.string().min(1, "Please select a product source"),
  category: z.string().min(1, "Please select a category"),
  productCount: z.number()
    .min(1, "Must have at least 1 product")
    .max(100, "Cannot exceed 100 products")
});

type StoreFormData = z.infer<typeof storeSchema>;

const StoreGeneratorTab = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Owner', avatar: '' },
    { id: '2', name: 'Mike Chen', email: 'mike@example.com', role: 'Designer', avatar: '' },
  ]);
  
  // Form setup with validation
  const form = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      collaborationCode: '',
      storeUrl: '',
      name: '',
      theme: '',
      productSource: '',
      category: '',
      productCount: 25
    }
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('');
  
  const [generatedStore, setGeneratedStore] = useState({
    url: 'https://trendy-fashion-store.myshopify.com',
    preview: '/placeholder.svg',
    theme: 'Modern',
    productsAdded: 47
  });

  const themes = ['Dawn', 'Debut', 'Brooklyn', 'Impulse', 'District'];
  const productSources = ['AliExpress', 'CJ Dropshipping', 'Custom'];
  const categories = ['Fashion', 'Electronics', 'Beauty', 'Home', 'Sports'];
  
  const sampleProducts = [
    { id: 1, title: 'Wireless Bluetooth Headphones', price: '$89.99', image: '/placeholder.svg' },
    { id: 2, title: 'Smartphone Case', price: '$29.99', image: '/placeholder.svg' },
    { id: 3, title: 'LED Desk Lamp', price: '$49.99', image: '/placeholder.svg' },
    { id: 4, title: 'Portable Charger', price: '$39.99', image: '/placeholder.svg' },
    { id: 5, title: 'Fitness Tracker', price: '$129.99', image: '/placeholder.svg' },
  ];
  
  const statusMessages = [
    'Initializing store creation...',
    'Setting up store structure...',
    'Applying selected theme...',
    'Configuring store settings...',
    'Importing demo products...',
    'Optimizing for mobile...',
    'Setting up payment methods...',
    'Finalizing store launch...',
    'Store ready for launch!'
  ];

  const handleInviteTeamMember = () => {
    if (inviteEmail.trim()) {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: 'Designer',
        avatar: ''
      };
      setTeamMembers([...teamMembers, newMember]);
      setInviteEmail('');
      setIsInviteModalOpen(false);
    }
  };

  const removeMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const updateMemberRole = (id: string, newRole: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, role: newRole } : member
    ));
  };

  const handleGenerateStore = async (data: StoreFormData) => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate store generation process
    for (let i = 0; i < statusMessages.length; i++) {
      setCurrentStatus(statusMessages[i]);
      setProgress((i + 1) * (100 / statusMessages.length));
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
    
    setIsGenerating(false);
    setIsComplete(true);
    toast({
      title: "Store Generated!",
      description: "Your store is ready to launch.",
    });
  };

  const handleImportProducts = async () => {
    const isValid = await form.trigger(['productSource', 'category', 'productCount']);
    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fix the form errors before importing products.",
        variant: "destructive"
      });
      return;
    }
    
    setIsImporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsImporting(false);
    toast({
      title: "Products Imported",
      description: `${form.getValues('productCount')} products imported successfully.`,
    });
  };

  const handlePreviewStore = () => {
    setIsPreviewing(true);
    setTimeout(() => setIsPreviewing(false), 1000);
    toast({
      title: "Preview Updated",
      description: "Store preview has been refreshed.",
    });
  };

  const resetGeneration = () => {
    setIsGenerating(false);
    setIsComplete(false);
    setProgress(0);
    setCurrentStatus('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 backdrop-blur-sm">
            <Store className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Store Generator
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Collaborate with your team to launch a fully ready Shopify store in minutes.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Left Column - Store Setup Form */}
        <div className="space-y-6">

          {/* Store Setup Form */}
          <Card className="backdrop-blur-xl bg-background/60 border border-primary/20 rounded-2xl shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Settings className="h-6 w-6 text-primary" />
                Store Setup
              </CardTitle>
              <CardDescription className="text-base">
                Configure your new Shopify store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleGenerateStore)} className="space-y-6">
                  {/* Collaboration Code */}
                  <FormField
                    control={form.control}
                    name="collaborationCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Collaboration Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Shopify staff access code"
                            {...field}
                            className="bg-background/50 border-primary/30 h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Store URL */}
                  <FormField
                    control={form.control}
                    name="storeUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Store URL</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <Input
                              placeholder="your-store"
                              {...field}
                              className="bg-background/50 border-primary/30 h-12 rounded-r-none"
                            />
                            <div className="bg-muted/50 border border-l-0 border-primary/30 rounded-r-lg px-3 flex items-center text-sm text-muted-foreground">
                              .myshopify.com
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Store Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Store Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your store name"
                            {...field}
                            className="bg-background/50 border-primary/30 h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Theme Selection */}
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Theme Selection</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-primary/30 h-12">
                              <SelectValue placeholder="Choose a theme" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {themes.map((theme) => (
                              <SelectItem key={theme} value={theme}>
                                {theme}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Product Source */}
                  <FormField
                    control={form.control}
                    name="productSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Product Source</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-primary/30 h-12">
                              <SelectValue placeholder="Select product source" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {productSources.map((source) => (
                              <SelectItem key={source} value={source}>
                                {source}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Product Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Product Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-primary/30 h-12">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Number of Products */}
                  <FormField
                    control={form.control}
                    name="productCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Number of Products</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            placeholder="25"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            className="bg-background/50 border-primary/30 h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <Button 
                      type="submit"
                      className="w-full h-14 text-lg bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="h-5 w-5 mr-2" />
                          Generate Store
                        </>
                      )}
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={handleImportProducts}
                        disabled={isImporting}
                        className="h-12 border-primary/30 hover:bg-primary/10"
                      >
                        {isImporting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Importing...
                          </>
                        ) : (
                          <>
                            <Package className="h-4 w-4 mr-2" />
                            Import Products
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={handlePreviewStore}
                        disabled={isPreviewing}
                        className="h-12 border-primary/30 hover:bg-primary/10"
                      >
                        {isPreviewing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview Store
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Product Preview List */}
          <Card className="backdrop-blur-xl bg-background/60 border border-primary/20 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Sample Products
              </CardTitle>
              <CardDescription>
                Preview of products to be imported
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {sampleProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 bg-background/30 rounded-lg border border-primary/10">
                    <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{product.title}</p>
                      <p className="text-primary font-semibold">{product.price}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-muted-foreground">4.5</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Live Store Preview */}
        <div className="space-y-6">
          <Card className="backdrop-blur-xl bg-background/60 border border-primary/20 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Live Store Preview
              </CardTitle>
              <CardDescription>
                See how your store will look
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[9/16] lg:aspect-video rounded-xl bg-gradient-to-br from-primary/5 via-background to-purple-500/5 border border-primary/10 p-6 flex flex-col">
                {/* Preview Header */}
                <div className="flex items-center gap-2 mb-4 p-2 bg-background/50 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-muted/30 rounded px-2 py-1 text-xs text-center">
                    {form.watch('storeUrl') ? `${form.watch('storeUrl')}.myshopify.com` : 'your-store.myshopify.com'}
                  </div>
                </div>
                
                {/* Preview Content */}
                <div className="flex-1 space-y-4">
                  {isPreviewing ? (
                    <div className="h-full flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <>
                      {/* Store Header */}
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold">
                          {form.watch('name') || 'Your Store Name'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {form.watch('category') || 'Premium Products'}
                        </p>
                      </div>
                      
                      {/* Product Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="bg-background/30 rounded-lg p-3 border border-primary/10">
                            <div className="aspect-square bg-muted/30 rounded mb-2 flex items-center justify-center">
                              <Package className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <Skeleton className="h-3 w-full mb-1" />
                            <Skeleton className="h-3 w-1/2" />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Mobile Preview Toggle */}
                <div className="flex justify-center mt-4">
                  <div className="flex bg-background/50 rounded-lg p-1">
                    <Button variant="ghost" size="sm" className="h-8 px-3">
                      <Smartphone className="h-3 w-3 mr-1" />
                      Mobile
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 bg-primary/20">
                      <Globe className="h-3 w-3 mr-1" />
                      Desktop
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Progress Modal Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="backdrop-blur-xl bg-background/90 border border-primary/30 rounded-2xl shadow-2xl max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-center">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
                Generating Your Store
              </CardTitle>
              <CardDescription className="text-center">
                Please wait while we create your Shopify store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg text-center border border-primary/20">
                <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-3" />
                <p className="font-medium">{currentStatus}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}


      {/* Success Modal Overlay */}
      {isComplete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="backdrop-blur-xl bg-background/90 border border-green-500/30 rounded-2xl shadow-2xl max-w-lg w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-center text-green-500">
                <CheckCircle className="h-6 w-6" />
                Store Generated Successfully!
              </CardTitle>
              <CardDescription className="text-center">
                Your Shopify store is ready to launch
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-br from-green-500/10 to-primary/10 p-6 rounded-xl border border-green-500/20">
                <div className="text-center space-y-3">
                  <Store className="h-16 w-16 text-green-500 mx-auto" />
                  <h3 className="text-xl font-bold">{form.watch('name')}</h3>
                  <p className="text-sm text-muted-foreground">{form.watch('storeUrl')}.myshopify.com</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-background/50 p-3 rounded-lg border border-primary/10">
                  <p className="text-sm text-muted-foreground">Theme</p>
                  <p className="font-semibold">{form.watch('theme')}</p>
                </div>
                <div className="bg-background/50 p-3 rounded-lg border border-primary/10">
                  <p className="text-sm text-muted-foreground">Products</p>
                  <p className="font-semibold">{form.watch('productCount')}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Store
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <Button 
                variant="ghost" 
                onClick={resetGeneration}
                className="w-full"
              >
                Generate Another Store
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-12 pb-8">
        <p className="text-sm text-muted-foreground">
          Powered by <span className="text-primary font-semibold">TrendSniper AI Store Builder</span>
        </p>
      </div>
    </div>
  );
};

export default StoreGeneratorTab;