import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "What exactly does Venturly do?",
      answer: "Venturly provides a platform for businesses to design, deploy, and manage AI solutions that integrate with your existing workflows. Our technology makes it easy to harness the power of AI without needing deep technical expertise, allowing you to automate processes, gain insights, and enhance decision-making across your organization."
    },
    {
      question: "Do I need coding knowledge to use Venturly?",
      answer: "No. Venturly's platform is designed with a user-friendly interface that doesn't require coding knowledge. Our visual builder lets you create sophisticated AI solutions through an intuitive drag-and-drop interface. That said, developers can use our API for more advanced customization if needed."
    },
    {
      question: "How quickly can I get started with Venturly?",
      answer: "Most customers can set up their first AI solution within hours of signing up. Our onboarding process guides you through the platform, and our pre-built templates help you get started quickly. More complex implementations with custom integrations may take longer, but our support team is available to help at every step."
    },
    {
      question: "What kind of businesses benefit most from Venturly?",
      answer: "Venturly serves businesses across various industries and sizes. We've seen particular success with companies in customer service, sales, marketing, operations, finance, and human resources. Any organization looking to leverage AI to improve efficiency, enhance decision-making, or create new capabilities can benefit from our platform."
    },
    {
      question: "How does Venturly integrate with my existing systems?",
      answer: "Venturly offers pre-built integrations with popular business tools and services. Our platform can connect with CRMs, ERPs, communication tools, databases, and more. We also offer API access for custom integrations with your proprietary systems. Our goal is to make AI work within your existing infrastructure, not require you to rebuild everything."
    },
    {
      question: "What about data security and privacy?",
      answer: "Security and privacy are top priorities at Venturly. We implement industry-standard encryption, access controls, and security protocols. Your data is processed according to strict privacy policies, and we comply with relevant regulations like GDPR and CCPA. We also provide tools to help you maintain compliance with your industry-specific requirements."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial for new customers. This gives you full access to the platform so you can explore its capabilities and build your first AI solutions. No credit card is required to start the trial. At the end of the trial period, you can choose the plan that best suits your needs."
    },
    {
      question: "How is pricing structured?",
      answer: "Our pricing is based on the scale of your usage, measured primarily by the number of AI solutions you're running and the volume of operations processed. We offer tiered plans to accommodate businesses of different sizes, from startups to enterprises. Custom pricing is available for organizations with specific requirements. View our pricing page for detailed information."
    }
  ];
  
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="py-20 bg-blue-950">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-300">
            Everything you need to know about Venturly and our AI platform
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="mb-4 border border-blue-900/30 rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left bg-black/30 hover:bg-blue-900/10 transition-colors text-white"
                onClick={() => handleToggle(idx)}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 text-blue-400 transition-transform ${openIndex === idx ? 'transform rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="p-5 bg-blue-900/10 border-t border-blue-900/30">
                  <p className="text-slate-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-slate-400">
            Have more questions? <a href="/contact" className="text-blue-400 hover:text-blue-300">Contact our team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 