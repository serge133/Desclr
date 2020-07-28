import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Header from '../../components/UI/Header';
import CustomInput from '../../components/UI/Input';
import Form from '../../components/UI/Form';
import Textarea from '../../components/UI/Textarea';
import CustomSlider from '../../components/UI/Slider';
import CheckBox from '../../components/UI/CheckBox';
import { defaultStyles } from '../../constants/default-styles';
import { useDispatch } from 'react-redux';
import { editHabit, archiveHabit } from '../../store/actions/habit';
import { TodoInterface, HabitTypes } from '../../types';
import Button from '../../components/UI/Button';
import Dropdown from '../../components/UI/Dropdown';

interface Props {
  navigation: {
    goBack: Function;
  };
  route: {
    params: {
      habit: {
        id: string;
        value: string;
        type: HabitTypes;
        description: string;
        exerciseMinutes: number;
        interval: number;
        todos: TodoInterface[];
      };
    };
  };
}

const EditingHabitScreen: React.FC<Props> = props => {
  const initialForm = {
    value: props.route.params.habit.value,
    habitType: props.route.params.habit.type,
    description: props.route.params.habit.description,
    exerciseMinutes: {
      value: props.route.params.habit.exerciseMinutes,
      displayedVal: props.route.params.habit.exerciseMinutes,
    },
    interval: {
      value: props.route.params.habit.interval,
      displayedVal: props.route.params.habit.interval,
    },
    todos: props.route.params.habit.todos.concat({
      id: Math.random().toString(),
      value: '',
      completed: false,
    }),
  };

  const [form, setForm] = useState(initialForm);

  const dispatch = useDispatch();

  const handleEditHabit = () => {
    dispatch(
      editHabit(
        props.route.params.habit.id,
        form.value,
        form.habitType,
        form.description,
        form.exerciseMinutes.value,
        form.interval.value,
        form.todos
      )
    );
    props.navigation.goBack();
  };

  const handleArchiveHabit = () => {
    dispatch(archiveHabit(props.route.params.habit.id));
    props.navigation.goBack();
  };

  const handleTodo = (id: string, value: string) => {
    const editIndex = form.todos.findIndex(todo => todo.id === id);
    setForm(prevState => {
      const copyTodos = [...prevState.todos];
      copyTodos[editIndex].value = value;
      // If last element is not empty than add a new empty todo
      if (copyTodos[prevState.todos.length - 1].value !== '') {
        copyTodos.push({
          id: Math.random().toString(),
          value: '',
          completed: false,
        });
      }

      // If the value becomes empty then it deletes itself
      if (value === '') {
        copyTodos.splice(editIndex, 1);
      }
      return {
        ...prevState,
        todos: copyTodos,
      };
    });
  };

  const handleCancel = () => {
    const clearFormAndGoBack = () => {
      setForm({
        value: '',
        habitType: 'Default',
        description: '',
        exerciseMinutes: { value: 20, displayedVal: 20 },
        interval: { value: 1, displayedVal: 1 },
        todos: [],
      });
      props.navigation.goBack();
    };
    Alert.alert('Cancel', "Are you sure you don't want to save your habit?", [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Yes',
        onPress: clearFormAndGoBack,
        style: 'default',
      },
    ]);
  };

  interface Todo {
    id: string;
    value: string;
    completed: boolean;
  }

  const dropdownIndexHabitTypes: HabitTypes[] = [
    'Default',
    'Exercise',
    'Knowledge',
  ];

  return (
    <View style={styles.screen}>
      <Header
        headerLeft={{
          type: 'AntDesign',
          name: 'arrowleft',
          onPress: handleCancel,
        }}
        headerRight={{
          type: 'AntDesign',
          name: 'save',
          onPress: handleEditHabit,
        }}
      >
        Desclr
      </Header>
      <Form>
        <CustomInput
          containerStyle={defaultStyles.inputContainer}
          label='Name'
          placeholder='Habit Name'
          value={form.value}
          onChangeText={value =>
            setForm(prevState => ({ ...prevState, value: value }))
          }
        />
        <Textarea
          containerStyle={defaultStyles.textAreaContainer}
          label='Description'
          placeholder='Habit Description'
          value={form.description}
          onChangeText={value =>
            setForm(prevState => ({ ...prevState, description: value }))
          }
        />
        <Dropdown
          label='Habit Type'
          entries={[
            { index: 0, label: 'Default' },
            { index: 1, label: 'Exercise' },
            { index: 2, label: 'Knowledge' },
          ]}
          onEntryPress={index =>
            setForm(prevState => ({
              ...prevState,
              habitType: dropdownIndexHabitTypes[index],
            }))
          }
          chosenEntry={form.habitType}
        />
        {form.habitType === 'Exercise' && (
          <CustomSlider
            label='Exercise Time'
            value={form.exerciseMinutes.displayedVal}
            visibleSliderInformation={`${form.exerciseMinutes.value} Minutes`}
            minimumValue={1}
            maximumValue={180}
            // step={1}
            onValueChange={value =>
              setForm(prevState => ({
                ...prevState,
                exerciseMinutes: {
                  ...prevState.interval,
                  value: +value.toFixed(0),
                  displayedVal: value,
                },
              }))
            }
          />
        )}
        <CustomSlider
          label='Interval'
          value={form.interval.displayedVal}
          visibleSliderInformation={`Every ${form.interval.value} ${
            form.interval.value > 1 ? 'days' : 'day'
          }`}
          minimumValue={1}
          maximumValue={7}
          onValueChange={value =>
            setForm(prevState => ({
              ...prevState,
              interval: {
                ...prevState.interval,
                value: +value.toFixed(0),
                displayedVal: value,
              },
            }))
          }
        />
        {form.todos.map((todo: Todo) => (
          <View
            style={{ ...styles.todo, ...defaultStyles.inputContainer }}
            key={todo.id}
          >
            <CheckBox value={todo.completed} onCheck={() => {}} />
            <View style={styles.todoInputSpacer} />
            <View style={styles.todoInput}>
              <CustomInput
                containerStyle={{
                  marginTop: 8,
                  // marginLeft: 8,
                }}
                placeholder='Your to-do action'
                value={todo.value}
                onChangeText={value => handleTodo(todo.id, value)}
              />
            </View>
          </View>
        ))}
      </Form>
      <View style={defaultStyles.buttonContainer}>
        <Button onPress={handleArchiveHabit}>Archive</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  todo: {
    // borderWidth: 1,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // borderWidth: 1,
  },
  todoInput: {
    flex: 1,
  },
  todoInputSpacer: {
    width: 8,
  },
});

export default EditingHabitScreen;
