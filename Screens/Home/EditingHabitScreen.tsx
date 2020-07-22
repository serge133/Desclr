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
import { TodoInterface } from '../../types';
import Button from '../../components/UI/Button';

interface Props {
  navigation: {
    goBack: Function;
  };
  route: {
    params: {
      habit: {
        id: string;
        value: string;
        description: string;
        interval: number;
        todos: TodoInterface[];
      };
    };
  };
}

const EditingHabitScreen: React.FC<Props> = props => {
  const [form, setForm] = useState({
    value: props.route.params.habit.value,
    description: props.route.params.habit.description,
    interval: props.route.params.habit.interval,
    todos: props.route.params.habit.todos.concat({
      id: Math.random().toString(),
      value: '',
      completed: false,
    }),
  });

  const dispatch = useDispatch();

  const handleEditHabit = () => {
    dispatch(
      editHabit(
        props.route.params.habit.id,
        form.value,
        form.description,
        form.interval,
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
        description: '',
        interval: 1,
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
        <CustomSlider
          label='Interval'
          value={form.interval}
          visibleSliderInformation={`Every ${form.interval} ${
            form.interval > 1 ? 'days' : 'day'
          }`}
          minimumValue={1}
          maximumValue={7}
          step={1}
          onValueChange={value =>
            setForm(prevState => ({ ...prevState, interval: value }))
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
