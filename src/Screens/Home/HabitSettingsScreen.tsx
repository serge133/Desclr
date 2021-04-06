import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as Text from '../../components/UI/Text';
import Header from '../../components/UI/Header';
import Button from '../../components/UI/Button';
import { useDispatch } from 'react-redux';
import { archiveHabit, deleteHabit } from '../../store/actions/habit';

interface Props {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
  route: {
    params: {
      habitId: string;
      habitName: string;
    };
  };
}

const HabitSettingsScreen: React.FC<Props> = props => {
  // * User can close the app and the timer will function because of absolute values
  // Set absolute date when timer will expire by adding todays date in targetTime (milliseconds)

  const dispatch = useDispatch();

  const handleDeleteHabit = () => {
    const deleteAndGoHome = () => {
      dispatch(deleteHabit(props.route.params.habitId));
      props.navigation.navigate('HomeScreen');
    };
    Alert.alert(
      'Deleting Habit!',
      `Are you sure you want to delete ${props.route.params.habitName}. This action is irreversible`,
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Yes',
          onPress: deleteAndGoHome,
          style: 'default',
        },
      ]
    );
  };

  const handleArchiveHabit = () => {
    dispatch(archiveHabit(props.route.params.habitId));
    props.navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.screen}>
      <Header
        headerLeft={{
          type: 'AntDesign',
          name: 'arrowleft',
          onPress: props.navigation.goBack,
        }}
      >
        Habit
      </Header>
      <View style={styles.content}>
        <Text.H1>{`Settings for ${props.route.params.habitName}`}</Text.H1>
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={handleDeleteHabit}>
          Delete Habit
        </Button>
        <Button
          style={styles.button}
          onPress={handleArchiveHabit}
          type='colorful'
        >
          Archive Habit
        </Button>
      </View>
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

export default HabitSettingsScreen;
