import React, { useState } from 'react';
import { Plus, CheckCircle2, Calendar, Award, Edit2, MoreVertical, Flame } from 'lucide-react';
import Layout from '../components/layout';
import HabitModal from '../components/HabitModal';
import axios from 'axios';

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [habits, setHabits] = useState([
    { id: 1, title: 'Morning Workout', streak: 5, completed: true, lastCompleted: new Date().toDateString() },
    { id: 2, title: 'Read 30 minutes', streak: 3, completed: false, lastCompleted: new Date().toDateString() },
    { id: 3, title: 'Meditate', streak: 7, completed: true, lastCompleted: new Date().toDateString() },
  ]);

  const stats = [
    { title: 'Current Streak', value: '5 days', icon: CheckCircle2, color: 'text-green-500' },
    { title: 'Best Streak', value: '14 days', icon: Award, color: 'text-yellow-500' },
    { title: 'Completion Rate', value: '85%', icon: Calendar, color: 'text-blue-500' },
  ];

  const toggleHabitCompletion = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit;
      
      const today = new Date().toDateString();
      const wasCompletedYesterday = () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return habit.lastCompleted === yesterday.toDateString();
      };

      return {
        ...habit,
        completed: !habit.completed,
        streak: !habit.completed 
          ? (wasCompletedYesterday() ? habit.streak + 1 : 1)
          : habit.streak,
        lastCompleted: !habit.completed ? today : habit.lastCompleted
      };
    }));
  };

  // const addHabit = async (newHabit) => {
  //   setHabits([...habits, {
  //     id: habits.length + 1,
  //     title: newHabit,
  //     streak: 0,
  //     completed: false
  //   }]);
  //   setShowModal(false);
  // };

  const addHabit = async (newHabit) => {
    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:8000/api/habits', newHabit);
      // Update habits state with the new habit from backend (if backend returns the created habit)
      setHabits([...habits, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving habit:', error);
      // Optionally, show error to user
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${stat.color} bg-opacity-20`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Habits Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Habits</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {habits.filter(h => h.completed).length} of {habits.length} completed today
                </p>
              </div>
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Habit
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {habits.length > 0 ? (
              habits.map((habit) => (
                <div 
                  key={habit.id} 
                  className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleHabitCompletion(habit.id)}
                      className={`w-6 h-6 flex items-center justify-center rounded-md border ${habit.completed ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 dark:border-gray-600'} transition-colors duration-200`}
                    >
                      {habit.completed && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div>
                      <p className={`font-medium ${habit.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                        {habit.title}
                      </p>
                      <div className="flex items-center mt-1">
                        <Flame className="w-4 h-4 text-red-500" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          {habit.streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">No habits yet</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Get started by adding your first habit.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Add Habit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Habit Modal */}
      {showModal && (
        <HabitModal 
          onClose={() => setShowModal(false)} 
          onSave={addHabit}
        />
      )}
    </Layout>
  );
}

export default Dashboard;
