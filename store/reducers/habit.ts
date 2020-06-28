import { HabitActions, HabitState } from '../types';
import {
  ADD_HABIT,
  GET_HABITS,
  COMPLETE_HABIT_TODO,
  COMPLETE_HABIT,
  ARCHIVE_HABIT,
  REPOST_HABIT,
  EDIT_HABIT,
  DELETE_HABIT,
} from '../actions/habit';
import { HabitInterface } from '../../types';

const initialState = {
  habits: [],
};

export default (state: HabitState = initialState, action: HabitActions) => {
  const editHabitById = (
    habitId: string,
    updatedHabit: object
  ): HabitInterface[] => {
    let copyHabits = [...state.habits];
    const habitIndex = state.habits.findIndex((habit) => habit.id === habitId);
    if (habitIndex < 0) return copyHabits;
    copyHabits[habitIndex] = { ...copyHabits[habitIndex], ...updatedHabit };
    return copyHabits;
  };

  switch (action.type) {
    case ADD_HABIT:
      return { ...state, habits: state.habits.concat(action.habit) };
    case EDIT_HABIT:
      return {
        ...state,
        habits: editHabitById(action.id, {
          value: action.value,
          description: action.description,
          interval: action.interval,
          todos: action.todos,
          expirationDate: action.newExpirationDate,
        }),
      };
    case GET_HABITS:
      return { ...state, habits: action.habits };
    case COMPLETE_HABIT_TODO:
      const habitIndex = state.habits.findIndex(
        (habit) => habit.id === action.habitId
      );

      let copyTodos = [...state.habits[habitIndex].todos];
      copyTodos[action.todoIndex].completed = action.value;
      return {
        ...state,
        habits: editHabitById(action.habitId, {
          todos: copyTodos,
        }),
      };
    case COMPLETE_HABIT:
      return {
        ...state,
        habits: editHabitById(action.habitId, {
          streak: action.newStreak,
          todos: action.newTodos,
          expirationDate: action.newExpirationDate,
        }),
      };
    case ARCHIVE_HABIT:
      return {
        ...state,
        habits: editHabitById(action.habitId, {
          isActive: false,
        }),
      };
    case REPOST_HABIT:
      return {
        ...state,
        habits: editHabitById(action.habitId, {
          isActive: true,
          expirationDate: action.newExpirationDate,
          streak: 0,
        }),
      };
    case DELETE_HABIT:
      const copyHabits = [...state.habits];
      const deleteIndex = copyHabits.findIndex(
        (habit) => habit.id === action.habitId
      );
      copyHabits.splice(deleteIndex, 1);
      return {
        ...state,
        habits: copyHabits,
      };
    default:
      return state;
  }
};
