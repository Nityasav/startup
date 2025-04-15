'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GradientText from '../components/GradientText';
import { FiMail } from 'react-icons/fi';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pt-24 overflow-hidden">
      <main className="max-w-4xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-4">
            <GradientText animated>CONTACT</GradientText>
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
            Have questions about Venturly? Our team is ready to assist you.
          </motion.p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="glass p-8 rounded-lg h-full">
              <h2 className="text-2xl font-audiowide mb-6">
                Get in <GradientText>Touch</GradientText>
              </h2>
              
              <div className="space-y-6">
                <ContactMethod 
                  icon={<FiMail className="h-5 w-5 text-[#00aaff]" />}
                  title="Email Us"
                  value="hello@venturly.ai"
                  delay={0.6}
                />
                
                <ContactMethod 
                  icon={
                    <svg className="w-5 h-5 text-[#00aaff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  }
                  title="Call Us"
                  value="+1 (800) 555-VENTURE"
                  delay={0.7}
                />
                
                <ContactMethod 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  }
                  title="Office"
                  value="123 Innovation Ave, San Francisco, CA 94107"
                  delay={0.8}
                />
                
                <div className="pt-6">
                  <h3 className="text-xl mb-4 font-bold">Follow Us</h3>
                  <div className="flex space-x-4">
                    <SocialIcon delay={0.9}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                      </svg>
                    </SocialIcon>
                    <SocialIcon delay={1.0}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.055 10.055 0 01-3.127 1.195 4.916 4.916 0 00-8.39 4.49 13.978 13.978 0 01-10.142-5.147 4.918 4.918 0 001.524 6.573 4.937 4.937 0 01-2.229-.616v.061a4.926 4.926 0 003.95 4.829 4.974 4.974 0 01-2.224.084 4.943 4.943 0 004.6 3.428 9.88 9.88 0 01-6.115 2.106 10.117 10.117 0 01-1.174-.064 13.935 13.935 0 007.567 2.213c9.08 0 14.044-7.519 14.044-14.044 0-.214-.004-.427-.014-.64a10.063 10.063 0 002.473-2.56z"/>
                      </svg>
                    </SocialIcon>
                    <SocialIcon delay={1.1}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.645.07 4.85 0 3.204-.012 3.584-.07 4.85-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.85.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </SocialIcon>
                    <SocialIcon delay={1.2}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </SocialIcon>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="glass p-8 rounded-lg relative">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#00aaff]"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#ff00aa]"></div>
              
              <h2 className="text-2xl font-audiowide mb-6">
                Send a <GradientText>Message</GradientText>
              </h2>
              
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#00aaff] to-[#ff00aa] rounded-full mx-auto flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-300">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 text-[#00aaff] hover:text-[#3cc0ff] transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-gray-300">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-black/30 border border-[#00aaff]/20 rounded-lg p-3 focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff] transition-all outline-none text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 text-gray-300">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-black/30 border border-[#00aaff]/20 rounded-lg p-3 focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff] transition-all outline-none text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-2 text-gray-300">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full bg-black/30 border border-[#00aaff]/20 rounded-lg p-3 focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff] transition-all outline-none text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 text-gray-300">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full bg-black/30 border border-[#00aaff]/20 rounded-lg p-3 focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff] transition-all outline-none text-white"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-gradient-to-r from-[#00aaff] to-[#ff00aa] hover:from-[#3cc0ff] hover:to-[#ff3caa] text-white font-medium py-3 px-4 rounded-md transition-all duration-300 relative overflow-hidden group"
                    >
                      {formStatus === 'submitting' ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <>
                          Send Message
                          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

const ContactMethod = ({ 
  icon, 
  title, 
  value,
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string;
  delay: number;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex items-start"
  >
    <div className="mr-4 mt-1">
      <div className="w-10 h-10 rounded-full bg-black/50 border border-[#00aaff]/30 flex items-center justify-center text-[#00aaff]">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-300">{value}</p>
    </div>
  </motion.div>
);

const SocialIcon = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <motion.a 
    href="#" 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="w-10 h-10 rounded-full bg-black/50 border border-[#00aaff]/30 flex items-center justify-center text-[#00aaff] hover:text-white hover:bg-gradient-to-r hover:from-[#00aaff] hover:to-[#ff00aa] hover:border-transparent transition-all duration-300"
  >
    {children}
  </motion.a>
); 