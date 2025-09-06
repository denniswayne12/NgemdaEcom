'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { supabase } from '../../lib/supabase/supabaseClient';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          captchaToken: undefined,
        }
      });

      if (error) throw error;

      if (data.user) {
        // Check if user has verified their email
        if (!data.user.email_confirmed_at) {
          // Redirect to OTP verification page
          router.push('../../screens/verify-otpScreen.jsx');
          return;
        }
        
        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }

        router.push('../../home');
        router.refresh();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/../../../screens/HomeScreen.jsx`
        }
      });

      if (error) throw error;
    } catch (error) {
      setError(error.message);
    }
  };

  return (
  <div className="flex flex-col gap-2 bg-white p-4 w-[90%] max-w-sm rounded-xl shadow font-sans">
      <form onSubmit={handleLogin} className="flex flex-col gap-2 w-full">
            {/**************************************************  Email Field ************************************ */}
            <div className="flex flex-col">
              <label className="text-gray-900 font-semibold text-xs mb-1">Email</label>
            </div>
            <div className="flex items-center border border-gray-200 rounded h-9 px-2 focus-within:border-blue-50 transition focus-within:ring-1 focus-within:ring-blue-100">
              <FiMail size={16} className="text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="ml-2 flex-1 border-none outline-none  text-xs text-black"
                required
              />
            </div>

            {/**************************************************  Password Field ************************************ */}
            <div className="flex flex-col">
              <label className="text-gray-900 font-semibold text-xs mb-1">Password</label>
            </div>

            <div className="flex items-center border border-gray-200 rounded h-9 px-2 focus-within:border-blue-50 transition focus-within:ring-1 focus-within:ring-blue-100">
              <FiLock size={16} className="text-gray-500" />
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" className="ml-2 flex-1 border-none outline-none text-black text-xs" required/>
              <button  type="button"  onClick={() => setShowPassword(!showPassword)}  className="text-gray-500 focus:outline-none" > 
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>

            {/**************************************************  Remember Me & Forgot Password ************************************ */}
            <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="remember"checked={rememberMe}onChange={(e) => setRememberMe(e.target.checked)} className="w-3 h-3" />
                  <label htmlFor="remember" className="text-gray-800 font-normal cursor-pointer">Remember me</label>
                </div>
                <button type="button" onClick={() => router.push('../../auth/forgot-password/')} className="text-blue-600 font-medium hover:text-blue-800 transition cursor-pointer">
                  Forgot password?
                </button>
            </div>

            {/**************************************************  Error Message ************************************ */}
            {error && (
              <div className="text-red-500 text-xs py-1 px-2 bg-red-50 rounded animate-shake">
                {error}
              </div>
            )}

            {/**************************************************  Sign In Button ************************************ */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded h-9 w-full transition text-xs ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'}`}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            {/**************************************************  Sign Up Link ************************************ */}
      <p className="text-center text-gray-900 text-xs mt-1">
              Do not  have an account?{" "}
              <button
                type="button"
                onClick={() => router.push('../../auth/signup')}
                className="text-blue-600 font-medium hover:text-blue-800 transition cursor-pointer"
              >
                Sign Up
              </button>
            </p>

            {/**************************************************  Divider ************************************ */}
            <div className="flex items-center my-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-gray-500 text-xs">Or With</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/**************************************************  Social Buttons ************************************ */}
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex-1 h-9 rounded flex justify-center items-center font-medium gap-1 border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer text-xs"
              >
                <FcGoogle size={16} />
                Google
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('apple')}
                className="flex-1 h-9 rounded flex justify-center items-center font-medium gap-1 border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer text-xs"
              >
                <FaApple size={16} />
                Apple
              </button>
            </div>
          </form>
    </div>
  );
}