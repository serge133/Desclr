// * Optimized
import {
  HabitInterface,
  TodoInterface,
  HabitTypes,
  HabitTrends,
} from '../../types';
import Axios from 'axios';
import { HabitActions, RootState } from '../types';
import { addDaysToTodaysDate } from '../../functions/date';

export const ADD_HABIT = 'ADD_HABIT';
export const EDIT_HABIT = 'EDIT_HABIT';
export const GET_HABITS = 'GET_HABITS';
export const COMPLETE_HABIT_TODO = 'COMPLETE_HABIT_TODO';
export const COMPLETE_HABIT = 'COMPLETE_HABIT';
export const ARCHIVE_HABIT = 'ARCHIVE_HABIT';
export const REPOST_HABIT = 'REPOST_HABIT';
export const DELETE_HABIT = 'DELETE_HABIT';
export const SAVE_EXERCISE_TIMER = 'SAVE_EXERCISE_TIMER';
export const RESET_HABIT_TIMER = 'RESET_HABIT_TIMER';
/**
 * The app checks every minute if the user is valid.
 */

export const addHabit = (
  value: string,
  type: HabitTypes,
  description: string,
  timer: boolean,
  maxMinutes: number,
  interval: number,
  todos: TodoInterface[],
  checklist: boolean
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
      type: type,
      description: description,
      streak: 0,
      isActive: true,
      timer: timer,
      maxMinutes: maxMinutes,
      // Same as above because initially timer is full
      minutesPassed: 0,
      interval: interval,
      expirationDate: addDaysToTodaysDate(interval),
      todos: todos,
      trends: {
        minutesNeeded: [0],
      },
      checklist: checklist,
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
  type: HabitTypes,
  description: string,
  timer: boolean,
  maxMinutes: number,
  interval: number,
  todos: TodoInterface[],
  checklist: boolean
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
      type: type,
      description: description,
      timer: timer,
      maxMinutes: maxMinutes,
      minutesPassed: 0,
      interval: interval,
      todos: todos,
      expirationDate: addDaysToTodaysDate(interval),
      checklist: checklist,
    };

    await Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits/${id}.json?auth=${auth.token}`,
      method: 'PATCH',
      data: editedHabit,
    });

    dispatch({
      type: EDIT_HABIT,
      editedHabit: {
        id: id,
        ...editedHabit,
      },
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

export const completeHabit = (habitId: string) => {
  return async (
    dispatch: (action: HabitActions) => void,
    getState: () => RootState
  ) => {
    const { auth, habit } = getState();

    const currentHabit = habit.habits.find(h => h.id === habitId);

    if (currentHabit) {
      // Resets Todos
      const newTodos = [];
      for (const todo of currentHabit.todos) {
        newTodos.push({
          ...todo,
          completed: false,
        });
      }

      console.log(currentHabit);

      const newTrends: HabitTrends = {
        minutesNeeded: currentHabit.trends.minutesNeeded.concat(
          currentHabit.minutesPassed
        ),
      };

      const completedHabit = {
        streak: currentHabit.streak + 1,
        // Resets the maxMinutes when habit is completed
        minutesPassed: 0,
        expirationDate: addDaysToTodaysDate(currentHabit.interval),
        todos: newTodos,
        trends: newTrends,
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

export const saveHabitTimer = (habitId: string, minutesPassed: number) => {
  return async (
    dispatch: (action: HabitActions) => void,
    getState: () => RootState
  ) => {
    const { auth } = getState();
    console.log('SAVE HABIT TIMER', minutesPassed);
    Axios({
      url: `https://desclr.firebaseio.com/${auth.userId}/habits/${habitId}.json?auth=${auth.token}`,
      method: 'PATCH',
      data: {
        minutesPassed: minutesPassed,
      },
    });
    dispatch({
      type: SAVE_EXERCISE_TIMER,
      habitId: habitId,
      minutesPassed: minutesPassed,
    });
  };
};

export const resetHabitTimer = (habitId: string) => {
  return async (
    dispatch: (action: HabitActions) => void,
    getState: () => RootState
  ) => {
    const { auth, habit } = getState();
    const currentHabit = habit.habits.find(h => h.id === habitId);
    if (currentHabit) {
      Axios({
        url: `https://desclr.firebaseio.com/${auth.userId}/habits/${habitId}.json?auth=${auth.token}`,
        method: 'PATCH',
        data: {
          minutesPassed: 0,
        },
      });
      dispatch({
        type: RESET_HABIT_TIMER,
        habitId: habitId,
        minutesPassed: 0,
      });
    }
  };
};
