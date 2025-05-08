import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles, ArrowRight, Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import VideoSection from "@/components/VideoSection";

const Home = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const sections = [
    { id: "intro", label: "Intro" },
    { id: "solutions", label: "Solutions" },
    { id: "approach", label: "Approach" },
    { id: "video", label: "Video" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" }
  ];

  // Intersection observer to detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const index = sections.findIndex((section) => section.id === id);
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Show navigation after scrolling past intro
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const introHeight = document.getElementById("intro")?.offsetHeight || 0;
      setShowNav(scrollPosition > introHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Solutions section features
  const solutions = [
    {
      title: "Customer Service",
      description: "AI-powered support agents that understand context and resolve issues faster than ever before",
      color: "from-blue-600 to-blue-400",
      icon: "💬"
    },
    {
      title: "Process Automation",
      description: "Streamline operations by automating repetitive tasks with intelligent AI workflows",
      color: "from-purple-600 to-purple-400",
      icon: "⚙️"
    },
    {
      title: "Data Analysis",
      description: "Extract meaningful insights from your data with advanced AI analytics tools",
      color: "from-green-600 to-green-400", 
      icon: "📊"
    },
    {
      title: "Content Creation",
      description: "Generate high-quality content tailored to your brand voice and audience needs",
      color: "from-amber-600 to-amber-400",
      icon: "✍️"
    }
  ];

  // Approach steps
  const steps = [
    { number: "01", title: "Define", description: "Identify opportunities for AI implementation" },
    { number: "02", title: "Design", description: "Create custom AI solutions for your needs" },
    { number: "03", title: "Deploy", description: "Seamlessly integrate with your systems" },
    { number: "04", title: "Optimize", description: "Continuously improve performance" }
  ];

  // Pricing plans
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      features: [
        "5 AI solutions",
        "2,000 operations/month",
        "Basic analytics",
        "5 team members",
        "Email support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "$299", 
      period: "/month",
      features: [
        "20 AI solutions",
        "10,000 operations/month",
        "Advanced analytics dashboard",
        "25 team members",
        "Priority support",
        "Custom integrations"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: [
        "Unlimited AI solutions",
        "Custom operations volume",
        "Executive reporting",
        "Unlimited team members",
        "Dedicated account manager",
        "Custom model training"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  // FAQ items
  const faqs = [
    {
      question: "What exactly does Venturly do?",
      answer: "Venturly provides a platform for businesses to design, deploy, and manage AI solutions that integrate with your existing workflows. Our technology makes it easy to harness the power of AI without needing deep technical expertise."
    },
    {
      question: "Do I need coding knowledge to use Venturly?",
      answer: "No. Venturly's platform is designed with a user-friendly interface that doesn't require coding knowledge. Our visual builder lets you create sophisticated AI solutions through an intuitive drag-and-drop interface."
    },
    {
      question: "How quickly can I get started?",
      answer: "Most customers can set up their first AI solution within hours of signing up. Our onboarding process guides you through the platform, and our pre-built templates help you get started quickly."
    },
    {
      question: "How does Venturly integrate with existing systems?",
      answer: "Venturly offers pre-built integrations with popular business tools and services. Our platform can connect with CRMs, ERPs, communication tools, databases, and more. We also offer API access for custom integrations."
    }
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Floating Navigation */}
      <AnimatePresence>
        {showNav && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-4 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-blue-900/30">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    activeSection === index
                      ? "text-blue-400"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {section.label}
                </a>
              ))}
              <div className="h-6 w-px bg-blue-900/50"></div>
              <Link
                to="/dashboard"
                className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro Section - Full-screen, interactive */}
      <section 
        id="intro" 
        className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: "radial-gradient(circle at center, rgba(30, 64, 175, 0.15), rgba(0, 0, 0, 0.95) 70%)"
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated grid pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(30, 64, 175, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 64, 175, 0.1) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
            backgroundPosition: "center center",
            opacity: 0.3
          }}></div>
          
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500/20 blur-sm"
              style={{
                width: Math.random() * 80 + 20,
                height: Math.random() * 80 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-blue-950/50 border border-blue-900/30 px-4 py-2 rounded-full mb-8">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">
                Redefine what's possible with AI
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight">
              <span className="block bg-gradient-to-r from-white to-white/80 text-transparent bg-clip-text">Empower Your</span>
              <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-300 text-transparent bg-clip-text">Business with AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Venturly helps you design, deploy, and manage intelligent AI systems that transform your operations and create exceptional experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/dashboard" 
                className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium text-lg transition-all flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a 
                href="#solutions" 
                className="px-8 py-4 bg-transparent border border-blue-700 text-blue-400 hover:border-blue-500 hover:text-blue-300 rounded-full font-medium text-lg transition-all"
              >
                Explore Solutions
              </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <a href="#solutions" className="flex flex-col items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <span className="text-sm">Discover More</span>
            <ChevronDown className="h-5 w-5" />
          </a>
        </motion.div>
      </section>

      {/* Solutions Section - 3D Carousel/Interactive Cards */}
      <section 
        id="solutions" 
        className="min-h-screen py-24 relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #000, #0c1527, #000)"
        }}
      >
        <div className="container relative z-10 px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text"
            >
              Transform Your Business
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-300"
            >
              Our AI solutions adapt to your specific industry needs
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
                }}
                className="group relative overflow-hidden rounded-2xl bg-black/30 border border-blue-900/20 p-8 hover:border-blue-600/30 transition-all"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to right, ${solution.color.split(' ')[1]}, ${solution.color.split(' ')[3]})` }}></div>
                
                <div className="flex items-start justify-between mb-6">
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${solution.color} text-transparent bg-clip-text`}>
                    {solution.title}
                  </h3>
                  <span className="text-3xl">{solution.icon}</span>
                </div>
                
                <p className="text-slate-300 mb-6 line-clamp-3">
                  {solution.description}
                </p>
                
                <a 
                  href="#" 
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              href="/solutions"
              className="inline-flex items-center gap-2 bg-blue-950/50 border border-blue-900/30 hover:border-blue-600/50 px-6 py-3 rounded-full text-blue-400 hover:text-blue-300 transition-all"
            >
              View All Solutions <ExternalLink className="h-4 w-4" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Approach Section - Timeline/Process */}
      <section 
        id="approach" 
        className="min-h-screen py-24 relative"
        style={{
          background: "linear-gradient(to bottom, #000, #0d1115, #000)"
        }}
      >
        <div className="container relative z-10 px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text"
            >
              Our Approach
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-300"
            >
              A clear path to AI transformation
            </motion.p>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-blue-900/50"></div>
            
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center mb-20 last:mb-0 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className="mb-2 font-mono text-6xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
                    {step.number}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-slate-300 text-lg">{step.description}</p>
                </div>
                
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-24 md:h-36"></div>

      {/* Video Section */}
      <section id="video">
        <VideoSection />
      </section>

      {/* Pricing Section - Interactive Cards */}
      <section 
        id="pricing" 
        className="min-h-screen py-24 relative overflow-hidden"
        style={{
          background: "radial-gradient(circle at center, rgba(30, 64, 175, 0.15), rgba(0, 0, 0, 0.95) 70%)"
        }}
      >
        <div className="container relative z-10 px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text"
            >
              Transparent Pricing
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-300"
            >
              Choose the plan that best fits your business needs
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
                }}
                className={cn(
                  "relative rounded-2xl p-8 transition-all",
                  plan.popular 
                    ? "bg-blue-900/20 border-2 border-blue-500/50" 
                    : "bg-black/30 border border-blue-900/20 hover:border-blue-600/30"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-slate-400 mb-1">{plan.period}</span>}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={cn(
                    "w-full py-3 px-4 rounded-lg font-medium transition-colors",
                    plan.popular 
                      ? "bg-blue-500 hover:bg-blue-400 text-white" 
                      : plan.name === "Enterprise" 
                        ? "bg-transparent border border-blue-500 hover:bg-blue-900/20 text-blue-400"
                        : "bg-blue-600 hover:bg-blue-500 text-white"
                  )}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-slate-400 max-w-2xl mx-auto">
              All plans include our core AI platform features. Upgrade or downgrade anytime. 
              Need a custom solution? <a href="/contact" className="text-blue-400 underline hover:text-blue-300">Contact our sales team</a>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Animated Accordion */}
      <section 
        id="faq" 
        className="min-h-screen py-24 relative"
        style={{
          background: "linear-gradient(to bottom, #000, #0a1526, #000)"
        }}
      >
        <div className="container relative z-10 px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-300"
            >
              Everything you need to know about Venturly
            </motion.p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col items-center">
              <p className="text-xl text-slate-200 mb-6">
                Have a different question?
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - keep the existing footer but with a bit more style */}
      <footer className="bg-black text-slate-400 py-20 border-t border-blue-900/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <Link to="/" className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="font-bold text-3xl bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                Venturly
              </div>
            </Link>
            
            <div className="flex gap-6">
              <a 
                href="https://twitter.com/venturly" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://linkedin.com/company/venturly" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="/blog" 
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                Blog
              </a>
              <a 
                href="/careers" 
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                Careers
              </a>
              <a 
                href="/contact" 
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Venturly, Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm hover:text-blue-400 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-sm hover:text-blue-400 transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-sm hover:text-blue-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// FAQ Item Component with animation
const FAQItem = ({ faq, index }: { faq: { question: string; answer: string }; index: number }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-5 overflow-hidden"
    >
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex justify-between items-center p-6 rounded-xl cursor-pointer transition-all",
          isOpen 
            ? "bg-blue-900/30 border-blue-500/30" 
            : "bg-black/30 border-blue-900/20 hover:bg-blue-900/10"
        )}
        style={{ 
          borderWidth: '1px',
          borderStyle: 'solid' 
        }}
      >
        <h3 className="font-medium text-lg text-white">{faq.question}</h3>
        <ChevronDown 
          className={cn(
            "h-5 w-5 text-blue-400 transition-transform duration-300",
            isOpen ? "transform rotate-180" : ""
          )} 
        />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-blue-900/10 border border-t-0 border-blue-900/20 rounded-b-xl">
              <p className="text-slate-300">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home; 