import React from 'react';
import { View, StyleSheet } from 'react-native';
import CheckBox from './CheckBox';
import { TodoInterface } from '../../types';
import * as Text from './Text';

interface Props extends TodoInterface {
  toggleComplete: (value: boolean) => {};
}

const Todo: React.FC<Props> = props => {
  return (
    <View style={styles.todo}>
      <CheckBox
        value={props.completed}
        onCheck={value => props.toggleComplete(value)}
      />
      <Text.Body1 style={styles.todoText}>{props.value}</Text.Body1>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  todoText: {
    marginLeft: 8,
    flex: 1,
  },
});

export default Todo;
