import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    console.log('Reset password for:', email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent you instructions to reset your password"
      >
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Didn't receive the email?{' '}
            <button
              onClick={() => setSubmitted(false)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Try again
            </button>
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter your email to receive reset instructions"
    >
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send reset instructions
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;