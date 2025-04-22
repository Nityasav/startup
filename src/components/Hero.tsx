
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-grid-pattern">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-radial from-orchestrai-100/30 to-transparent opacity-80"></div>
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-1/4 w-64 h-64 bg-orchestrai-300/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 bg-white/80 backdrop-blur-sm border border-orchestrai-100 rounded-full shadow-sm">
            <span className="text-sm font-medium text-orchestrai-900">
              AI Orchestration for Enterprise
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
            Orchestrate Multiple AI Agents into Seamless Workflows
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto">
            Connect specialized AI agents across departments to create powerful, 
            automated workflows while maintaining control, visibility, and governance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orchestrai-600 to-accent-purple hover:from-orchestrai-700 hover:to-violet-700 text-white shadow-lg button-glow"
            >
              Request Early Access <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="font-bold text-4xl text-orchestrai-800">15B+</div>
              <div className="text-slate-600">Total Addressable Market</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="font-bold text-4xl text-orchestrai-800">70%</div>
              <div className="text-slate-600">Reduce Manual AI Handoffs</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="font-bold text-4xl text-orchestrai-800">5x</div>
              <div className="text-slate-600">ROI from AI Investments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
