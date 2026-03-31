'use server'

import prisma from '@/lib/prisma'

export async function getDashboardStats() {
  const [employeeCount, computerCount, metricsCount] = await Promise.all([
    prisma.employee.count(),
    prisma.computer.count(),
    prisma.workforceMetrics.count()
  ])

  // Get top 5 applications by usage count from ApplicationUsage
  const topAppsRaw = await prisma.applicationUsage.findMany({
    orderBy: {
      usageCount: 'desc'
    },
    take: 5
  })

  // Get latest 7 days of workforce metrics for a trend line
  const workforceHistory = await prisma.workforceMetrics.findMany({
    orderBy: {
      date: 'desc'
    },
    take: 7
  })

  // Get top 5 employees by active hours
  const topEmployees = await prisma.employee.findMany({
    orderBy: {
      totalActiveHours: 'desc'
    },
    take: 5
  })

  return {
    employeeCount,
    computerCount,
    metricsCount,
    topApps: topAppsRaw.map(app => ({
      name: app.applicationName || 'Unknown',
      count: app.usageCount
    })),
    workforceHistory: workforceHistory.map(m => ({
      date: new Date(m.date).toLocaleDateString(),
      hours: m.avgDailyActiveHours,
      focus: m.overallFocusRatio * 100
    })).reverse(),
    topEmployees: topEmployees.map(e => ({
      name: e.displayName || e.username,
      hours: e.totalActiveHours
    }))
  }
}
