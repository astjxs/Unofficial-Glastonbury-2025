import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function getStageColor(stage: string): string {
  const stageColors: Record<string, string> = {
    'pyramid': 'red-500',
    'other': 'orange-500',
    'west-holts': 'emerald-500',
    'woodsies': 'purple-500',
    'park': 'pink-500',
    'acoustic': 'cyan-500',
    'avalon': 'amber-500',
    'arcadia': 'indigo-500',
    'levels': 'lime-500',
    'leftfield': 'red-500'
  };
  return stageColors[stage] || 'gray-500';
}

export function checkTimeOverlap(
  start1: string, 
  end1: string, 
  start2: string, 
  end2: string
): boolean {
  const start1Minutes = parseTime(start1);
  const end1Minutes = parseTime(end1);
  const start2Minutes = parseTime(start2);
  const end2Minutes = parseTime(end2);
  
  return start1Minutes < end2Minutes && end1Minutes > start2Minutes;
}
