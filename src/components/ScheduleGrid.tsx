
import { Performance } from '../types/schedule'

interface ScheduleGridProps {
  performances: Performance[]
  selectedPerformances: Set<string>
  onTogglePerformance: (id: string) => void
}

export function ScheduleGrid({ performances, selectedPerformances, onTogglePerformance }: ScheduleGridProps) {
  const groupedByDay = performances.reduce((acc, performance) => {
    if (!acc[performance.day]) {
      acc[performance.day] = {}
    }
    if (!acc[performance.day][performance.stage]) {
      acc[performance.day][performance.stage] = []
    }
    acc[performance.day][performance.stage].push(performance)
    return acc
  }, {} as Record<string, Record<string, Performance[]>>)

  const getStageClassName = (stage: string) => {
    const baseClass = 'stage-card'
    if (stage.includes('Pyramid')) return `${baseClass} pyramid-stage`
    if (stage.includes('Other')) return `${baseClass} other-stage`
    if (stage.includes('West Holts')) return `${baseClass} west-holts-stage`
    if (stage.includes('Woodsies')) return `${baseClass} woodsies`
    if (stage.includes('Park')) return `${baseClass} park-stage`
    if (stage.includes('Acoustic')) return `${baseClass} acoustic-stage`
    if (stage.includes('Avalon')) return `${baseClass} avalon-stage`
    if (stage.includes('Arcadia')) return `${baseClass} arcadia`
    if (stage.includes('Levels')) return `${baseClass} levels`
    if (stage.includes('Leftfield')) return `${baseClass} leftfield-stage`
    return baseClass
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedByDay).map(([day, stages]) => (
        <div key={day} className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
            📅 {day}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(stages).map(([stage, stagePerformances]) => (
              <div key={stage} className={getStageClassName(stage)}>
                <h3 className="font-semibold text-lg text-gray-800 mb-3">
                  🎪 {stage}
                </h3>
                
                <div className="space-y-2">
                  {stagePerformances.map(performance => (
                    <div
                      key={performance.id}
                      onClick={() => onTogglePerformance(performance.id)}
                      className={`p-3 rounded-md cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedPerformances.has(performance.id)
                          ? 'bg-glastonbury-green text-white shadow-md'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {performance.artist}
                            {performance.isPictured && (
                              <span className="ml-1 text-xs">📸</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {performance.startTime} - {performance.endTime}
                          </div>
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
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
