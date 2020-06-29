import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { HabitInterface } from '../types';
import { Shadow, Colors } from '../constants/default-styles';
import * as Text from './Text';
import CheckBox from './CheckBox';
import RenderIcon from './RenderIcon';
import { useDispatch } from 'react-redux';
import {
  completeHabitTodo,
  completeHabit,
  repostHabit,
  deleteHabit,
} from '../store/actions/habit';
import Button from './Button';
import Fade from '../Animations/Fade';

interface Props extends HabitInterface {
  onEdit: () => void;
  deletionBarProgress: number;
}

const Habit: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.habitContainer}>
      <View style={styles.habit}>
        <Fade fadeType='in' duration={1000}>
          <View style={styles.habitHeader}>
            <Text.H3 style={styles.habitTitle}>{props.value}</Text.H3>
            <TouchableOpacity onPress={props.onEdit}>
              <View style={styles.editButton}>
                <RenderIcon
                  type='Entypo'
                  name='edit'
                  color={Colors.primary1}
                  size={23}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Text.Body3 style={styles.description}>
            {props.description}
          </Text.Body3>
          {props.todos.map((todo, index) => (
            <View style={styles.todo} key={todo.id}>
              <CheckBox
                value={todo.completed}
                onCheck={(value) =>
                  dispatch(completeHabitTodo(props.id, index, value))
                }
              />
              <Text.Body1 style={styles.todoText}>{todo.value}</Text.Body1>
            </View>
          ))}
          {props.todos.every((todo) => todo.completed) && props.isActive && (
            <View style={styles.buttonContainer}>
              <Button
                onPress={() =>
                  dispatch(
                    completeHabit(
                      props.id,
                      props.streak,
                      props.interval,
                      props.todos
                    )
                  )
                }
                type='colorful'
                icon={{
                  type: 'Ionicons',
                  name: 'ios-checkmark',
                  size: 30,
                }}
              >
                Complete
              </Button>
            </View>
          )}
          {!props.isActive && (
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => dispatch(repostHabit(props.id, props.interval))}
                type='colorful'
                icon={{
                  type: 'EvilIcons',
                  name: 'refresh',
                  size: 30,
                }}
              >
                Repost
              </Button>
              <Button
                onPress={() => dispatch(deleteHabit(props.id))}
                icon={{
                  type: 'AntDesign',
                  name: 'delete',
                  size: 30,
                }}
                style={{ marginTop: 24 }}
              >
                Delete
              </Button>
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
        </Fade>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  habitContainer: {
    width: '100%',
    alignItems: 'center',
    // marginBottom: 24,
    paddingVertical: 12,
  },
  habit: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    ...Shadow,
    padding: 10,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  habitTitle: {
    flex: 1,
  },
  editButton: {
    height: 23,
    width: 23,
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
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
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
});

export default Habit;
