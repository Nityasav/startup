import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, PlusCircle } from "lucide-react";
import { useState } from "react";

const Cta = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-black via-blue-900/30 to-black relative overflow-hidden">
      {/* Animated particles background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-500"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 1}px`,
              height: `${Math.random() * 6 + 1}px`,
              opacity: Math.random() * 0.5,
              transform: `scale(${isHovered ? 1.5 : 1})`,
              transition: `transform ${0.5 + Math.random() * 1}s ease-in-out, 
                          opacity ${0.5 + Math.random() * 1}s ease-in-out`,
              animation: `float ${5 + Math.random() * 10}s infinite alternate ease-in-out`
            }}
          ></div>
        ))}
      </div>
      
      {/* Animated circuit lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <g stroke="rgba(59, 130, 246, 0.2)" fill="none" strokeWidth="1">
            {[...Array(5)].map((_, i) => (
              <path
                key={i}
                d={`M${20 + i * 200},0 
                   C${50 + i * 150},${100 + i * 20} 
                   ${150 + i * 100},${150 - i * 20} 
                   ${250 + i * 50},${250 + i * 30}
                   L${250 + i * 50},${350 + i * 20}
                   C${300 + i * 30},${400 + i * 10}
                   ${350 + i * 20},${450 - i * 15}
                   ${400 + i * 10},${500 + i * 5}`}
                strokeDasharray="5,5"
                className={`animate-draw-path-${i}`}
                style={{
                  animation: `dash 3s linear infinite`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </g>
        </svg>
      </div>
      
      <div className="container relative z-10">
        <div 
          className="max-w-4xl mx-auto backdrop-blur-sm bg-black/40 p-8 sm:p-12 rounded-2xl border border-blue-900/30 shine-effect"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="text-center fade-slide-up">
            <div className="flex justify-center mb-6">
              <div className={`p-3 rounded-full bg-blue-900/50 glow-effect ${isHovered ? 'animate-pulse' : ''}`}>
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-200 text-transparent bg-clip-text">
              Ready to Orchestrate Your AI Agents?
            </h2>
            <p className="text-xl text-blue-100 opacity-90 mb-8 max-w-2xl mx-auto">
              Join the early access program and be among the first to transform how your organization 
              leverages AI agents across business functions.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 staggered-fade-in">
              <Button 
                size="lg" 
                className={`bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500 button-glow
                  ${isHovered ? 'animate-pulse-slow' : ''}`}
              >
                Request Early Access <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-blue-200 border-blue-400/50 hover:bg-blue-900/20"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Schedule Demo
              </Button>
            </div>
            
            <div className="space-y-4">
              <p className="text-blue-200/70 text-sm">Trusted by innovative companies</p>
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-80">
                <div className="p-3 rounded-md bg-blue-900/20 border border-blue-900/30 font-medium text-blue-100">FINANCIAL SERVICES</div>
                <div className="p-3 rounded-md bg-blue-900/20 border border-blue-900/30 font-medium text-blue-100">HEALTHCARE</div>
                <div className="p-3 rounded-md bg-blue-900/20 border border-blue-900/30 font-medium text-blue-100">TECHNOLOGY</div>
                <div className="p-3 rounded-md bg-blue-900/20 border border-blue-900/30 font-medium text-blue-100">PROFESSIONAL SERVICES</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for path animation */}
      <style>
        {`
        @keyframes dash {
          to {
            stroke-dashoffset: 100;
          }
        }
        `}
      </style>
    </section>
  );
};

export default Cta;
