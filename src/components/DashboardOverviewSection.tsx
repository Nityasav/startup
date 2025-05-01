import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, User, Clock, Activity, Plus, Monitor } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DashboardOverviewSection() {
  const [hasSystems, setHasSystems] = useState(false);
  const [hasActivities, setHasActivities] = useState(false);

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
                <div className="text-3xl font-bold">0</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">No workflows yet</span>
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
                <div className="text-3xl font-bold">0</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">No agents yet</span>
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
                <div className="text-3xl font-bold">--</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">No data yet</span>
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
                <div className="text-3xl font-bold">0</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">No approvals yet</span>
                </div>
              </div>
              <User className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* System Status */}
      {hasSystems ? (
        <Card className="bg-[#131318] border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground text-center mb-2">Your system status information will appear here</p>
                <Button 
                  variant="outline" 
                  className="border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
                  onClick={() => setHasSystems(false)}
                >
                  Clear Demo Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-[#131318] border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <Monitor className="h-16 w-16 text-muted-foreground opacity-20 mb-4" />
              <p className="text-muted-foreground text-center mb-2">No system data available yet</p>
              <Button 
                variant="outline" 
                className="border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
                onClick={() => setHasSystems(true)}
              >
                Add System
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Activity Summary */}
      {hasActivities ? (
        <Card className="bg-[#131318] border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground text-center mb-2">Your recent activities will appear here</p>
              <Button 
                variant="outline" 
                className="border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
                onClick={() => setHasActivities(false)}
              >
                Clear Demo Data
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-[#131318] border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <Activity className="h-16 w-16 text-muted-foreground opacity-20 mb-4" />
              <p className="text-muted-foreground text-center mb-2">No activity recorded yet</p>
              <Button 
                variant="outline" 
                className="border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
                onClick={() => setHasActivities(true)}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
