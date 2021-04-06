import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import * as Text from '../../components/UI/Text';
import Header from '../../components/UI/Header';
import Button from '../../components/UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { HabitInterface } from '../../types';
import {
  completeHabit,
  completeHabitTodo,
  saveHabitTimer,
} from '../../store/actions/habit';
import Todo from '../../components/UI/Todo';
import { RootState } from '../../store/types';
import { Colors } from '../../constants/default-styles';
import Breath from '../../Animations/Breath';

interface Props {
  navigation: {
    navigate: (
      screen: string,
      params: {
        habitId: string;
        habitName: string | undefined;
      }
    ) => void;
    goBack: () => void;
  };
  route: {
    params: {
      habitId: string;
    };
  };
}

let error: HabitInterface = {
  value: '',
  description: 'Error Parsing',
  expirationDate: '',
  interval: 0,
  checklist: false,
  timer: false,
  maxMinutes: 0,
  minutesPassed: 0,
  id: '',
  isActive: true,
  streak: 0,
  todos: [],
  trends: { minutesNeeded: [0] },
  type: 'Default',
};

const ViewHabitScreen: React.FC<Props> = props => {
  // * User can close the app and the timer will function because of absolute values
  // Set absolute date when timer will expire by adding todays date in maxMinutes (milliseconds)

  const dispatch = useDispatch();

  const habits = useSelector((state: RootState) => state.habit.habits);
  let habit = habits.find(h => h.id === props.route.params.habitId);

  if (!habit) habit = error;

  const [timeStarted, setTimeStarted] = useState(
    new Date().getTime() - habit.minutesPassed * 60000
  );
  // Timer is in minutes
  const [timer, setTimer] = useState(habit.minutesPassed);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerAboveMax, setIsTimerAboveMax] = useState(false);

  // saveHabitTimer only accepts maxMinutes
  const saveTimer = () =>
    dispatch(saveHabitTimer(props.route.params.habitId, +timer));

  const toggleTimer = () => {
    setIsTimerActive(prevState => !prevState);
    // This is meant to stop the timer and remember where it stopped
    setTimeStarted(new Date().getTime() - +timer * 60000);
    saveTimer();
  };

  const saveTimerAndLeave = () => {
    setIsTimerActive(false);
    saveTimer();
    props.navigation.goBack();
  };

  const completeHabitAndResetTimer = () => {
    setIsTimerActive(false);
    saveTimer();
    setTimer(0);
    dispatch(completeHabit(props.route.params.habitId));
    props.navigation.goBack();
  };

  //// const { todos } = habit;

  const onTimerReachMax = useCallback(() => {
    // Stops the timer
    toggleTimer();
    setIsTimerAboveMax(true);
  }, []); // todos
  // * Math.floor rounds down e.g. 4.99 will be 4
  const { maxMinutes } = habit;
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
  }, [
    setTimer,
    timeStarted,
    isTimerActive,
    onTimerReachMax,
    maxMinutes,
    isTimerAboveMax,
  ]);

  const onComplete = () => {
    dispatch(completeHabit(props.route.params.habitId));
    props.navigation.goBack();
  };

  let completeType = `checklist: ${habit.checklist} timer: ${habit.timer}`;

  let CompleteControl;

  switch (completeType) {
    // ? No checklist and timer; default
    case 'checklist: false timer: false':
      CompleteControl = (
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={onComplete} type='colorful'>
            Complete
          </Button>
        </View>
      );
      break;
    // ? No timer but there's a checklist
    case 'checklist: true timer: false':
      CompleteControl = (
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={onComplete}
            disabled={!habit.todos.every(t => t.completed)}
            type='colorful'
          >
            {`Complete ${habit.todos.filter(t => t.completed).length}/${
              habit.todos.length
            }`}
          </Button>
        </View>
      );
      break;
    // ? No checklist but there's a timer
    case 'checklist: false timer: true':
      CompleteControl = (
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={toggleTimer}>
            {`${isTimerActive ? 'Stop' : 'Start'} Timer`}
          </Button>
          <Button
            style={styles.button}
            onPress={completeHabitAndResetTimer}
            type='colorful'
          >
            {`Complete ${timer}/${habit.maxMinutes} minutes`}
          </Button>
        </View>
      );
      break;
    // ? Both checklist and timer
    case 'checklist: true timer: true':
      CompleteControl = (
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={toggleTimer}>
            {`${isTimerActive ? 'Stop' : 'Start'} Timer`}
          </Button>
          <Button
            style={styles.button}
            onPress={onComplete}
            disabled={!habit.todos.every(t => t.completed)}
            type='colorful'
          >
            {`Complete ${habit.todos.filter(t => t.completed).length}/${
              habit.todos.length
            } and ${timer}/${habit.maxMinutes} minutes`}
          </Button>
        </View>
      );
      break;
    // ? Should never reach this
    default:
      CompleteControl = <Text.Error>Something Went Wrong</Text.Error>;
  }

  return (
    <View style={styles.screen}>
      <Header
        headerLeft={{
          type: 'AntDesign',
          name: 'arrowleft',
          onPress: saveTimerAndLeave,
        }}
        headerRight={{
          type: 'AntDesign',
          name: 'setting',
          onPress: () =>
            props.navigation.navigate('HabitSettingsScreen', {
              habitId: props.route.params.habitId,
              habitName: habit?.value,
            }),
        }}
      >
        Habit
      </Header>
      <ScrollView style={styles.content}>
        <Text.H1>{habit.value}</Text.H1>
        <Text.Body1>{habit.description}</Text.Body1>
        {habit.timer && (
          <View
            style={{
              ...styles.timer,
              borderColor: !isTimerActive ? Colors.primary4 : Colors.primary1,
            }}
          >
            {isTimerActive ? (
              <Breath durationFadeIn={1000} durationFadeOut={1000}>
                <Text.H2>{`${timer} Minutes`}</Text.H2>
              </Breath>
            ) : (
              <Text.H2>{`${timer} Minutes`}</Text.H2>
            )}
          </View>
        )}
        {habit.checklist &&
          habit.todos.map((todo, index) => (
            <Todo
              key={todo.id}
              id={todo.id}
              completed={todo.completed}
              toggleComplete={value =>
                dispatch(
                  completeHabitTodo(props.route.params.habitId, index, value)
                )
              }
              value={todo.value}
            />
          ))}
      </ScrollView>
      {CompleteControl}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 30,
  },
  timer: {
    marginBottom: 10,
    width: '100%',
    borderWidth: 3,
    borderRadius: 10,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 6,
  },
  button: {
    marginBottom: 24,
  },
});

export default ViewHabitScreen;
