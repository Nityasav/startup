
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Cta = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-orchestrai-900 to-accent-purple text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Orchestrate Your AI Agents?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join the early access program and be among the first to transform how your organization 
            leverages AI agents across business functions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-white text-orchestrai-900 hover:bg-slate-100"
            >
              Request Early Access <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white/10"
            >
              Schedule Demo
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-80">
            <div className="text-sm">Trusted by innovative companies</div>
            <div className="font-semibold">FINANCIAL SERVICES</div>
            <div className="font-semibold">HEALTHCARE</div>
            <div className="font-semibold">TECHNOLOGY</div>
            <div className="font-semibold">PROFESSIONAL SERVICES</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
