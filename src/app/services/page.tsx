'use client';

import { motion } from 'framer-motion';
import GradientText from '../components/GradientText';

export default function Services() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pt-24 overflow-hidden">
      <main className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-4">
            <span className="cyber-title" data-text="WHAT">WHAT</span>{" "}
            <span className="cyber-title" data-text="WE">WE</span>{" "}
            <GradientText animated>DO</GradientText>
          </h1>

          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-[#00aaff] to-[#ff00aa] mx-auto rounded-full my-8"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl max-w-2xl mx-auto text-gray-300 mb-12"
          >
            We transform your business ideas into ready-to-launch 
            ventures with our complete creation toolkit
          </motion.p>
        </motion.div>
        
        <div className="space-y-16">
          <Service 
            number="01"
            title="Business Identity Creation" 
            description="Our AI creates a complete brand identity for your business concept. We generate memorable business names, logo concepts, and brand guidelines that perfectly capture your vision and resonate with your target market."
            features={[
              "Concise, meaningful business name options",
              "Custom logo concept generation",
              "Brand color palette and typography",
              "Brand voice and messaging guidelines"
            ]}
            delay={0.5}
          />
          
          <Service 
            number="02"
            title="Website & Store Creation" 
            description="Launch your online presence immediately with our website and e-commerce store creation tools. We design and build Shopify stores and other web platforms tailored to your specific business needs."
            features={[
              "Custom Shopify store design",
              "Responsive website mockups and layouts",
              "Product page optimization",
              "Ready-to-use code and templates"
            ]}
            delay={0.7}
            reversed
          />
          
          <Service 
            number="03"
            title="Launch Strategy & Tools" 
            description="Get everything you need to launch your business with confidence. Our platform provides a comprehensive toolkit with actionable steps to take your idea from concept to market in record time."
            features={[
              "Domain and hosting recommendations",
              "Payment processing setup",
              "Launch checklist and timeline",
              "Marketing launch strategy"
            ]}
            delay={0.9}
          />
          
          <Service 
            number="04"
            title="E-commerce Optimization" 
            description="Maximize your online store's performance with our Shopify-focused optimization tools. We help you set up your product catalog, optimize for conversions, and implement the right apps to grow your business."
            features={[
              "Product catalog structure",
              "Conversion rate optimization",
              "Essential Shopify app recommendations",
              "Customer journey optimization"
            ]}
            delay={1.1}
            reversed
          />
        </div>
      </main>
    </div>
  );
}

const Service = ({ 
  number, 
  title, 
  description, 
  features,
  delay,
  reversed = false 
}: { 
  number: string;
  title: string; 
  description: string; 
  features: string[];
  delay: number;
  reversed?: boolean;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12`}
  >
    <div className="md:w-2/5 flex flex-col items-center md:items-start">
      <div className="relative mb-6">
        <div className="text-7xl md:text-8xl font-bold opacity-10 absolute -top-6 -left-6 text-[#00aaff]">
          {number}
        </div>
        <h2 className="text-2xl md:text-3xl font-audiowide relative z-10">
          <GradientText>{title}</GradientText>
        </h2>
      </div>
      <p className="text-gray-300 mb-6">
        {description}
      </p>
    </div>
    
    <div className="md:w-3/5 glass p-6 rounded-lg relative">
      <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#00aaff]"></div>
      <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#ff00aa]"></div>
      
      <h3 className="text-xl mb-4 font-bold">Key Features</h3>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: reversed ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.1 * index }}
            className="flex items-start"
          >
            <div className="mr-3 mt-1 text-[#00aaff]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-200">{feature}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  </motion.section>
); 