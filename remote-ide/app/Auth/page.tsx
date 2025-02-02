"use client";

import React, { useState } from 'react';

import { Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from 'framer-motion';

 export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Form submitted:', { email, password });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .3 }}
      >
    <div className="flex min-h-screen">
      {/* Left Panel - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1554147090-e1221a04a025?auto=format&fit=crop&q=80"
          alt="Office workspace"
          className="object-cover w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90 mix-blend-multiply" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white space-y-6">
            <h2 className="text-4xl font-bold">Welcome to Our Platform</h2>
            <p className="text-lg max-w-xl">
              Join thousands of users who trust our platform for their daily workflow.
              Experience seamless collaboration and enhanced productivity.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </h1>
            <p className="mt-2 text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button
                onClick={() => setIsLogin(!isLogin)}
                variant="link"
                className="ml-1"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-me" />
                  <Label htmlFor="remember-me" className="text-sm text-gray-700">
                    Remember me
                  </Label>
                </div>
                <Button variant="link" className="text-sm">
                  Forgot password?
                </Button>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg">
              {isLogin ? (
                <>
                  Sign in <LogIn className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Create account <UserPlus className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
    </motion.div>
  );
}

