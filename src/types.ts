export interface TodoInterface {
  id: string;
  value: string;
  completed: boolean;
}

export type HabitTypes = 'Default' | 'Exercise' | 'Knowledge' | 'Chore';
// export type CompleteTypes = 'Timer' | 'Button';

export type HabitTrendsTimer = 'Minutes Needed/Max Minutes' | HabitTrends;

export type HabitTrends = {
  minutesNeeded: number[];
};

export interface HabitInterface {
  id: string;
  value: string;
  type: HabitTypes;
  description: string;
  timer: boolean;
  targetTime: number;
  minutesPassed: number;
  interval: number;
  expirationDate: string;
  streak: number;
  isActive: boolean;
  todos: TodoInterface[];
  trends: HabitTrends;
  checklist: boolean;
}
