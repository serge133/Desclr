export interface TodoInterface {
  id: string;
  value: string;
  completed: boolean;
}

export type HabitTypes = 'Default' | 'Exercise' | 'Knowledge';
export type CompleteTypes = 'Timer' | 'Button';

export interface HabitInterface {
  id: string;
  value: string;
  type: HabitTypes;
  description: string;
  completeType: CompleteTypes;
  maxMinutes: number;
  minutesPassed: number;
  interval: number;
  expirationDate: string;
  streak: number;
  isActive: boolean;
  todos: TodoInterface[];
}
