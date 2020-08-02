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
import Breath from '../Animations/Breath';

interface Props {
  navigation: {
    goBack: Function;
  };
  route: {
    params: {
      minutesPassed: number;
      maxMinutes: number;
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

// Increments up (Stopwatch)

const TimerScreen: React.FC<Props> = props => {
  // * User can close the app and the timer will function because of absolute values
  const { params } = props.route;
  // Set absolute date when timer will expire by adding todays date in maxMinutes (milliseconds)
  const [timeStarted, setTimeStarted] = useState(
    new Date().getTime() - params.minutesPassed * 60000
  );
  // Timer is in minutes
  const [timer, setTimer] = useState(params.minutesPassed);
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
      Alert.alert(
        'Not Finish Habit',
        'You hit your maximum time limit and did not complete your habit',
        [
          {
            text: 'Go Back',
            style: 'default',
            onPress: () => props.navigation.goBack(),
          },
        ]
      );
    }
  }, [todos]);
  // * Math.floor rounds down e.g. 4.99 will be 4
  const { maxMinutes } = params;
  useEffect(() => {
    if (isTimerActive) {
      // Every five seconds the timer will update
      const interval = setInterval(() => {
        const newTime = Math.floor(
          (new Date().getTime() - timeStarted) / 60000
        );
        setTimer(newTime);
        if (newTime >= maxMinutes) onFinish();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [setTimer, timeStarted, isTimerActive, onFinish, maxMinutes]);

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

  // saveHabitTimer only accepts maxMinutes
  const saveTimer = () => dispatch(saveHabitTimer(params.habitId, +timer));

  const toggleTimer = () => {
    setIsTimerActive(prevState => !prevState);
    setTimeStarted(new Date().getTime() - +timer * 60000);
    saveTimer();
  };

  // const resetTimer = () => {};

  // const timerFormat = (): string => {
  //   const seconds = Math.floor(timer / 1000) % 60;
  //   const maxMinutes = Math.floor(timer / 60000) % 60;
  //   const hours = Math.floor(timer / 3600000);
  //   return `${hours < 10 ? '0' + hours : hours}:${
  //     maxMinutes < 10 ? '0' + maxMinutes : maxMinutes
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
        <Text.H1 style={styles.maxMinutes}>{timer.toString()}</Text.H1>
        {isTimerActive ? (
          <Breath durationFadeIn={1000} durationFadeOut={1000}>
            <Text.H3 style={styles.minutesLabel}>Minutes</Text.H3>
          </Breath>
        ) : (
          <Text.H3 style={styles.minutesLabel}>Minutes</Text.H3>
        )}
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maxMinutes: {
    fontSize: 60,
    color: 'white',
  },
  minutesLabel: {
    color: 'white',
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
