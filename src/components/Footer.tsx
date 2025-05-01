import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-slate-400 py-12 border-t border-blue-900/20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
                Venturly
              </div>
            </Link>
            <p className="text-sm mb-6">
              Transforming businesses with powerful AI solutions that deliver measurable results.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://twitter.com/venturly" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://linkedin.com/company/venturly" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://github.com/venturly" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="font-medium text-white mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/solutions/customer-service" className="hover:text-blue-400 transition-colors">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link to="/solutions/sales-marketing" className="hover:text-blue-400 transition-colors">
                  Sales & Marketing
                </Link>
              </li>
              <li>
                <Link to="/solutions/operations" className="hover:text-blue-400 transition-colors">
                  Operations
                </Link>
              </li>
              <li>
                <Link to="/solutions/finance" className="hover:text-blue-400 transition-colors">
                  Finance
                </Link>
              </li>
              <li>
                <Link to="/solutions/human-resources" className="hover:text-blue-400 transition-colors">
                  Human Resources
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/documentation" className="hover:text-blue-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-blue-400 transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/webinars" className="hover:text-blue-400 transition-colors">
                  Webinars
                </Link>
              </li>
              <li>
                <Link to="/api" className="hover:text-blue-400 transition-colors">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-medium text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-blue-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-blue-900/20 flex flex-col md:flex-row justify-between items-center">
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
  );
};

export default Footer;
