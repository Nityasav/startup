import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight, Filter, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function DashboardCalendarSection() {
  const [hasEvents, setHasEvents] = useState(false);
  
  // Current date for the calendar display
  const currentDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold mb-3">Calendar</h1>
      
      {/* Calendar Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium">{currentMonth} {currentYear}</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            className="h-9 bg-blue-600 hover:bg-blue-700"
            onClick={() => setHasEvents(!hasEvents)}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Event
          </Button>
          <Button size="sm" variant="outline" className="h-9 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
            <Filter className="h-4 w-4 mr-1" /> Filter
          </Button>
        </div>
      </div>
      
      {/* Calendar Grid and Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Month View Calendar */}
        <Card className="lg:col-span-2 bg-[#131318] border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12">
              <CalendarDays className="h-16 w-16 text-blue-500 opacity-20 mb-4" />
              <h3 className="text-lg font-medium mb-2">Calendar View</h3>
              <p className="text-muted-foreground text-center max-w-md mb-4">
                The calendar view will display your scheduled events and automated workflow runs.
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Events */}
        <Card className="bg-[#131318] border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {hasEvents ? (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground text-center mb-2">Your events will appear here</p>
                <Button 
                  variant="outline" 
                  className="border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
                  onClick={() => setHasEvents(false)}
                >
                  Clear Demo Events
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <Calendar className="h-16 w-16 text-blue-500 opacity-20 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Upcoming Events</h3>
                <p className="text-muted-foreground text-center mb-6">
                  You don't have any upcoming events scheduled.
                </p>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setHasEvents(true)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Schedule Event
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 