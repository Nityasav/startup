import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-950/30 border border-blue-900/30 px-4 py-2 rounded-full mb-8">
            <Activity className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">
              Orchestrate AI workflows like never before
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Turn AI Agents Into Powerful <br /> Orchestrated Workflows
          </h1>
          
          <p className="text-xl text-slate-300 mb-10">
            Connect, automate, and manage AI agents across your organization
            with our intuitive no-code orchestration platform. Unlock AI productivity
            without the complexity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/demo" 
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium"
            >
              Try Demo Dashboard
            </Link>
            <Link 
              to="#features" 
              className="bg-transparent border border-blue-700 text-blue-400 hover:border-blue-500 hover:text-blue-300 px-8 py-3 rounded-lg font-medium"
            >
              Learn more
            </Link>
            <Link
              to="/docs"
              className="bg-transparent border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-300 px-8 py-3 rounded-lg font-medium"
            >
              Documentation
            </Link>
          </div>

          <div className="mt-12 bg-black/30 border border-blue-900/20 rounded-xl p-6">
            <p className="text-sm text-slate-400 mb-4">Trusted by leading AI-driven companies</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex justify-center">
                <div className="h-8 w-32 bg-gradient-to-r from-blue-800 to-blue-600 rounded" />
              </div>
              <div className="flex justify-center">
                <div className="h-8 w-32 bg-gradient-to-r from-blue-800 to-blue-600 rounded" />
              </div>
              <div className="flex justify-center">
                <div className="h-8 w-32 bg-gradient-to-r from-blue-800 to-blue-600 rounded" />
            </div>
              <div className="flex justify-center">
                <div className="h-8 w-32 bg-gradient-to-r from-blue-800 to-blue-600 rounded" />
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
