import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight, Filter, User, Users, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardCalendarSection() {
  // Sample calendar events
  const currentEvents = [
    {
      id: 1,
      title: "Workflow Review",
      date: "Today at 2:00 PM",
      duration: "30 minutes",
      status: "upcoming",
      type: "meeting",
      participants: ["Alex Johnson", "Sarah Miller"],
      description: "Review the Customer Onboarding workflow performance"
    },
    {
      id: 2,
      title: "Agent Deployment",
      date: "Today at 4:30 PM",
      duration: "45 minutes",
      status: "upcoming",
      type: "task",
      participants: ["Robert Chen"],
      description: "Deploy the new Content Generation agent to production"
    },
    {
      id: 3,
      title: "Data Processing Workflow",
      date: "Today at 11:00 PM",
      duration: "Automated",
      status: "scheduled",
      type: "automated",
      participants: [],
      description: "Daily data processing workflow execution"
    }
  ];
  
  const upcomingEvents = [
    {
      id: 4,
      title: "Team Sync",
      date: "Tomorrow at 10:00 AM",
      duration: "1 hour",
      status: "upcoming",
      type: "meeting",
      participants: ["Alex Johnson", "Sarah Miller", "Robert Chen", "Emily Wong"],
      description: "Weekly team sync to discuss progress and roadblocks"
    },
    {
      id: 5,
      title: "Client Demo",
      date: "Mar 15 at 1:00 PM",
      duration: "45 minutes",
      status: "upcoming",
      type: "meeting",
      participants: ["Alex Johnson", "Michael Brown"],
      description: "Demo the new workflow orchestration features"
    },
    {
      id: 6,
      title: "System Maintenance",
      date: "Mar 16 at 2:00 AM",
      duration: "2 hours",
      status: "scheduled",
      type: "maintenance",
      participants: ["System"],
      description: "Scheduled system maintenance and updates"
    },
    {
      id: 7,
      title: "Performance Reports",
      date: "Mar 17 at 8:00 AM",
      duration: "Automated",
      status: "scheduled",
      type: "automated",
      participants: [],
      description: "Generate weekly performance reports for all workflows"
    }
  ];

  const getEventTypeIcon = (type) => {
    switch (type) {
      case "meeting":
        return <Users className="h-4 w-4 text-blue-500" />;
      case "task":
        return <User className="h-4 w-4 text-green-500" />;
      case "automated":
        return <GitBranch className="h-4 w-4 text-purple-500" />;
      case "maintenance":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <Calendar className="h-4 w-4 text-blue-500" />;
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case "meeting":
        return "border-blue-500/20 bg-blue-500/10";
      case "task":
        return "border-green-500/20 bg-green-500/10";
      case "automated":
        return "border-purple-500/20 bg-purple-500/10";
      case "maintenance":
        return "border-amber-500/20 bg-amber-500/10";
      default:
        return "border-blue-500/20 bg-blue-500/10";
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold mb-3">Calendar</h1>
      
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-medium text-base">March 2024</div>
          <Button variant="outline" size="icon" className="h-8 w-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2 mt-3 sm:mt-0">
          <Button variant="outline" className="h-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
            <Filter className="h-3.5 w-3.5 mr-1" /> Filter
          </Button>
          <Button className="h-8 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Event
          </Button>
        </div>
      </div>
      
      {/* Calendar View */}
      <Card className="bg-[#131318] border-0 mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
            <div className="text-muted-foreground">Sun</div>
            <div className="text-muted-foreground">Mon</div>
            <div className="text-muted-foreground">Tue</div>
            <div className="text-muted-foreground">Wed</div>
            <div className="text-muted-foreground">Thu</div>
            <div className="text-muted-foreground">Fri</div>
            <div className="text-muted-foreground">Sat</div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: 35 }).map((_, index) => {
              const day = index - 4; // Adjust for first day of month
              const isCurrentMonth = day > 0 && day <= 31;
              const isToday = day === 14; // Let's say today is the 14th
              const hasEvent = [3, 7, 14, 15, 16, 17, 21, 28].includes(day);
              
              return (
                <div 
                  key={index}
                  className={`
                    h-12 flex items-center justify-center relative border border-blue-900/10 rounded-md
                    ${isCurrentMonth ? 'opacity-100' : 'opacity-30'}
                    ${isToday ? 'bg-blue-900/30 text-white font-medium' : 'hover:bg-blue-900/20'}
                  `}
                >
                  <div>{isCurrentMonth ? day : (day <= 0 ? 31 + day : day - 31)}</div>
                  {hasEvent && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-500"></div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Today's Events */}
      <Card className="bg-[#131318] border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Today's Schedule</CardTitle>
          <CardDescription>Events and tasks for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentEvents.map((event) => (
              <div 
                key={event.id} 
                className={`border rounded-md p-3 ${getEventTypeColor(event.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge variant="secondary" className="text-xs bg-blue-950/40 w-fit">
                        {event.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{event.date}</span>
                    </div>
                    {event.participants.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {event.participants.map((participant, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-blue-900/20 bg-blue-900/10">
                            {participant}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Upcoming Events */}
      <Card className="bg-[#131318] border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Upcoming Events</CardTitle>
          <CardDescription>Scheduled events for the next few days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id} 
                className={`border rounded-md p-3 ${getEventTypeColor(event.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge variant="secondary" className="text-xs bg-blue-950/40 w-fit">
                        {event.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{event.date}</span>
                    </div>
                    {event.participants.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {event.participants.map((participant, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-blue-900/20 bg-blue-900/10">
                            {participant}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 