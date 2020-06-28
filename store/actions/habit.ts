import { HabitInterface, TodoInterface } from '../../types';
import { HabitActions, RootState, AuthActions } from '../types';
import Axios from 'axios';
import { addDaysToTodaysDate } from '../../functions/date';
import { logout } from './auth';

export const ADD_HABIT = 'ADD_HABIT';
export const EDIT_HABIT = 'EDIT_HABIT';
export const GET_HABITS = 'GET_HABITS';
export const COMPLETE_HABIT_TODO = 'COMPLETE_HABIT_TODO';
export const COMPLETE_HABIT = 'COMPLETE_HABIT';
export const ARCHIVE_HABIT = 'ARCHIVE_HABIT';
export const REPOST_HABIT = 'REPOST_HABIT';
export const DELETE_HABIT = 'DELETE_HABIT';

/**
 * All of these check the expiration date for the token
 * If token is expired then it logs out
 * If token is not expired then it writes to database and state
 */

export const addHabit = (
  value: string,
  description: string,
  interval: number,
  // expirationDate: string,
  todos: TodoInterface[]
) => {
  return async (
    dispatch: (action: HabitActions | AuthActions) => void,
    getState: () => RootState
  ) => {
    // The form always brings one empty todo value so this function deletes the empty valued todo (last element)
    todos.pop();
    const auth = getState().auth;
    const response = await Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits.json?auth=${auth.token}`,
      method: 'POST',
      data: {
        value: value,
        description: description,
        streak: 0,
        isActive: true,
        interval: interval,
        expirationDate: addDaysToTodaysDate(interval),
        todos: todos,
      },
    });

    dispatch({
      type: ADD_HABIT,
      habit: {
        id: response.data.name,
        value: value,
        description: description,
        streak: 0,
        isActive: true,
        interval: interval,
        expirationDate: addDaysToTodaysDate(interval),
        todos: todos,
      },
    });
  };
};

export const editHabit = (
  id: string,
  value: string,
  description: string,
  interval: number,
  todos: TodoInterface[]
) => {
  return async (
    dispatch: (action: HabitActions | AuthActions) => void,
    getState: () => RootState
  ) => {
    // The form always brings one empty todo value so this function deletes the empty valued todo (last element)
    todos.pop();
    const auth = getState().auth;
    const newExpirationDate = addDaysToTodaysDate(interval);

    await Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits/${id}.json?auth=${auth.token}`,
      method: 'PATCH',
      data: {
        value: value,
        description: description,
        interval: interval,
        todos: todos,
        expirationDate: newExpirationDate,
      },
    });

    dispatch({
      type: EDIT_HABIT,
      id: id,
      value: value,
      description: description,
      interval: interval,
      todos: todos,
      newExpirationDate: newExpirationDate,
    });
  };
};

export const getHabits = () => {
  return async (
    dispatch: (action: HabitActions | AuthActions) => void,
    getState: () => RootState
  ) => {
    const auth = getState().auth;
    try {
      const response = await Axios({
        url: `https://desclr.firebaseio.com/${auth.userId}/habits.json?auth=${auth.token}`,
        method: 'GET',
      });

      if (response.data) {
        const formatedHabits = (): HabitInterface[] => {
          const keys: string[] = Object.keys(response.data);
          const habits: HabitInterface[] = Object.values(response.data);
          for (const i in keys) {
            habits[i].id = keys[i];
          }
          return habits;
        };
        dispatch({
          type: GET_HABITS,
          habits: formatedHabits(),
        });
      } else {
        dispatch({
          type: GET_HABITS,
          habits: [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const completeHabitTodo = (
  habitId: string,
  todoIndex: number,
  value: boolean
) => {
  return async (
    dispatch: (action: HabitActions | AuthActions) => void,
    getState: () => RootState
  ) => {
    const auth = getState().auth;
    await Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits/${habitId}/todos/${todoIndex}.json?auth=${auth.token}`,
      method: 'PATCH',
      data: {
        completed: value,
      },
    });

    dispatch({
      type: COMPLETE_HABIT_TODO,
      habitId: habitId,
      todoIndex: todoIndex,
      value: value,
    });
  };
};

export const completeHabit = (
  habitId: string,
  streak: number,
  interval: number,
  todos: { id: string; value: string; completed: boolean }[]
) => {
  return async (
    dispatch: (action: HabitActions | AuthActions) => void,
    getState: () => RootState
  ) => {
    const auth = getState().auth;

    const newStreak = streak + 1;
    console.log(newStreak);
    // Creates a new expiration date by adding todays date with the day interval for the next expiration date
    const newExpirationDate = addDaysToTodaysDate(interval);
    const newTodos = [];

    for (const todo of todos) {
      newTodos.push({
        ...todo,
        completed: false,
      });
    }

    const response = await Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits/${habitId}.json?auth=${auth.token}`,
      method: 'PATCH',
      data: {
        streak: newStreak,
        expirationDate: newExpirationDate,
        todos: newTodos,
      },
    });

    if (response.status === 200) {
      dispatch({
        type: COMPLETE_HABIT,
        habitId: habitId,
        newStreak: newStreak,
        newExpirationDate: newExpirationDate,
        newTodos: newTodos,
      });
    }
  };
};

export const archiveHabit = (habitId: string) => {
  return async (
    dispatch: (action: HabitActions | AuthActions) => void,
    getState: () => RootState
  ) => {
    const auth = getState().auth;
    const response = await Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits/${habitId}.json?auth=${auth.token}`,
      method: 'PATCH',
      data: {
        isActive: false,
      },
    });
    if (response.status === 200) {
      dispatch({
        type: ARCHIVE_HABIT,
        habitId: habitId,
      });
    }
  };
};

export const repostHabit = (habitId: string, interval: number) => {
  return async (
    dispatch: (action: HabitActions | AuthActions) => void,
    getState: () => RootState
  ) => {
    const auth = getState().auth;
    const newExpirationDate = addDaysToTodaysDate(interval);
    const response = await Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits/${habitId}.json?auth=${auth.token}`,
      method: 'PATCH',
      data: {
        isActive: true,
        expirationDate: newExpirationDate,
        streak: 0,
      },
    });
    if (response.status === 200) {
      dispatch({
        type: REPOST_HABIT,
        habitId: habitId,
        newExpirationDate: newExpirationDate,
      });
    }
  };
};

export const deleteHabit = (habitId: string) => {
  return async (
    dispatch: (action: HabitActions | AuthActions) => void,
    getState: () => RootState
  ) => {
    const auth = getState().auth;
    Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits/${habitId}.json?auth=${auth.token}`,
      method: 'DELETE',
    });
    dispatch({
      type: DELETE_HABIT,
      habitId: habitId,
    });
  };
};
