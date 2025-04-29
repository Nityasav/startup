import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, User, Bot, Send, Plus, Paperclip, MoreHorizontal, PhoneCall, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function DashboardChatSection() {
  const [activeConversation, setActiveConversation] = useState(1);
  
  const conversations = [
    {
      id: 1,
      name: "Customer Support Agent",
      avatar: null,
      initials: "CS",
      lastMessage: "I've analyzed the customer feedback data.",
      time: "2m ago",
      unread: 2,
      status: "online",
      isBot: true
    },
    {
      id: 2,
      name: "Data Processing Team",
      avatar: null,
      initials: "DT",
      lastMessage: "The ETL workflow is complete.",
      time: "1h ago",
      unread: 0,
      status: "online",
      isGroup: true
    },
    {
      id: 3,
      name: "Content Generator Agent",
      avatar: null,
      initials: "CG",
      lastMessage: "I've drafted the email templates.",
      time: "3h ago",
      unread: 0,
      status: "away",
      isBot: true
    },
    {
      id: 4,
      name: "Sarah Miller",
      avatar: "/avatars/sarah.png",
      initials: "SM",
      lastMessage: "Can you review the new workflow?",
      time: "1d ago",
      unread: 1,
      status: "offline"
    },
    {
      id: 5,
      name: "Document Analysis Agent",
      avatar: null,
      initials: "DA",
      lastMessage: "Invoice data has been processed.",
      time: "2d ago",
      unread: 0,
      status: "online",
      isBot: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Customer Support Agent",
      isBot: true,
      content: "I've analyzed the customer feedback data from the last 30 days. Here are the key insights:",
      time: "10:30 AM",
      items: [
        { type: "text", content: "- Overall satisfaction score: 4.2/5 (up 0.3 from previous month)" },
        { type: "text", content: "- Top positive themes: Response time, solution accuracy" },
        { type: "text", content: "- Top negative themes: Initial wait time, complex procedures" },
      ]
    },
    {
      id: 2,
      sender: "You",
      content: "That's really helpful. Can you break down satisfaction by service category?",
      time: "10:32 AM"
    },
    {
      id: 3,
      sender: "Customer Support Agent",
      isBot: true,
      content: "Here's the satisfaction breakdown by service category:",
      time: "10:33 AM",
      items: [
        { type: "text", content: "1. Technical Support: 4.5/5" },
        { type: "text", content: "2. Account Management: 4.3/5" },
        { type: "text", content: "3. Billing Inquiries: 3.8/5" },
        { type: "text", content: "4. Product Information: 4.4/5" },
      ]
    },
    {
      id: 4,
      sender: "You",
      content: "I see the billing inquiries are lower. What are the specific pain points customers mention?",
      time: "10:36 AM"
    },
    {
      id: 5,
      sender: "Customer Support Agent",
      isBot: true,
      content: "For billing inquiries, the main pain points are:",
      time: "10:38 AM",
      items: [
        { type: "text", content: "1. Confusion about proration on plan changes (38% of complaints)" },
        { type: "text", content: "2. Difficulty finding past invoices (29% of complaints)" },
        { type: "text", content: "3. Unclear pricing for addon services (24% of complaints)" },
        { type: "text", content: "4. Other miscellaneous issues (9% of complaints)" },
      ]
    },
    {
      id: 6,
      sender: "You",
      content: "Great analysis. Please create a workflow to automatically categorize incoming billing inquiries and prioritize them based on these insights.",
      time: "10:42 AM"
    },
    {
      id: 7,
      sender: "Customer Support Agent",
      isBot: true,
      content: "I'll start working on a workflow to categorize and prioritize billing inquiries. Would you like me to also suggest improvements to the billing FAQ section based on these common issues?",
      time: "10:44 AM"
    }
  ];

  return (
    <div className="flex h-[calc(100vh-12rem)] border border-blue-900/20 rounded-lg bg-[#0e0e11] overflow-hidden">
      {/* Sidebar - Conversations List */}
      <div className="w-80 border-r border-blue-900/20 flex flex-col">
        <div className="p-3 border-b border-blue-900/20">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Messages</h2>
            <Button variant="outline" size="icon" className="h-8 w-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search conversations..."
              className="pl-8 h-9 border-blue-900/30 bg-blue-900/10"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div 
              key={conversation.id}
              className={`flex gap-3 p-3 hover:bg-blue-900/20 cursor-pointer border-l-2 ${
                activeConversation === conversation.id 
                  ? "bg-blue-900/20 border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => setActiveConversation(conversation.id)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.avatar} />
                <AvatarFallback className={conversation.isBot ? "bg-purple-900/40" : "bg-blue-900/40"}>
                  {conversation.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium truncate">{conversation.name}</span>
                    {conversation.isBot && (
                      <Badge className="h-5 text-xs bg-purple-500/20 text-purple-300 border-0">
                        <Bot className="h-3 w-3 mr-1" /> Bot
                      </Badge>
                    )}
                    {conversation.isGroup && (
                      <Badge className="h-5 text-xs bg-blue-500/20 text-blue-300 border-0">
                        Group
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{conversation.time}</span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  {conversation.unread > 0 && (
                    <Badge className="rounded-full h-5 w-5 flex items-center justify-center p-0 bg-blue-600">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-3 border-b border-blue-900/20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-purple-900/40">CS</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Customer Support Agent</span>
                <Badge className="h-5 text-xs bg-purple-500/20 text-purple-300 border-0">
                  <Bot className="h-3 w-3 mr-1" /> Bot
                </Badge>
              </div>
              <span className="flex items-center text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                Online
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
              <PhoneCall className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${message.sender === "You" ? "order-2" : "order-1"}`}>
                <div className="flex items-start gap-3">
                  {message.sender !== "You" && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-purple-900/40">CS</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                      {message.sender !== "You" && (
                        <span className="text-xs font-medium ml-2">{message.sender}</span>
                      )}
                    </div>
                    <div 
                      className={`rounded-lg p-3 ${
                        message.sender === "You" 
                          ? "bg-blue-600 text-white"
                          : "bg-blue-900/20 text-foreground"
                      }`}
                    >
                      <p>{message.content}</p>
                      {message.items && (
                        <ul className="mt-2 space-y-1">
                          {message.items.map((item, idx) => (
                            <li key={idx} className="text-sm">{item.content}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Input Area */}
        <div className="p-3 border-t border-blue-900/20">
          <div className="relative">
            <Input
              type="text"
              placeholder="Type a message..."
              className="pr-24 py-6 border-blue-900/30 bg-blue-900/10"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button className="h-8 px-3 bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4 mr-1" /> Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 