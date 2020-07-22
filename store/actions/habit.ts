// * Optimized
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
 * Authentication is not a problem because the app checks every minute if the
 * user is valid.
 */

export const addHabit = (
  value: string,
  description: string,
  interval: number,
  todos: TodoInterface[]
) => {
  return async (
    dispatch: (action: HabitActions) => void,
    getState: () => RootState
  ) => {
    // This function deletes the empty valued todo (last element)
    todos.pop();
    const { auth } = getState();

    const newHabit = {
      value: value,
      description: description,
      streak: 0,
      isActive: true,
      interval: interval,
      expirationDate: addDaysToTodaysDate(interval),
      todos: todos,
    };

    const response = await Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits.json?auth=${auth.token}`,
      method: 'POST',
      data: newHabit,
    });

    dispatch({
      type: ADD_HABIT,
      habit: {
        id: response.data.name,
        ...newHabit,
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
    dispatch: (action: HabitActions) => void,
    getState: () => RootState
  ) => {
    // This function deletes the empty valued todo (last element)
    todos.pop();
    const { auth } = getState();

    const editedHabit = {
      value: value,
      description: description,
      interval: interval,
      todos: todos,
      expirationDate: addDaysToTodaysDate(interval),
    };

    await Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits/${id}.json?auth=${auth.token}`,
      method: 'PATCH',
      data: editedHabit,
    });

    dispatch({
      type: EDIT_HABIT,
      id: id,
      ...editedHabit,
    });
  };
};

export const getHabits = () => {
  return async (
    dispatch: (action: HabitActions) => void,
    getState: () => RootState
  ) => {
    const { auth } = getState();
    const response = await Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits.json?auth=${auth.token}`,
      method: 'GET',
    });
    // formatedHabits adds the id from keys to values
    const formatedHabits = (data: Object): HabitInterface[] => {
      const keys: string[] = Object.keys(data);
      const habits: HabitInterface[] = Object.values(data);
      for (const i in keys) {
        habits[i].id = keys[i];
      }
      return habits;
    };
    dispatch({
      type: GET_HABITS,
      habits: response.data ? formatedHabits(response.data) : [],
    });
  };
};

export const completeHabitTodo = (
  habitId: string,
  todoIndex: number,
  value: boolean
) => {
  return async (
    dispatch: (action: HabitActions) => void,
    getState: () => RootState
  ) => {
    const { auth } = getState();
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
  todos: TodoInterface[]
) => {
  return async (
    dispatch: (action: HabitActions) => void,
    getState: () => RootState
  ) => {
    const { auth } = getState();

    const newStreak = streak + 1;

    const newExpirationDate = addDaysToTodaysDate(interval);

    // Resets Todos
    const newTodos = [];
    for (const todo of todos) {
      newTodos.push({
        ...todo,
        completed: false,
      });
    }

    const completedHabit = {
      streak: streak + 1,
      expirationDate: addDaysToTodaysDate(interval),
      todos: newTodos,
    };

    const response = await Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits/${habitId}.json?auth=${auth.token}`,
      method: 'PATCH',
      data: completedHabit,
    });

    if (response.status === 200) {
      dispatch({
        type: COMPLETE_HABIT,
        habitId: habitId,
        ...completedHabit,
      });
    }
  };
};

export const archiveHabit = (habitId: string) => {
  return async (
    dispatch: (action: HabitActions) => void,
    getState: () => RootState
  ) => {
    const { auth } = getState();
    const response = await Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits/${habitId}.json?auth=${auth.token}`,
      method: 'PATCH',
      data: {
        isActive: false,
      },
    });
    // if (response.status === 200) {
    dispatch({
      type: ARCHIVE_HABIT,
      habitId: habitId,
    });
    // }
  };
};

export const repostHabit = (habitId: string, interval: number) => {
  return async (
    dispatch: (action: HabitActions) => void,
    getState: () => RootState
  ) => {
    const { auth } = getState();
    const expirationDate = addDaysToTodaysDate(interval);
    const response = await Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits/${habitId}.json?auth=${auth.token}`,
      method: 'PATCH',
      data: {
        isActive: true,
        streak: 0,
        expirationDate: expirationDate,
      },
    });
    // if (response.status === 200) {
    dispatch({
      type: REPOST_HABIT,
      habitId: habitId,
      expirationDate: expirationDate,
    });
    // }
  };
};

export const deleteHabit = (habitId: string) => {
  return async (
    dispatch: (action: HabitActions) => void,
    getState: () => RootState
  ) => {
    const { auth } = getState();
    Axios.delete(
      `https://desclr.firebaseio.com/${auth.userId}/habits/${habitId}.json?auth=${auth.token}`
    );
    dispatch({
      type: DELETE_HABIT,
      habitId: habitId,
    });
  };
};
