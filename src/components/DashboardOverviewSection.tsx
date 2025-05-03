import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, User, Clock, Activity, Plus, Monitor, Bot } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DashboardOverviewSection() {
  const [hasSystems, setHasSystems] = useState(true);
  const [hasActivities, setHasActivities] = useState(true);
  
  const demoActivities = [
    {
      id: 'act1',
      action: 'Workflow Completed',
      workflow: 'Customer Onboarding',
      time: '10 minutes ago',
      result: 'success',
      details: 'Successfully processed new user registration and setup'
    },
    {
      id: 'act2',
      action: 'Agent Invoked',
      workflow: 'Support Ticket Resolution',
      time: '25 minutes ago',
      result: 'success',
      details: 'Data Analyzer processed customer feedback'
    },
    {
      id: 'act3',
      action: 'Human Approval',
      workflow: 'Content Generation Pipeline',
      time: '1 hour ago',
      result: 'approved',
      details: 'Marketing content approved for publication'
    },
    {
      id: 'act4',
      action: 'Workflow Started',
      workflow: 'Customer Onboarding',
      time: '2 hours ago',
      result: 'success',
      details: 'New customer registration detected, workflow initiated'
    }
  ];
  
  const systemStatus = [
    {
      id: 'sys1',
      name: 'API Service',
      status: 'operational',
      uptime: '99.98%',
      latency: '120ms'
    },
    {
      id: 'sys2',
      name: 'Agent Pool',
      status: 'operational',
      uptime: '100%',
      latency: '85ms'
    },
    {
      id: 'sys3',
      name: 'Workflow Engine',
      status: 'operational',
      uptime: '99.95%',
      latency: '95ms'
    }
  ];

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
                <div className="text-3xl font-bold">3</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-blue-400">+1 from yesterday</span>
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
                <div className="text-3xl font-bold">4</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-400">All operational</span>
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
                <div className="text-3xl font-bold">1.5m</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-400">-12% from average</span>
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
                <div className="text-3xl font-bold">7</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-400">100% approval rate</span>
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
            <div className="space-y-6">
              {systemStatus.map((system) => (
                <div key={system.id} className="flex items-center justify-between border-b border-blue-900/20 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div>
                      <h3 className="font-medium">{system.name}</h3>
                      <div className="text-xs text-muted-foreground">Uptime: {system.uptime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Response Time</div>
                      <div className="text-sm">{system.latency}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Status</div>
                      <div className="flex items-center">
                        <span className="text-sm text-green-400">Operational</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="h-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex justify-end mt-4">
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
          <CardContent className="px-0">
            <div className="space-y-0">
              {demoActivities.map((activity, index) => (
                <div key={activity.id} className="flex items-start p-4 border-b border-blue-900/20 last:border-0 hover:bg-slate-900/30 transition-colors">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 ${
                    activity.action.includes('Workflow') ? 'bg-blue-500/20 text-blue-400' : 
                    activity.action.includes('Agent') ? 'bg-purple-500/20 text-purple-400' : 
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {activity.action.includes('Workflow') ? (
                      <LayoutDashboard className="h-4 w-4" />
                    ) : activity.action.includes('Agent') ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Workflow: <span className="text-blue-400">{activity.workflow}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                  </div>
                </div>
              ))}
              <div className="p-4 flex justify-end">
                <Button 
                  variant="outline" 
                  className="border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
                  onClick={() => setHasActivities(false)}
                >
                  Clear Demo Data
                </Button>
              </div>
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
