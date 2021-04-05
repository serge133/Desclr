import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Header from '../../../components/UI/Header';
import CustomInput from '../../../components/UI/Input';
import Form from '../../../components/UI/Form';
import Textarea from '../../../components/UI/Textarea';
import CustomSlider from '../../../components/UI/Slider';
import CheckBox from '../../../components/UI/CheckBox';
import { Colors, defaultStyles } from '../../../constants/default-styles';
import { useDispatch } from 'react-redux';
import { addHabit } from '../../../store/actions/habit';
import * as Text from '../../../components/UI/Text';
import Dropdown from '../../../components/UI/Dropdown';
import { HabitTypes } from '../../../types';
import BoxButton from '../../../components/UI/FlexButton';

interface Props {
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => {};
  };
}
const dropdownIndexHabitTypes: HabitTypes[] = [
  'Default',
  'Exercise',
  'Knowledge',
];

const AddingScreen: React.FC<Props> = props => {
  // const dispatch = useDispatch();

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
      <View style={styles.grid}>
        <BoxButton
          backgroundColor={Colors.primary1}
          iconName='dingding'
          iconType='AntDesign'
          onPress={() => props.navigation.navigate('AddingHabitScreen')}
        >
          Habit
        </BoxButton>
        <BoxButton
          backgroundColor={Colors.semanticBlue1}
          iconName='alarm-outline'
          iconType='Ionicons'
          onPress={() => console.log('Going to Adding Reminder Screen')}
        >
          Reminder
        </BoxButton>
        <BoxButton
          backgroundColor={Colors.grey1}
          iconName='flag-o'
          iconType='FontAwesome'
          onPress={() => {}}
        >
          Goal
        </BoxButton>
        <BoxButton
          backgroundColor={Colors.accent1}
          iconName='setting'
          iconType='AntDesign'
          onPress={() => {}}
        >
          Custom
        </BoxButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  grid: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 30,
    justifyContent: 'space-between',
  },
});

export default AddingScreen;
