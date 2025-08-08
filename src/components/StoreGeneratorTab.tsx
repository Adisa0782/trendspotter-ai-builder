import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  Loader2
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface StoreData {
  name: string;
  niche: string;
  theme: string;
  mainColor: string;
  demoProducts: boolean;
}

const StoreGeneratorTab = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Owner', avatar: '' },
    { id: '2', name: 'Mike Chen', email: 'mike@example.com', role: 'Designer', avatar: '' },
  ]);
  
  const [storeData, setStoreData] = useState<StoreData>({
    name: '',
    niche: '',
    theme: '',
    mainColor: '#8B5CF6',
    demoProducts: true
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('');
  
  const [generatedStore, setGeneratedStore] = useState({
    url: 'https://trendy-fashion-store.myshopify.com',
    preview: '/placeholder.svg',
    theme: 'Modern',
    productsAdded: 47
  });

  const roles = ['Owner', 'Designer', 'Product Manager', 'Developer', 'Marketer'];
  const themes = ['Random', 'Minimal', 'Modern', 'Luxury', 'Fashion', 'Electronics'];
  
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

  const handleGenerateStore = async () => {
    if (!storeData.name || !storeData.niche) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate store generation process
    for (let i = 0; i < statusMessages.length; i++) {
      setCurrentStatus(statusMessages[i]);
      setProgress((i + 1) * (100 / statusMessages.length));
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setIsGenerating(false);
    setIsComplete(true);
  };

  const resetGeneration = () => {
    setIsGenerating(false);
    setIsComplete(false);
    setProgress(0);
    setCurrentStatus('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-full bg-primary/10 border-2 border-primary/20">
            <Store className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Store Generator</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Collaborate with your team to launch a fully ready Shopify store in minutes.
        </p>
      </div>

      {/* Team Collaboration Bar */}
      <Card className="glass-card border-2 border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Team Collaboration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="glass-button">
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Team Members
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card">
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>
                    Enter email address to invite a new team member
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleInviteTeamMember}
                      className="flex-1"
                      disabled={!inviteEmail.trim()}
                    >
                      Send Invite
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsInviteModalOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="glass-card p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                  {member.role !== 'Owner' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMember(member.id)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <Select value={member.role} onValueChange={(value) => updateMemberRole(member.id, value)}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        <div className="flex items-center gap-2">
                          {role === 'Owner' && <Crown className="h-3 w-3 text-primary" />}
                          {role}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Store Generation Form */}
      {!isGenerating && !isComplete && (
        <Card className="glass-card border-2 border-primary/20 hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Store Configuration
            </CardTitle>
            <CardDescription>
              Configure your store settings and theme preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  placeholder="Enter your store name"
                  value={storeData.name}
                  onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                  className="glass-card"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storeNiche">Store Niche</Label>
                <Input
                  id="storeNiche"
                  placeholder="e.g., Fashion, Electronics, Beauty"
                  value={storeData.niche}
                  onChange={(e) => setStoreData({...storeData, niche: e.target.value})}
                  className="glass-card"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme Selection</Label>
                <Select value={storeData.theme} onValueChange={(value) => setStoreData({...storeData, theme: value})}>
                  <SelectTrigger className="glass-card">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    {themes.map((theme) => (
                      <SelectItem key={theme} value={theme}>
                        {theme}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainColor">Main Color</Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="mainColor"
                    type="color"
                    value={storeData.mainColor}
                    onChange={(e) => setStoreData({...storeData, mainColor: e.target.value})}
                    className="w-16 h-10 border-0 rounded-lg cursor-pointer"
                  />
                  <Input
                    value={storeData.mainColor}
                    onChange={(e) => setStoreData({...storeData, mainColor: e.target.value})}
                    className="glass-card flex-1"
                    placeholder="#8B5CF6"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 glass-card rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="demoProducts" className="text-sm font-medium">
                  Enable Demo Products
                </Label>
                <p className="text-xs text-muted-foreground">
                  Include sample products to showcase your store
                </p>
              </div>
              <Switch
                id="demoProducts"
                checked={storeData.demoProducts}
                onCheckedChange={(checked) => setStoreData({...storeData, demoProducts: checked})}
              />
            </div>

            <Button 
              onClick={handleGenerateStore}
              className="w-full h-12 text-lg hover-glow"
              disabled={!storeData.name || !storeData.niche}
            >
              <Zap className="h-5 w-5 mr-2" />
              Generate Store
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Progress Card */}
      {isGenerating && (
        <Card className="glass-card border-2 border-primary/20 animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
              Generating Your Store
            </CardTitle>
            <CardDescription>
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
            
            <div className="glass-card p-4 text-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-3" />
              <p className="font-medium">{currentStatus}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result Card */}
      {isComplete && (
        <Card className="glass-card border-2 border-primary/20 animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Store Generated Successfully!
            </CardTitle>
            <CardDescription>
              Your Shopify store is ready to launch
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="glass-card p-6 space-y-4">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-purple-400/20 flex items-center justify-center border-2 border-primary/10">
                <div className="text-center space-y-2">
                  <Store className="h-12 w-12 text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">Store Preview</p>
                  <p className="font-medium">{storeData.name}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 hover-glow">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Store
                </Button>
                <Button variant="outline" className="glass-button">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share with Team
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-4 text-center">
                <p className="text-sm text-muted-foreground">Store URL</p>
                <p className="font-medium text-primary truncate">{generatedStore.url}</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-sm text-muted-foreground">Theme Used</p>
                <p className="font-medium">{storeData.theme || 'Modern'}</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-sm text-muted-foreground">Products Added</p>
                <p className="font-medium">{storeData.demoProducts ? generatedStore.productsAdded : 0}</p>
              </div>
            </div>

            <Button 
              variant="outline" 
              onClick={resetGeneration}
              className="w-full glass-button"
            >
              Generate Another Store
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StoreGeneratorTab;