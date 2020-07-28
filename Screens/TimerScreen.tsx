import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/UI/Header';
import Button from '../components/UI/Button';
import { Colors } from '../constants/default-styles';
import * as Text from '../components/UI/Text';
import { completeHabit, saveHabitTimer } from '../store/actions/habit';
import { useDispatch } from 'react-redux';

interface Props {
  navigation: {
    goBack: Function;
  };
  route: {
    params: {
      milliseconds: number;
      habitId: string;
    };
  };
}

// ! Must have functionality to save timer if stopped

const TimerScreen: React.FC<Props> = props => {
  // * TIMER IS IN MILLISECONDS
  const [timer, setTimer] = useState(props.route.params.milliseconds);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const dispatch = useDispatch();

  const onTimerEnd = useCallback(() => {
    setIsTimerActive(false);
    dispatch(completeHabit(props.route.params.habitId));
    props.navigation.goBack();
  }, []);

  useEffect(() => {
    if (isTimerActive) {
      const interval = setInterval(() => {
        setTimer(prevState => {
          const newState = prevState - 1000;
          if (newState <= 0) onTimerEnd();

          return newState;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, setTimer, isTimerActive, onTimerEnd]);

  // * saveHabitTimer only accepts minutes
  const saveTimer = () =>
    dispatch(saveHabitTimer(props.route.params.habitId, timer / 60000));

  const toggleTimer = () => {
    setIsTimerActive(prevState => !prevState);
    saveTimer();
  };

  // const resetTimer = () => {};

  const timerFormat = (): string => {
    const seconds = Math.floor(timer / 1000) % 60;
    const minutes = Math.floor(timer / 60000) % 60;
    const hours = Math.floor(timer / 3600000);
    return `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }:${seconds < 10 ? '0' + seconds : seconds}`;
  };

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
      <Text.H1 style={styles.timer}>{timerFormat()}</Text.H1>
      <View style={styles.buttons}>
        {/* <Button
          onPress={() => {}}
          style={styles.button}
          icon={{ type: 'AntDesign', name: 'arrowright', size: 16 }}
        >
          Test
        </Button> */}
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
  timer: {
    color: 'white',
    fontSize: 70,
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
