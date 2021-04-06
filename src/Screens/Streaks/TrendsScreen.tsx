import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/UI/Header';
import { DrawerActionType } from '@react-navigation/native';
import BarGraph from '../../components/UI/BarGraph';
import Dropdown from '../../components/UI/Dropdown';
import { HabitInterface } from '../../types';

interface Props {
  navigation: {
    dispatch: (action: DrawerActionType) => void;
    goBack: () => void;
  };
  route: {
    params: {
      habit: HabitInterface;
    };
  };
}

const DashboardScreen: React.FC<Props> = props => {
  const { trends, targetTime } = props.route.params.habit;

  const dropdownEntries = [
    { index: 0, label: 'Minutes Passed', extra: 'minutesPassed' },
    { index: 1, label: 'Procrastination', extra: 'n/a' },
  ];

  return (
    <View style={styles.screen}>
      <Header
        headerLeft={{
          type: 'AntDesign',
          name: 'arrowleft',
          onPress: () => props.navigation.goBack(),
        }}
      >
        Trends
      </Header>
      <View style={styles.content}>
        <BarGraph data={trends.minutesNeeded} maximum={targetTime} />
        <Dropdown
          chosenEntry='Minutes Passed'
          entries={dropdownEntries}
          onEntryPress={index => {
            console.log(dropdownEntries[index]);
          }}
        />
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
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 8,
  },
});

export default DashboardScreen;
