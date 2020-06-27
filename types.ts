export interface TodoInterface {
  id: string;
  value: string;
  completed: boolean;
}

export interface HabitInterface {
  id: string;
  value: string;
  description: string;
  interval: number;
  expirationDate: string;
  streak: number;
  isActive: boolean;
  todos: TodoInterface[];
}
