'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import GradientText from '../components/GradientText';

export default function DashboardPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header 
        className="bg-[#171717] p-4 border-b border-gray-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-xl font-bold"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <span className="text-white">Startup</span>
            <GradientText animated>Sight</GradientText>
          </motion.h1>
          <div className="flex items-center gap-4">
            <motion.button 
              className="text-gray-400 hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Settings
            </motion.button>
            <motion.div 
              className="w-8 h-8 rounded-full bg-[#0055ff] flex items-center justify-center"
              whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0, 85, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              JD
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <motion.h2 
          className="text-2xl font-bold mb-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Business Idea Analysis
        </motion.h2>
        
        {/* Analysis Form */}
        <ScrollReveal>
          <motion.div 
            className="bg-[#171717] rounded-lg p-6 mb-8 glass"
            whileHover={{ boxShadow: '0 0 20px rgba(0, 85, 255, 0.2)' }}
          >
            <motion.h3 
              className="text-xl mb-4"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Describe Your Business Idea
            </motion.h3>
            <motion.textarea
              className="w-full h-40 p-4 rounded bg-black border border-gray-700 focus:border-[#0055ff] focus:outline-none mb-4"
              placeholder="Describe your business idea in detail. Include target market, product/service description, revenue model, and any unique selling points."
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.4 }}
            ></motion.textarea>
            <motion.button 
              className="btn-primary py-2 px-6 rounded glow"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Analyze Idea
            </motion.button>
          </motion.div>
        </ScrollReveal>

        {/* Analysis Results Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          {/* Market Analysis */}
          <ScrollReveal delay={0.2} direction="left">
            <motion.div 
              className="bg-[#171717] rounded-lg p-6 glass h-full"
              whileHover={{ 
                y: -5,
                boxShadow: '0 10px 30px rgba(0, 85, 255, 0.2)' 
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-[#0055ff] text-xl font-bold mb-4">Market Analysis</h3>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Market Saturation</h4>
                <div className="w-full bg-black rounded-full h-4 overflow-hidden">
                  <motion.div 
                    className="bg-[#0055ff] h-4 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1">65% - Moderately Saturated</p>
              </div>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Key Competitors</h4>
                <motion.ul 
                  className="list-disc list-inside text-gray-300"
                  variants={staggerChildren}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.li variants={fadeIn}>Competitor A - Market Leader (35% share)</motion.li>
                  <motion.li variants={fadeIn}>Competitor B - Growing Rapidly</motion.li>
                  <motion.li variants={fadeIn}>Competitor C - Similar Value Proposition</motion.li>
                </motion.ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Market Trends</h4>
                <p className="text-gray-300">The market is growing at 12% annually, with increasing demand for personalized solutions.</p>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Feasibility Score */}
          <ScrollReveal delay={0.4} direction="right">
            <motion.div 
              className="bg-[#171717] rounded-lg p-6 glass h-full"
              whileHover={{ 
                y: -5,
                boxShadow: '0 10px 30px rgba(0, 85, 255, 0.2)' 
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-[#0055ff] text-xl font-bold mb-4">Feasibility Score</h3>
              <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span 
                      className="text-4xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                    >
                      78
                    </motion.span>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#333"
                      strokeWidth="5"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#0055ff"
                      strokeWidth="5"
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={{ strokeDashoffset: 62 }}
                      transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Key Strengths</h4>
                <motion.ul 
                  className="text-green-500 mb-4"
                  variants={staggerChildren}
                  initial="hidden"
                  animate="visible"
                  transition={{ delayChildren: 1.0 }}
                >
                  <motion.li variants={fadeIn}>• Strong unique value proposition</motion.li>
                  <motion.li variants={fadeIn}>• Growing target market</motion.li>
                  <motion.li variants={fadeIn}>• Scalable business model</motion.li>
                </motion.ul>
                <h4 className="font-medium mb-2">Areas of Concern</h4>
                <motion.ul 
                  className="text-red-500"
                  variants={staggerChildren}
                  initial="hidden"
                  animate="visible"
                  transition={{ delayChildren: 1.3 }}
                >
                  <motion.li variants={fadeIn}>• High initial investment required</motion.li>
                  <motion.li variants={fadeIn}>• Strong established competitors</motion.li>
                  <motion.li variants={fadeIn}>• Complex regulatory environment</motion.li>
                </motion.ul>
              </div>
            </motion.div>
          </ScrollReveal>
        </motion.div>
      </main>
    </div>
  );
} 