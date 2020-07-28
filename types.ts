export interface TodoInterface {
  id: string;
  value: string;
  completed: boolean;
}

export type HabitTypes = 'Default' | 'Exercise' | 'Knowledge';

export interface HabitInterface {
  id: string;
  value: string;
  type: HabitTypes;
  description: string;
  exerciseMinutes: number;
  exerciseMinutesLeft: number;
  interval: number;
  expirationDate: string;
  streak: number;
  isActive: boolean;
  todos: TodoInterface[];
}
