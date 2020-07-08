import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { HabitInterface } from '../types';
import { Colors } from '../constants/default-styles';
import * as Text from './Text';
import CheckBox from './CheckBox';
import RenderIcon from './RenderIcon';
import { useDispatch } from 'react-redux';
import { completeHabitTodo } from '../store/actions/habit';
import Button, { Button as ButtonInterface } from './Button';
// import Fade from '../Animations/Fade';

interface HabitProps extends HabitInterface {
  onEdit: () => void;
  deletionBarProgress: number;
  completedTodosButtons?: ButtonInterface[];
  inactiveHabitButtons?: ButtonInterface[];
}

interface HabitHiddenRowButtonProps {}

export const HabitHiddenRowButtons: React.FC<HabitHiddenRowButtonProps> = props => (
  <View style={styles.rowBack}>
    <TouchableOpacity style={styles.rowBackButtonContainer}>
      <View style={styles.rowBackButton}>
        <RenderIcon
          type='Ionicons'
          name='ios-checkmark'
          size={50}
          color='white'
        />
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.rowBackButtonContainer}>
      <View style={styles.rowBackButton}>
        <RenderIcon
          type='AntDesign'
          name='closecircleo'
          size={50}
          color='white'
        />
      </View>
    </TouchableOpacity>
  </View>
);

const Habit: React.FC<HabitProps> = props => {
  const dispatch = useDispatch();

  return (
    <View style={styles.habitContainer}>
      <View
        style={{
          ...styles.habit,
          borderColor: props.isActive
            ? Colors.primary1
            : Colors.semanticYellow1,
        }}
      >
        <View style={styles.habitHeader}>
          <Text.H3 style={styles.habitTitle}>{props.value}</Text.H3>
          {props.isActive && (
            <TouchableOpacity onPress={props.onEdit}>
              <View style={styles.editButton}>
                <RenderIcon
                  type='Entypo'
                  name='edit'
                  color={Colors.primary1}
                  size={30}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Text.Body3 style={styles.description}>{props.description}</Text.Body3>
        {props.todos.map((todo, index) => (
          <View style={styles.todo} key={todo.id}>
            <CheckBox
              value={todo.completed}
              onCheck={value =>
                dispatch(completeHabitTodo(props.id, index, value))
              }
            />
            <Text.Body1 style={styles.todoText}>{todo.value}</Text.Body1>
          </View>
        ))}
        {props.todos.every(todo => todo.completed) && (
          <View style={styles.buttonContainer}>
            {props.completedTodosButtons &&
              props.completedTodosButtons.map(btn => (
                <Button
                  key={btn.name}
                  onPress={btn.onPress}
                  type={btn.type}
                  icon={btn.icon}
                  style={styles.button}
                >
                  {btn.name}
                </Button>
              ))}
          </View>
        )}
        {!props.isActive && (
          <View style={styles.buttonContainer}>
            {props.inactiveHabitButtons &&
              props.inactiveHabitButtons.map(btn => (
                <Button
                  key={btn.name}
                  onPress={btn.onPress}
                  type={btn.type}
                  icon={btn.icon}
                  style={styles.button}
                >
                  {btn.name}
                </Button>
              ))}
          </View>
        )}
        <View style={styles.expirationBar}>
          <View
            style={{
              ...styles.progress,
              width:
                props.deletionBarProgress >= 100
                  ? '100%'
                  : `${props.deletionBarProgress}%`,
              backgroundColor: props.isActive
                ? Colors.primary1
                : Colors.semanticYellow1,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  habitContainer: {
    width: '100%',
    alignItems: 'center',
    // marginBottom: 24,
    paddingBottom: 24,
  },
  habit: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    // ...Shadow,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  habitTitle: {
    flex: 1,
  },
  editButton: {
    height: 30,
    width: 100,
    alignItems: 'flex-end',
  },
  description: {
    marginTop: 10,
  },
  todo: {
    flexDirection: 'row',
    marginTop: 14,
  },
  todoText: {
    marginLeft: 8,
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginTop: 24,
  },
  expirationBar: {
    width: '100%',
    height: 5,
    backgroundColor: Colors.primary4,
    marginTop: 24,
    borderRadius: 20,
  },
  progress: {
    borderRadius: 20,
    height: 5,
    backgroundColor: Colors.primary1,
  },
  rowBack: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    flex: 1,
  },
  rowBackButtonContainer: {
    height: '100%',
    width: 90,
    paddingBottom: 24,
  },
  rowBackButton: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary1,
  },
  rowBackRight: {},
  rowBackLeft: {},
});

export default Habit;
