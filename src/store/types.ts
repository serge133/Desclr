import {
  HabitInterface,
  TodoInterface,
  HabitTypes,
  CompleteTypes,
  HabitTrends,
} from '../types';
import { SIGNUP, LOGIN, AUTHENTICATE, LOGOUT } from './actions/auth';
import {
  ADD_HABIT,
  GET_HABITS,
  COMPLETE_HABIT_TODO,
  COMPLETE_HABIT,
  ARCHIVE_HABIT,
  REPOST_HABIT,
  EDIT_HABIT,
  DELETE_HABIT,
  SAVE_EXERCISE_TIMER,
  RESET_HABIT_TIMER,
} from './actions/habit';

// * Actions
export type AuthActions =
  | {
      type: typeof AUTHENTICATE;
      token: string;
      userId: string;
    }
  | {
      type: typeof SIGNUP;
      token: string;
      userId: string;
      expirationDate: string;
    }
  | {
      type: typeof LOGIN;
      token: string;
      userId: string;
      expirationDate: string;
      error: boolean;
      errorMessage: string;
    }
  | {
      type: typeof LOGOUT;
    };

export type HabitActions =
  | {
      type: typeof ADD_HABIT;
      habit: HabitInterface;
    }
  | {
      type: typeof EDIT_HABIT;
      editedHabit: {
        id: string;
        value: string;
        type: HabitTypes;
        description: string;
        completeType: CompleteTypes;
        maxMinutes: number;
        minutesPassed: number;
        interval: number;
        todos: TodoInterface[];
        expirationDate: string;
      };
    }
  | {
      type: typeof GET_HABITS;
      habits: HabitInterface[];
    }
  | {
      type: typeof COMPLETE_HABIT_TODO;
      habitId: string;
      todoIndex: number;
      value: boolean;
    }
  | {
      type: typeof COMPLETE_HABIT;
      habitId: string;
      minutesPassed: number;
      streak: number;
      expirationDate: string;
      todos: TodoInterface[];
      trends: HabitTrends;
    }
  | {
      type: typeof ARCHIVE_HABIT;
      habitId: string;
    }
  | {
      type: typeof REPOST_HABIT;
      habitId: string;
      expirationDate: string;
    }
  | {
      type: typeof DELETE_HABIT;
      habitId: string;
    }
  | {
      type: typeof SAVE_EXERCISE_TIMER;
      habitId: string;
      minutesPassed: number;
    }
  | {
      type: typeof RESET_HABIT_TIMER;
      habitId: string;
      minutesPassed: number;
    };
// -------------------------------------------------------------------------------

// * State
export interface AuthState {
  token: string;
  userId: string;
  expirationDate: string;
  isLoggedIn: boolean;
  error: boolean;
  errorMessage: string;
}

export interface HabitState {
  habits: HabitInterface[];
}

// * ROOT STATE
export type RootState = { auth: AuthState; habit: HabitState };
