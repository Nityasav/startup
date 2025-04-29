import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Pricing from "@/components/Pricing";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const sectionsRef = useRef({
    hero: null,
    features: null,
    howItWorks: null,
    benefits: null,
    pricing: null,
    cta: null
  });
  
  // Simple scroll tracking for navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Determine active section based on scroll position
      Object.entries(sectionsRef.current).forEach(([key, ref]) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          if (
            scrollPosition >= offsetTop - windowHeight / 2 &&
            scrollPosition < offsetTop + offsetHeight - windowHeight / 2
          ) {
            setActiveSection(key);
          }
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Minimalist navigation dots
  const navDots = (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4 hidden md:block">
      {Object.keys(sectionsRef.current).map((section) => (
        <div 
          key={section}
          onClick={() => {
            sectionsRef.current[section].scrollIntoView({ behavior: 'smooth' });
          }}
          className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
            activeSection === section ? 'bg-blue-500' : 'bg-blue-900/30 hover:bg-blue-500/50'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Minimalist background element */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-1/3 h-96 bg-blue-900/5 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-blue-900/5 rounded-tr-full"></div>
      </div>
      
      {/* Navigation dots */}
      {navDots}
      
      {/* Header */}
      <Header />
      
      {/* Main content sections */}
      <div ref={el => sectionsRef.current.hero = el}>
      <Hero />
      </div>
      
      <div ref={el => sectionsRef.current.features = el}>
      <Features />
      </div>
      
      <div ref={el => sectionsRef.current.howItWorks = el}>
      <HowItWorks />
      </div>
      
      <div ref={el => sectionsRef.current.benefits = el}>
      <Benefits />
      </div>
      
      <div ref={el => sectionsRef.current.pricing = el}>
      <Pricing />
      </div>
      
      <div ref={el => sectionsRef.current.cta = el}>
      <Cta />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
