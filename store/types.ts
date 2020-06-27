import { HabitInterface, TodoInterface } from '../types';
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
      id: string;
      value: string;
      description: string;
      interval: number;
      todos: TodoInterface[];
      newExpirationDate: string;
    }
  | {
      type: typeof GET_HABITS;
      habits: HabitInterface[];
    }
  | {
      type: typeof COMPLETE_HABIT_TODO;
      habitId: string;
      newTodos: TodoInterface[];
    }
  | {
      type: typeof COMPLETE_HABIT;
      habitId: string;
      newStreak: number;
      newExpirationDate: string;
      newTodos: TodoInterface[];
    }
  | {
      type: typeof ARCHIVE_HABIT;
      habitId: string;
    }
  | {
      type: typeof REPOST_HABIT;
      habitId: string;
      newExpirationDate: string;
    }
  | {
      type: typeof DELETE_HABIT;
      habitId: string;
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
