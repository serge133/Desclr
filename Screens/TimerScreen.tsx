import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Header from '../components/UI/Header';
import Button from '../components/UI/Button';
import { Colors } from '../constants/default-styles';
import * as Text from '../components/UI/Text';
import {
  completeHabit,
  completeHabitTodo,
  saveHabitTimer,
  resetHabitTimer,
} from '../store/actions/habit';
import { useDispatch, useSelector } from 'react-redux';
import CheckBox from '../components/UI/CheckBox';
import { RootState } from '../store/types';

interface Props {
  navigation: {
    goBack: Function;
  };
  route: {
    params: {
      minutes: number;
      habitId: string;
    };
  };
}

/**
 * This timer doesnt just decrease a value every second or minute
 * this timer uses absolute values (exact dates in ms) and then updates every five seconds checking those values
 * every update triggers a math equation in which the time set by the user plus todays date in ms (doesnt change) is
 * subtracted by todays date that updates every five seconds (does change)
 * the result is a value in which even if you leave the app will still be super accurate
 */

const TimerScreen: React.FC<Props> = props => {
  // * TIMER IS IN MILLISECONDS AND ABSOLUTE
  // * User can close the app and the timer will function because of absolute values
  const { params } = props.route;
  // Set absolute date when timer will expire by adding todays date in minutes (milliseconds)
  console.log(params.minutes);
  const [time, setTime] = useState(
    (new Date().getTime() + params.minutes * 60000) / 60000
  );
  const [timer, setTimer] = useState(
    Math.ceil(time - new Date().getTime() / 60000)
  );
  const [isTimerActive, setIsTimerActive] = useState(false);
  const todos = useSelector(
    (state: RootState) =>
      state.habit.habits.find(h => h.id === params.habitId)?.todos
  );
  const dispatch = useDispatch();

  const onFinish = useCallback(() => {
    setIsTimerActive(false);
    // If all todos are completed then when timer ends the habit will complete
    if (todos?.every(t => t.completed)) {
      dispatch(completeHabit(params.habitId));
      props.navigation.goBack();
    } else {
      dispatch(resetHabitTimer(params.habitId));
      Alert.alert('Not Finish Habit', 'You did not finish this habit', [
        {
          text: 'Go Back',
          style: 'default',
          onPress: () => props.navigation.goBack(),
        },
      ]);
    }
  }, [todos]);
  // * Math.ceil rounds up e.g. 4.01 will be 5
  useEffect(() => {
    if (isTimerActive) {
      // Every five seconds the timer will update
      const interval = setInterval(() => {
        const newTime = Math.ceil(time - new Date().getTime() / 60000);
        setTimer(newTime);
        if (newTime <= 0) onFinish();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [setTimer, time, isTimerActive, onFinish]);

  // useEffect(() => {
  //   if (isTimerActive) {
  //     const interval = setInterval(() => {
  //       setTimer(prevState => {
  //         const newState = prevState - 1000;
  //         if (newState <= 0) onFinish();

  //         return newState;
  //       });
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [timer, setTimer, isTimerActive, onFinish]);

  // saveHabitTimer only accepts minutes
  const saveTimer = () => dispatch(saveHabitTimer(params.habitId, +timer));

  const toggleTimer = () => {
    setIsTimerActive(prevState => !prevState);
    setTime((new Date().getTime() + +timer * 60000) / 60000);
    saveTimer();
  };

  // const resetTimer = () => {};

  // const timerFormat = (): string => {
  //   const seconds = Math.floor(timer / 1000) % 60;
  //   const minutes = Math.floor(timer / 60000) % 60;
  //   const hours = Math.floor(timer / 3600000);
  //   return `${hours < 10 ? '0' + hours : hours}:${
  //     minutes < 10 ? '0' + minutes : minutes
  //   }:${seconds < 10 ? '0' + seconds : seconds}`;
  // };

  const saveTimerAndLeave = () => {
    setIsTimerActive(false);
    saveTimer();
    props.navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <Header
        headerLeft={{
          type: 'AntDesign',
          name: 'arrowleft',
          onPress: saveTimerAndLeave,
        }}
      >
        Timer
      </Header>
      <View style={styles.timerContainer}>
        <Text.H1 style={styles.timer}>{`${timer} Minutes`}</Text.H1>
      </View>
      <View style={styles.todos}>
        {todos &&
          todos.map((todo, index) => (
            <View style={styles.todo} key={todo.id}>
              <CheckBox
                value={todo.completed}
                onCheck={value =>
                  dispatch(completeHabitTodo(params.habitId, index, value))
                }
              />
              <Text.H4 style={styles.todoText}>{todo.value}</Text.H4>
            </View>
          ))}
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={onFinish}
          style={styles.button}
          icon={{ type: 'Ionicons', name: 'ios-checkmark', size: 24 }}
          disabled={todos?.every(t => t.completed) ? false : true}
        >
          Complete
        </Button>
        <Button
          onPress={toggleTimer}
          // style={styles.button}
          type='colorful'
          // icon={{ type: 'AntDesign', name: 'arrowright', size: 16 }}
        >
          {isTimerActive ? 'Stop' : 'Start'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.accent1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  timer: {
    color: 'white',
    fontSize: 70,
  },
  todos: {
    // marginHorizontal: 30,
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
    // flex: 1,
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  todoText: {
    marginLeft: 8,
    flex: 1,
  },
  button: {
    marginBottom: 24,
  },
  buttons: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
});

export default TimerScreen;
