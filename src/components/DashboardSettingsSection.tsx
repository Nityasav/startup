import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Shield, CreditCard, BellRing, KeyRound, LogIn, Loader2, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserSettings, updateUserSettings, createDefaultUserSettings, UserSettings } from "@/services/userDataService";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

export default function DashboardSettingsSection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  
  // All user settings in one state object
  const [settings, setSettings] = useState<Partial<UserSettings>>({
    // Display options
    dark_mode: true,
    compact_view: false,
    animations_enabled: true,
    timezone: "UTC",
    
    // User profile
    display_name: "",
    company_name: "Acme Inc.",
    
    // Notification preferences
    email_notifications: true,
    workflow_alerts: true,
    agent_updates: false,
    system_announcements: true,
    
    // Billing information
    current_plan: "Free",
    billing_cycle: "Monthly",
    payment_method: "None"
  });

  // Load user settings from Supabase
  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Try to get user settings
        let userSettings = await getUserSettings(user.id);
        
        // If no settings exist, create default settings
        if (!userSettings) {
          console.log("Creating default settings for user", user.id);
          userSettings = await createDefaultUserSettings(user.id);
        }
        
        // If we have settings now, use them
        if (userSettings) {
          console.log("Loaded user settings:", userSettings);
          setSettingsId(userSettings.id);
          
          // Set all the settings fields from the database
          setSettings({
            // Display options
            dark_mode: userSettings.dark_mode,
            compact_view: userSettings.compact_view,
            animations_enabled: userSettings.animations_enabled,
            timezone: userSettings.timezone || "UTC",
            
            // User profile
            display_name: userSettings.display_name || (user?.user_metadata?.name || user?.email?.split('@')[0] || "User"),
            company_name: userSettings.company_name || (user?.user_metadata?.company || "Acme Inc."),
            
            // Notification preferences
            email_notifications: userSettings.email_notifications,
            workflow_alerts: userSettings.workflow_alerts,
            agent_updates: userSettings.agent_updates,
            system_announcements: userSettings.system_announcements,
            
            // Billing information
            current_plan: userSettings.current_plan || "Free",
            billing_cycle: userSettings.billing_cycle || "Monthly",
            payment_method: userSettings.payment_method || "None"
          });
        } else {
          console.error("Failed to load or create user settings");
          
          // Set default values from user info
          setSettings(prev => ({
            ...prev,
            display_name: user?.user_metadata?.name || user?.email?.split('@')[0] || "User",
            company_name: user?.user_metadata?.company || "Acme Inc.",
            email: user?.email || ""
          }));
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, [user]);

  // If not authenticated, show login prompt
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <Card className="w-full max-w-md bg-[#131318] border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Settings Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center p-6">
              <LogIn className="h-16 w-16 text-blue-500" />
            </div>
            <p className="text-center text-muted-foreground mb-4">
              Please sign in to access your account settings
            </p>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  const handleToggleChange = (key: keyof UserSettings, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveSettings = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      console.log("Saving settings:", settings);
      const updatedSettings = await updateUserSettings(user.id, settings);
      
      if (updatedSettings) {
        console.log("Settings saved successfully:", updatedSettings);
        toast({
          title: "Settings saved",
          description: "Your settings have been updated successfully",
          action: <Check className="h-4 w-4 text-green-500" />
        });
      } else {
        throw new Error("Failed to update settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  // For authenticated users, show full settings
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold mb-3">Settings</h1>
      
      <Card className="bg-[#131318] border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="general" 
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <div className="grid gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="display_name">Name</Label>
                  <Input
                    id="display_name"
                    name="display_name"
                    value={settings.display_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={user?.email || ""}
                    disabled
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="company_name">Company</Label>
                  <Input
                    id="company_name"
                    name="company_name"
                    value={settings.company_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    name="timezone"
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                    value={settings.timezone}
                    onChange={handleSelectChange}
                  >
                    <option value="America/Los_Angeles">Pacific Time (UTC-8)</option>
                    <option value="America/Denver">Mountain Time (UTC-7)</option>
                    <option value="America/Chicago">Central Time (UTC-6)</option>
                    <option value="America/New_York">Eastern Time (UTC-5)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-medium">Display Options</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="flex-grow">
                    <span>Dark Mode</span>
                    <span className="block text-xs text-muted-foreground">Use dark theme across the application</span>
                  </Label>
                  <Switch
                    id="dark-mode"
                    checked={settings.dark_mode}
                    onCheckedChange={(checked) => handleToggleChange('dark_mode', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="compact-view" className="flex-grow">
                    <span>Compact View</span>
                    <span className="block text-xs text-muted-foreground">Reduce spacing in the interface</span>
                  </Label>
                  <Switch
                    id="compact-view"
                    checked={settings.compact_view}
                    onCheckedChange={(checked) => handleToggleChange('compact_view', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="animations" className="flex-grow">
                    <span>Animations</span>
                    <span className="block text-xs text-muted-foreground">Enable UI animations</span>
                  </Label>
                  <Switch
                    id="animations"
                    checked={settings.animations_enabled}
                    onCheckedChange={(checked) => handleToggleChange('animations_enabled', checked)}
                  />
                </div>
              </div>
              
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={saveSettings}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-blue-900/20 pb-3">
                  <div className="flex items-center space-x-4">
                    <BellRing className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">Get emails about your activity</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.email_notifications}
                    onCheckedChange={(checked) => handleToggleChange('email_notifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between border-b border-blue-900/20 pb-3">
                  <div className="flex items-center space-x-4">
                    <BellRing className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">Workflow Alerts</p>
                      <p className="text-xs text-muted-foreground">Get notified about workflow status changes</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.workflow_alerts}
                    onCheckedChange={(checked) => handleToggleChange('workflow_alerts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between border-b border-blue-900/20 pb-3">
                  <div className="flex items-center space-x-4">
                    <BellRing className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Agent Status Updates</p>
                      <p className="text-xs text-muted-foreground">Get notified when agents change status</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.agent_updates}
                    onCheckedChange={(checked) => handleToggleChange('agent_updates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center space-x-4">
                    <BellRing className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium">System Announcements</p>
                      <p className="text-xs text-muted-foreground">Receive important system announcements</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.system_announcements}
                    onCheckedChange={(checked) => handleToggleChange('system_announcements', checked)}
                  />
                </div>
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={saveSettings}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Preferences"
                )}
              </Button>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <KeyRound className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">API Keys</p>
                      <p className="text-xs text-muted-foreground">Manage your API access tokens</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-blue-900/20 rounded-md p-3 space-y-3 bg-blue-900/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Production Key</p>
                      <p className="text-xs text-muted-foreground">Created on Oct 12, 2023</p>
                    </div>
                    <Button variant="outline" className="h-8 border-blue-900/20 bg-blue-900/10 hover:bg-blue-900/20">Show</Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Development Key</p>
                      <p className="text-xs text-muted-foreground">Created on Jan 5, 2024</p>
                    </div>
                    <Button variant="outline" className="h-8 border-blue-900/20 bg-blue-900/10 hover:bg-blue-900/20">Show</Button>
                  </div>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2">Generate New API Key</Button>
              </div>
              
              <div className="space-y-3 pt-3">
                <h3 className="text-sm font-medium">API Usage</h3>
                <div className="border border-blue-900/20 rounded-md p-3 bg-blue-900/10">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Current Month Calls:</div>
                    <div className="text-right font-medium">145,233</div>
                    <div>Plan Limit:</div>
                    <div className="text-right font-medium">500,000</div>
                    <div>Reset Date:</div>
                    <div className="text-right font-medium">Feb 1, 2024</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Subscription</p>
                      <p className="text-xs text-muted-foreground">Manage your billing information</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-blue-900/20 rounded-md p-3 space-y-3 bg-blue-900/10">
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Current Plan</p>
                      <Button 
                        variant="outline" 
                        className="h-8 border-blue-900/20 bg-blue-900/10 hover:bg-blue-900/20"
                        onClick={() => setActiveTab("billing")}
                      >
                        Change
                      </Button>
                    </div>
                    <div className="mt-1.5">
                      <select
                        name="current_plan"
                        className="w-full p-2 mt-1 bg-background border border-input rounded-md"
                        value={settings.current_plan}
                        onChange={handleSelectChange}
                      >
                        <option value="Free">Free Plan - $0/month</option>
                        <option value="Basic">Basic Plan - $19/month</option>
                        <option value="Pro">Pro Plan - $49/month</option>
                        <option value="Enterprise">Enterprise Plan - $199/month</option>
                      </select>
                      
                      <div className="mt-3">
                        <Label htmlFor="billing_cycle">Billing Cycle</Label>
                        <select
                          id="billing_cycle"
                          name="billing_cycle"
                          className="w-full p-2 mt-1 bg-background border border-input rounded-md"
                          value={settings.billing_cycle}
                          onChange={handleSelectChange}
                        >
                          <option value="Monthly">Monthly</option>
                          <option value="Annual">Annual (Save 20%)</option>
                        </select>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-2">
                        Next billing date: {new Date().setMonth(new Date().getMonth() + 1)
                          .toString().split(' ').slice(1, 4).join(' ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 border-t border-blue-900/20 pt-3 mt-3">
                    <p className="text-sm font-medium">Payment Method</p>
                    <select
                      name="payment_method"
                      className="w-full p-2 mt-1 bg-background border border-input rounded-md"
                      value={settings.payment_method}
                      onChange={handleSelectChange}
                    >
                      <option value="None">None</option>
                      <option value="VISA ending in 4242">VISA ending in 4242</option>
                      <option value="Mastercard ending in 5555">Mastercard ending in 5555</option>
                      <option value="PayPal">PayPal</option>
                    </select>
                    <div className="flex space-x-2 mt-2">
                      <Button variant="outline" className="h-8 text-xs border-blue-900/20 bg-blue-900/10 hover:bg-blue-900/20">Update</Button>
                      <Button variant="outline" className="h-8 text-xs border-blue-900/20 bg-blue-900/10 hover:bg-blue-900/20">View Invoices</Button>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 mt-3"
                  onClick={saveSettings}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving Billing Information...
                    </>
                  ) : (
                    "Save Billing Information"
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Toaster />
    </div>
  );
}
