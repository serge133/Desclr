import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { HabitInterface, CompleteTypes } from '../../types';
import { Colors } from '../../constants/default-styles';
import * as Text from '../UI/Text';
import RenderIcon from '../UI/RenderIcon';
import { useDispatch } from 'react-redux';
import { completeHabitTodo } from '../../store/actions/habit';
import Todo from '../UI/Todo';

interface HabitProps extends HabitInterface {
  onEdit: () => void;
  deletionBarProgress: number;
}

interface HabitHiddenRowButtonProps {
  canComplete: boolean;
  onComplete: (event: GestureResponderEvent) => void;
  onArchive: (event: GestureResponderEvent) => void;
  fractionCompleted: string;
  completeType: CompleteTypes;
  activateTimer: Function;
}

interface ArchivedHabitHiddenRowButtonsProps {
  onDelete: (event: GestureResponderEvent) => void;
  onRepost: (event: GestureResponderEvent) => void;
}

export const HabitHiddenRowButtons: React.FC<HabitHiddenRowButtonProps> = props => {
  let LeftRowButton: React.ReactNode;

  switch (props.completeType) {
    case 'Timer':
      LeftRowButton = (
        <TouchableOpacity
          style={styles.rowBackButtonContainer}
          // @ts-ignore
          onPress={props.activateTimer}
        >
          <View style={styles.rowBackButton}>
            <RenderIcon
              type='Ionicons'
              name='ios-timer'
              size={50}
              color={Colors.primary1}
            />
          </View>
        </TouchableOpacity>
      );
      break;
    default:
      LeftRowButton = (
        <TouchableOpacity
          style={styles.rowBackButtonContainer}
          disabled={!props.canComplete}
          onPress={props.onComplete}
        >
          <View style={styles.rowBackButton}>
            <RenderIcon
              type='Ionicons'
              name='ios-checkmark'
              size={50}
              color={props.canComplete ? Colors.primary1 : Colors.grey3}
            />
            {!props.canComplete && <Text.H3>{props.fractionCompleted}</Text.H3>}
          </View>
        </TouchableOpacity>
      );
      break;
  }

  return (
    <View style={styles.rowBack}>
      {LeftRowButton}
      <TouchableOpacity
        style={styles.rowBackButtonContainer}
        onPress={props.onArchive}
      >
        <View style={styles.rowBackButton}>
          <RenderIcon
            type='EvilIcons'
            name='archive'
            size={50}
            color={Colors.primary1}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const ArchivedHabitHiddenRowButtons: React.FC<ArchivedHabitHiddenRowButtonsProps> = props => (
  <View style={styles.rowBack}>
    <TouchableOpacity
      style={styles.rowBackButtonContainer}
      onPress={props.onRepost}
    >
      <View style={styles.rowBackButton}>
        <RenderIcon
          type='EvilIcons'
          name='refresh'
          size={70}
          color={Colors.accent1}
        />
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.rowBackButtonContainer}
      onPress={props.onDelete}
    >
      <View style={styles.rowBackButton}>
        <RenderIcon
          type='AntDesign'
          name='delete'
          size={50}
          color={Colors.accent1}
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
          borderColor: props.isActive ? Colors.primary1 : Colors.accent1,
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
        <Text.Body1>{props.type}</Text.Body1>
        <Text.Body3 style={styles.description}>{props.description}</Text.Body3>
        {props.todos.map((todo, index) => (
          <Todo
            key={todo.id}
            id={todo.id}
            value={todo.value}
            completed={todo.completed}
            toggleComplete={value =>
              dispatch(completeHabitTodo(props.id, index, value))
            }
          />
        ))}
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
                : Colors.accent1,
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
    alignItems: 'center',
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
    backgroundColor: 'white',
  },
});

export default Habit;
