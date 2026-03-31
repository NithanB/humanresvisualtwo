'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts'

interface DashboardChartsProps {
  topApps: { name: string, count: number }[]
  topEmployees: { name: string, hours: number }[]
  workforceHistory: { date: string, hours: number, focus: number }[]
}

export default function DashboardCharts({ topApps, topEmployees, workforceHistory }: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      
      {/* Workforce Efficiency Line Chart */}
      <Card className="p-6 bg-white shadow-md border rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold mb-6 text-gray-800">Workforce Efficiency (7 Day Trend)</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={workforceHistory}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" orientation="left" stroke="#4f46e5" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="hours" name="Avg Active Hours" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line yAxisId="right" type="monotone" dataKey="focus" name="Focus Ratio %" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Applications Bar Chart */}
      <Card className="p-6 bg-white shadow-md border rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold mb-6 text-gray-800">Application Usage Frequency</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topApps} layout="vertical" margin={{ left: 30, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" name="Usage Count" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Employees by Active Hours */}
      <Card className="p-6 bg-white shadow-md border rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold mb-6 text-gray-800">Top Employees (Active Hours)</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topEmployees} margin={{ bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={60} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="hours" name="Active Hours" fill="#ec4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
    </div>
  )
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-2">{children}</div>
}

function CardTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h3 className={className}>{children}</h3>
}

function CardContent({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>
}
