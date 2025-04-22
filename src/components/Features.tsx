
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Braces, Users, Shield, BoxSelect, BarChart } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <BoxSelect className="h-10 w-10 text-orchestrai-600" />,
      title: "Visual Workflow Designer",
      description:
        "Intuitive drag-and-drop interface for designing complex multi-agent workflows with conditional logic and decision branching."
    },
    {
      icon: <Braces className="h-10 w-10 text-accent-purple" />,
      title: "Agent Connector Framework",
      description:
        "Pre-built integrations with popular AI agents and LLMs, with a standardized communication protocol between agents."
    },
    {
      icon: <Activity className="h-10 w-10 text-accent-teal" />,
      title: "Orchestration Engine",
      description:
        "Intelligent routing of tasks between agents with context preservation across handoffs and automated error handling."
    },
    {
      icon: <BarChart className="h-10 w-10 text-accent-orange" />,
      title: "Monitoring Dashboard",
      description:
        "Real-time visibility into workflow execution with performance analytics, cost tracking, and audit trails."
    },
    {
      icon: <Users className="h-10 w-10 text-orchestrai-600" />,
      title: "Human-in-the-Loop Controls",
      description:
        "Configurable approval workflows and exception handling with human intervention when needed."
    },
    {
      icon: <Shield className="h-10 w-10 text-accent-purple" />,
      title: "Enterprise-Grade Security",
      description:
        "SOC 2 and GDPR compliant with role-based access controls and secure credential management."
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Powerful Features for AI Orchestration
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to connect, orchestrate, and monitor AI agent workflows across your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
