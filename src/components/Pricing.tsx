import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Sparkles, Diamond, Zap } from "lucide-react";

const Pricing = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [hoverPlan, setHoverPlan] = useState(null);
  
  useEffect(() => {
    // Animate through features
    const interval = setInterval(() => {
      setCurrentFeature(prev => {
        const allFeatures = plans.reduce((acc, plan) => [...acc, ...plan.features], []);
        return (prev + 1) % allFeatures.length;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  const plans = [
    {
      name: "Starter",
      price: "$2,000",
      description: "Perfect for small teams exploring AI orchestration",
      icon: <Zap className="h-6 w-6 text-blue-400" />,
      features: [
        "Up to 5 active workflows",
        "10 connected AI agents",
        "Basic monitoring dashboard",
        "Standard support",
        "Core connector library"
      ],
      highlighted: false,
      buttonText: "Get Started",
      color: "border-blue-800/30 hover:border-blue-500/50"
    },
    {
      name: "Professional",
      price: "$5,000",
      description: "For growing organizations with diverse AI needs",
      icon: <Sparkles className="h-6 w-6 text-blue-400" />,
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
      buttonText: "Request Demo",
      color: "border-blue-500 hover:border-blue-400"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with complex requirements",
      icon: <Diamond className="h-6 w-6 text-blue-400" />,
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
      buttonText: "Contact Sales",
      color: "border-blue-800/30 hover:border-blue-500/50"
    }
  ];

  // Helper to find which plan and feature index is currently being highlighted
  const getCurrentFeatureHighlight = () => {
    let featureCounter = 0;
    for (let planIndex = 0; planIndex < plans.length; planIndex++) {
      for (let featureIndex = 0; featureIndex < plans[planIndex].features.length; featureIndex++) {
        if (featureCounter === currentFeature) {
          return { planIndex, featureIndex };
        }
        featureCounter++;
      }
    }
    return { planIndex: 0, featureIndex: 0 };
  };

  const { planIndex, featureIndex } = getCurrentFeatureHighlight();

  return (
    <section id="pricing" className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-10" 
          style={{ 
            backgroundImage: 'radial-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-900/10 filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 fade-slide-up">
          <div className="inline-block mb-4 px-4 py-1 bg-black/50 backdrop-blur-md border border-blue-900/30 rounded-full">
            <span className="text-sm font-medium text-blue-400">
              Simple, Transparent Pricing
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
            Choose the Perfect Plan for Your Needs
          </h2>
          <p className="text-xl text-slate-300">
            Start with the plan that aligns with your organization's AI orchestration requirements.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto perspective-1000 staggered-fade-in">
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={`flex-1 transform transition-all duration-500
                ${hoverPlan === idx ? 'scale-105 z-10' : ''}
                ${hoverPlan !== null && hoverPlan !== idx ? 'scale-95 opacity-75' : ''}`}
              onMouseEnter={() => setHoverPlan(idx)}
              onMouseLeave={() => setHoverPlan(null)}
            >
              <Card 
                className={`h-full overflow-hidden bg-black/50 backdrop-blur-md border-2 ${plan.color} 
                  ${plan.highlighted ? 'shadow-lg shadow-blue-500/20' : ''}
                  transition-all duration-300`}
              >
                {plan.highlighted && (
                  <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 px-4 text-center">
                    <span className="font-medium">Most Popular</span>
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${plan.highlighted ? 'bg-blue-900/50' : 'bg-blue-900/20'}`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  </div>
                  
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 ml-2">/month</span>
                  </div>
                  <p className="text-slate-300 mb-6">{plan.description}</p>
                  
                  <Button 
                    className={`w-full mb-8 ${
                      plan.highlighted 
                        ? "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-md shadow-blue-500/20" 
                        : "bg-transparent border border-blue-800 text-blue-300 hover:bg-blue-900/20"
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIdx) => (
                      <li 
                        key={feature} 
                        className={`flex items-start p-2 rounded transition-all duration-300
                          ${planIndex === idx && featureIdx === featureIndex 
                            ? 'bg-blue-900/30 transform scale-105' 
                            : ''}`}
                      >
                        <Check className={`h-5 w-5 mr-2 flex-shrink-0 mt-0.5 
                          ${planIndex === idx && featureIdx === featureIndex 
                            ? 'text-blue-400' 
                            : 'text-blue-600'}`} 
                        />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Additional pricing information */}
        <div className="mt-16 max-w-3xl mx-auto text-center fade-slide-up">
          <h3 className="text-xl font-bold text-white mb-4">Custom Solutions Available</h3>
          <p className="text-slate-300 mb-6">
            Need a tailored solution for your enterprise? Contact our sales team for a custom quote.
          </p>
          <div className="inline-block px-6 py-3 bg-blue-900/20 rounded-lg border border-blue-800/30 shine-effect">
            <p className="text-blue-300 font-medium">All plans include 14-day free trial</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
