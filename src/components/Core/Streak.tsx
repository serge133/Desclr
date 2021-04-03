import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/default-styles';
import * as Text from '../UI/Text';
import { HabitTypes } from '../../types';

interface Props {
  onPress: () => void;
  value: string;
  streak: number;
  type: 'active' | 'inactive';
  habitType: HabitTypes;
}

const Streak = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.streakContainer}>
        <View style={styles.streakName}>
          <Text.H3>{props.value}</Text.H3>
        </View>
        <View style={styles.streakNumber}>
          <Text.Body1 style={styles.streakNumberText}>
            {props.streak.toString()}
          </Text.Body1>
        </View>
        <View style={styles.habitType}>
          <Text.Body1 style={styles.habitTypeText}>
            {props.habitType}
          </Text.Body1>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  streakContainer: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomColor: Colors.primary1,
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  streakName: {
    flex: 1,
  },
  habitType: {
    borderColor: Colors.primary1,
    borderWidth: 0.5,
    borderRadius: 4,
    padding: 3,
  },
  habitTypeText: {
    color: Colors.primary1,
  },
  streakNumber: {
    padding: 3,
    borderRadius: 4,
    borderColor: Colors.primary1,
    borderWidth: 0.5,
    marginRight: 3,
  },
  streakNumberText: {
    color: Colors.primary1,
  },
});

export default Streak;
