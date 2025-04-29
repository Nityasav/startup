import { ArrowRight, CheckCircle, Cpu, Brain, ShieldCheck, Zap, Network, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Benefits = () => {
  const [activeCard, setActiveCard] = useState(null);
  
  useEffect(() => {
    // Auto rotate through benefit cards
    const interval = setInterval(() => {
      setActiveCard(prev => (prev === null || prev >= businessOutcomes.length - 1) ? 0 : prev + 1);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const benefits = [
    {
      icon: <Network className="h-5 w-5 text-blue-400" />,
      text: "Eliminate AI agent silos and fragmented workflows"
    },
    {
      icon: <LineChart className="h-5 w-5 text-blue-500" />,
      text: "Maintain full visibility and control across AI processes"
    },
    {
      icon: <Zap className="h-5 w-5 text-blue-300" />,
      text: "Reduce manual handoffs between specialized AI systems"
    },
    {
      icon: <Brain className="h-5 w-5 text-blue-400" />,
      text: "Scale AI operations across departments without complexity"
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-blue-500" />,
      text: "Implement consistent governance and error handling"
    },
    {
      icon: <Cpu className="h-5 w-5 text-blue-300" />,
      text: "Preserve context across entire business processes"
    }
  ];

  const businessOutcomes = [
    {
      title: "75% Faster Time-to-Value",
      description: "Implement complex AI workflows in days, not months",
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      color: "from-blue-600 to-blue-400"
    },
    {
      title: "60% Reduction in Operational Costs",
      description: "Automate manual AI agent coordination and handoffs",
      icon: <LineChart className="h-8 w-8 text-blue-400" />,
      color: "from-blue-500 to-blue-300"
    },
    {
      title: "99.9% Process Reliability",
      description: "With robust error handling and monitoring",
      icon: <ShieldCheck className="h-8 w-8 text-blue-400" />,
      color: "from-blue-700 to-blue-500"
    },
    {
      title: "3x Improved Customer Experience",
      description: "Through seamless, consistent agent interactions",
      icon: <Brain className="h-8 w-8 text-blue-400" />,
      color: "from-blue-600 to-blue-300"
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-96 bg-blue-900/10 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-blue-800/10 rounded-tr-full"></div>
        
        {/* Animated dots */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-500"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.2 + Math.random() * 0.3,
                transform: `scale(${Math.random() * 2 + 1})`,
                animation: `pulse-slow ${2 + Math.random() * 4}s infinite alternate`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="fade-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              Turn AI Investments into Business Impact
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Venturly helps enterprises maximize their AI investments by connecting specialized 
              AI agents into seamless business processes.
            </p>
            
            <div className="space-y-4 mb-8 staggered-fade-in">
              {benefits.map((benefit, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start p-3 rounded-md transition-all duration-300 hover:bg-blue-900/10"
                >
                  <div className="mr-3 mt-1 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <p className="text-slate-300">{benefit.text}</p>
                </div>
              ))}
            </div>
            
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-lg button-glow"
            >
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative h-[500px] fade-slide-up">
            {/* 3D rotating cards effect */}
            <div className="absolute inset-0 perspective-1000">
            {businessOutcomes.map((outcome, idx) => (
              <div 
                key={idx} 
                  className={`absolute top-0 left-0 w-full h-full backface-hidden transition-all duration-700 cursor-pointer
                    ${activeCard === idx 
                      ? 'z-10 opacity-100 transform-none' 
                      : 'opacity-0 scale-90 translate-y-8'}`}
                  onClick={() => setActiveCard(idx)}
                >
                  <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-blue-800/30 shadow-lg h-full glow-effect">
                    <div className={`mb-6 w-16 h-16 rounded-xl bg-gradient-to-r ${outcome.color} flex items-center justify-center`}>
                      {outcome.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                  {outcome.title}
                </h3>
                    <p className="text-xl text-slate-300">{outcome.description}</p>
                    
                    <div className="mt-12 h-1 w-full bg-blue-900/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full animate-pulse-slow"
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>
              </div>
            ))}
            </div>
            
            {/* Card selection dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {businessOutcomes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCard(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 
                    ${activeCard === idx ? 'bg-blue-500 scale-150' : 'bg-blue-900/50'}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
