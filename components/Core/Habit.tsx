import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { HabitInterface } from '../../types';
import { Colors } from '../../constants/default-styles';
import * as Text from '../UI/Text';
import CheckBox from '../UI/CheckBox';
import RenderIcon from '../UI/RenderIcon';
import { useDispatch } from 'react-redux';
import { completeHabitTodo } from '../../store/actions/habit';
// import Fade from '../Animations/Fade';

interface HabitProps extends HabitInterface {
  onEdit: () => void;
  deletionBarProgress: number;
}

interface HabitHiddenRowButtonProps {
  canComplete: boolean;
  onComplete: (event: GestureResponderEvent) => void;
  onArchive: (event: GestureResponderEvent) => void;
  fractionCompleted: string;
}

interface ArchivedHabitHiddenRowButtonsProps {
  onDelete: (event: GestureResponderEvent) => void;
  onRepost: (event: GestureResponderEvent) => void;
}

export const HabitHiddenRowButtons: React.FC<HabitHiddenRowButtonProps> = props => (
  <View style={styles.rowBack}>
    <TouchableOpacity
      style={styles.rowBackButtonContainer}
      disabled={!props.canComplete}
      onPress={props.onComplete}
    >
      <View
        style={[
          styles.rowBackButton,
          props.canComplete
            ? { backgroundColor: Colors.primary1 }
            : { backgroundColor: Colors.grey4 },
        ]}
      >
        <RenderIcon
          type='Ionicons'
          name='ios-checkmark'
          size={50}
          color='white'
        />
        {!props.canComplete && <Text.H3>{props.fractionCompleted}</Text.H3>}
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.rowBackButtonContainer}
      onPress={props.onArchive}
    >
      <View
        style={[
          styles.rowBackButton,
          { backgroundColor: Colors.primary1, borderRadius: 20 },
        ]}
      >
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

export const ArchivedHabitHiddenRowButtons: React.FC<ArchivedHabitHiddenRowButtonsProps> = props => (
  <View style={styles.rowBack}>
    <TouchableOpacity
      style={styles.rowBackButtonContainer}
      onPress={props.onRepost}
    >
      <View style={[styles.rowBackButton, { backgroundColor: Colors.accent1 }]}>
        <RenderIcon type='EvilIcons' name='refresh' size={70} color='white' />
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.rowBackButtonContainer}
      onPress={props.onDelete}
    >
      <View style={[styles.rowBackButton, { backgroundColor: Colors.accent1 }]}>
        <RenderIcon type='AntDesign' name='delete' size={50} color='white' />
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
  },
});

export default Habit;
