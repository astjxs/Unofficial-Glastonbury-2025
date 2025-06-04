
import { Performance } from '../types/schedule'

interface MyScheduleProps {
  selectedPerformances: Performance[]
  conflicts: Array<[Performance, Performance]>
  onRemovePerformance: (id: string) => void
}

export function MySchedule({ selectedPerformances, conflicts, onRemovePerformance }: MyScheduleProps) {
  const groupedByDay = selectedPerformances.reduce((acc, performance) => {
    if (!acc[performance.day]) {
      acc[performance.day] = []
    }
    acc[performance.day].push(performance)
    return acc
  }, {} as Record<string, Performance[]>)

  // Sort performances by time within each day
  Object.keys(groupedByDay).forEach(day => {
    groupedByDay[day].sort((a, b) => {
      const timeA = parseInt(a.startTime.replace(':', ''))
      const timeB = parseInt(b.startTime.replace(':', ''))
      return timeA - timeB
    })
  })

  const isInConflict = (performance: Performance) => {
    return conflicts.some(([p1, p2]) => p1.id === performance.id || p2.id === performance.id)
  }

  const getConflictPartner = (performance: Performance) => {
    const conflict = conflicts.find(([p1, p2]) => p1.id === performance.id || p2.id === performance.id)
    if (!conflict) return null
    return conflict[0].id === performance.id ? conflict[1] : conflict[0]
  }

  if (selectedPerformances.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-6xl mb-4">🎵</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Schedule is Empty</h2>
        <p className="text-gray-600 mb-6">
          Start building your perfect Glastonbury experience by selecting artists from the schedule or artist selector.
        </p>
        <div className="text-sm text-gray-500">
          💡 Tip: Use the other tabs to browse and add artists to your schedule
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-glastonbury-green">
              {selectedPerformances.length}
            </div>
            <div className="text-sm text-gray-600">Artists Selected</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-glastonbury-blue">
              {Object.keys(groupedByDay).length}
            </div>
            <div className="text-sm text-gray-600">Days with Shows</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${conflicts.length > 0 ? 'text-red-500' : 'text-glastonbury-green'}`}>
              {conflicts.length}
            </div>
            <div className="text-sm text-gray-600">Conflicts</div>
          </div>
        </div>
      </div>

      {/* Conflicts Warning */}
      {conflicts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="text-red-500 mr-3 mt-1">⚠️</div>
            <div>
              <h3 className="font-medium text-red-800">Schedule Conflicts Detected</h3>
              <p className="text-sm text-red-700 mt-1">
                You have {conflicts.length} timing conflict{conflicts.length > 1 ? 's' : ''} in your schedule. 
                Consider removing one act from each conflicting pair.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Daily Schedule */}
      {Object.entries(groupedByDay).map(([day, dayPerformances]) => (
        <div key={day} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
            📅 {day}
          </h2>
          
          <div className="space-y-3">
            {dayPerformances.map(performance => {
              const inConflict = isInConflict(performance)
              const conflictPartner = getConflictPartner(performance)
              
              return (
                <div
                  key={performance.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    inConflict ? 'border-l-red-500 bg-red-50' : 'border-l-glastonbury-green bg-green-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">
                          {performance.artist}
                          {performance.isPictured && (
                            <span className="ml-1 text-sm">📸</span>
                          )}
                        </h3>
                        {inConflict && (
                          <span className="text-red-500 text-sm">⚠️ Conflict</span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 text-sm text-gray-600">
                        <div>🎪 {performance.stage}</div>
                        <div>⏰ {performance.startTime} - {performance.endTime}</div>
                        <div></div>
                      </div>
                      
                      {inConflict && conflictPartner && (
                        <div className="mt-2 text-sm text-red-700 bg-red-100 p-2 rounded">
                          Conflicts with: <strong>{conflictPartner.artist}</strong> at {conflictPartner.stage} 
                          ({conflictPartner.startTime} - {conflictPartner.endTime})
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => onRemovePerformance(performance.id)}
                      className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-100 rounded-md transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
