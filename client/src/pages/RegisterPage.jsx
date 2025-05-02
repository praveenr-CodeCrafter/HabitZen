import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

function Register() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/register/`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log('Registration successful:', response.data);
      setRegistrationSuccess(true);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (registrationSuccess) {
    return (
      <AuthLayout 
        title="Registration successful!"
        subtitle="Your account has been created"
        imageSrc="/images/success-illustration.svg"
      >
        <div className="text-center py-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Welcome, {formData.name}!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Check your email to verify your account.
          </p>
          <a
            href="/login"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Continue to login
          </a>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Create an account"
      subtitle="Start tracking your habits today"
    //   imageSrc="/images/signup-illustration.svg"
    >
      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={`block w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'} placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800`}
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`block w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'} placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800`}
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className={`block w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'} placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 pr-10`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Must be at least 8 characters
            </p>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className={`block w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'} placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 pr-10`}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-gray-600 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300">
              I agree to the{' '}
              <a href="/terms" className="text-indigo-600 hover:text-indigo-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                Privacy Policy
              </a>
            </label>
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
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm 2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                Signing up...
              </>
            ) : 'Sign up'}
          </button>
        </div>
        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Register;


