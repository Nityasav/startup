'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import GradientText from "../components/GradientText";
import { useState } from "react";
import { createUser } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const stagger = 0.1;
  const router = useRouter();
  const { refreshUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Call the Supabase signup function
      const { data, error } = await createUser(formData.email, formData.password);
      
      if (error) {
        setError(error.message);
        return;
      }
      
      // If successful, refresh the user context and navigate to dashboard
      await refreshUser();
      router.push('/dashboard');
    } catch (err) {
      console.error('Error during signup:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <motion.div 
        className="bg-[#171717] p-8 rounded-lg max-w-md w-full glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-2xl font-bold mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: stagger, duration: 0.5 }}
        >
          <span className="text-white">Create Your </span>
          <GradientText animated>Account</GradientText>
        </motion.h1>
        
        {error && (
          <motion.div 
            className="bg-red-900/40 border border-red-500 text-red-200 px-4 py-2 rounded mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: stagger * 2, duration: 0.5 }}
          >
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 rounded bg-black border border-gray-700 focus:border-[#0055ff] focus:outline-none"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: stagger * 3, duration: 0.5 }}
          >
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded bg-black border border-gray-700 focus:border-[#0055ff] focus:outline-none"
              placeholder="john@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: stagger * 4, duration: 0.5 }}
          >
            <label htmlFor="password" className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded bg-black border border-gray-700 focus:border-[#0055ff] focus:outline-none"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </motion.div>
          
          <motion.button
            type="submit"
            className="w-full btn-primary py-2 px-4 rounded font-medium glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stagger * 5, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </div>
            ) : "Create Account"}
          </motion.button>
        </form>
        
        <motion.div 
          className="mt-6 text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: stagger * 6, duration: 0.5 }}
        >
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-[#0055ff] hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
} 