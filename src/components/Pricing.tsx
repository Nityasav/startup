
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$2,000",
      description: "Perfect for small teams exploring AI orchestration",
      features: [
        "Up to 5 active workflows",
        "10 connected AI agents",
        "Basic monitoring dashboard",
        "Standard support",
        "Core connector library"
      ],
      highlighted: false,
      buttonText: "Get Started"
    },
    {
      name: "Professional",
      price: "$5,000",
      description: "For growing organizations with diverse AI needs",
      features: [
        "Up to 20 active workflows",
        "Unlimited connected AI agents",
        "Advanced monitoring & analytics",
        "Priority support",
        "Full connector library",
        "Human-in-the-loop controls",
        "Custom workflows"
      ],
      highlighted: true,
      buttonText: "Request Demo"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with complex requirements",
      features: [
        "Unlimited active workflows",
        "Unlimited connected AI agents",
        "Advanced governance controls",
        "Dedicated support",
        "Custom connectors",
        "On-premise deployment options",
        "Service level agreements",
        "Implementation consulting"
      ],
      highlighted: false,
      buttonText: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-600">
            Choose the plan that's right for your organization's AI orchestration needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`overflow-hidden border ${
                plan.highlighted 
                  ? "border-orchestrai-500 shadow-lg shadow-orchestrai-100" 
                  : "border-slate-200"
              }`}
            >
              {plan.highlighted && (
                <div className="bg-gradient-to-r from-orchestrai-600 to-accent-purple text-white py-2 px-4 text-center">
                  <span className="font-medium">Most Popular</span>
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-500 ml-2">/month</span>
                </div>
                <p className="text-slate-600 mb-6">{plan.description}</p>
                
                <Button 
                  className={`w-full mb-8 ${
                    plan.highlighted 
                      ? "bg-gradient-to-r from-orchestrai-600 to-accent-purple hover:from-orchestrai-700 hover:to-violet-700" 
                      : ""
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-orchestrai-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
