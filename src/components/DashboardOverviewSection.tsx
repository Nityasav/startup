import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, User, Clock, ArrowUpRight, Activity, CheckCircle2, AlertTriangle, Zap, Monitor } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function DashboardOverviewSection() {
  return (
    <div className="space-y-4">
      {/* Page title */}
      <h1 className="text-xl font-semibold mb-3">Overview Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#131318] border-0">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Workflows</p>
                <div className="text-3xl font-bold">24</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 font-medium">+17% from last month</span>
                </div>
              </div>
              <LayoutDashboard className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#131318] border-0">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total AI Agents</p>
                <div className="text-3xl font-bold">58</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 font-medium">+2% from last month</span>
                </div>
              </div>
              <User className="h-6 w-6 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#131318] border-0">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Workflow Duration</p>
                <div className="text-3xl font-bold">2m 45s</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-red-500 font-medium">-8% from last month</span>
                </div>
              </div>
              <Clock className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#131318] border-0">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Human Approvals</p>
                <div className="text-3xl font-bold">4</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">Stable</span>
                </div>
              </div>
              <User className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* System Status */}
      <Card className="bg-[#131318] border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">API Services</p>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Database</p>
                  <p className="text-xs text-muted-foreground">Healthy (12ms latency)</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">AI Model Services</p>
                  <p className="text-xs text-muted-foreground">Minor latency issues</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-xs">
                <span>System Load</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-1.5" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-xs">
                <span>Memory Usage</span>
                <span>42%</span>
              </div>
              <Progress value={42} className="h-1.5" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Activity Summary and Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-1 lg:col-span-4 bg-[#131318] border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 border border-blue-900/20 rounded-md p-2 bg-blue-900/10">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Workflow "Customer Onboarding" completed
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Today at 10:45 AM
                  </p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center space-x-3 border border-blue-900/20 rounded-md p-2 bg-blue-900/10">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    New agent "Data Processor" added
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Today at 9:30 AM
                  </p>
                </div>
                <Monitor className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex items-center space-x-3 border border-blue-900/20 rounded-md p-2 bg-blue-900/10">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    API rate limit warning
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Today at 8:15 AM
                  </p>
                </div>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="mt-3 text-center">
                <button className="text-xs font-medium text-blue-500 inline-flex items-center">
                  View all activity
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-1 lg:col-span-3 bg-[#131318] border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Quick Actions</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                Create Workflow
              </button>
              <button className="w-full rounded-md border border-blue-900/30 bg-blue-900/10 px-4 py-2 text-sm font-medium hover:bg-blue-900/20 transition-colors">
                Add AI Agent
              </button>
              <button className="w-full rounded-md border border-blue-900/30 bg-blue-900/10 px-4 py-2 text-sm font-medium hover:bg-blue-900/20 transition-colors">
                View Analytics
              </button>
              <button className="w-full rounded-md border border-blue-900/30 bg-blue-900/10 px-4 py-2 text-sm font-medium hover:bg-blue-900/20 transition-colors">
                System Settings
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
