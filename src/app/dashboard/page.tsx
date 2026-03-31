import React from 'react'
import { getDashboardStats } from '@/actions/dashboard'
import DashboardCharts from '@/components/DashboardCharts'
import { Users, Monitor, BarChart3 } from 'lucide-react'

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Workforce Insights Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">Enterprise resource monitoring and efficiency metrics</p>
        </header>

        {/* Top level stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <StatCard 
            title="Total Employees" 
            value={stats.employeeCount.toLocaleString()} 
            icon={<Users className="w-8 h-8 text-blue-600" />} 
          />
          <StatCard 
            title="Managed Computers" 
            value={stats.computerCount.toLocaleString()} 
            icon={<Monitor className="w-8 h-8 text-green-600" />} 
          />
          <StatCard 
            title="Recorded Metrics" 
            value={stats.metricsCount.toLocaleString()} 
            icon={<BarChart3 className="w-8 h-8 text-indigo-600" />} 
          />
        </div>

        {/* Charts Section */}
        <DashboardCharts 
          topApps={stats.topApps} 
          topEmployees={stats.topEmployees}
          workforceHistory={stats.workforceHistory}
        />
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-6 hover:shadow-md transition-shadow duration-200">
      <div className="bg-gray-50 p-4 rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  )
}
