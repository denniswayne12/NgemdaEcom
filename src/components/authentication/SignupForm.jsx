// app/signup/SignUpForm.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import PasswordStrengthMeter from '../../components/authentication/PasswordStrengthMeter';
import TermsModal from '../../components/authentication/TermsModal';
import { supabase } from '../../lib/supabase/supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }
    if (!termsAccepted) {
      toast.error('You must accept the terms and conditions');
      setLoading(false);
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Sign up the user with Supabase Auth using metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            user_name: userName,
            // Add any additional metadata you need
            created_at: new Date().toISOString(),
          },
          emailRedirectTo: `${window.location.origin}../../auth/verify-otp/?email=${encodeURIComponent(email)}`
        }
      });

      if (authError) {
        console.error('Auth signup error:', authError);
        
        // Handle specific auth errors
        if (authError.message?.includes('already registered')) {
          toast.error('An account with this email already exists');
        } else {
          toast.error(authError.message || 'An error occurred during signup. Please try again.');
        }
        return;
      }

      console.log('User signed up successfully:', authData);
      
      // Show success message and redirect to OTP verification
      toast.success('Account created! Please check your email for verification.');
      router.push(`../../auth/verify-otp/?email=${encodeURIComponent(email)}`);

    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'An error occurred during signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="flex flex-col gap-2 bg-white p-4 max-w-md w-[85%] rounded-xl shadow font-sans mx-auto">
      <ToastContainer autoClose={5000} />
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              {/* Full Name Field */}
              <div className="flex flex-col">
                <label className="text-gray-900 font-semibold text-xs mb-1">Full Name</label>
              </div>
              <div className="flex items-center border border-gray-500 rounded h-9 px-2 focus-within:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100">
                <FiUser size={16} className="text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="ml-2 flex-1 border-none outline-none placeholder:text-gray-400 text-black text-xs "
                  required
                />
              </div>

              {/* User Name Field */}
              <div className="flex flex-col">
                <label className="text-gray-900 font-semibold text-xs mb-1">Username</label>
              </div>
              <div className="flex items-center border border-gray-500 rounded h-9 px-2 focus-within:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100">
                <FiUser size={16} className="text-gray-500" />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Choose a username"
                  className="ml-2 flex-1 border-none outline-none placeholder:text-gray-400 text-black text-xs"
                  required
                />
              </div>

              {/* Email Field */}
              <span className="flex flex-col">
                <label className="text-gray-900 font-semibold text-xs mb-1">Email</label>
              </span>
              <div className="flex items-center border border-gray-500 rounded h-9 px-2 focus-within:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100">
                <FiMail size={16} className="text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  className="ml-2 flex-1 border-none outline-none placeholder:text-gray-400 text-black text-xs"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col">
                <label className="text-gray-900 font-semibold text-xs mb-1">Password</label>
              </div>
              <div className="flex items-center border border-gray-500 rounded h-9 px-2 focus-within:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100">
                <FiLock size={16} className="text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="ml-2 flex-1 border-none outline-none placeholder:text-gray-400 text-black text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>

              {/* Password Strength Meter - Only show when typing */}
              {password && (
                <PasswordStrengthMeter password={password} />
              )}

              {/* Confirm Password Field */}
              <div className="flex flex-col">
                <label className="text-gray-900 font-semibold text-xs mb-1">Confirm Password</label>
              </div>
              <div className="flex items-center border border-gray-500 rounded h-9 px-2 focus-within:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-100">
                <FiLock size={16} className="text-gray-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="ml-2 flex-1 border-none outline-none placeholder:text-gray-400 text-black text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-500 focus:outline-none cursor-pointer"
                >
                  {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-1 mt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 w-3 h-3"
                />
                <label htmlFor="terms" className="text-gray-800 text-xs">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-blue-600 font-medium hover:text-blue-800 transition cursor-pointer text-xs"
                  >
                    Terms & Conditions
                  </button>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`mt-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded h-9 w-full transition text-xs ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

        <p className="text-center text-gray-900 text-xs mt-1">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push('../../auth/login/')}
                  className="text-blue-600 font-medium hover:text-blue-700 transition cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </form>

      {/* Terms Modal */}
      {showTerms && (
        <TermsModal onClose={() => setShowTerms(false)} />
      )}
    </div>
  );
}