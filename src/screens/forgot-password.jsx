// app/forgot-password/page.js
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMail } from "react-icons/fi";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Fix 1: Use the 'email' state variable, not 'data.email'
      // Fix 2: Use the correct redirectTo path
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}../auth/reset-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (error) {
      console.error("Password reset error:", error); // Added for debugging
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-2">
      <div className="max-w-md w-full space-y-4">
        <div>
          <h2 className="mt-4 text-center text-xl font-bold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-1 text-center text-xs text-gray-600">
            Enter your email and we will send you a link to reset your password
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <FiMail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 py-2 border border-gray-300 rounded  text-xs text-black"
                  placeholder="Enter email"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-xs py-1 px-2 bg-red-50 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-xs py-1 px-2 bg-green-50 rounded">
                Password reset link sent! Check your email.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full  bg-gray-900 hover:bg-gray-800 text-white py-2 rounded transition-colors font-medium text-xs"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-3 text-center">
            <button
              onClick={() => router.push("../auth/login")}
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer text-xs"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}