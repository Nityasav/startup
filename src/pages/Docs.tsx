import { ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Docs = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-blue-900/30 bg-black">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/" className="text-blue-400 hover:text-blue-300">
                <ArrowLeftCircle className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-white">OrchestrAI Documentation</h1>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* Introduction */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-white">Getting Started with OrchestrAI</h2>
              <div className="prose prose-invert max-w-none">
                <p>
                  OrchestrAI is a powerful platform for connecting multiple AI agents into a fully automated workspace. 
                  This documentation will guide you through setting up and using our platform to automate routine 
                  business tasks.
                </p>
              </div>
            </section>
            
            {/* Customer Service Workflow */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">Customer Service AI Workflow</h2>
              <div className="prose prose-invert max-w-none space-y-4">
                <p>
                  The Customer Service AI Workflow is a complete solution that automates customer interactions
                  with intelligent analysis and human oversight. This workflow consists of three main components:
                </p>
                
                <h3>1. Customer Service AI</h3>
                <p>
                  The first stage involves a conversational AI that handles customer inquiries. This agent can:
                </p>
                <ul>
                  <li>Answer frequently asked questions</li>
                  <li>Troubleshoot common issues</li>
                  <li>Collect customer information</li>
                  <li>Escalate complex issues when necessary</li>
                </ul>
                
                <h3>2. Data Analysis AI</h3>
                <p>
                  Once a customer conversation concludes, our Data Analysis AI processes the interaction to extract valuable insights:
                </p>
                <ul>
                  <li>Sentiment analysis to determine customer satisfaction</li>
                  <li>Key topic identification to track common issues</li>
                  <li>Conversation summarization for quick review</li>
                  <li>Pattern recognition across multiple conversations</li>
                </ul>
                
                <h3>3. Human Approval Interface</h3>
                <p>
                  The final stage brings humans into the loop for oversight and quality control:
                </p>
                <ul>
                  <li>Review AI-generated analysis for accuracy</li>
                  <li>Approve or reject analysis results</li>
                  <li>Provide feedback to improve AI performance</li>
                  <li>Make final decisions on actionable insights</li>
                </ul>
              </div>
            </section>
            
            {/* Integration Guide */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">Integration Guide</h2>
              <div className="prose prose-invert max-w-none">
                <p>
                  Integrating OrchestrAI with your existing systems is straightforward:
                </p>
                <ol>
                  <li>
                    <strong>API Connection:</strong> Connect to our secure API endpoints using your unique API key
                  </li>
                  <li>
                    <strong>Workflow Configuration:</strong> Use our visual designer to create your AI workflow
                  </li>
                  <li>
                    <strong>Agent Selection:</strong> Choose from our pre-built agents or connect your own
                  </li>
                  <li>
                    <strong>Testing:</strong> Test your workflow in our sandbox environment
                  </li>
                  <li>
                    <strong>Deployment:</strong> Deploy to production with monitoring and analytics
                  </li>
                </ol>
                <p>
                  For detailed API documentation and advanced configuration options, 
                  please contact your account representative.
                </p>
              </div>
            </section>
            
            {/* Best Practices */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">Best Practices</h2>
              <div className="prose prose-invert max-w-none">
                <p>
                  To get the most out of OrchestrAI, we recommend following these best practices:
                </p>
                <ul>
                  <li>
                    <strong>Start Small:</strong> Begin with a single workflow before expanding to multiple processes
                  </li>
                  <li>
                    <strong>Define Clear Handoffs:</strong> Ensure each AI agent has well-defined inputs and outputs
                  </li>
                  <li>
                    <strong>Set Approval Thresholds:</strong> Configure when human approval is required based on confidence scores
                  </li>
                  <li>
                    <strong>Monitor Performance:</strong> Regularly review analytics to identify areas for improvement
                  </li>
                  <li>
                    <strong>Iterate Based on Feedback:</strong> Use human feedback to continuously improve AI performance
                  </li>
                </ul>
              </div>
            </section>
            
            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Can I use my own AI models?</h3>
                  <p className="text-slate-300">
                    Yes, OrchestrAI supports integration with custom models through our API. You can connect any model 
                    that provides a REST API interface.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">How is sensitive customer data handled?</h3>
                  <p className="text-slate-300">
                    All data is encrypted in transit and at rest. Our platform is SOC 2 and GDPR compliant, 
                    with role-based access controls for all customer information.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Can workflows be triggered by external events?</h3>
                  <p className="text-slate-300">
                    Yes, workflows can be triggered by webhooks, scheduled events, or direct API calls from your existing systems.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">What languages are supported for customer interactions?</h3>
                  <p className="text-slate-300">
                    Our platform supports over 30 languages for customer interactions, with full sentiment analysis
                    capabilities in 12 major languages.
                  </p>
                </div>
              </div>
            </section>
          </div>
          
          {/* CTA */}
          <div className="mt-12 bg-blue-900/20 border border-blue-900/30 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Ready to see OrchestrAI in action?</h2>
            <p className="text-xl text-slate-300 mb-6">
              Try our interactive demo to experience the full customer service workflow.
            </p>
            <Link 
              to="/demo" 
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium inline-block"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Docs; 