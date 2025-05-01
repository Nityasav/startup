import { Activity, Braces, Users, Shield, BoxSelect, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Features = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  
  const features = [
    {
      icon: <BoxSelect className="h-8 w-8 text-blue-400" />,
      title: "Intuitive AI Builder",
      description:
        "Design AI solutions with our user-friendly interface - no coding required. Create custom AI systems tailored to your specific business needs."
    },
    {
      icon: <Braces className="h-8 w-8 text-blue-500" />,
      title: "Integration Framework",
      description:
        "Connect your AI solutions with your existing business tools and systems. Seamless integration with popular platforms and services."
    },
    {
      icon: <Activity className="h-8 w-8 text-blue-300" />,
      title: "Business Process Automation",
      description:
        "Automate repetitive tasks and streamline operations with intelligent AI. Reduce manual work and focus on strategic initiatives."
    },
    {
      icon: <BarChart className="h-8 w-8 text-blue-400" />,
      title: "Performance Analytics",
      description:
        "Gain valuable insights with real-time monitoring and comprehensive reporting. Track ROI and identify opportunities for improvement."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Collaborative Workflows",
      description:
        "Enable seamless collaboration between AI and human teams. Maintain oversight and approval processes where needed."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      title: "Enterprise-Grade Security",
      description:
        "Protect your data and AI operations with advanced security features. Compliant with industry standards and regulations."
    }
  ];

  const handleFeatureClick = (title: string, index: number) => {
    setActiveFeature(index);
    navigate('/dashboard', { state: { featureHighlight: title } });
  };

  return (
    <section id="features" className="py-20 bg-black text-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
            Why Choose Venturly
          </h2>
          <p className="text-xl text-slate-300">
            Our platform gives you the tools to harness the power of AI and transform your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`
                bg-black/30 border border-blue-900/20 rounded-lg p-6 cursor-pointer
                transition-all duration-300 hover:bg-blue-900/10 hover:border-blue-500/40
                ${activeFeature === idx ? 'bg-blue-900/10 border-blue-500/40' : ''}
              `}
              onClick={() => handleFeatureClick(feature.title, idx)}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
