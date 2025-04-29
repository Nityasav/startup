import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Shield, CreditCard, BellRing, KeyRound, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

export default function DashboardSettingsSection() {
  const { user } = useAuth();

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

  // For authenticated users, show full settings
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold mb-3">Settings</h1>
      
      <Card className="bg-[#131318] border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <div className="grid gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={user?.user_metadata?.name || user?.email?.split('@')[0] || "User"} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={user?.email || ""} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Acme Inc." />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select id="timezone" className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                    <option>Pacific Time (UTC-8)</option>
                    <option>Mountain Time (UTC-7)</option>
                    <option>Central Time (UTC-6)</option>
                    <option>Eastern Time (UTC-5)</option>
                    <option>UTC</option>
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
                  <Switch id="dark-mode" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="compact-view" className="flex-grow">
                    <span>Compact View</span>
                    <span className="block text-xs text-muted-foreground">Reduce spacing in the interface</span>
                  </Label>
                  <Switch id="compact-view" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="animations" className="flex-grow">
                    <span>Animations</span>
                    <span className="block text-xs text-muted-foreground">Enable UI animations</span>
                  </Label>
                  <Switch id="animations" defaultChecked />
                </div>
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Save Changes</Button>
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
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b border-blue-900/20 pb-3">
                  <div className="flex items-center space-x-4">
                    <BellRing className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">Workflow Alerts</p>
                      <p className="text-xs text-muted-foreground">Get notified about workflow status changes</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b border-blue-900/20 pb-3">
                  <div className="flex items-center space-x-4">
                    <BellRing className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Agent Status Updates</p>
                      <p className="text-xs text-muted-foreground">Get notified when agents change status</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center space-x-4">
                    <BellRing className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium">System Announcements</p>
                      <p className="text-xs text-muted-foreground">Receive important system announcements</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Save Preferences</Button>
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
                      <Button variant="outline" className="h-8 border-blue-900/20 bg-blue-900/10 hover:bg-blue-900/20">Change</Button>
                    </div>
                    <div className="mt-1.5">
                      <p className="font-medium">Pro Plan - $49/month</p>
                      <p className="text-xs text-muted-foreground">Next billing date: Feb 15, 2024</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 border-t border-blue-900/20 pt-3 mt-3">
                    <p className="text-sm font-medium">Payment Method</p>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <p className="text-sm">VISA ending in 4242</p>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Button variant="outline" className="h-8 text-xs border-blue-900/20 bg-blue-900/10 hover:bg-blue-900/20">Update</Button>
                      <Button variant="outline" className="h-8 text-xs border-blue-900/20 bg-blue-900/10 hover:bg-blue-900/20">View Invoices</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
