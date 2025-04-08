import React from 'react';
import PropTypes from 'prop-types';
import { Activity } from 'lucide-react';
// import Image from 'next/image'; // If using Next.js

function AuthLayout({ children, title, subtitle, imageSrc }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {imageSrc ? (
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <Image 
                  src={imageSrc}
                  alt="Auth illustration"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-50 dark:bg-indigo-900/20">
                <Activity className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          )}
          
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {title}
          </h2>
          
          {subtitle && (
            <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 sm:p-10 transition-all duration-300">
          {children}
        </div>
        
        {/* <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Secure authentication powered by your app name
          </p>
        </div> */}
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  imageSrc: PropTypes.string,
};

export default AuthLayout;
