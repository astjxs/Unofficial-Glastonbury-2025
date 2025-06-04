
'use client'

import { useState, useEffect, useMemo } from 'react'
import { parseSetlistData } from '../utils/setlistParser'
import { ScheduleGrid } from '../components/ScheduleGrid'
import { ArtistSelector } from '../components/ArtistSelector'
import { MySchedule } from '../components/MySchedule'
import { Performance } from '../types/schedule'

export default function Home() {
  const [selectedPerformances, setSelectedPerformances] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState<'schedule' | 'selector' | 'my-schedule'>('schedule')
  
  const allPerformances = useMemo(() => parseSetlistData(), [])
  
  const togglePerformance = (performanceId: string) => {
    setSelectedPerformances(prev => {
      const newSet = new Set(prev)
      if (newSet.has(performanceId)) {
        newSet.delete(performanceId)
      } else {
        newSet.add(performanceId)
      }
      return newSet
    })
  }

  const selectedPerformancesList = useMemo(() => 
    allPerformances.filter(p => selectedPerformances.has(p.id)),
    [allPerformances, selectedPerformances]
  )

  const conflicts = useMemo(() => {
    const conflictPairs: Array<[Performance, Performance]> = []
    
    for (let i = 0; i < selectedPerformancesList.length; i++) {
      for (let j = i + 1; j < selectedPerformancesList.length; j++) {
        const p1 = selectedPerformancesList[i]
        const p2 = selectedPerformancesList[j]
        
        if (p1.day === p2.day) {
          const p1Start = new Date(`2025-06-${p1.day.split(' ')[1]} ${p1.startTime}`)
          const p1End = new Date(`2025-06-${p1.day.split(' ')[1]} ${p1.endTime}`)
          const p2Start = new Date(`2025-06-${p2.day.split(' ')[1]} ${p2.startTime}`)
          const p2End = new Date(`2025-06-${p2.day.split(' ')[1]} ${p2.endTime}`)
          
          if (p1Start < p2End && p2Start < p1End) {
            conflictPairs.push([p1, p2])
          }
        }
      }
    }
    
    return conflictPairs
  }, [selectedPerformancesList])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            🎵 Glastonbury 2025 Schedule Planner
          </h1>
          <p className="text-gray-600 mt-2">
            Plan your perfect festival experience • {selectedPerformances.size} acts selected
            {conflicts.length > 0 && (
              <span className="text-red-600 ml-2">• ⚠️ {conflicts.length} conflict{conflicts.length > 1 ? 's' : ''}</span>
            )}
          </p>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { key: 'schedule', label: 'Full Schedule', icon: '📅' },
              { key: 'selector', label: 'Artist Selector', icon: '🎤' },
              { key: 'my-schedule', label: 'My Schedule', icon: '⭐' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-glastonbury-green text-glastonbury-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'schedule' && (
          <ScheduleGrid 
            performances={allPerformances}
            selectedPerformances={selectedPerformances}
            onTogglePerformance={togglePerformance}
          />
        )}
        
        {activeTab === 'selector' && (
          <ArtistSelector
            performances={allPerformances}
            selectedPerformances={selectedPerformances}
            onTogglePerformance={togglePerformance}
          />
        )}
        
        {activeTab === 'my-schedule' && (
          <MySchedule
            selectedPerformances={selectedPerformancesList}
            conflicts={conflicts}
            onRemovePerformance={(id) => togglePerformance(id)}
          />
        )}
      </main>
    </div>
  )
}
