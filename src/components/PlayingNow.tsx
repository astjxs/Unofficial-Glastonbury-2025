import { useState, useEffect } from 'react';
import { Performance } from '../types/schedule';

interface PlayingNowProps {
  performances: Performance[]; // Add performances prop
}

// Helper function to check if a performance is currently playing
const isPlayingNow = (performance: Performance): boolean => {
  const now = new Date();
  const currentDay = `Day ${now.getDate() - 24}`; // Assuming Day 1 is June 25th
  const currentTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  // Simple time comparison (this might need more robust logic for edge cases)
  return performance.day === currentDay &&
         currentTime >= performance.startTime &&
         currentTime <= performance.endTime;
};

export function PlayingNow({ performances }: PlayingNowProps) { // Receive performances prop
  const [currentTime, setCurrentTime] = useState('');
  const [playingPerformances, setPlayingPerformances] = useState<Performance[]>([]);

  useEffect(() => {
    // Update current time every minute
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    };

    updateTime(); // Set initial time
    const intervalId = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    // Filter performances whenever performances or currentTime changes
    setPlayingPerformances(performances.filter(isPlayingNow));
  }, [performances, currentTime]);

  const groupedByStage = playingPerformances.reduce((acc, performance) => {
    if (!acc[performance.stage]) {
      acc[performance.stage] = [];
    }
    acc[performance.stage].push(performance);
    return acc;
  }, {} as Record<string, Performance[]>);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Playing Now at {currentTime}</h2>
      
      {Object.entries(groupedByStage).length === 0 ? (
        <p className="text-gray-600">Nothing is currently playing.</p>
      ) : (
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4">
          {Object.entries(groupedByStage).map(([stage, stagePerformances]) => (
            <div key={stage} className="w-64 flex-shrink-0 mr-4 bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-3">{stage}</h3>
              <div className="space-y-2">
                {stagePerformances.map(performance => (
                  <div key={performance.id} className="p-3 rounded-md bg-gray-50">
                    <div className="font-medium text-sm">{performance.artist}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {performance.startTime} - {performance.endTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}