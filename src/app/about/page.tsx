'use client';

import { motion } from 'framer-motion';
import GradientText from '../components/GradientText';

export default function About() {
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
            <span className="cyber-title" data-text="ABOUT">ABOUT</span>{" "}
            <GradientText animated className="ml-2">Venturly</GradientText>
          </h1>

          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-[#00aaff] to-[#ff00aa] mx-auto rounded-full my-8"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>
        
        <div className="space-y-12">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass p-8 rounded-lg"
          >
            <h2 className="text-2xl md:text-3xl mb-6 font-audiowide">Our <GradientText>Vision</GradientText></h2>
            <p className="mb-4 text-gray-300">
              Founded in 2023, Venturly emerged from a simple yet powerful observation: too many brilliant business ideas never make it to market due to the complexity of launching. Our AI-powered platform was built to democratize business creation, giving entrepreneurs everything they need to turn concepts into reality.
            </p>
            <p className="text-gray-300">
              We envision a future where innovation thrives, unburdened by the traditional barriers of business creation. By providing ready-to-use tools, assets, and guidance, we aim to increase the launch rate of new businesses worldwide, fostering a more dynamic global economy.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass p-8 rounded-lg"
          >
            <h2 className="text-2xl md:text-3xl mb-6 font-audiowide">Our <GradientText>Team</GradientText></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TeamMember 
                name="Alex Chen" 
                role="Founder & CEO" 
                delay={0.7}
                description="E-commerce expert with 12+ years experience launching successful Shopify stores."
              />
              <TeamMember 
                name="Mira Patel" 
                role="CTO" 
                delay={0.8}
                description="AI researcher with expertise in generative design and business automation systems."
              />
              <TeamMember 
                name="James Wilson" 
                role="Head of Product" 
                delay={0.9}
                description="Former Shopify Partner with extensive experience in e-commerce platform development."
              />
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="glass p-8 rounded-lg"
          >
            <h2 className="text-2xl md:text-3xl mb-6 font-audiowide">Our <GradientText>Values</GradientText></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Value 
                title="Creation Over Validation" 
                description="We don't just tell you if your idea will work—we give you everything you need to make it work, from branding to website creation."
                delay={0.9}
              />
              <Value 
                title="Ethical Innovation" 
                description="We're committed to developing AI that serves entrepreneurs' best interests, with practical tools that drive real business success."
                delay={1.0}
              />
              <Value 
                title="Accessibility" 
                description="Launching a business shouldn't require extensive technical knowledge or huge budgets. We make professional-grade business creation available to all entrepreneurs."
                delay={1.1}
              />
              <Value 
                title="End-to-End Solutions" 
                description="We believe in providing complete solutions, not just pieces of the puzzle. Our platform handles everything from naming to store creation."
                delay={1.2}
              />
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}

const TeamMember = ({ name, role, description, delay }: { name: string; role: string; description: string; delay: number }) => (
  <motion.div 
    className="text-center p-4 rounded-lg bg-black/30 border border-[#00aaff]/20"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#00aaff] to-[#ff00aa] mx-auto mb-4 flex items-center justify-center">
      <div className="w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full bg-black flex items-center justify-center text-xl font-bold">
        {name.split(' ').map(part => part[0]).join('')}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-1">{name}</h3>
    <p className="text-[#00aaff] mb-3 text-sm">{role}</p>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.div>
);

const Value = ({ title, description, delay }: { title: string; description: string; delay: number }) => (
  <motion.div 
    className="p-4 rounded-lg bg-black/30 border border-[#00aaff]/20"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <h3 className="text-xl font-bold mb-3 text-[#00aaff]">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
); 