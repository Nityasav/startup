import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-black to-blue-950">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-300">
            Choose the plan that's right for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="bg-black/30 border border-blue-900/30 rounded-lg p-8 relative">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold text-white">$99</span>
                <span className="text-slate-400 mb-1">/month</span>
              </div>
              <p className="text-slate-300">Perfect for small businesses starting with AI</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Up to 5 AI solutions</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">2,000 AI operations/month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Basic analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">5 team members</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Email support</span>
              </li>
            </ul>
            
            <button
              onClick={() => navigate('/signup')}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
            >
              Get Started
            </button>
                </div>
          
          {/* Professional Plan */}
          <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-8 relative transform scale-105 z-10 shadow-lg">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="bg-blue-500 text-white text-sm py-1 px-3 rounded-full">
                Most Popular
              </span>
                </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Professional</h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold text-white">$299</span>
                <span className="text-slate-400 mb-1">/month</span>
              </div>
              <p className="text-slate-300">Ideal for growing companies ready to scale AI</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Up to 20 AI solutions</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">10,000 AI operations/month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Advanced analytics dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">25 team members</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Custom integrations</span>
                    </li>
                </ul>
            
            <button
              onClick={() => navigate('/signup')}
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-400 text-white rounded-md transition-colors"
            >
              Get Started
            </button>
          </div>
          
          {/* Enterprise Plan */}
          <div className="bg-black/30 border border-blue-900/30 rounded-lg p-8 relative">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold text-white">Custom</span>
              </div>
              <p className="text-slate-300">For organizations with advanced AI needs</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Unlimited AI solutions</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Custom AI operations volume</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Executive dashboard & reporting</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Unlimited team members</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Custom AI model training</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">SLA & compliance guarantees</span>
              </li>
            </ul>
            
            <button
              onClick={() => navigate('/contact')}
              className="w-full py-2 px-4 bg-transparent border border-blue-500 hover:bg-blue-900/20 text-blue-400 rounded-md transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-slate-400 max-w-2xl mx-auto">
            All plans include our core AI platform features. Upgrade or downgrade anytime. 
            Need a custom solution? <span className="text-blue-400 cursor-pointer" onClick={() => navigate('/contact')}>Contact our sales team</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
