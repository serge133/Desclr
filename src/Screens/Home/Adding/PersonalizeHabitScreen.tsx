import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../../../components/UI/Button';
import CheckBox from '../../../components/UI/CheckBox';
import Header from '../../../components/UI/Header';

import * as Text from '../../../components/UI/Text';
import Todo from '../../../components/UI/Todo';

interface Props {
  navigation: {
    goBack: () => void;
    navigate: (
      screen: string,
      params: {
        timer: boolean;
        checklist: boolean;
      }
    ) => void;
  };
}

const PersonalizeHabitScreen: React.FC<Props> = props => {
  const [habitPersonalization, setHabitPersonalization] = useState({
    timer: false,
    checklist: false,
  });

  const onCheck = (value: boolean, which: 'timer' | 'checklist') => {
    setHabitPersonalization(prevState => ({
      ...prevState,
      [which]: value,
    }));
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
        Desclr
      </Header>
      <View style={styles.content}>
        <Text.H3>Personalize Your Habits</Text.H3>

        {/* <CheckBox onCheck={() => {}} value={false} /> */}
        <View style={styles.choice}>
          <Todo
            toggleComplete={value => onCheck(value, 'timer')}
            id='dfad'
            value='Timer'
            textStyle={{
              fontFamily: 'montserrat-bold',
              fontSize: 16,
            }}
            completed={habitPersonalization.timer}
          />
          <Text.Body1 style={styles.description}>
            With a timer you can specify the amount of minutes you need to
            accomplish the habit. Example, if you set the timer to be 20 minutes
            then you can not complete the habit unless the required time has
            elapsed.
          </Text.Body1>
        </View>
        <View style={styles.choice}>
          <Todo
            toggleComplete={value => onCheck(value, 'checklist')}
            id='a'
            value='Checklist'
            textStyle={{
              fontFamily: 'montserrat-bold',
              fontSize: 16,
            }}
            completed={habitPersonalization.checklist}
          />
          <Text.Body1 style={styles.description}>
            With a checklist, the habit will need to have a todo list. To
            accomplish the habit you need to complete how many tasks you have
            off your list. Example, shopping requires a todo list in order to
            accomplish.
          </Text.Body1>
        </View>
      </View>
      <Button
        type='colorful'
        onPress={() =>
          props.navigation.navigate('AddingHabitScreen', habitPersonalization)
        }
        style={styles.button}
      >
        Start
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  choice: {
    marginTop: 24,
  },
  description: {
    marginTop: 24,
  },
  button: {
    marginBottom: 40,
  },
});

export default PersonalizeHabitScreen;
