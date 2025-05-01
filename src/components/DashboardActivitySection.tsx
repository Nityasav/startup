import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, AlertCircle, CheckCircle, Clock, Filter, RefreshCw, Download, RotateCcw, Bot, GitBranch, User, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function DashboardActivitySection() {
  const [hasActivity, setHasActivity] = useState(false);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold mb-3">Activity</h1>
      
      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#131318] border-0">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Today's Events</p>
                <p className="text-3xl font-bold mt-1">0</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#131318] border-0">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Success Rate</p>
                <p className="text-3xl font-bold mt-1">--</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#131318] border-0">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Issues</p>
                <p className="text-3xl font-bold mt-1">0</p>
              </div>
              <AlertCircle className="h-8 w-8 text-amber-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Activity Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="h-9 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
            onClick={() => setHasActivity(!hasActivity)}
          >
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
          <Button size="sm" variant="outline" className="h-9 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
            <Filter className="h-4 w-4 mr-1" /> Filter
          </Button>
        </div>
      </div>
      
      {/* Activity Log */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-5 w-[500px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="user">User</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="m-0">
          {hasActivity ? (
            <Card className="bg-[#131318] border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Activity Log</CardTitle>
                <CardDescription>Recent system activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground text-center mb-2">Your activity log will appear here</p>
                  <Button 
                    variant="outline" 
                    className="border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
                    onClick={() => setHasActivity(false)}
                  >
                    Clear Demo Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-[#131318] border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Activity Log</CardTitle>
                <CardDescription>Recent system activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12">
                  <Activity className="h-16 w-16 text-blue-500 opacity-20 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Activity Yet</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    Your activity log is empty. Activity will be recorded as you use the system.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
                    onClick={() => setHasActivity(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Generate Sample Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="workflows">
          <Card className="bg-[#131318] border-0 mt-4">
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground">No workflow activity recorded yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agents">
          <Card className="bg-[#131318] border-0 mt-4">
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground">No agent activity recorded yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card className="bg-[#131318] border-0 mt-4">
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground">No system events recorded yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="user">
          <Card className="bg-[#131318] border-0 mt-4">
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground">No user activity recorded yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
