'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import GradientText from "../components/GradientText";

export default function LoginPage() {
  const stagger = 0.1;

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
          <span className="text-white">Welcome </span>
          <GradientText animated>Back</GradientText>
        </motion.h1>
        
        <form className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: stagger * 2, duration: 0.5 }}
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
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: stagger * 3, duration: 0.5 }}
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
            />
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: stagger * 4, duration: 0.5 }}
          >
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 bg-black border-gray-700 rounded focus:ring-[#0055ff]"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-[#0055ff] hover:underline">
              Forgot password?
            </a>
          </motion.div>
          
          <motion.button
            type="submit"
            className="w-full btn-primary py-2 px-4 rounded font-medium glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stagger * 5, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
        </form>
        
        <motion.div 
          className="mt-6 text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: stagger * 6, duration: 0.5 }}
        >
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#0055ff] hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
} 