import React, { useState } from 'react';
import { X, Clock, Calendar, Repeat, Hash, Sun, Moon, Droplet, Flame, Check, ChevronDown } from 'lucide-react';

function HabitModal({ onClose, onSave }) {
    const [habitData, setHabitData] = useState({
        title: '',
        description: '',
        frequency: 'daily',
        goalValue: 1,
        goalUnit: 'times',
        reminder: false,
        reminderTime: '08:00',
        color: 'indigo',
        icon: 'Flame'
    });

    const frequencies = [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'custom', label: 'Custom Days' }
    ];

    const colors = [
        { name: 'indigo', bg: 'bg-indigo-100', text: 'text-indigo-600' },
        { name: 'blue', bg: 'bg-blue-100', text: 'text-blue-600' },
        { name: 'green', bg: 'bg-green-100', text: 'text-green-600' },
        { name: 'yellow', bg: 'bg-yellow-100', text: 'text-yellow-600' },
        { name: 'red', bg: 'bg-red-100', text: 'text-red-600' },
        { name: 'purple', bg: 'bg-purple-100', text: 'text-purple-600' }
    ];

    const icons = [
        { name: 'Flame', component: Flame },
        { name: 'Check', component: Check },
        { name: 'Sun', component: Sun },
        { name: 'Moon', component: Moon },
        { name: 'Droplet', component: Droplet }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHabitData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(habitData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md shadow-lg p-6 relative mx-4">
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create New Habit</h2>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <X size={20} className="text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Body */}
                <div className="mt-6 space-y-4">
                    {/* Habit Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Habit Name
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={habitData.title}
                            onChange={handleChange}
                            placeholder="e.g., Morning Workout"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Habit Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description (Optional)
                        </label>
                        <textarea
                            name="description"
                            value={habitData.description}
                            onChange={handleChange}
                            placeholder="What's this habit about?"
                            rows={2}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Frequency */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Frequency
                        </label>
                        <div className="relative">
                            <select
                            name="frequency"
                            value={habitData.frequency}
                            onChange={handleChange}
                            className="w-full px-4 py-2 pr-10 border rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                            {frequencies.map(freq => (
                                <option key={freq.value} value={freq.value}>{freq.label}</option>
                            ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <Repeat className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/* Goal */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Goal
                            </label>
                            <div className="relative">
                            <input
                                type="number"
                                name="goalValue"
                                value={habitData.goalValue}
                                onChange={handleChange}
                                min="1"
                                className="w-full px-4 py-2 pr-10 border rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <Hash className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                            </div>
                            </div>

                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Unit
                            </label>
                            <select
                                name="goalUnit"
                                value={habitData.goalUnit}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="times">times</option>
                                <option value="minutes">minutes</option>
                                <option value="pages">pages</option>
                                <option value="glasses">glasses</option>
                            </select>
                        </div>
                    </div>

                    {/* Reminder */}
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Reminder
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Get notified to complete your habit</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="reminder"
                                checked={habitData.reminder}
                                onChange={() => setHabitData(prev => ({ ...prev, reminder: !prev.reminder }))}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500 dark:bg-gray-700"></div>
                        </label>
                    </div>

                    {habitData.reminder && (
                        <div className="relative mt-2">
                            <input
                                type="time"
                                name="reminderTime"
                                value={habitData.reminderTime}
                                onChange={handleChange}
                                className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <Clock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                            </div>
                        </div>
                    )}


                    {/* Habit Appearance - Fixed Container */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Customize Appearance
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {/* Color Selection - Now wraps */}
                            <div className="flex flex-wrap gap-2">
                            {colors.map(color => (
                            <button
                                key={color.name}
                                onClick={() => setHabitData(prev => ({ ...prev, color: color.name }))}
                                className={`w-8 h-8 rounded-full ${color.bg} flex items-center justify-center ${
                                habitData.color === color.name ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
                                }`}
                            >
                                <div className={`w-4 h-4 rounded-full ${color.bg.replace('100', '500')}`}></div>
                            </button>
                            ))}
                            </div>

                            {/* Icon Selection - Now wraps */}
                            <div className="flex flex-wrap gap-2">
                                {icons.map(icon => {
                                    const IconComponent = icon.component;
                                    return (
                                        <button
                                            key={icon.name}
                                            onClick={() => setHabitData(prev => ({ ...prev, icon: icon.name }))}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                habitData.icon === icon.name 
                                                ? 'bg-indigo-100 dark:bg-gray-700' 
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <IconComponent className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!habitData.title}
                        className={`px-5 py-2.5 text-sm font-medium rounded-lg text-white transition-colors duration-200 ${
                        habitData.title 
                        ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500'
                        : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Create Habit
                    </button>
                </div>
            </div>
        </div>
    );
}       

export default HabitModal;
