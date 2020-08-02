import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/UI/Header';
import Button from '../components/UI/Button';
import { Colors } from '../constants/default-styles';
import * as Text from '../components/UI/Text';
import {
  completeHabitTodo,
  saveHabitTimer,
} from '../store/actions/habit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import Breath from '../Animations/Breath';
import Todo from '../components/UI/Todo';

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
 * This timer doesnt just increment a value every second or minute
 * this timer uses absolute values (exact dates in ms) and then updates every five seconds checking those values
 * every five second update triggers a math equation in which todays date subtracted by the minutes passed already (doesn't change)
 * is subtracted by todays date that updates every five seconds (does change)
 * the result is a value in which even if you leave the app will be exact
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
  const [isTimerAboveMax, setIsTimerAboveMax] = useState(false);

  const todos = useSelector(
    (state: RootState) =>
      state.habit.habits.find(h => h.id === params.habitId)?.todos
  );
  const dispatch = useDispatch();

  // saveHabitTimer only accepts maxMinutes
  const saveTimer = () => dispatch(saveHabitTimer(params.habitId, +timer));

  const toggleTimer = () => {
    setIsTimerActive(prevState => !prevState);
    setTimeStarted(new Date().getTime() - +timer * 60000);
    saveTimer();
  };

  const saveTimerAndLeave = () => {
    setIsTimerActive(false);
    saveTimer();
    props.navigation.goBack();
  };

  const onTimerReachMax = useCallback(() => {
    // setIsTimerActive(false);
    // Stops the timer
    toggleTimer();
    setIsTimerAboveMax(true);
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
        if (newTime >= maxMinutes && !isTimerAboveMax) onTimerReachMax();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [setTimer, timeStarted, isTimerActive, onTimerReachMax, maxMinutes, isTimerAboveMax]);

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
        <Text.H1 style={isTimerAboveMax ? styles.minutesReachedMax : styles.minutes}>{timer.toString()}</Text.H1>
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
            <Todo
              key={todo.id}
              id={todo.id}
              value={todo.value}
              completed={todo.completed}
              toggleComplete={value => dispatch(completeHabitTodo(params.habitId, index, value))}
            />
          ))}
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={onTimerReachMax}
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
          {isTimerActive ? 'Stop' : isTimerAboveMax ? 'Continue?' : 'Start'}
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
  minutes: {
    fontSize: 60,
    color: 'white',
  },
  minutesReachedMax: {
    fontSize: 60,
    color: "#FF6961"
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
  // todo: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginTop: 14,
  // },
  // todoText: {
  //   marginLeft: 8,
  //   flex: 1,
  // },
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
