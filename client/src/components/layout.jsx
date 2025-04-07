import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Moon, Sun, LogOut } from 'lucide-react';

function Layout({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <aside className={`
          fixed top-0 left-0 z-40 w-64 h-screen transition-transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        `}>
          <div className="flex flex-col h-full">
            <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">HabitZen</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                Dashboard
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                My Habits
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                Statistics
              </a>
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={toggleTheme}
                className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                {isDark ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button className="flex items-center w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 md:ml-64">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex items-center justify-between h-16 px-4">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 dark:text-gray-300">Welcome back!</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;