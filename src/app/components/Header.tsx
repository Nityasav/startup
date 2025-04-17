'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, loading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wider">
            <div className="w-20 h-12 relative">
              <Image 
                src="/logo.png"
                width={80}
                height={48}
                alt="Venturly Logo"
                className="h-12 object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="cyber-title text-sm md:text-base" data-text="VENTURLY">VENTURLY</span>
              <span className="text-xs text-gray-400 hidden md:inline-block">Startup to start Startups </span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About us</NavLink>
            <NavLink href="/services">What we do</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          {!loading && (
            user ? (
              <div className="flex items-center gap-4">
                <Link 
                  href="/dashboard" 
                  className="text-white hover:text-[#00aaff] transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="border border-[#00aaff]/40 hover:border-[#00aaff] text-white py-2 px-4 rounded-md transition-all duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                  href="/login"
                  className="text-white hover:text-[#00aaff] transition-colors duration-300 hidden md:block"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 
                          text-white font-medium py-2 px-4 rounded-md transition-all duration-300 
                          shadow-[0_0_15px_rgba(0,170,255,0.5)] hover:shadow-[0_0_25px_rgba(0,170,255,0.7)]"
                >
                  Start your Journey
                </Link>
              </div>
            )
          )}
          
          <button 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden pt-4 pb-2"
          >
            <nav className="flex flex-col gap-4">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About us</NavLink>
              <NavLink href="/services">What we do</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              {!loading && !user && (
                <NavLink href="/login">Login</NavLink>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href} className="text-white opacity-80 hover:opacity-100 transition-opacity duration-300">
      {children}
    </Link>
  );
};

export default Header; 