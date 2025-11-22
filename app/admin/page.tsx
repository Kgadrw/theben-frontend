'use client'

import { FaMusic, FaVideo, FaCalendarAlt, FaUsers, FaChartLine, FaEye, FaPlay, FaImage } from 'react-icons/fa'
import Link from 'next/link'

const stats = [
  { 
    name: 'Total Albums', 
    value: '3', 
    icon: FaMusic, 
    gradient: 'from-purple-600 to-pink-600',
    href: '/admin/music',
    change: '+2 this month'
  },
  { 
    name: 'Total Videos', 
    value: '2', 
    icon: FaVideo, 
    gradient: 'from-blue-600 to-cyan-600',
    href: '/admin/videos',
    change: '+1 this week'
  },
  { 
    name: 'Upcoming Tours', 
    value: '1', 
    icon: FaCalendarAlt, 
    gradient: 'from-green-600 to-emerald-600',
    href: '/admin/tours',
    change: 'Next: Jan 2026'
  },
  { 
    name: 'Total Views', 
    value: '12.4K', 
    icon: FaEye, 
    gradient: 'from-[#ff6b6b] to-[#ff8e8e]',
    href: '#',
    change: '+24% this month'
  },
]

const recentActivity = [
  { type: 'Music', action: 'New album added', time: '2 hours ago', icon: FaMusic, color: 'text-purple-400' },
  { type: 'Video', action: 'Video updated', time: '5 hours ago', icon: FaVideo, color: 'text-blue-400' },
  { type: 'Tour', action: 'Tour date added', time: '1 day ago', icon: FaCalendarAlt, color: 'text-green-400' },
  { type: 'Music', action: 'Album updated', time: '2 days ago', icon: FaMusic, color: 'text-purple-400' },
]

const quickActions = [
  { name: 'Add Album', icon: FaMusic, href: '/admin/music', color: 'hover:bg-purple-900/20 hover:border-purple-500' },
  { name: 'Add Video', icon: FaVideo, href: '/admin/videos', color: 'hover:bg-blue-900/20 hover:border-blue-500' },
  { name: 'Add Tour', icon: FaCalendarAlt, href: '/admin/tours', color: 'hover:bg-green-900/20 hover:border-green-500' },
  { name: 'Update Hero', icon: FaPlay, href: '/admin/hero', color: 'hover:bg-[#ff6b6b]/20 hover:border-[#ff6b6b]' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border border-gray-800 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b]/5 via-transparent to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-quicksand font-light text-white uppercase tracking-wider mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-400 font-quicksand font-light text-lg">
            Manage your content and track your performance
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="group"
            >
              <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6b6b]/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ff6b6b]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-quicksand font-light text-white mb-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-400 font-quicksand font-light uppercase tracking-wider">
                        {stat.change}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm font-quicksand font-light uppercase tracking-wider">
                    {stat.name}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-quicksand font-light text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <FaChartLine className="w-5 h-5 text-[#ff6b6b]" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const IconComponent = action.icon
                return (
                  <Link
                    key={action.name}
                    href={action.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-800 ${action.color} transition-all duration-200 group`}
                  >
                    <IconComponent className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform" />
                    <span className="font-quicksand font-light uppercase tracking-wider text-sm text-gray-300 group-hover:text-white">
                      {action.name}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-quicksand font-light text-white uppercase tracking-wider flex items-center gap-2">
                <FaEye className="w-5 h-5 text-[#ff6b6b]" />
                Recent Activity
              </h2>
              <button className="text-xs text-gray-400 font-quicksand font-light uppercase tracking-wider hover:text-[#ff6b6b] transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const IconComponent = activity.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 py-4 border-b border-gray-800 last:border-0 hover:bg-gray-900/50 rounded-lg px-3 -mx-3 transition-colors group"
                  >
                    <div className={`${activity.color} bg-gray-900 p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-quicksand font-light">
                        <span className={`${activity.color} font-medium`}>{activity.type}</span> - {activity.action}
                      </p>
                      <p className="text-gray-400 text-sm font-quicksand font-light mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

