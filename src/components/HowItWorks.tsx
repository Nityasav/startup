
import { ArrowRight, Bot, Database, MessageSquare, UserRound, Workflow } from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            How OrchestrAI Works
          </h2>
          <p className="text-xl text-slate-600">
            See how our platform orchestrates multiple AI agents into seamless workflows.
          </p>
        </div>

        {/* Workflow visualization */}
        <div className="relative bg-white p-8 rounded-2xl shadow-md border border-slate-200 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Step 1: Initial Request */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-orchestrai-100 rounded-full flex items-center justify-center mb-4">
                <UserRound className="h-8 w-8 text-orchestrai-600" />
              </div>
              <h3 className="font-semibold mb-2">User Request</h3>
              <p className="text-sm text-slate-500">Customer initiates request</p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full border-t-2 border-dashed border-slate-300 relative">
                <div className="absolute -top-2 right-0">
                  <ArrowRight className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Step 2: Customer Service AI */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-accent-purple/20 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-accent-purple" />
              </div>
              <h3 className="font-semibold mb-2">Support AI</h3>
              <p className="text-sm text-slate-500">Processes initial request</p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full border-t-2 border-dashed border-slate-300 relative">
                <div className="absolute -top-2 right-0">
                  <ArrowRight className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Step 3: Data Analysis AI */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-accent-teal/20 rounded-full flex items-center justify-center mb-4">
                <Database className="h-8 w-8 text-accent-teal" />
              </div>
              <h3 className="font-semibold mb-2">Analysis AI</h3>
              <p className="text-sm text-slate-500">Performs data analysis</p>
            </div>
          </div>

          {/* Orchestration Layer */}
          <div className="my-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="h-px w-full bg-slate-300"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-gradient-to-r from-orchestrai-500 to-accent-purple text-white px-6 py-3 rounded-lg shadow-md">
                <div className="flex items-center gap-2">
                  <Workflow className="h-5 w-5" />
                  <span className="font-semibold">OrchestrAI Orchestration Engine</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lower flow */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Step 4: Technical AI */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-accent-orange/20 rounded-full flex items-center justify-center mb-4">
                <Bot className="h-8 w-8 text-accent-orange" />
              </div>
              <h3 className="font-semibold mb-2">Technical AI</h3>
              <p className="text-sm text-slate-500">Implements technical solution</p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full border-t-2 border-dashed border-slate-300 relative">
                <div className="absolute -top-2 right-0">
                  <ArrowRight className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Step 5: Quality Check */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-orchestrai-100 rounded-full flex items-center justify-center mb-4">
                <UserRound className="h-8 w-8 text-orchestrai-600" />
              </div>
              <h3 className="font-semibold mb-2">Human Review</h3>
              <p className="text-sm text-slate-500">Optional human approval step</p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full border-t-2 border-dashed border-slate-300 relative">
                <div className="absolute -top-2 right-0">
                  <ArrowRight className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Step 6: Resolution */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-orchestrai-100 rounded-full flex items-center justify-center mb-4">
                <UserRound className="h-8 w-8 text-orchestrai-600" />
              </div>
              <h3 className="font-semibold mb-2">Resolution</h3>
              <p className="text-sm text-slate-500">Task completed and delivered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
