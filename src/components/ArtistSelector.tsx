
import { useState, useMemo } from 'react'
import { Performance } from '../types/schedule'

interface ArtistSelectorProps {
  performances: Performance[]
  selectedPerformances: Set<string>
  onTogglePerformance: (id: string) => void
}

export function ArtistSelector({ performances, selectedPerformances, onTogglePerformance }: ArtistSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStage, setSelectedStage] = useState<string>('all')
  const [selectedDay, setSelectedDay] = useState<string>('all')

  const stages = useMemo(() => 
    Array.from(new Set(performances.map(p => p.stage))).sort(),
    [performances]
  )

  const days = useMemo(() => 
    Array.from(new Set(performances.map(p => p.day))).sort(),
    [performances]
  )

  const filteredPerformances = useMemo(() => {
    return performances.filter(performance => {
      const matchesSearch = performance.artist.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStage = selectedStage === 'all' || performance.stage === selectedStage
      const matchesDay = selectedDay === 'all' || performance.day === selectedDay
      
      return matchesSearch && matchesStage && matchesDay
    })
  }, [performances, searchTerm, selectedStage, selectedDay])

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🔍 Find Artists</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Artists
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type artist name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glastonbury-green"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stage
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glastonbury-green"
            >
              <option value="all">All Stages</option>
              {stages.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Day
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glastonbury-green"
            >
              <option value="all">All Days</option>
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Results ({filteredPerformances.length} artists)
          </h3>
          <div className="text-sm text-gray-600">
            {selectedPerformances.size} selected
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPerformances.map(performance => (
            <div
              key={performance.id}
              onClick={() => onTogglePerformance(performance.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedPerformances.has(performance.id)
                  ? 'border-glastonbury-green bg-glastonbury-green text-white'
                  : 'border-gray-200 hover:border-glastonbury-green'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium">
                    {performance.artist}
                    {performance.isPictured && (
                      <span className="ml-1 text-sm">📸</span>
                    )}
                  </h4>
                  <p className="text-sm opacity-75 mt-1">
                    🎪 {performance.stage}
                  </p>
                  <p className="text-sm opacity-75">
                    📅 {performance.day}
                  </p>
                  <p className="text-sm opacity-75">
                    ⏰ {performance.startTime} - {performance.endTime}
                  </p>
                </div>
                <div className="ml-2">
                  {selectedPerformances.has(performance.id) ? (
                    <span className="text-white">✓</span>
                  ) : (
                    <span className="text-gray-400">+</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPerformances.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No artists found matching your criteria</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
