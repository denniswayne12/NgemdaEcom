'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { supabase } from '../lib/supabase/supabaseClient';
import 'react-toastify/dist/ReactToastify.css';
import OtpInput from '../components/authentication/OtpInput';


export default function VerifyOtpPage() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get email from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // Fallback: try to get from Supabase auth
      const fetchUserEmail = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error('Error fetching user:', error);
          toast.error('No email found. Please sign up first.');
          router.push('/screens/auth/signup/');
          return;
        }
        
        if (user) {
          setEmail(user.email);
        } else {
          // If no user found, redirect to signup
          toast.error('No signup data found. Please sign up first.');
          router.push('/screens/auth/signup/');
        }
      };
      
      fetchUserEmail();
    }
  }, [router]);

  // Effect to automatically verify when OTP is complete
  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOtp();
    }
  }, [otp]);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }

    setLoading(true);
    try {
      // Use Supabase's verifyOtp function for email confirmation
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'signup', // Type for signup confirmation
      });

      if (error) {
        console.error('OTP verification error:', error);
        throw error;
      }

             if (data && data.user) {
         // Successful verification - user is now automatically signed in
         toast.success('Email verified successfully! You are now logged in.');
         // Redirect to home page or dashboard since user is already authenticated
         setTimeout(() => {
           router.push('../home');
         }, 2000);
       } else {
         throw new Error('Verification failed');
       }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error(error.message || 'Invalid or expired OTP. Please try again.');
      setOtp(''); // Clear OTP on error for re-entry
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error('Email not found');
      return;
    }

    setLoading(true);
    try {
      // Resend the confirmation email
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/screens/auth/verify-otp?email=${encodeURIComponent(email)}`
        }
      });

      if (error) throw error;

      toast.success('Verification code resent! Please check your email.');
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error(error.message || 'Failed to resend verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <ToastContainer autoClose={5000} />
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter the 6-digit code sent to your email address
          </p>
          {email && (
            <p className="mt-1 text-sm text-blue-600 font-medium">
              {email}
            </p>
          )}
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow rounded-lg sm:px-10 text-black">
          <OtpInput
            otp={otp}
            setOtp={setOtp}
            loading={loading}
            onVerify={handleVerifyOtp}
          />

          <div className="mt-6">
            <button
              onClick={handleResendOtp}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}