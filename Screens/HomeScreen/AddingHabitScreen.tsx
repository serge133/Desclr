import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import Header from '../../components/Header';
import CustomInput from '../../components/Input';
import Form from '../../components/Form';
import Textarea from '../../components/Textarea';
import CustomSlider from '../../components/Slider';
import CheckBox from '../../components/CheckBox';
import { defaultStyles } from '../../constants/default-styles';
import { useDispatch } from 'react-redux';
import { addHabit } from '../../store/actions/habit';
import * as Text from '../../components/Text';
import KeyboardAvoidingComponent from '../../components/Form';

interface Props {
  navigation: {
    goBack: Function;
  };
}

const AddingHabitScreen: React.FC<Props> = props => {
  const [form, setForm] = useState({
    value: { value: '', isError: false, errorMessage: '' },
    description: { value: '', isError: false, errorMessage: '' },
    interval: { value: 1, displayedVal: 1, isError: false, errorMessage: '' },
    todos: [{ id: '3434q2', value: '', completed: false }],
  });

  const [error, setError] = useState({
    isError: false,
    errorMessage: '',
  });

  const dispatch = useDispatch();

  const handleAddHabit = () => {
    // ? 1 means empty because the user needs an empty form for todo
    if (form.value.value.length === 0) {
      setForm({
        ...form,
        value: {
          ...form.value,
          isError: true,
          errorMessage: 'You need a name',
        },
      });
    } else if (form.todos.length === 1) {
      setError({
        isError: true,
        errorMessage: 'You have to have at least one to-do',
      });
    } else {
      dispatch(
        addHabit(
          form.value.value,
          form.description.value,
          form.interval.value,
          form.todos
        )
      );
      props.navigation.goBack();
    }
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
        value: { value: '', isError: false, errorMessage: '' },
        description: { value: '', isError: false, errorMessage: '' },
        interval: {
          value: 1,
          displayedVal: 1,
          isError: false,
          errorMessage: '',
        },
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
          onPress: handleAddHabit,
        }}
      >
        Desclr
      </Header>
      <Form>
        <CustomInput
          containerStyle={defaultStyles.inputContainer}
          isError={form.value.isError}
          errorMessage={form.value.errorMessage}
          label='Name'
          placeholder='Habit Name'
          value={form.value.value}
          onChangeText={value =>
            setForm(prevState => ({
              ...prevState,
              value: {
                ...prevState.value,
                value: value,
                isError: false,
              },
            }))
          }
        />
        <Textarea
          containerStyle={defaultStyles.textAreaContainer}
          label='Description'
          placeholder='Habit Description'
          value={form.description.value}
          onChangeText={value =>
            setForm(prevState => ({
              ...prevState,
              description: {
                ...prevState.description,
                value: value,
              },
            }))
          }
        />
        <CustomSlider
          label='Interval'
          value={form.interval.displayedVal}
          visibleSliderInformation={`Every ${form.interval.value} ${
            form.interval.value > 1 ? 'days' : 'day'
          }`}
          minimumValue={1}
          maximumValue={7}
          // step={1}
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

        {error.isError && (
          <View style={styles.formError}>
            <Text.Error>{error.errorMessage}</Text.Error>
          </View>
        )}
      </Form>
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
  formError: {
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default AddingHabitScreen;
