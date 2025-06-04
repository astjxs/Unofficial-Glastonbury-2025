
export interface Performance {
  id: string
  artist: string
  stage: string
  day: string
  startTime: string
  endTime: string
  isPictured: boolean
}

export interface StageGroup {
  stage: string
  performances: Performance[]
}

export interface DayGroup {
  day: string
  stages: StageGroup[]
}
