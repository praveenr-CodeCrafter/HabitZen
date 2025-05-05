import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { MailCheck, Mail, Loader2 } from 'lucide-react';
import axios from 'axios';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Simple validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // try {
    //   setIsSubmitting(true);
      
    //   const response = await axios.post('/api/auth/password-reset/', { email });

    //   console.log('Reset password email sent:', response.data);
    //   setSubmitted(true);
    // } catch (err) {
    //   console.error('Error:', err);
    //   if (err.response && err.response.data && err.response.data.detail) {
    //     setError(err.response.data.detail);
    //   } else {
    //     setError('Failed to send reset instructions');
    //   }
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  if (submitted) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent password reset instructions to your email"
        imageSrc="/images/email-sent-illustration.svg"
      >
        <div className="text-center py-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
            <MailCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Reset email sent
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Didn't receive the email? Check your spam folder or
          </p>
          
          <button
            onClick={() => {
              setSubmitted(false);
              setEmail('');
            }}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Resend instructions
          </button>
          
          <div className="mt-4 text-center">
            <a 
              href="/login" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Back to sign in
            </a>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter your email to receive reset instructions"
    //   imageSrc="/images/forgot-password-illustration.svg"
    >
      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-red-800 dark:text-red-200">{error}</span>
            </div>
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isSubmitting}
              className="block w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                Sending...
              </>
            ) : 'Send reset instructions'}
          </button>
        </div>

        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
            <a 
              href="/login" 
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Sign in
            </a>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;
