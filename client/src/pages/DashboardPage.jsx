import React from 'react';
import { Plus, CheckCircle2, Calendar, Award } from 'lucide-react';

function Dashboard() {
  const stats = [
    { title: 'Current Streak', value: '5 days', icon: CheckCircle2 },
    { title: 'Best Streak', value: '14 days', icon: Award },
    { title: 'Completion Rate', value: '85%', icon: Calendar },
  ];

  const habits = [
    { id: 1, title: 'Morning Workout', streak: 5, completed: true },
    { id: 2, title: 'Read 30 minutes', streak: 3, completed: false },
    { id: 3, title: 'Meditate', streak: 7, completed: true },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <Icon className="w-8 h-8 text-indigo-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Habits Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My Habits</h2>
            <button className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
              <Plus className="w-5 h-5 mr-2" />
              Add Habit
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {habits.map((habit) => (
            <div key={habit.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={habit.completed}
                  onChange={() => {}}
                  className="w-5 h-5 text-indigo-500 border-gray-300 rounded focus:ring-indigo-500"
                />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{habit.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {habit.streak} day streak 🔥
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Edit</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;