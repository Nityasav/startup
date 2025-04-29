import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import { UserMenu } from "@/components/auth/UserMenu";

// Import all section components
import DashboardOverviewSection from "@/components/DashboardOverviewSection";
import DashboardAgentsSection from "@/components/DashboardAgentsSection";
import DashboardWorkflowsSection from "@/components/DashboardWorkflowsSection";
import DashboardActivitySection from "@/components/DashboardActivitySection";
import DashboardAnalyticsSection from "@/components/DashboardAnalyticsSection";
import DashboardCalendarSection from "@/components/DashboardCalendarSection";
import DashboardChatSection from "@/components/DashboardChatSection";
import DashboardSettingsSection from "@/components/DashboardSettingsSection";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState("settings");

  useEffect(() => {
    // Only redirect for non-settings sections when not authenticated
    if (!isLoading && !user && currentSection !== "settings") {
      navigate("/auth");
    }
  }, [user, isLoading, navigate, currentSection]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Allow settings section to render regardless of auth status
  if (!user && currentSection !== "settings") {
    return null;
  }

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  // Render the appropriate section component based on currentSection
  const renderContent = () => {
    switch(currentSection) {
      case "overview":
        return <DashboardOverviewSection />;
      case "agents":
        return <DashboardAgentsSection />;
      case "workflows":
        return <DashboardWorkflowsSection />;
      case "activity":
        return <DashboardActivitySection />;
      case "analytics":
        return <DashboardAnalyticsSection />;
      case "calendar":
        return <DashboardCalendarSection />;
      case "chat":
        return <DashboardChatSection />;
      case "settings":
        return <DashboardSettingsSection />;
      default:
        return <DashboardOverviewSection />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - 20% width */}
      <div className="w-1/5 flex-shrink-0">
        <DashboardSidebar activeSection={currentSection} onSectionChange={handleSectionChange} />
      </div>
      
      {/* Main content - 80% width */}
      <div className="w-4/5 overflow-auto">
        {/* Main Content */}
        <div className="p-6 h-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
} 